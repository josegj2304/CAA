# Spec 00 — Capa de voz (SpeechService)

Prioridad: máxima (es el mayor riesgo técnico). Depende de: nada. Bloquea: 10, 11, 12.

## Objetivo

Que cada toque y cada frase produzcan voz en español de México sin internet, en un Android barato que quizá no tenga motor de voz instalado.

## Contexto verificado

- El WebView de Android no implementa `speechSynthesis` (caniuse). Dentro de Capacitor hace falta un plugin nativo.
- Muchas tablets Android no traen motor TTS; Samsung One UI 7 bloquea sus voces a otras apps.
- Chrome en Android lista idiomas sin voz instalada y cae a inglés sin avisar.
- Piper `es_MX-ald-medium` (63.2 MB) y `es_MX-claude-high` (~63 MB) corren offline vía sherpa-onnx (Android arm64/arm32, WASM, Node).

## Interfaz

```ts
type Segment = { text: string; cellId?: string; soundId?: string };
interface SpeechService {
  speak(segments: Segment[]): Promise<SpeakResult>;   // una palabra = un segmento; la barra = varios
  stop(): void;
  status(): Promise<VoiceStatus>;                       // motores disponibles y verificados
  verifySystemVoice(): Promise<SystemVoiceCheck>;       // ver "Verificación de la voz del sistema"
  setPreferences(p: { rate: number; pitch: number; voiceId?: string }): void;
}
type SpeakResult = { engines: Array<'recorded' | 'prebaked' | 'system' | 'embedded' | 'text-only'>; latencyMs: number };
```

## Cascada de resolución

Para una frase, primero se intenta sintetizarla completa con un motor capaz (pasos 3 a 5). Si no hay ninguno, se resuelve segmento por segmento con los pasos 1 y 2 y se reproducen los audios en orden (concatenación).

1. **Audio grabado** del botón (`soundId` del usuario o la familia).
2. **Audio pregenerado** del texto exacto del segmento (archivo estático generado en build con Piper; spec 01, CA-01-05).
3. **Voz del sistema es-MX o es-US** marcada como verificada y offline.
4. **Voz embebida Piper es-MX** vía plugin (Android) o sherpa-onnx WASM (web), si está instalada.
5. **Otra voz del sistema es-*** (p. ej. es-ES) verificada.
6. **Solo texto:** mostrar la frase en grande y un aviso no bloqueante. Nunca fallar en silencio.

Para una sola palabra con audio grabado o pregenerado, los pasos 1 y 2 van primero (más rápidos y con identidad).

## Verificación de la voz del sistema

No se puede "escuchar" si cayó a inglés; se verifica con metadatos:

- Android (plugin): `TextToSpeech.isLanguageAvailable(Locale("es","MX"))` y `es-US`; elegir una `Voice` cuyo `getLocale()` sea español, con `isNetworkConnectionRequired() == false` y sin `KEY_FEATURE_NOT_INSTALLED` en `getFeatures()`.
- Web: `speechSynthesis.getVoices()` filtrando `voice.lang` que empiece por `es` y `voice.localService === true`.
- Resultado: `{ ok: boolean; locale?: string; offline: boolean; motivo?: string }`. Se guarda y se repite al arrancar si cambió el motor del sistema.

## Plugin Android (`app/android-plugins/voz/`)

- `speakEmbedded(text)` con sherpa-onnx + modelo Piper es-MX desde el almacenamiento de la app.
- `systemVoices()`, `speakSystem(text, voiceName)`, `openTtsSettings()`.
- `<queries>` con el intent `android.intent.action.TTS_SERVICE` (Android 11+).
- Si se expone un polyfill de la interfaz Web Speech, vive dentro de `app/src/speech/`; el resto del código usa solo `SpeechService`.

## Descarga de la voz embebida

Es la única descarga de red permitida (ver CLAUDE.md). Iniciada por el usuario, desde una URL fija configurada en el código, con verificación SHA-256 antes de usarla, y opcional: la app funciona sin ella con audio grabado, pregenerado o del sistema.

## Protocolo de medición (para CA-00-04 y CA-00-05)

- Textos fijos: palabra "más" (50 toques) y frase de 5 palabras "quiero ir al parque mañana" (20 repeticiones).
- Latencia = del evento táctil (`pointerdown`) al callback de inicio de audio del motor (`onStart` de TTS o del reproductor), registrada por el plugin con `SystemClock.elapsedRealtime()`. Validar 5 mediciones con video en cámara lenta (≥ 120 fps) del dedo y el inicio del sonido.
- Condiciones: modo avión, app recién iniciada, motor TTS del sistema deshabilitado cuando la prueba lo indica.

## Criterios de aceptación

- **CA-00-01** Dado un botón con audio grabado, cuando se toca, entonces suena el audio grabado aunque haya voz del sistema (prueba unitaria con motores simulados).
- **CA-00-02** Dado que no hay audio grabado pero sí pregenerado, cuando se toca, entonces suena el pregenerado.
- **CA-00-03** Dado un sistema cuya única voz es inglés (metadatos simulados), `verifySystemVoice()` devuelve `ok: false` y la cascada no usa la voz del sistema.
- **CA-00-04** En modo avión y sin TTS del sistema, la palabra "más" con audio pregenerado suena en ≤ 300 ms (p95 de 50 toques) en al menos 2 de 3 equipos de 2 GB. Prueba manual; registrar en `docs/spike-voz/RESULTADOS.md`.
- **CA-00-05** En modo avión con Piper instalado, la frase fija empieza a sonar en ≤ 600 ms (p95 de 20) en al menos 2 de 3 equipos.
- **CA-00-06** 300 locuciones seguidas sin cierre de la app (prueba manual con script de toques).
- **CA-00-07** Fuera de `app/src/speech/` está prohibido usar el global `speechSynthesis` y `SpeechSynthesisUtterance` e importar el plugin de voz (ESLint `no-restricted-globals` y `no-restricted-imports`; la regla falla en un archivo de prueba que los use).
- **CA-00-08** Con todos los motores fallando, la frase aparece en pantalla y el error se registra localmente (sin enviarlo).
- **CA-00-09** Sin voz del sistema ni Piper, la frase "quiero comer galleta" construida en la barra suena completa concatenando los audios pregenerados de cada segmento, en orden y sin silencios mayores a 150 ms entre segmentos.
- **CA-00-10** Con voz del sistema es-ES verificada y Piper es-MX instalado, la cascada usa Piper (es-MX tiene prioridad).
- **CA-00-11** La voz embebida descargada con SHA-256 incorrecto se rechaza y no se usa.

## Fuera de alcance

Voces en la nube, banco de voz personal, voz infantil sintética (no existe una es-MX abierta).

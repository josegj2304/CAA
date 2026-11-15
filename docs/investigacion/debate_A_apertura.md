# Alegato de apertura. Postura A: construir sobre Asterics AAC

## 1. Postura

No hay que escribir otro motor SAAC. Lo que falta es una **capa mexicana**: vocabulario es-MX con formas de palabra, un generador de conjugación, un preset para México y una app Android con voz offline. Propongo montarla sobre Asterics AAC, aportarla al proyecto original y publicarla en Play de acuerdo con sus mantenedores. Si no la aceptan, hacemos un fork amistoso y delgado.

**A1. La parte clínica ya está hecha.** Asterics trae:
- barrido por filas y columnas, binario, secuencial y Huffman, con conmutadores;
- grid global para fijar el núcleo y niveles de vocabulario;
- PDF imprimible como respaldo en papel (r3 A3.10);
- audio grabado por celda, que sirve para el message banking (`GridActionAudio`);
- predicción en español y OBZ.

Según r2 §6 cubre entre el 75 y el 80 % de lo necesario, y una app nueva sería "inferior durante 2 o 3 años en acceso motor". Quien más pierde empezando de cero es la persona con parálisis cerebral que depende del barrido.

**A2. El hueco cae justo donde José y la IA rinden más.** Los tres comunicadores en español traen 0 formas de palabra y léxico peninsular: "zumo" 3 y "jugo" 0 (r2 §5). Revisé Asterics-AAC-Data: lo único en español es una demo de "ser" con "sois", etiquetas incoherentes y "Tu/El" sin tilde.

El mecanismo, en cambio, funciona:
- tocar un pronombre cambia las formas en toda la cuadrícula;
- las etiquetas se pueden ampliar;
- `es-mx` es un idioma de contenido válido;
- importa en bloque desde un TSV (`07a_word-forms.md`).

Un generador que convierta los 47 verbos de Soto & Cooper a ese TSV es una función pura, que se prueba contra tablas (SYOC-B, r3 B2.3) y **no toca el núcleo en Vue**. Así se cubre lo que r1 B.2 llama crítico: sin conjugación por pronombre, el usuario dice "yo ir".

**A3. Hay menos código que mantener.** La v1 no necesita modificar las ~40 mil líneas del núcleo. Desde cero, José tendría que escribir y sostener barrido, editor, persistencia, OBF y PDF, y sería la única persona detrás del proyecto. En Asterics, el 82 % de los commits también es de una sola persona, pero es un profesional con financiamiento hasta 2028 (r2).

**A4. Costo, licencia y privacidad ya están resueltos.** No hay backend ni cuentas, así que la ONG no trata datos sensibles en el sentido de la LFPDPPP (r4 §6.2). La AGPL es compatible con la GPLv3 de Piper y espeak-ng (r4 §2.2), y ARASAAC colabora con el proyecto desde 2022. Cuesta US$25 y no fragmenta el ecosistema.

## 2. Debilidades y cómo las mitigo

- **Voz en Android.** El WebView no tiene `speechSynthesis` (r4 §2.1). Esto afecta a **cualquier** app con Capacitor, también a una hecha desde cero.
  - Mitigación: el shell inyecta un polyfill de `speechSynthesis` sobre el TTS nativo (precedente: `cboard-speech-tts`), con Piper `es_MX-ald-medium` (63 MB) vía sherpa-onnx como respaldo.
  - Asterics solo comprueba esa interfaz (`nativeSpeechSupported`), así que no hay que cambiarle nada.
  - Es la pieza más difícil. Si sherpa-onnx se atora, la v1 sale con la voz del sistema, un asistente de instalación y audios grabados; Piper llega en la v1.1.
- **Vue 2.7 sin soporte.** Sin backend, el riesgo real es que las herramientas envejezcan. Cerca del 80 % de lo que construimos (datos, generador, shell y polyfill) no depende de Vue, así que se puede mudar a Cboard o a una app propia.
- **Una sola persona sostiene el proyecto.** Usamos versiones publicadas y fijas, y los datos entran por el flujo de PR que ya está documentado. La AGPL garantiza el fork.
- **José no es senior.** Trabaja en unidades pequeñas con pruebas, y cada PR que revisa un mantenedor es mentoría gratis.
- **"Quiere construir la app".** La construye: tendrá ficha propia en Play, conjugador, voz offline y onboarding. Lo que no hace es reescribir otro barrido. Si el piloto muestra que la plataforma es el obstáculo, migra con todo lo construido y con evidencia de usuarios.
- **No es "cero telemetría".** En producción carga Matomo sin cookies; nuestra build lo desactiva.
- **Sin app en la tienda de iOS.** En iOS funciona como PWA, con las voces Paulina o Mónica.

## 3. Pregunta 2: qué le damos a Fable

Un repositorio kit de arranque, `saac-mx/`:
- **`CLAUDE.md`**: reglas (no tocar el núcleo; versión fijada), mapa de los ~12 archivos relevantes de Asterics, comandos y definición de "terminado".
- **`docs/PRD.md`**, escrito para José; **`docs/decisiones.md`**, con las decisiones de arquitectura; **`docs/mapa-asterics.md`**, con los formatos.
- **`specs/01-generador-formas.md`** hasta **`05-piloto.md`**, con criterios de aceptación.
- **`data/vocab/nucleo_infantil.csv`** (las 218 de Soto & Cooper más las de Universal Core que faltan, con `arasaac_id`, `fuente` y `estado_revision`), **`data/vocab/adulto_hospital.csv`**, **`data/lexico/es-ES_a_es-MX.csv`** y **`data/morfologia/oraculo_conjugacion.csv`**, con columna `comentario_terapeuta`.
- **`research/r1–r4.md`**.

Los terapeutas revisan en Excel **el mismo CSV** que usa el generador.

## 4. Plan de la v1 (16 semanas)

1. **H0 (semanas 0–2): contacto y punto de decisión.** Escribir a los mantenedores y a ARASAAC, y acordar con qué cuenta se publica (la de la fundación evita la prueba de 12 testers durante 14 días, r4 §7). Si no hay respuesta en la semana 3, fork amistoso.
2. **H1 (semanas 2–6): generador y núcleo infantil es-MX.** Funciona como PWA, así que hay usuarios en la semana 6.
3. **H2 (semanas 6–10): shell Android, voz y preset.** Criterio: en modo avión, en una tablet de 2 GB sin Google TTS, una celda habla en menos de 600 ms.
4. **H3 (semanas 10–14): piloto** con 5 a 10 usuarios por perfil (TEA o retraso del lenguaje, parálisis cerebral con barrido, afasia básica), con CRIT, CAM o USAER (r2 §7).
5. **H4 (semanas 14–16): lanzamiento en Play y guías de modelado** (r3 A3.2).

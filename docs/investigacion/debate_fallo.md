# Fallo del juez

## 1. Puntuación (posturas finales)

| Criterio | A | B | C | Justificación |
|---|---|---|---|---|
| 1. Valor clínico | 4 | 4 | 3 | A conserva el barrido maduro; C omite el PDF. |
| 2. Viabilidad José + IA | 2 | 3 | 2 | A: dos runtimes y Vue 2.7 sin soporte; C: doble spike y Dart; B: TS, pero con vías paralelas. |
| 3. Offline y voz | 3 | 4 | 5 | C: sherpa-onnx oficial; B: plugin Kotlin propio; A acepta la voz del sistema. |
| 4. Costo y 3 años | 2 | 3 | 3 | Todas ~US$25; A depende de un upstream de una persona, financiado hasta 2028 (2 de 3 años). |
| 5. Licencias | 4 | 4 | 3 | C depende de un permiso GPL que José no puede otorgar sobre código ajeno. |
| 6. Tiempo a v1 | 4 | 3 | 3 | A, semana ~12; B y C, ~20. |
| 7. Ecosistema | 5 | 4 | 3 | A aporta upstream; B y C exportan OBZ; el código Dart no lo reutiliza nadie. |
| **Total** | **24** | **25** | **22** | |

## 2. Pregunta 1: estrategia

"Contenido primero" es un consenso real; "decidir el runtime después" es diplomacia. Los criterios propuestos no se pueden medir, o miden dos veces el mismo motor en C++ (latencia de Flutter frente a Capacitor). Así que decido ahora.

**Runtime por defecto: TypeScript + Capacitor, Android primero, un solo repo y una sola ruta.** Usa un solo lenguaje, deja una PWA gratis para terapeutas e iOS y sigue el patrón de Cboard (r4 §4.1). Asterics no será el runtime, sino el vehículo del piloto y el destino de los usuarios de barrido. Mantener un fork de Vue 2.7 no es tarea para un junior.

1. **Semanas 0–1, sin código:** probar el APK de ejemplo de sherpa-onnx con es_MX-ald (r4 §2.2; confirmar que existe) en 3 equipos de 2 GB o menos con Android 8–10. Pedir permiso escrito a ARASAAC y conseguir 1 o 2 terapeutas.
2. **Semanas 1–5:** los CSV se convierten en OBZ, `.grd` de Asterics, PDF y **audio pregenerado con Piper** (sherpa-onnx para Node). Así hay voz en cualquier runtime aunque falte el TTS del sistema (r4 §2.5).
3. **Semanas 2–5:** un único spike de voz en Capacitor, con un plugin Kotlin local.
4. **Semana 6, punto de decisión (ADR-001).** En modo avión y sin TTS del sistema, en al menos 2 de los 3 equipos: p95 del toque al audio ≤ 600 ms con Piper embebido y ≤ 300 ms con audio pregenerado (50 toques); 0 cierres en 300 locuciones; APK ≤ 100 MB o voz descargable.
   - Si pasa: Capacitor con voz embebida.
   - Si el APK de ejemplo pasa y el plugin falla tras 10 días hábiles: **Flutter**. Es el único caso.
   - Si falla también el ejemplo: sigue Capacitor, con voz grabada, pregenerada y del sistema.
5. **Semanas 6–10:** piloto del contenido en la PWA de Asterics, con voz verificada por la terapeuta; entran también usuarios de barrido. José programa la app.
6. **Semana 14, corte:** si menos del 90 % de los criterios de aceptación están en verde, José deja la app y se dedica al contenido y a Asterics.
7. **Semanas 14–20:** la prueba cerrada de Play sirve de piloto (12 testers, 14 días, r4 §7). Éxito: al menos el 67 % de las familias la usan 3 días por semana en la semana 4 (el abandono típico ronda un tercio, r3 A3.10).

**Si no hay datos:** Capacitor con audio pregenerado y grabado; voz embebida en la v1.1.

## 3. Pregunta 2: paquete para Fable

Un repositorio sin monorepo. YA = debe existir antes de que Fable escriba código. J = José, T = terapeutas, F = Fable.

```
saac-mx/
├─ CLAUDE.md                  YA·F   stack, comandos, prohibiciones, "terminado"
├─ LEEME_JOSE.md              YA·J   compilar, probar en teléfono, pedir y verificar tareas
├─ ATRIBUCIONES.md, LICENSE   YA     GPL-3.0
├─ docs/PRD.md                YA·J+T población v1 y no-objetivos
├─ docs/decisiones.md         YA·J+F ADR-000 = este fallo
├─ docs/legal/                YA·J   aviso de privacidad, consentimiento del piloto
├─ docs/investigacion/r1–r4   YA     congelada, no normativa, con lista de [NV]
├─ specs/00-voz, 01-contenido, 02-revision   YA·F
├─ specs/10…16-app            esqueleto YA; completas antes de la semana 6
├─ schemas/                   YA·F   columnas CSV, campos ext_saac_mx_*
├─ contenido/vocabulario/     YA·T   218 S&C + 7 UC; 47 verbos; hospital; léxico es-MX
├─ contenido/oraculo/         YA·humano; Fable no lo edita
├─ fixtures/*.obz             YA     exportaciones reales de Cboard y Asterics
├─ tasks/BACKLOG.md           YA·J+F
├─ tools/ spike-voz/ app/ CI  F      (app/ solo tras el ADR-001)
├─ revision/*.xlsx            generado para T
└─ salida/                    ignorada por git
```

La combinación es correcta con tres ajustes:
- **El Excel es solo una vista que se genera.** Guardar un CSV desde Excel daña las tildes: `tools/revision` exporta el .xlsx y reimporta solo las columnas de revisión.
- **La investigación queda congelada.** Lo vivo es el PRD más el registro de decisiones.
- **El oráculo de conjugación lo escribe una persona.** Si lo hiciera Fable, se validaría a sí misma.

Sobran `packages/` (B) y el generador en Dart (C).

## 4. Recorte de v1

**Entra:** niños con TEA o retraso del lenguaje con selección directa.
- Núcleo es-MX en posiciones fijas, que crece sin mover botones, y barra de mensaje.
- Verbos ya conjugados; con pulsación larga, otras personas, tiempos y "voy a"; género y número.
- Voz en cascada; foto y grabación por botón.
- Bloqueo, ajustes táctiles, OBZ, PDF y guía de modelado (la mejor evidencia, r3 A3.2).

**Fuera:**
- **Barrido, a la v1.1.** Exige evaluación, posicionamiento y conmutadores costosos; un barrido inmaduro fatiga. Mientras tanto, Asterics con el mismo contenido.
- **Afasia, ELA y ACV, a la v2.** Requieren otro diseño, y no hay frases ni escala de dolor validadas en español (r3 B3.6). La v1 solo trae el tablero hospitalario imprimible.
- Teclado con predicción, escenas visuales, mirada, sincronización e iOS nativo.
- **Conjugar al tocar el pronombre queda apagado por defecto**, porque Soto y Cooper advierten contra forzar "yo + verbo".

## 5. Votos disidentes y riesgos

**Mejor argumento perdedor (A):** el hueco es el contenido, no la plataforma (r2 §6), y quien más pierde empezando de cero es el usuario de barrido. Si en la semana 20 la app no aporta voz garantizada, presencia en Play o una interfaz simple, conviene invertir en Asterics.

**Riesgos:**
1. Un plugin nativo que José no sabe depurar.
2. José es el único responsable y tiene tiempo parcial.
3. Sin terapeutas aliados no hay piloto (r2 §10), y el piloto trata datos sensibles de menores, lo que exige consentimiento por escrito (LFPDPPP art. 8). Nadie lo mencionó.

## 6. Afirmaciones no respaldadas o erróneas

- **A:** el "75–80 %" es una estimación cualitativa (r2 §6).
- **A y B:** "Flutter tira el generador" es falso: el OBZ/JSON lo lee cualquier runtime.
- **B:** el banco de frases es contenido; no obliga a cambiar el núcleo.
- **C:** arm32 es del motor, no de Flutter. Personal Voice (iPhone 12+) no aplica a Android ni al decil I. El permiso adicional de la GPLv3 solo vale para el código propio de José [I].
- **B y C:** la "tablet muda" sale de una sola guía, sobre tablets (r4 §2.1).
- **Todos** suponen una ONG que nadie confirma; sin ella no hay D-U-N-S ni exención de Apple (r4 §7). "TS es lo mejor para la IA" es una interpretación [I].
- Soto y Cooper cruzan un corpus cubano con el IDHC mexicano; no es un vocabulario es-MX validado.
- r4 §3.3 dice que Asterics no exporta OBZ, pero tiene `backupDataToOBZ`.
- Verifiqué en el repo clonado lo que A dijo del código (`GridActionAudio`, Matomo, ~39,700 líneas).

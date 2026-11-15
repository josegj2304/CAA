# Réplica del Arquitecto B

## 1. Puntos débiles

**A (construir sobre Asterics)**
- **"No tocar el núcleo" no alcanza.** Quitar Matomo y ResponsiveVoice (en línea, CC BY-NC-ND) ya es un fork que hay que mantener en cada versión. El módulo adulto obliga a cambiar el núcleo, porque faltan el banco de frases y la predicción de frases (Ace Centre, r2 Tabla A). Si los mantenedores no responden antes de la semana 3, José queda solo con unas 40 mil líneas de Vue 2.7, sin soporte desde 2023.
- **"Usuarios en la semana 6 como PWA" no llega a la población objetivo.** En Chrome para Android dependería del TTS del sistema, que la mayoría de las tablets no trae (r4 §2.1).

**C (Flutter)**
- **Nada se puede reutilizar.** El generador y la voz escritos en Dart no le sirven ni a Asterics ni a Cboard, y si su H0 falla, "se reabre la arquitectura" sin un plan B.
- **Rinde menos con IA:** "media-alta" frente a "muy alta" (r4 §4.2), algo que C concede. Además, como Flutter web queda en demo, el terapeuta no puede armar tableros desde cualquier computadora.
- **Personal Voice es de nicho:** pide iPhone 12+ con iOS 17 (r4 §2.3), un equipo fuera del alcance del decil I.

## 2. Concesiones

- **A** tiene razón en que el barrido de Asterics es maduro, en que la persona con parálisis cerebral es la que más pierde si empezamos desde cero y en que el valor está en el contenido es-MX, no en la plataforma. Adopto su polyfill de `speechSynthesis` sobre el TTS nativo.
- **C** tiene razón en que sherpa-onnx es oficial en Flutter, mientras que yo tendría que escribir un puente Kotlin. Adopto su idea de sintetizar el audio de cada botón al crearlo y guardarlo en caché.

## 3. Postura final: un híbrido que no se desperdicia en ningún caso

1. **Semanas 1–4, en paralelo:**
   - un **paquete TS independiente de la plataforma**: CSV es-MX, generador de conjugaciones (función pura, probada contra SYOC-B) y exportadores a TSV de Asterics y a OBZ. Los terapeutas lo prueban de inmediato en Asterics.
   - un **plugin Capacitor de voz** con la interfaz `speechSynthesis` (TTS del sistema + Piper con caché), probado en una tablet de 2 GB.
2. **Semana 5, punto de decisión** con tres datos: la respuesta de los mantenedores, el resultado de la voz y la opinión de los terapeutas sobre la interfaz de Asterics.
   - Si los tres son favorables, seguimos la ruta de A.
   - Si no, mi núcleo TS, reutilizando todo lo anterior.

El plugin y el generador sirven en las dos rutas; en Flutter, en ninguna.

## 4. Paquete para Fable

Un **kit de arranque de repositorio** (los tres coincidimos):
- `CLAUDE.md`: stack, prohibiciones (red en el camino crítico, analítica, cuentas) y "terminado" = criterios de aceptación en verde.
- `docs/00_LEEME_JOSE.md`, `docs/PRD.md` y `docs/adr/ADR-000-punto-de-decision.md` con los criterios medibles.
- `packages/contenido-es-mx/` (CSV, generador, exportadores y pruebas) y `packages/voz-android/` (criterio: en modo avión, menos de 600 ms en una tablet de 2 GB).
- `specs/Mxx.md`: criterios Dado/Cuando/Entonces, cada uno con su prueba.
- `data/vocab/*.csv`: la única fuente de verdad, con columnas `estado_revision`, `revisor` y `comentario_terapeuta` para revisarla en Excel.
- `fixtures/*.obz` de Cboard y Asterics, y `docs/investigacion/r1–r4.md` como referencia.

La carpeta `app/` se crea solo después del punto de decisión.

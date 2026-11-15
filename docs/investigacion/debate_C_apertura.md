# Alegato de apertura: ingeniero móvil (postura C, Flutter nativo Android-first)

## 1. Postura y argumentos

Construir desde cero una app **Flutter, Android-first** (Android tiene el 74 % en México), con voz es-MX offline embebida (sherpa-onnx + Piper `es_MX-ald-medium`), SQLite, OBF/OBZ, switches capturados como teclas y fijación de pantalla. iOS y web, después. No es otra plataforma genérica: es un cliente pequeño y fiable. El vocabulario mexicano sale en OBZ para que también lo usen Grid y Cboard.

**A1. La voz decide, y en la ruta web también acaba siendo nativa.**
- Android WebView no tiene `speechSynthesis`, "la mayoría de las tablets Android no traen motor TTS" y One UI 7 bloquea las voces Samsung (r4 §2.1).
- Grid recurre a ResponsiveVoice en línea, con retrasos de 5 s o más (r2 §1).
- Para Capacitor, la propia r4 exige "sherpa-onnx + Piper como módulo nativo propio" (r4 §4.3): lo más difícil quedaría en Kotlin + puente JS.
- En Flutter, sherpa-onnx es **oficial**, incluso en arm32 (r4 §2.2, §4.2): todo en Dart.

**A2. Fiabilidad significa menos abandono.**
- Baxter (2012) señala como barreras la fiabilidad (11 estudios), la voz y el idioma ("primary barrier to use at home") y la lentitud (r3 §A3.10).
- Con la voz dentro del APK, la app habla desde el día uno y en modo avión.
- Propongo **sintetizar y cachear el audio de cada botón al crearlo**: tocar solo reproduce un archivo, con latencia constante en 2 GB de RAM y dentro de la meta de <600 ms (r4 §4.3) [I].

**A3. Forkear hereda una deuda que José y una IA no pueden pagar.**
- Grid: Vue 2.7 sin soporte, 10,689 commits, ~82 % de una sola persona en el último año y fuera de las tiendas (r2 §6, §7.1).
- Cboard: backend obligatorio con MongoDB, Azure y OpenAI, una monetización que habría que retirar y offline robusto "solo en Chrome" (r2 §1, §5.7).
- Un código nuevo y acotado cabe entero en el contexto de Fable; uno de diez años, no.

**A4. En nativo, el acceso motor y la privacidad vienen casi incluidos.**
- Los switches envían pulsaciones (r4 §5.1), que Flutter captura con `KeyboardListener`.
- `Semantics` permite usar Switch Access y Camera Switches (r4 §5.2), y `startLockTask()` fija la pantalla (r4 §5.3).
- Personal Voice en español de México está documentado para apps nativas, no para la web (r4 §2.3). Es clave para ELA en iOS.
- Sin backend, la ONG no trata datos sensibles (LFPDPPP, r4 §6.2), y el costo se reduce a US$25 en un solo pago (r4 §7).

## 2. Debilidades y mitigación

- **Tamaño.** El APK rondaría los 100 MB (63 MB de voz + núcleo de menos de 25 MB, r4 §2.2, §4.3). Es menos que Cboard en iOS (200 MB, r2 §1), pero pesa en teléfonos de 16 GB. Mitigación: voz por Play Asset Delivery o descargada en el primer arranque, y probar un modelo int8 [NV].
- **Dart frente a TS para la IA.** Es cierto: r4 da a Flutter "media-alta" y a TS "muy alta" (r4 §4.2). Mitigación: tipado fuerte, `flutter analyze` y `flutter test` como bucle de retroalimentación, lista cerrada de paquetes en `CLAUDE.md`, y un único puente nativo, el de lock task (unas 30 líneas de Kotlin).
- **Distribución sin tienda.** La PWA no necesita tienda, y la verificación de desarrolladores de 2027 afectará al APK fuera de ella (r4 §7). Lo concedo. Distribuiremos por Play, como aconseja r4; la prueba cerrada obligatoria (12 testers, 14 días) será nuestro piloto. Flutter web queda como demo o escritorio.
- **Duplicar trabajo.** Durante años seremos inferiores a Grid en barrido avanzado (r2 §6). Mitigación: no competir en amplitud. El vocabulario es-MX con conjugaciones se contribuye como OBZ, y los terapeutas pueden probarlo en Grid desde la semana 4.
- **GPLv3 (espeak-ng/piper).** La aceptamos para todo el código, como Cboard (r4 §2.2). Riesgo: la fricción entre GPL y App Store [NV]. Mitigación: la build de iOS no lleva espeak-ng; usa AVSpeechSynthesizer (Paulina/Mónica, r4 §2.1) más Personal Voice. Además, José, como titular de los derechos, añade un permiso adicional para tiendas (§7 de la GPLv3) [I].
- **Corrección propia.** Propongo SQLite (drift) en lugar de Isar, cuyo mantenimiento es incierto [NV].

## 3. Pregunta 2: el paquete para Fable

Un **kit de arranque de repositorio**. El CSV es para las personas y el OBZ, para la máquina.
- `CLAUDE.md`: stack fijo, comandos, paquetes permitidos, prohibiciones (red en el camino crítico, analítica, cuentas) y reglas de licencia.
- `docs/00_LEEME_JOSE.md`: compilar y probar en un teléfono, en lenguaje llano.
- `docs/PRD.md`: población de la v1 (niños con TEA o retraso del lenguaje, más acceso por switch para parálisis cerebral; adultos en la v1.1) y no-objetivos.
- `docs/adr/ADR-001-flutter.md` … `ADR-005-licencia-gplv3.md`.
- `docs/specs/01-tablero-barra.md`, `02-voz.md` (orden de r4 §2.5), `03-datos-obf.md`, `04-acceso-barrido.md`, `05-edicion.md`, `06-morfologia-es-mx.md`, `07-privacidad-legal.md`, cada uno con criterios Dado/Cuando/Entonces.
- `data/vocabulario_nucleo_es-MX.csv` y `data/verbos_es-MX.csv` (Soto & Cooper 2021, r3 §B2.1), con columnas `estado_revision` y `revisor` para revisarlos en Excel; `tools/csv_a_obz.dart` genera `assets/seed/nucleo_es-MX.obz`.
- `test/fixtures/`: OBZ de Cboard y Grid para pruebas de ida y vuelta.
- `ATRIBUCIONES.md` y `docs/investigacion/r1–r4.md`, como referencia no normativa.

## 4. Plan de v1

- **H0 (sem. 1–2). Prueba de voz para decidir si se sigue:** sherpa-onnx con `es_MX-ald` en tres equipos de 2 GB con Android 8–10, uno de ellos arm32. Se miden latencia, RAM y tamaño. Si no pasa, se reabre la arquitectura.
- **H1 (sem. 3–6).** Núcleo cargado desde el OBZ, barra de mensaje, SpeechService (grabación → voz del sistema verificada → Piper), SQLite, bloqueo de edición y fijación de pantalla.
- **H2 (sem. 7–10).** Edición rápida (foto y voz grabada por botón), OBZ de ida y vuelta y conjugación de los 47 verbos de Soto & Cooper.
- **H3 (sem. 11–14).** Barrido con 1 o 2 switches (lineal, fila-columna y auditivo), ajustes táctiles y auditoría con Switch Access.
- **H4 (sem. 15–20).** Prueba cerrada en Play con 12 o más familias, revisión del vocabulario por terapeutas, PR del OBZ a Grid y publicación de la v1.0.

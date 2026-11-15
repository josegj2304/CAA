# Registro de decisiones (ADR)

Cada decisión tiene número, fecha, estado y razón. Para cambiar una decisión, se agrega un ADR nuevo que la reemplaza; no se borra la anterior.

## ADR-000 · Estrategia y arquitectura (fallo de la mesa de expertos)

- Fecha: 2026-11-10 · Estado: aceptada
- Contexto: tres expertos simulados (Asterics AAC, TypeScript + Capacitor, Flutter) debatieron en dos rondas; un juez puntuó 7 criterios. Resultado: TypeScript + Capacitor 25, Asterics 24, Flutter 22. Detalle en `docs/investigacion/debate_fallo.md`.
- Decisión:
  1. Runtime por defecto: TypeScript + Capacitor, Android primero, un solo repositorio, una sola ruta.
  2. El contenido es-MX (CSV → OBZ, PDF, audio pregenerado) se construye primero y sirve en cualquier plataforma, incluida Asterics AAC.
  3. Asterics AAC no es el runtime: es el vehículo para pilotar el contenido y el destino de usuarios de barrido mientras llega la v1.1.
  4. Puntos de decisión: semana 6 (voz, ADR-001) y semana 14 (si menos del 90 % de criterios de aceptación están en verde, pausar la app y dedicarse al contenido en Asterics).
- Voto disidente a recordar: el hueco está en el contenido, no en la plataforma. Si en la semana 20 la app no aporta voz garantizada, presencia en Play o una interfaz más simple que Asterics, conviene invertir en Asterics.

## ADR-001 · Motor de voz embebido

- Fecha: pendiente (semana 6) · Estado: propuesta
- Prueba: APK de ejemplo de sherpa-onnx con `es_MX-ald-medium` (semana 0–1) y plugin Capacitor propio (semanas 2–5), en 3 equipos de 2 GB o menos con Android 8–10, en modo avión y sin TTS del sistema.
- Umbrales (al menos 2 de 3 equipos, protocolo de medición en spec 00): p95 ≤ 300 ms con audio pregenerado (palabra "más", 50 toques) y ≤ 600 ms con Piper embebido (frase "quiero ir al parque mañana", 20 repeticiones); 0 cierres en 300 locuciones seguidas; APK ≤ 100 MB o voz descargable aparte.
- Resultados posibles:
  - Pasa → Capacitor con voz embebida.
  - El APK de ejemplo pasa pero el plugin sigue fallando tras 10 días hábiles → reabrir ADR-000 a favor de Flutter (único caso).
  - Falla también el APK de ejemplo → seguir con Capacitor y voz grabada + pregenerada + sistema; Piper pasa a v1.1.
- Sin datos → Capacitor con audio pregenerado y grabado; voz embebida en v1.1.
- Resultados medidos: (llenar en `docs/spike-voz/RESULTADOS.md`).

## ADR-002 · Licencia GPL-3.0

- Fecha: 2026-11-10 · Estado: aceptada
- Razón: Piper usa espeak-ng (GPL-3.0); Cboard es GPL-3.0 y Asterics AAC es AGPL-3.0. Garantiza que cualquier versión derivada siga siendo libre.

## ADR-003 · Pictogramas

- Fecha: 2026-11-10 · Estado: aceptada (sujeta a confirmación escrita de ARASAAC)
- Decisión: ARASAAC como set principal; Mulberry y OpenMoji como respaldo; fotos propias del usuario. Cada imagen guarda autor y licencia. Se empaqueta solo el subconjunto usado por el vocabulario (no el catálogo completo).

## ADR-004 · Datos solo en el dispositivo

- Fecha: 2026-11-10 · Estado: aceptada
- Razón: la LFPDPPP (2025) trata la salud como dato sensible con consentimiento expreso y por escrito. Sin cuentas, nube ni analítica, la organización no recibe esos datos. Respaldo = archivo OBZ que el usuario guarda o comparte.

## ADR-005 · Formato OBF/OBZ

- Fecha: 2026-11-10 · Estado: aceptada
- Decisión: modelo interno serializable sin pérdida a OBF/OBZ (`open-board-0.1`). Lo que OBF no cubre va en campos `ext_saac_mx_*` (ver `schemas/obf-extensiones.md`). Pruebas de ida y vuelta contra exportaciones reales de Cboard y Asterics en `fixtures/`.

## ADR-006 · Posiciones fijas y crecimiento por ocultar

- Fecha: 2026-11-10 · Estado: aceptada
- Decisión: el tablero núcleo tiene una cuadrícula final fija. Los niveles 1, 2 y 3 muestran subconjuntos de esa cuadrícula; las celdas ocultas conservan su lugar. Ninguna función reacomoda botones automáticamente.
- Evidencia: débil para la planificación motora (LAMP sin ensayos controlados), pero bajo costo y evita reaprender.

## ADR-007 · Conjugación automática por pronombre

- Fecha: 2026-11-10 · Estado: aceptada
- Decisión: la v1 ofrece verbos ya conjugados en su forma más frecuente y otras formas con pulsación larga. La conjugación automática al tocar un pronombre existe como opción, apagada por defecto.
- Razón: el español omite el sujeto; forzar "yo + verbo" produce frases poco naturales (Soto & Cooper 2021).

## ADR-008 · Ampliación v0.2 del vocabulario

- Fecha: 2026-11-14 · Estado: aceptada
- Decisión:
  1. Las 152 palabras del núcleo, los 63 verbos, las 269 filas del periférico y las 59 frases de la v0.1 quedan aprobadas por el equipo. Los 63 verbos pasan al oráculo (`contenido/oraculo/oraculo_conjugacion.csv`).
  2. El vocabulario nuevo va en `periferico.csv`, en carpetas, y no en el núcleo. Así la cuadrícula fija y los niveles (ADR-006, spec 01) no cambian.
  3. `periferico.csv` puede pasar de 999 filas: el id acepta 3 o 4 dígitos (`P1000`).
  4. Se agrega la columna opcional `texto_voz` a `periferico.csv` para lo que se dice distinto de como se escribe (letras).
  5. La columna `funcion` de frases pasa de 8 a 13 valores (responder, elegir, llamar la atención, opinar, narrar).
  6. `adulto_hospital.csv` sale del repositorio público hasta tener permiso escrito de la fuente. El build lo trata como opcional.
  7. Se quita la frase "No puedo respirar" por indicación del equipo (F059; el id no se reutiliza).
- Las filas nuevas entran como `Pendiente`; los verbos nuevos (V064 en adelante) siguen fuera del oráculo hasta que una persona los verifique.

## Dependencias aprobadas

| Paquete | Uso | Licencia |
|---|---|---|
| `preact` | Interfaz de la app | MIT |
| `workbox-window` | Registro del service worker en la app (lo exige `vite-plugin-pwa`) | MIT |
| `vite` | Servidor de desarrollo y build (desarrollo) | MIT |
| `@preact/preset-vite` | Preact dentro de Vite (desarrollo) | MIT |
| `@babel/core` | Lo exige `@preact/preset-vite` (desarrollo) | MIT |
| `vite-plugin-pwa` | Service worker y manifest (desarrollo) | MIT |
| `workbox-build` | Lo exige `vite-plugin-pwa` (desarrollo) | MIT |
| `typescript` | Lenguaje (desarrollo) | Apache-2.0 |
| `eslint` | Linter (desarrollo) | MIT |
| `@eslint/js` | Reglas base de ESLint (desarrollo) | MIT |
| `typescript-eslint` | ESLint para TypeScript (desarrollo) | MIT |
| `vitest` | Pruebas de unidad (desarrollo) | MIT |
| `jsdom` | Navegador simulado para Vitest (desarrollo) | MIT |
| `@playwright/test` | Pruebas e2e (desarrollo) | Apache-2.0 |
| `@types/node` | Tipos de Node para configuración y pruebas (desarrollo) | MIT |

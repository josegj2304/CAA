# Réplica de A (estratega open source)

## 1. Puntos débiles

**B (TypeScript + Capacitor)**
- *"Forkear es migrar el stack primero."* No es lo que propongo. La v1 no toca Vue: las formas de palabra entran por TSV y la voz por un polyfill. Tampoco se llega a ResponsiveVoice, porque `speechService.js` prueba primero las voces nativas.
- *Tiempo hasta tener usuarios.* El barrido y la morfología llegan en las semanas 9 a 14, y el piloto en las semanas 15 a 20. Además, B concede "peor acceso motor durante 2 o 3 años" y manda a Asterics a quien necesite algo más que barrido lineal: le cede la población con parálisis cerebral.
- *Interoperabilidad.* Ni Grid ni Cboard leen los campos `ext_saac_mx_*`. Si el comunicador se publica en OBZ, se pierde justo la conjugación, lo que más vale. Y la única persona detrás del proyecto sería José.

**C (Flutter)**
- *Cachear audio por botón* no sirve para la barra de frase, el teclado ni la predicción.
- *Encaje con la IA.* C reconoce que Dart rinde "media-alta" con IA (r4 §4.2). Además, su v1 deja fuera el PDF imprimible (r3 A3.10) y el 26 % de iOS.
- Tiene que rehacer barrido, editor y OBZ en 20 semanas.

## 2. Concesiones

1. **La voz es el riesgo que decide y va primero.** Mi plan la dejaba en el hito H2; ahora entra en H0, con una prueba de sherpa-onnx y Piper en tres equipos de 2 GB, uno de ellos arm32.
2. **A tres años, depender de un núcleo en Vue 2 que mantiene una sola persona, con interfaz densa y Matomo, es un riesgo real.** Asterics puede no ser el destino final.
3. **Si hay que construir un cliente propio, TypeScript es la mejor opción para la IA.**

## 3. Postura final (híbrido)

**Primero, una capa mexicana portátil. Después, el cliente, con un punto de decisión basado en evidencia.**
- **Semanas 0–6.** Vocabulario es-MX en CSV, generador de formas en TypeScript que exporta tanto `.grd.json`/TSV para Asterics como OBZ, y la prueba de voz. Ya hay usuarios en Asterics PWA en la semana 6. Los tres coincidimos en que el vocabulario debe llegar a Grid.
- **Semanas 6–12.** App Android = Capacitor + Asterics + polyfill. El plugin en Kotlin para sherpa-onnx **es el mismo que necesita B**, así que no se desperdicia nada.
- **Punto de decisión en la semana 14, con datos del piloto.** Si el obstáculo son la interfaz o el stack de Asterics, o si los mantenedores no responden, se migra al núcleo propio de B, conservando datos, generador y plugin. Flutter tiraría todo eso, además de iOS y la web.

## 4. Paquete para Fable

Un kit de arranque en forma de repositorio, en el que los tres coincidimos:
- **De mi propuesta:** `CLAUDE.md`, `docs/PRD.md`, `docs/decisiones.md` y `research/`.
- **De B:** `schemas/*.schema.json`, `fixtures/*.obz`, `tasks/BACKLOG.md` y una CI que falla si falta un pictograma o su atribución.
- **De C:** `docs/00_LEEME_JOSE.md`, `ATRIBUCIONES.md` y la columna `revisor`.
- **Datos neutrales respecto a la plataforma.** `data/*.csv` (lo que revisan los terapeutas en Excel) pasa por `tools/generar.ts` y produce `build/asterics/` y `build/obz/`. Así el kit sobrevive a cualquier resultado del punto de decisión.
- **Specs en orden de riesgo:** de `specs/00-voz.md` a `05-piloto.md`, con criterios Dado/Cuando/Entonces.

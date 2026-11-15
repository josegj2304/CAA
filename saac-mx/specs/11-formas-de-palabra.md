# Spec 11 — Formas de palabra (morfología del español)

Depende de: 01, 10, 14. Oráculo de pruebas: `contenido/oraculo/oraculo_conjugacion.csv` (escrito por una persona).

## Objetivo

Que el usuario diga frases gramaticales en español sin teclear: verbos conjugados, género y número, contracciones frecuentes.

## Comportamiento

- Cada verbo aparece con su `forma_boton` (p. ej. "quiero", "dame", "vamos", "me gusta").
- **Abrir el menú de formas:**
  - Con selección táctil normal: pulsación larga (≥ 500 ms, configurable).
  - Si el perfil usa tiempo de permanencia o "activar al soltar" (spec 14), la pulsación larga se desactiva y las formas se abren tocando la última palabra de la barra de mensaje. Así no compiten la permanencia y el menú.
- **Formas de verbos** (solo filas con `estado_revision = Aprobado`): presente (yo, tú, él/ella, nosotros, ellos/ustedes), pretérito (yo, tú, él/ella), "voy a…", gerundio, participio, imperativo y su negativo, y las formas pronominales si existen (`presente_pronominal`, `preterito_pronominal`).
- **Sustantivos y adjetivos:** el menú muestra solo la columna `formas` (flexiones). `sinonimos` nunca se ofrece como forma.
- **Género del perfil:** los textos con `{masculino|femenino}` se resuelven con el género gramatical del perfil (spec 12).
- **Contracciones en la barra:** "a" + "el" → "al"; "de" + "el" → "del". La comparación respeta tildes: "a" + "él" queda "a él" y "de" + "él" queda "de él".
- **Conjugar al tocar pronombre** (opción, apagada por defecto; ADR-007): si el último elemento de la barra es un pronombre personal, el verbo siguiente usa la forma concordante.
  - Verbos con `dativo = sí` (gustar, doler, tocar-turno): la app transforma "[pronombre] + verbo" en "a [pronombre tónico] + [clítico] + verbo": yo → "a mí me gusta", tú → "a ti te gusta", él → "a él le gusta", ella → "a ella le gusta", nosotros → "a nosotros nos gusta", ustedes/ellos → "a ellos les gusta".
- El texto mostrado y el pronunciado son siempre la forma elegida, nunca la raíz.

## Datos de prueba

Las pruebas usan fixtures propios en `app/src/morphology/__fixtures__/` con filas marcadas como aprobadas, para no depender del estado de revisión del contenido real. CA-11-01 es la única prueba contra el oráculo humano.

## Criterios de aceptación

- **CA-11-01** Para cada verbo del oráculo, todas las formas que genera el código coinciden con el oráculo. La prueba falla si el archivo del oráculo no existe o tiene menos de los 15 verbos mínimos (ver `contenido/oraculo/README.md`).
- **CA-11-02** Con el fixture de "querer" aprobado, la pulsación larga muestra "quiero, quieres, quiere, queremos, quieren, quise, quisiste, quiso, voy a querer, …" y elegir "quieres" la agrega y la pronuncia.
- **CA-11-03** "a" + "el" se muestra y pronuncia "al"; "a" + "él" se queda "a él".
- **CA-11-04** Con la opción de conjugar por pronombre activa, "ella" + "querer" produce "ella quiere" y "ella" + "gustar" produce "a ella le gusta"; con la opción apagada, el verbo usa su `forma_boton`.
- **CA-11-05** Un verbo sin filas aprobadas no muestra menú de formas (solo su `forma_boton`).
- **CA-11-06** "mío" ofrece "mía, míos, mías"; "bien" no ofrece "bueno" (es sinónimo, no forma).
- **CA-11-07** Con tiempo de permanencia de 1000 ms activo, mantener una celda 1100 ms la selecciona y no abre el menú; tocar la última palabra de la barra abre sus formas.
- **CA-11-08** Con perfil femenino, "Estoy {cansado|cansada}" se muestra y pronuncia "Estoy cansada".

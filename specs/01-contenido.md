# Spec 01 — Generador de contenido (tools/)

Depende de: `schemas/`, `contenido/vocabulario/`. Bloquea: 10, 11, 15.

## Objetivo

Convertir los CSV revisados por terapeutas en todo lo que la app y otras plataformas necesitan, con un solo comando: `npm run content:build`.

## Entradas

- `contenido/vocabulario/nucleo.csv`, `periferico.csv`, `frases_rapidas.csv`, `adulto_hospital.csv`, `verbos_formas_BORRADOR_IA.csv` (las formas solo se usan si `estado_revision = Aprobado`). `adulto_hospital.csv` puede no existir en el repositorio público (licencia de la fuente pendiente): el build lo omite sin error si falta.
- Columna `texto_voz` de `periferico.csv` (opcional): si tiene valor, la voz y el audio usan ese texto en lugar de `palabra` (p. ej., la letra B se dice "be").
- `contenido/layout/nucleo-layout.csv` (lo crea esta tarea a partir de la propuesta en la sección "Cuadrícula"): `id_palabra, fila, columna, nivel_visible`.

## Salidas (en `salida/`, ignorada por git)

1. `obz/saac-mx-nucleo.obz`: tableros OBF válidos (núcleo, una carpeta por categoría del periférico, frases rápidas) con `ext_saac_mx_*` (ver `schemas/obf-extensiones.md`).
2. `asterics/`: el mismo contenido importable en Asterics AAC (importa OBZ) más un TSV de formas de palabra con columnas valor, idioma (`es-mx`), etiquetas, base, pronunciación.
3. `audio/`: un archivo por etiqueta hablable, sintetizado con Piper `es_MX-ald-medium` (sherpa-onnx para Node), nombrado por hash del texto.
4. `pdf/`: tableros imprimibles (spec 15).
5. `pictos/`: solo los pictogramas usados, descargados de la API de ARASAAC por `busqueda_arasaac` y cacheados en `contenido/pictos-cache/` con su `arasaac_id`, autor y licencia.

## Cuadrícula del núcleo (reglas fijas; la disposición concreta se valida con terapeutas en T-04)

El núcleo tiene ~150 palabras y no cabe en una sola pantalla. Por eso:

1. **Layouts por clase de dispositivo.** Se definen dos layouts, cada uno fijo: `telefono` (5 columnas × 6 filas = 30 celdas por página; 5 × 64 px caben en 360 dp de ancho) y `tablet` (8 columnas × 6 filas = 48 celdas por página, propuesta). El perfil elige uno una vez; cambiarlo es una acción explícita con advertencia ("las palabras cambiarán de lugar").
2. **Páginas núcleo fijas.** Cada layout tiene una página de inicio y subpáginas núcleo fijas (p. ej. "Más verbos", "Descriptores", "Palabras pequeñas", "Números y colores") a las que se llega con botones de carpeta que también tienen posición fija.
3. **`nucleo-layout.csv`** tiene columnas `layout, id_palabra, pagina, fila, columna`. Cada palabra del núcleo tiene exactamente una posición por layout.
4. **Los niveles solo ocultan.** Nivel 1 muestra las palabras con `nivel = 1` (~20) y oculta el resto en su lugar definitivo; nunca cambia filas, columnas ni páginas.
5. **Distribución por columnas** según Fitzgerald (personas → verbos → descriptores → determinantes y preposiciones → sustantivos y carpetas), preguntas arriba y social abajo, en la medida en que la página lo permita.

## Criterios de aceptación

- **CA-01-01** `npm run content:check` falla si un CSV no cumple `schemas/vocabulario.schema.json` (columna faltante, id duplicado, nivel fuera de 1–3).
- **CA-01-02** `content:check` falla si un pictograma usado no tiene autor y licencia registrados.
- **CA-01-03** El OBZ generado es OBF válido y se lee con el parser de la herramienta sin pérdida (ida y vuelta dentro de `tools/`). La reimportación en la app se prueba en CA-13-01.
- **CA-01-04** El OBZ generado se importa en Asterics AAC (prueba manual, captura en el PR).
- **CA-01-05** Toda cadena hablable tiene archivo en `audio/`: (se usa `texto_voz` cuando existe) etiquetas y `forma_boton` del núcleo, todas las formas aprobadas (verbos, género y número), etiquetas del periférico, frases rápidas, módulo adulto, contracciones "al" y "del", y ambas formas de cada `{masculino|femenino}`. El build falla si falta una. Las filas con `plantilla = sí` se excluyen.
- **CA-01-09** `content:check` falla si un layout asigna más palabras que celdas, si una palabra del núcleo no tiene posición en cada layout o si dos palabras ocupan la misma celda.
- **CA-01-06** Las formas de un verbo solo se exportan si su fila tiene `estado_revision = Aprobado`; si no, el botón tiene solo su `forma_boton`.
- **CA-01-07** Ninguna celda cambia de `fila/columna` entre dos builds si no cambió `nucleo-layout.csv` (prueba de regresión con snapshot).
- **CA-01-08** El build completo corre sin red si `pictos-cache/` y el modelo Piper ya están descargados.

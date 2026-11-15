# Spec 10 — Tablero núcleo, carpetas y barra de mensaje

Depende de: 00, 01. Bloquea: 11, 12, 14.

## Objetivo

La pantalla principal: un tablero de vocabulario núcleo con posiciones fijas, carpetas de vocabulario periférico y una barra donde se construye la frase.

## Comportamiento

- Al tocar una palabra: se agrega a la barra y se pronuncia (configurable: "hablar al tocar" sí/no).
- Al tocar una carpeta: abre su tablero; un botón "Inicio" siempre visible regresa al núcleo en la misma posición.
- Barra de mensaje: muestra pictograma + texto de cada palabra; tocar la barra pronuncia la frase completa; botones "borrar última" y "borrar todo".
- Frases rápidas: una carpeta fija con mensajes completos (hoja `frases_rapidas`).
- Tamaños: filas × columnas fijas por layout del perfil (spec 01). El nivel solo cambia qué celdas están ocultas; las ocultas conservan su espacio y nunca colapsan.
- Páginas núcleo: la página de inicio y las subpáginas núcleo fijas (spec 01) se navegan con botones de posición fija.
- Búsqueda "¿Dónde está?": escribir o elegir una palabra muestra la ruta (núcleo o carpeta) y resalta el botón. Sirve para que el adulto modele.
- Color por tipo de palabra (Fitzgerald modificado) en el borde o fondo de la celda, activable en ajustes. Apagado por defecto en el layout de teléfono y encendido en tablet; la evidencia sugiere beneficio con unos 60 símbolos y posible efecto negativo en niños pequeños con pocas celdas (Thistle 2019; Light et al. 2019).
- Frase de la barra: se pronuncia con `SpeechService.speak` pasando la lista de segmentos (spec 00), para que funcione aunque solo haya audio pregenerado por palabra.

## Criterios de aceptación

- **CA-10-01** Tocar "quiero" y luego "comer" deja "quiero comer" en la barra y tocar la barra lo pronuncia completo.
- **CA-10-02** Ninguna celda cambia de posición al abrir y cerrar carpetas, cambiar de nivel o reiniciar la app (prueba e2e con coordenadas).
- **CA-10-03** "Inicio" está visible en todos los tableros y regresa al núcleo en un toque.
- **CA-10-04** "Borrar última" quita solo la última palabra; "borrar todo" vacía la barra.
- **CA-10-05** La búsqueda de "galleta" muestra "Comida › galleta" y resalta la celda al abrir la carpeta.
- **CA-10-06** Con "hablar al tocar" apagado, tocar una palabra la agrega sin sonido.
- **CA-10-07** El tablero responde al toque en ≤ 100 ms (feedback visual) en un Android de 2 GB (prueba manual).
- **CA-10-08** Funciona con la red desactivada desde el primer arranque tras instalar (e2e offline).

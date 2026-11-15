# Vocabulario (fuente de verdad)

Estos CSV son la única fuente de verdad del contenido. Se validan con `schemas/vocabulario.schema.json` y los revisan terapeutas mediante el Excel generado (spec 02). Las filas en estado `Aprobado` ya las revisó el equipo (v0.1). Las filas `Pendiente` se agregaron en la v0.2 (14 de noviembre de 2026) y esperan revisión.

| Archivo | Filas | Contenido |
|---|---|---|
| `nucleo.csv` | 152 (congelado, aprobado) | Vocabulario núcleo: pronombres, preguntas, determinantes, adverbios, adjetivos, preposiciones, social, números y verbos |
| `verbos_formas_BORRADOR_IA.csv` | 139 | V001 a V063 aprobados y copiados al oráculo (`../oraculo/`). V064 a V139: borrador generado con el conjugador verbecc, pendiente de verificación humana |
| `periferico.csv` | 999 | Vocabulario por categoría con léxico mexicano (269 aprobadas + 730 nuevas pendientes) |
| `frases_rapidas.csv` | 242 | Mensajes completos por función comunicativa (58 aprobadas + 184 nuevas pendientes; se quitó "No puedo respirar") |
| `adulto_hospital.csv` | 67 | **No está en este repositorio**: se basa en un tablero cuya licencia no consta y no se distribuye hasta tener permiso. El build debe omitirlo si no existe |
| `lexico_es-ES_a_es-MX.csv` | 45 | Equivalencias para adaptar tableros de España |
| `comparativo_*.csv` | 36 / 23 | Universal Core y Banajee con su equivalente propuesto |

## Siglas de la columna `fuente`

- **SC**: Soto & Cooper (2021), vocabulario temprano en español para usuarios de SAAC (corpus cubano cruzado con el inventario MacArthur mexicano).
- **UC**: Universal Core de Project Core (UNC). La traducción al español es una propuesta propia, no oficial.
- **BAN**: Banajee et al. (2003), equivalente propuesto.
- **VT**: Van Tatenhove, listas First 10/20/30/50+, equivalente propuesto.
- **PRC**: PRC-Saltillo, 100 Frequently Used Core Words, equivalente propuesto.
- **MX**: propuesta del equipo para español de México.

## Convenciones

- `formas`: flexiones separadas por `, `. `sinonimos`: otras palabras, nunca se ofrecen como formas.
- `{cansado|cansada}`: se resuelve con el género del perfil.
- `plantilla = sí`: la familia completa el texto; no se sintetiza ni se busca pictograma.
- `dativo = sí`: verbos como gustar o doler.
- `nivel`: 1 = primeras ~20 palabras; 2 = ampliación; 3 = completo (propuesta).

## Qué trae la v0.2

Todo lo nuevo está en `periferico.csv`, en carpetas (categorías), y no en `nucleo.csv`. El núcleo sigue en 152 palabras para que la cuadrícula fija y los niveles no cambien (spec 01).

| Categoría nueva o ampliada | Filas nuevas |
|---|---|
| Preposiciones (todas las del español más locuciones como "encima de") | 33 |
| Números (6 a 100; el 1 al 5 están en el núcleo) | 95 |
| Abecedario (27 letras) | 27 |
| Sentimientos (incluye miedo y amor) | 26 |
| Frutas, Verduras, Comida, Bebidas | 28, 26, 53, 10 |
| Cuerpo, Órganos, Cuerpo íntimo | 37, 23, 7 |
| Ropa, Casa y objetos | 32, 68 |
| Animales del mar, de la selva, de granja, domésticos | 22, 22, 14, 13 |
| Rutinas (ir a la escuela, cepillarse los dientes, etc.) | 45 |
| Profesiones | 54 |
| Clima y exterior (nube, nublado, relámpago, trueno) | 4 |
| Necesidades básicas | 17 |
| Verbos: aprender, mover, estar, amar (cada uno con sus formas en `verbos_formas`) | 20, 23, 11, 20 |

## Funciones comunicativas

La columna `funcion` de `frases_rapidas.csv` ahora tiene 13 valores. Los ocho originales más cinco nuevos:

| Función | Para qué sirve |
|---|---|
| social | Saludar, despedirse, agradecer, felicitar, expresar cariño |
| pedir | Pedir objetos, acciones, ayuda o tiempo |
| rechazar | Decir que no, parar, protestar |
| comentar | Describir lo que se ve, pasa o se siente alrededor |
| preguntar | Obtener información o permiso |
| sentimiento/estado | Decir cómo se siente o qué le pasa al cuerpo |
| reparar | Corregir un malentendido, pedir más tiempo, explicar el comunicador |
| urgente | Pedir ayuda inmediata |
| responder (nueva) | Contestar preguntas: no sé, tal vez, ahorita |
| elegir (nueva) | Escoger entre opciones |
| llamar la atención (nueva) | Iniciar la comunicación: oye, mírame, escúchame |
| opinar (nueva) | Estar o no de acuerdo, preferir |
| narrar (nueva) | Contar lo que pasó o pasará (con plantillas `___`) |

## Decisiones que quedan para las terapeutas

- **Cuerpo íntimo** (pene, vagina, vulva, testículos, ano, senos, trasero): son términos anatómicos útiles para higiene, salud y para que una persona pueda reportar dolor o abuso. Cada perfil decide si los muestra.
- **Preposiciones**: están en una carpeta, no en el núcleo. Si algunas (por, sobre, hasta, desde) deben vivir en la página núcleo "Palabras pequeñas", se mueven al núcleo y T-04 ajusta la cuadrícula.
- **Abecedario**: la columna nueva `texto_voz` dice lo que habla la voz (la letra B se dice "be"). El generador debe usarla cuando exista.
- **Números**: 6 a 100 escritos con letra; el botón puede mostrar el numeral.
- **Animales**: las 21 palabras de la categoría "Animales" original no se reclasificaron; las nuevas van en categorías por hábitat.
- "cepillarse los dientes" es sinónimo de "lavarse los dientes" (ya aprobado); decidir si se deja uno solo.

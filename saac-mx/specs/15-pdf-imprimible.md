# Spec 15 — Tableros imprimibles (PDF)

Depende de: 01 (generación en build) y 10 (generación desde la app).

## Objetivo

Respaldo de baja tecnología: si se acaba la batería, se moja el teléfono o se pierde, el usuario sigue comunicándose con el tablero en papel. También sirve para barrido asistido por el interlocutor.

## Comportamiento

- Generar PDF del núcleo (nivel actual) y de cada carpeta, en tamaño carta, con la misma disposición y colores que la pantalla.
- Opción de incluir el tablero hospitalario (`adulto_hospital.csv`, secciones de necesidades, síntomas, dolor y respuestas).
- Pie de página con atribución de ARASAAC y la fecha.

## Criterios de aceptación

- **CA-15-01** El PDF del núcleo tiene las celdas visibles en la misma página, fila y columna que el layout del perfil (spec 01).
- **CA-15-02** Se genera sin internet desde la app.
- **CA-15-03** Cada página lleva la atribución completa de los sets usados en ella. Para ARASAAC: "Pictogramas: Sergio Palao. Origen: ARASAAC (http://arasaac.org). Licencia: CC BY-NC-SA 4.0. Propiedad: Gobierno de Aragón (España)". Para Mulberry u OpenMoji, su autor y licencia según `ATRIBUCIONES.md`.
- **CA-15-04** Las secciones "Necesidades en hospital", "Síntomas", "Escala de dolor" y "Respuestas" de `adulto_hospital.csv` caben en una hoja carta legible a 50 cm (celdas de al menos 3 × 3 cm).

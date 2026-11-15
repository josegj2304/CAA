# Spec 02 — Flujo de revisión de vocabulario por terapeutas

Depende de: 01.

## Objetivo

Que una terapeuta revise el vocabulario en Excel sin romper los CSV, y que su revisión vuelva al repositorio sin perder tildes ni cambiar otras columnas.

## Comandos

- `npm run content:review` → genera `revision/vocabulario-AAAA-MM-DD.xlsx` (una hoja por CSV, columnas de revisión en amarillo, lista desplegable en `estado_revision`: Pendiente, Aprobado, Cambiar, Eliminar). El formato de referencia es `Vocabulario_SAAC_es-MX_v0.1.xlsx`.
- `npm run content:import-review <archivo.xlsx>` → actualiza en los CSV solo `estado_revision`, `revisor` y `comentario_terapeuta`, emparejando por `id`.

## Criterios de aceptación

- **CA-02-01** Importar un Excel donde alguien editó otra columna (p. ej. `palabra`) no cambia esa columna en el CSV y muestra un aviso con los ids afectados.
- **CA-02-02** Importar conserva tildes y ñ (prueba con "niño", "¿qué?", "jitomate").
- **CA-02-03** Un id del Excel que no existe en el CSV se reporta y no se agrega.
- **CA-02-04** Filas con `Cambiar` o `Eliminar` aparecen en un reporte `revision/pendientes.md` para que José decida; la herramienta nunca borra filas sola.

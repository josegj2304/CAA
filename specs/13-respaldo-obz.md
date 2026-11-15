# Spec 13 — Respaldo e intercambio OBZ

Depende de: 10, 12.

## Objetivo

Que perder o cambiar el teléfono no signifique perder el tablero, sin usar la nube.

## Comportamiento

- **Exportar** el perfil completo a `.obz` (tableros, imágenes, audios grabados, ajustes en `ext_saac_mx_ajustes`), y compartirlo con la hoja de compartir del sistema (WhatsApp, correo, Drive del usuario).
- **Importar** un `.obz` propio o de otra app (Cboard, Asterics AAC, CoughDrop). Si viene de otra app, se importa como carpeta nueva sin tocar el núcleo.
- **Recordatorio** de respaldo cada 30 días o tras 20 cambios (no bloqueante).
- Pedir almacenamiento persistente (`navigator.storage.persist()`) al primer arranque.

## Criterios de aceptación

- **CA-13-01** Exportar y reimportar un perfil da un modelo idéntico (ida y vuelta, incluye fotos y audios).
- **CA-13-02** Se importan sin error los archivos de `fixtures/` (exportaciones reales de Cboard y Asterics AAC); lo que no se entienda se conserva en `ext_*` y se reporta.
- **CA-13-03** Importar un OBZ externo nunca modifica la posición de celdas del núcleo.
- **CA-13-04** El archivo exportado no incluye datos que no estén en el perfil (sin identificadores del dispositivo).

# Resultados de la prueba de voz (ADR-001)

Condiciones: modo avión, sin motor TTS del sistema (o deshabilitado), app recién reiniciada.

## Equipos

| # | Marca y modelo | RAM | Android | Versión de WebView | Arquitectura (arm64/arm32) | ¿Trae TTS? |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

## Mediciones

| Equipo | Prueba | p50 (ms) | p95 (ms) | Cierres / 300 | Tamaño APK (MB) | Notas |
|---|---|---|---|---|---|---|
| 1 | APK ejemplo sherpa-onnx, "quiero ir al parque mañana" (20) | | | | | |
| 1 | Plugin Capacitor, audio pregenerado, "más" (50 toques) | | | | | |
| 1 | Plugin Capacitor, Piper embebido, "quiero ir al parque mañana" (20) | | | | | |

Umbrales: pregenerado ≤ 300 ms p95; Piper ≤ 600 ms p95; 0 cierres en 300; APK ≤ 100 MB. Deben cumplirse en al menos 2 de 3 equipos.

## Decisión

(Escribir aquí el resultado y actualizar ADR-001.)

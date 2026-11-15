# Backlog

Tareas en orden. Cada una dura de medio día a dos días y apunta a criterios de aceptación concretos. Marca `[x]` al terminar y anota lo pendiente debajo.

## Semana 0 — sin código (José)

- [ ] T-00a Repositorio público en GitHub con este kit.
- [ ] T-00b 1–2 terapeutas aliadas confirmadas.
- [ ] T-00c Correo a ARASAAC pidiendo permiso escrito para empaquetado offline.
- [ ] T-00d 3 equipos Android de prueba (≤ 2 GB RAM, Android 8–10). Anotar marca, modelo, RAM, versión de Android, versión de Android System WebView y si traen motor de voz.
- [ ] T-00e Instalar en los 3 equipos el APK de ejemplo de sherpa-onnx con `es_MX-ald-medium` (verificar que existe en los releases de sherpa-onnx) y medir latencia y estabilidad en modo avión. Registrar en `docs/spike-voz/RESULTADOS.md`.
- [x] T-00f Oráculo creado con los 63 verbos de la v0.1, verificados por el equipo (14-nov-2026). Pendiente: verificar V064 a V139 (verbos nuevos) y pasarlos al oráculo.
- [ ] T-00g Exportar los fixtures OBZ de Cboard y Asterics AAC (instrucciones en `fixtures/README.md`).

## Semanas 1–5 — contenido y voz

- [ ] T-01 Andamiaje: Vite + Preact + TypeScript strict, ESLint, Vitest, Playwright, scripts de `CLAUDE.md`. (Sin funcionalidad.)
- [ ] T-02 `tools/content-check`: validar CSV contra `schemas/vocabulario.schema.json`. → CA-01-01
- [ ] T-03 `tools/pictos`: buscar y cachear pictogramas ARASAAC por `busqueda_arasaac`, guardar `arasaac_id`, autor y licencia. → CA-01-02
- [ ] T-04 Proponer `contenido/layout/nucleo-layout.csv` (layouts teléfono y tablet, páginas núcleo, niveles) para revisión de terapeutas. → CA-01-09, base de CA-01-07
- [ ] T-05 `tools/content-build`: CSV → OBZ (núcleo, carpetas, frases). → CA-01-03 (ida y vuelta en tools), CA-01-06, CA-01-07
- [ ] T-06 Audio pregenerado con Piper (sherpa-onnx Node). → CA-01-05, CA-01-08
- [ ] T-07 `tools/review`: exportar Excel e importar revisión. → CA-02-01 a CA-02-04
- [ ] T-08 Exportar contenido para Asterics AAC y probar importación (piloto de contenido). → CA-01-04
- [ ] T-09 `SpeechService` con cascada, concatenación y motores simulados. → CA-00-01, 02, 03, 07, 08, 09, 10, 11
- [ ] T-10 Proyecto Capacitor Android + plugin de voz (TTS del sistema + sherpa-onnx). → CA-00-04, 05, 06 (en dispositivo)

## Semana 6 — punto de decisión de voz

- [ ] T-11 Llenar `docs/spike-voz/RESULTADOS.md` y cerrar ADR-001 en `docs/decisiones.md`.

## Semanas 6–14 — app

- [ ] T-12 Almacenamiento local (Dexie), perfiles, `storage.persist()`.
- [ ] T-13 Tablero núcleo, páginas núcleo, carpetas, barra de mensaje, frases rápidas. → CA-10-01 a 04, 06, 07 (en dispositivo), 08
- [ ] T-14 Búsqueda "¿Dónde está?" y color Fitzgerald configurable. → CA-10-05
- [ ] T-15 Formas de palabra, contracciones, dativos y género del perfil. → CA-11-01 a 08
- [ ] T-16 Modo edición, foto, grabación, ocultar/mostrar, niveles, bloqueo, plantillas. → CA-12-01 a 08
- [ ] T-17 Exportar/importar OBZ con fixtures. → CA-13-01 a 04
- [ ] T-18 Ajustes de toque y fijación de pantalla. → CA-14-01 a 06
- [ ] T-19 PDF imprimible. → CA-15-01 a 04
- [ ] T-20 Asistente de primer uso, guía de modelado, modo modelar. → CA-16-01 a 05
- [ ] T-21 Pantalla Acerca de con atribuciones y aviso de privacidad.

## Semana 14 — corte de avance

- [ ] T-22 Contar criterios en verde. Si < 90 %, pausar la app y dedicar el esfuerzo al contenido en Asterics (ADR-000).

## Semanas 14–20 — piloto

- [ ] T-23 Prueba cerrada en Google Play (12+ testers, 14 días) con consentimiento por escrito de cada familia (`docs/legal/`).
- [ ] T-24 Encuesta semanal a familias y terapeutas; meta: ≥ 67 % de uso 3 días por semana en la semana 4.

## Revisión de contenido (reportes de Fable)

(Anotar aquí datos de vocabulario que parezcan incorrectos; no editar los CSV para que una prueba pase.)

- Decisiones de contenido pendientes de las terapeutas (v0.2): ver `contenido/vocabulario/LEEME.md`, sección "Decisiones que quedan para las terapeutas".

# CLAUDE.md — Reglas para el modelo que programa SAAC-MX

Lee este archivo completo antes de escribir código. En este proyecto trabajan tres papeles, cada uno en su propia sesión: **planificador** y **auditor** (Fable) y **constructor** (Opus o Sonnet). Si eres el constructor, el "tú" de este archivo eres tú. El ciclo completo está en `tasks/CICLO.md`.

Precedencia cuando dos documentos se contradicen: este archivo > `docs/decisiones.md` (ADR) > `specs/` > `docs/PRD.md`. Si encuentras una contradicción, sigue el de mayor precedencia y anótala en `tasks/BACKLOG.md` para que José la corrija.

## Qué es el proyecto

SAAC-MX es una app gratuita de comunicación aumentativa y alternativa (SAAC) en español de México. Una persona que no puede hablar toca pictogramas y la app habla por ella. La v1 es para niños con TEA o retraso del lenguaje que usan selección directa (tocan la pantalla). Corre en Android de gama baja sin internet.

Orden de lectura obligatorio: `docs/PRD.md` → `docs/decisiones.md` → la spec de la tarea en `specs/`. `docs/investigacion/` es referencia congelada y no normativa: no la uses como requisito.

## Stack fijo (no cambiar sin un ADR nuevo en docs/decisiones.md)

- TypeScript en modo `strict`. Sin `any` salvo en límites con librerías, comentado.
- Preact + Vite. Estado con señales de Preact o un store mínimo; nada de Redux.
- IndexedDB con Dexie para datos locales. `navigator.storage.persist()` al primer arranque.
- PWA con service worker (vite-plugin-pwa / Workbox). Todo el contenido necesario para hablar se precachea.
- Android con Capacitor. La voz nativa vive en un plugin local en `app/android-plugins/voz/` (Kotlin).
- Pruebas: Vitest (unidad), Playwright (e2e en Chromium con modo offline).
- Compatibilidad: el WebView de Android 8 puede ser antiguo si no se actualizó. Configura el `build.target` de Vite (o `@vitejs/plugin-legacy`) para el WebView mínimo que se registre en `docs/spike-voz/RESULTADOS.md`, y verifica la versión mínima de Android que soporta la versión de Capacitor elegida.
- Herramientas de contenido (`tools/`): TypeScript ejecutado con Node LTS (tsx). Mismo lenguaje que la app.
- Fija versiones exactas en `package.json`. Usa versiones estables vigentes; no inventes números de versión: consúltalos con `npm view`.

## Prohibido

1. Red en el camino crítico. Tocar un botón y oír la voz nunca puede depender de internet.
2. Analítica, telemetría, crash reporting remoto, anuncios, compras dentro de la app, cuentas de usuario o backend. La app no envía datos del usuario a ningún servidor. Única excepción de red: la descarga opcional, iniciada por el usuario, del modelo de voz Piper desde una URL fija con verificación SHA-256 (spec 00). Nada más se descarga en tiempo de ejecución.
3. Llamadas a APIs de IA o de voz en la nube desde la app.
4. Mover la posición de un botón existente como efecto secundario de otra función. Las posiciones fijas son un requisito clínico (planificación motora). Crecer el vocabulario = mostrar botones ocultos, no reacomodar.
5. Editar `contenido/oraculo/`. Ese oráculo de conjugaciones lo escribe una persona; tú solo lo lees en las pruebas.
6. Editar los CSV de `contenido/vocabulario/` para que una prueba pase. Si un dato parece incorrecto, repórtalo en `tasks/BACKLOG.md` como "Revisión de contenido".
7. Dependencias de código nuevas sin anotarlas en `docs/decisiones.md` con su licencia. Solo licencias compatibles con GPL-3.0: MIT, BSD, ISC, Apache-2.0, LGPL, GPL-2.0-or-later o GPL-3.0 (no GPL-2.0-only). Pictogramas y voces siguen sus propias licencias, listadas en `ATRIBUCIONES.md`.
8. Textos de interfaz fuera de `app/src/i18n/es-MX.ts`. Todo texto visible está en español de México (ustedes, no vosotros; "prender", no "encender").

## Convenciones

- Código, nombres de archivos y comentarios técnicos en inglés; textos de interfaz y documentación en español.
- Un módulo por spec. Estructura en `app/src/`: `board/`, `speech/`, `morphology/`, `editor/`, `storage/`, `backup/`, `access/`, `print/`, `onboarding/`, `i18n/`.
- La capa de voz se usa siempre a través de la interfaz `SpeechService` (spec 00). Ningún componente llama directo a `speechSynthesis` ni al plugin.
- Los datos de tableros siguen `schemas/` y se exportan a OBF/OBZ (spec 13).

## Definición de terminado (para cada tarea)

Una tarea está terminada solo si:

1. Cada criterio de aceptación `CA-xx-nn` de su spec tiene una prueba automática que pasa, o una prueba manual descrita paso a paso en el PR cuando no se puede automatizar (p. ej., latencia en dispositivo real).
2. `npm run typecheck`, `npm run lint` y `npm test` pasan sin errores.
3. La prueba e2e offline pasa: con la red desactivada, la app arranca y habla.
4. No agregaste nada de la lista "Prohibido".
5. Escribiste `tasks/informe/T-XX.md` con la plantilla de `tasks/plantillas/informe.md`.
6. `tasks/auditoria/T-XX.md` dice "Aprobada". Hasta entonces la tarea no está terminada: el constructor no marca `[x]` en `tasks/BACKLOG.md`, lo marca José. El constructor anota en el backlog solo lo que quedó pendiente.

Nunca digas que algo funciona en un dispositivo si no se probó en uno: escribe "probado en emulador" o "pendiente de probar en dispositivo".

## Comandos

```
npm install
npm run dev            # app web en desarrollo
npm run build          # PWA en dist/
npm test               # Vitest
npm run test:e2e       # Playwright (incluye modo offline)
npm run typecheck
npm run lint
npm run content:build  # CSV -> tableros OBZ, PDF, audio pregenerado (tools/)
npm run content:check  # valida CSV contra schemas/ y atribuciones
npx cap sync android   # copia la PWA al proyecto Android
```

Estos scripts no existen todavía: créalos en la primera tarea que los necesite y mantén esta lista al día.

## Ciclo plan → construcción → auditoría

- No empieces una tarea sin `tasks/plan/T-XX.md`. Si no existe, detente y dilo.
- Construye solo lo que dice la ficha. Si necesitas algo fuera del alcance, anótalo en el informe como propuesta; no lo hagas.
- No modifiques `tasks/plan/` ni `tasks/auditoria/`. Son del planificador y del auditor.
- Si la ficha contradice este archivo, un ADR o un spec, sigue la precedencia de arriba y repórtalo en el informe.
- Un commit por tarea, con el mensaje `T-XX: <título>`, para que el auditor pueda revisar un diff limpio.

## Cómo trabajar con José

José no es desarrollador senior. Cuando termines una tarea:

- Explica en 3 a 5 líneas, sin jerga, qué cambió y cómo probarlo en su teléfono.
- Si necesitas una decisión, ofrece 2 o 3 opciones con tu recomendación.
- Si algo falló, dilo claramente y no lo escondas detrás de un "casi listo".

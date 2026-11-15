# LEEME, José

Este repositorio es el kit para construir SAAC-MX. Fable planea y audita; Opus o Sonnet construye. El flujo está en `tasks/CICLO.md`. Aquí está todo lo que el modelo necesita para programar, y lo que tú necesitas para dirigirlo y revisar su trabajo.

## Qué hay en cada carpeta

| Carpeta o archivo | Para quién | Qué es |
|---|---|---|
| `CLAUDE.md` | Fable | Reglas del proyecto. Fable lo lee primero. |
| `docs/PRD.md` | Tú y terapeutas | Qué construimos, para quién y qué queda fuera. |
| `docs/decisiones.md` | Tú y Fable | Decisiones tomadas y por qué (incluye el fallo de la mesa de expertos). |
| `specs/` | Fable | Una especificación por módulo, con criterios de aceptación. |
| `contenido/vocabulario/` | Terapeutas y Fable | Vocabulario en CSV. Es la fuente de verdad. |
| `contenido/oraculo/` | Una persona (no Fable) | Conjugaciones verificadas a mano para probar el código. |
| `schemas/` | Fable | Formato exacto de los datos. |
| `tasks/BACKLOG.md` | Tú y Fable | Lista de tareas en orden. |
| `docs/legal/` | Tú | Borradores de aviso de privacidad y consentimiento del piloto. Deben revisarlos un abogado. |
| `docs/investigacion/` | Referencia | La investigación original y el debate. Congelada. |

## Antes de que Fable escriba código (semana 0)

1. Crea un repositorio en GitHub (público) y sube esta carpeta.
2. Consigue 1 o 2 terapeutas de lenguaje aliadas (CRIT, CAM, USAER o consulta privada). Sin ellas no hay piloto.
3. Escribe a ARASAAC (formulario de contacto de su web) pidiendo confirmación por escrito de que pueden empaquetarse sus pictogramas offline dentro de una app gratuita, sin anuncios, con licencia GPL. Guarda la respuesta en `docs/legal/`.
4. Consigue 3 teléfonos o tablets Android baratos (2 GB de RAM o menos, Android 8 a 10). Prestados sirve. Son para la prueba de voz.
5. El oráculo ya tiene los 63 verbos verificados. Los verbos nuevos (V064 en adelante) hay que verificarlos antes de pasarlos a `contenido/oraculo/`.

## Cómo pedirle trabajo a Fable

Abre una sesión en el repositorio y pide una tarea a la vez, por su número:

> Lee CLAUDE.md y haz la tarea T-03 de tasks/BACKLOG.md. Al terminar, explícame cómo probarla en mi teléfono.

No le pidas "haz la app". Las tareas pequeñas con criterios claros son las que salen bien.

## Cómo revisar lo que hizo

1. Pide que te muestre qué pruebas corrió y si pasaron.
2. Prueba tú mismo en el teléfono lo que dice la tarea (Fable te dirá cómo).
3. Prueba siempre en modo avión: si no habla sin internet, no está terminado.
4. Si algo no te convence, dilo con un ejemplo concreto ("toqué 'quiero' y dijo 'quiere'").

## Cómo probar en un teléfono Android

1. Activa el modo desarrollador del teléfono (toca 7 veces "Número de compilación" en Ajustes > Acerca del teléfono) y luego "Depuración USB".
2. Instala Android Studio en tu computadora.
3. Pide a Fable: "genera el APK de depuración y dime cómo instalarlo". Normalmente es `npx cap run android` con el teléfono conectado por USB.

## Cómo revisan el vocabulario las terapeutas

Genera el Excel con `npm run content:review` (Fable creará ese comando) o usa `Vocabulario_SAAC_es-MX_v0.2.xlsx`. La terapeuta llena solo las columnas amarillas. Luego `npm run content:import-review archivo.xlsx` toma solo esas columnas y actualiza los CSV. No guardes el Excel como CSV: daña las tildes.

## Puntos de decisión (no los saltes)

- **Semana 6 — voz:** con los resultados de la prueba en los 3 equipos, se decide la voz (ver ADR-001 en `docs/decisiones.md`).
- **Semana 14 — avance:** si menos del 90 % de los criterios de aceptación están en verde, se pausa la app y se dedica el esfuerzo al contenido en Asterics AAC.
- **Semana 20 — piloto:** éxito = al menos 67 % de las familias usan la app 3 días por semana en la cuarta semana.

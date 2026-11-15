# Spec 16 — Primer uso guiado y guía de modelado

Depende de: 00, 10, 12.

## Objetivo

Que una familia sin formación técnica deje la app lista en menos de 10 minutos y sepa cómo enseñarla. El interlocutor es el factor que más influye en el uso real (Baxter et al. 2012), y el modelado es la intervención con mejor evidencia (Sennott et al. 2016; Biggs et al. 2018).

## Comportamiento

1. **Asistente de primer uso:** nombre y género del usuario → prueba de voz (spec 00: detecta caída a inglés y ofrece abrir ajustes de voz o descargar la voz embebida) → nivel inicial (recomendado: 1) → ajustes de toque básicos → fijación de pantalla (explicada) → recordatorio de respaldo.
2. **Guía de modelado** (5 pantallas, lenguaje llano, sin jerga): "Habla y toca al mismo tiempo"; "No le pidas que repita: muéstrale"; "Usa el tablero en la comida, el juego y el baño"; "Espera unos segundos después de modelar"; "La SAAC no le quita el habla" (Millar, Light & Schlosser 2006).
3. **Modo modelar:** un interruptor que hace que los toques del adulto se pronuncien pero no se agreguen a la barra del usuario.
4. Mensaje inicial claro: la app no sustituye la evaluación de una terapeuta de lenguaje.

## Criterios de aceptación

- **CA-16-01** Un adulto que no conoce la app completa el asistente en ≤ 10 minutos (prueba con 3 personas, registrar tiempos en el PR).
- **CA-16-02** Si la prueba de voz detecta inglés, el asistente ofrece las dos soluciones y no deja terminar sin una voz que funcione (grabada, pregenerada o embebida).
- **CA-16-03** La guía de modelado se puede volver a abrir desde Ajustes.
- **CA-16-04** En modo modelar, los toques suenan pero la barra del usuario no cambia.
- **CA-16-05** Ningún texto del asistente usa términos técnicos sin explicar (revisión por una terapeuta).

# PRD — SAAC-MX v1

Versión 0.1 · 10 de noviembre de 2026 · Responsable: José

## 1. Problema

En México unas 945 mil personas tienen dificultad para hablar o comunicarse (INEGI, Censo 2020). El software SAAC de calidad cuesta unos US$300 (Proloquo2Go, TouchChat, LAMP) o US$9.99 al mes (voz de TD Snap), casi siempre solo en iPad, mientras que Android concentra el 74 % del tráfico web móvil en México (StatCounter, octubre 2026). Las alternativas gratuitas más fuertes (Asterics AAC, Cboard) usan español de España, no traen gramática cargada y su voz falla sin internet en Android barato.

## 2. Objetivo de la v1

Una app gratuita que permita a un niño con TEA o retraso del lenguaje comunicarse con un vocabulario núcleo en español de México, con voz que funcione sin internet en un Android de 2 GB de RAM.

Métricas de éxito del piloto (prueba cerrada en Play, 12+ familias, 4 semanas):

- Al menos 67 % de las familias usan la app 3 días por semana en la semana 4 (el abandono típico ronda un tercio).
- 0 reportes de "no habló" en modo avión con la voz configurada.
- Terapeutas aprueban el vocabulario núcleo (estado "Aprobado" en al menos 90 % de las filas de nivel 1 y 2).

## 3. Usuarios

| Rol | Descripción | Qué necesita |
|---|---|---|
| Usuario de SAAC (v1) | Niño de 2 a 10 años con TEA o retraso del lenguaje; toca la pantalla con el dedo | Botones grandes, voz inmediata, palabras en el mismo lugar siempre |
| Familia | Madre, padre o cuidador; poco tiempo, sin formación técnica | Configurar en minutos, agregar fotos y su voz, saber cómo modelar |
| Terapeuta | Logopeda o maestra de educación especial (CRIT, CAM, USAER) | Ajustar niveles, ocultar o mostrar palabras, imprimir tableros |

Fuera de la v1 (con ruta): usuarios de barrido con switch (v1.1; mientras tanto, Asterics AAC con el mismo contenido) y adultos con afasia, ELA o ACV (v2; mientras tanto, tablero hospitalario imprimible).

## 4. Alcance

### Entra en v1

| # | Función | Spec |
|---|---|---|
| 1 | Capa de voz en cascada (grabada, pregenerada, sistema verificada, Piper) | 00 |
| 2 | Contenido es-MX generado desde CSV (tableros OBZ, audio pregenerado, PDF) | 01, 02 |
| 3 | Tablero núcleo con posiciones fijas, carpetas, barra de mensaje | 10 |
| 4 | Formas de palabra (pulsación larga), verbos ya conjugados, género y número; conjugación al tocar pronombre como opción apagada por defecto (ADR-007) | 11 |
| 5 | Edición: foto con cámara, grabar voz por botón, ocultar/mostrar, niveles, bloqueo de edición (gesto + contraseña opcional) | 12 |
| 6 | Respaldo e intercambio en OBZ | 13 |
| 7 | Ajustes de toque (permanencia, activar al soltar, ignorar repetidos) y fijación de pantalla | 14 |
| 8 | Tableros imprimibles en PDF | 15 |
| 9 | Primer uso guiado y guía de modelado para familias | 16 |

### Fuera de v1

Barrido con switch y barrido auditivo (v1.1) · teclado con predicción (v1.1) · escenas visuales, módulo de afasia y ELA, banco de voz, señal de ayuda, agenda visual (v2) · seguimiento ocular, sincronización en la nube, edición remota, registro de uso, IA, iOS nativo (fuera; iOS usa la PWA).

## 5. Requisitos no funcionales

| Requisito | Meta medible |
|---|---|
| Offline | Arranca y habla con la red desactivada desde el primer uso tras la instalación |
| Latencia de voz | p95 del toque al inicio del audio ≤ 300 ms con audio pregenerado y ≤ 600 ms con Piper, en un Android de 2 GB |
| Dispositivo mínimo | Android 8, 2 GB de RAM, pantalla de 5.5" (teléfono) o 7" (tablet) |
| Tamaño | APK ≤ 100 MB; si la voz Piper no cabe, se descarga aparte en el primer uso |
| Estabilidad | 0 cierres en 300 locuciones seguidas |
| Accesibilidad | WCAG 2.2 AA en pantallas de configuración; celdas del tablero de al menos 64 × 64 px en teléfono (layout de 5 columnas) |
| Privacidad | Ningún dato sale del dispositivo; sin cuentas ni analítica |
| Licencia | GPL-3.0; atribuciones visibles en Ajustes > Acerca de |

## 6. Principios clínicos que el producto no puede romper

1. Las palabras no cambian de lugar. Crecer = mostrar botones ocultos.
2. Cada toque da retroalimentación auditiva (configurable).
3. El español no se traduce del inglés: verbos conjugados, género, número, sujeto omitido (Soto & Cooper 2021).
4. El interlocutor importa más que el software: la app enseña a modelar.
5. Siempre hay respaldo en papel (PDF).

## 7. Riesgos y preguntas abiertas

- ¿Funciona la voz es-MX del sistema sin internet una vez descargada? No verificado: se mide en la semana 6.
- ¿ARASAAC permite empaquetar sus pictogramas offline? Pendiente de respuesta escrita.
- ¿Existe una organización (A.C.) que publique la app? Sin ella, la cuenta de Play es personal y exige prueba cerrada de 12 testers durante 14 días.
- ¿COFEPRIS considera la app dispositivo médico? No verificado: no hacer afirmaciones terapéuticas.
- El vocabulario mezcla un corpus cubano con el inventario mexicano: revisión por terapeutas obligatoria.

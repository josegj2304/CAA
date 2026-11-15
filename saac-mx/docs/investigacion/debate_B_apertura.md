# Alegato de apertura del Arquitecto B: núcleo web propio (TypeScript + Capacitor) sobre estándares abiertos

## 1. Postura

Propongo un núcleo nuevo en **TypeScript (Preact, Vite, Dexie, Workbox)**, offline-first, cuyo modelo se serializa sin pérdida a **OBF/OBZ**. Se publica como **PWA** y como **APK con Capacitor**, con plugins nativos de voz (TTS del sistema + Piper es_MX sobre sherpa-onnx) y de fijación de pantalla. Reutilizamos estándares y contenido (ARASAAC, Mulberry, OBF), no el código de Asterics ni de Cboard.

**A1. El hueco crítico es la voz, y se resuelve en nativo.** El WebView de Android no tiene `speechSynthesis` (r4 §2.1). Según ARASAAC, "la mayoría de las tablets Android no traen motor TTS", y One UI 7 bloquea las voces de Samsung para otras apps. Sin voz offline, Asterics usa ResponsiveVoice en línea, con retrasos de 5 s o más (r2, Tabla A). Ninguna base existente trae voz es-MX embebida, así que habría que escribirla en cualquier opción. Capacitor lo resuelve con `@capacitor-community/text-to-speech` (MIT) y un plugin Kotlin sobre sherpa-onnx con `es_MX-ald-medium` (63.2 MB; r4 §2.2). Si lo difícil cuesta lo mismo en todas las opciones, mejor hacerlo sobre una base moderna.

**A2. Viable para José con una IA.** Forkear Asterics es heredar Vue 2.7 (sin soporte), jQuery, 10,689 commits y un bus factor de 1 (82 % de los commits de una persona). Forkear Cboard es heredar React 17, MUI v4, un backend de MongoDB, Azure y OpenAI, y una monetización que hay que quitar (r2 §7.1). En ambos casos, la primera tarea sería migrar el stack: casi reescribir, pero sin entender el código. TS/React es donde la IA rinde más (r4 §4.2, interpretación), y un núcleo acotado cabe en su contexto.

**A3. El español de México como dato de primera clase.** Los tres comunicadores en español de Grid traen **0 formas de palabra** y léxico peninsular ("zumo" 3, "jugo" 0). Cboard no tiene morfología (r2 §5). Nuestro esquema separa la etiqueta es-MX del ID del pictograma (r4 §1.1) y guarda conjugación, género, número y diminutivo en campos `ext_saac_mx_*`, según Soto & Cooper 2021: 218 palabras, 47 verbos, sin forzar "yo + verbo" (r3 B2.1).

**A4. Distribución y privacidad.** En México, Android tiene el 74 % y las familias buscan en Play Store, donde Asterics no está. Una sola build va a Play (US$25 una vez) y a una PWA para iOS. Sin backend ni analítica (Cboard usa Application Insights, GA y AdSense) no tratamos datos de salud, que la LFPDPPP 2025 clasifica como sensibles (r4 §6.2). Operar cuesta unos US$0.

**A5. Interoperar, no fragmentar.** Lo que une al ecosistema es el formato y el contenido, no el código. Habrá importación y exportación OBZ desde la v1, con pruebas de ida y vuelta contra exportaciones reales de Cboard y Grid. El comunicador es-MX se publica como OBZ para que Grid y Cboard lo usen. La licencia GPLv3 es coherente con espeak-ng, que usa Piper.

## 2. Debilidades y mitigación

- **Duplicamos años de trabajo:** tendríamos peor acceso motor durante 2 o 3 años (r2 §6). No competimos como plataforma general. Quien necesite mirada o Huffman va a Asterics o a Switch Access, donde nuestro OBZ se abre.
- **El barrido y la gramática son difíciles.** El barrido es una máquina de estados determinista que se prueba con temporizadores simulados. La v1 solo hace barrido lineal, fila-columna y auditivo, con 1 o 2 switches leídos como `keydown`. Sin generación de lenguaje natural: formas precalculadas que revisan terapeutas, pulsación larga como Proloquo2Go y conjugación al elegir el pronombre como WordPower (r1).
- **Capacitor no resuelve la voz solo.** Hay que mantener un plugin Kotlin propio, declarar el servicio TTS en `<queries>` (Android 11+) y tener un asistente que detecte si la voz cae al inglés. Es el **mayor riesgo técnico**, por eso va primero.
- **Mantenimiento a 3 años con un junior + IA.** Pocas dependencias y ningún servidor; la tarea recurrente es actualizar Capacitor y Gradle. CLAUDE.md, los ADR y las pruebas son la red de seguridad. El bus factor sigue siendo 1, igual que en Asterics; lo mitigamos con todo público en GitHub.
- **Criterio de abandono:** si la voz embebida falla en una tablet de 2 GB, mi postura pierde su ventaja principal y propongo pivotar a contenido es-MX dentro de Asterics, empaquetado como TWA.

## 3. Pregunta 2: kit de arranque de repositorio

```
CLAUDE.md             reglas para Fable; terminado = criterios en verde
README.md             para José: correr y probar en tablet
docs/00-alcance.md    usuarios v1 y lo que queda fuera
docs/01-clinica.md    principios de r3 → requisitos
docs/02-arquitectura.md, docs/adr/
docs/legal/           atribución ARASAAC, aviso de privacidad
docs/investigacion/   r1–r4 (referencia)
specs/M01-datos-obf.md … M09-modelado.md
schemas/*.schema.json
data/vocab/*.csv      editable por terapeutas (Excel)
fixtures/*.obz        exportaciones de Cboard y Grid
tasks/BACKLOG.md      tareas de un día ligadas a criterios
```

Cada spec trae objetivo, lo que queda fuera, interfaz TS y criterios **CA-Mxx-nn** (Dado/Cuando/Entonces) con su prueba. Por ejemplo:
- CA-M03-04: en modo avión y sin TTS del sistema, "quiero" suena en menos de 600 ms en una tablet de 2 GB.
- CA-M07-01: exportar y reimportar un tablero da un JSON idéntico.

Un script valida los CSV y genera los `.obf`; la CI falla si falta un pictograma o su atribución.

## 4. Plan de la v1 (TEA o retraso del lenguaje; parálisis cerebral con switch)

1. **H0 (semanas 1–2):** pruebas de riesgo de Capacitor + Piper en una tablet barata, con latencia y `storage.persist()`. Consulta escrita a ARASAAC.
2. **H1 (semanas 3–8):** tablero es-MX con posiciones fijas (Soto & Cooper + Universal Core), barra de frase, editor con foto y grabación, y respaldo OBZ.
3. **H2 (semanas 9–14):** barrido, formas de palabra, fijación de pantalla y PDF imprimible.
4. **H3 (semanas 15–20):** piloto con 5 a 10 usuarios (CAM, USAER, CRIT), tutorial de modelado y prueba cerrada en Play (12 testers durante 14 días si la cuenta es personal; r4 §7).
5. **Después:** módulo de adultos (afasia, ELA) e iOS nativo.

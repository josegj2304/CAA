# Alternativas SAAC gratuitas y de bajo costo: panorama hispanohablante con foco en México

**Fecha de corte:** 10 de noviembre de 2026
**Pregunta:** ¿Qué alternativas SAAC gratuitas o baratas existen en español (sobre todo para México), qué tan buenas son, qué hueco dejan, y conviene construir desde cero o contribuir/forkear Cboard o AsTeRICS Grid?

**Convenciones**
- **[NV]** = no verificado en esta investigación (el dato viene de memoria previa, de una fuente secundaria ambigua, o la página no lo decía).
- **[código]** = verificado leyendo el código fuente clonado de GitHub (commit indicado).
- Los precios de App Store son de la tienda indicada (US, GB o MX) y pueden variar por país.
- **Límite de búsqueda:** se agotó el presupuesto de búsquedas web antes de terminar. Varias apps de la lista original (CPA, InTIC, Tico como app independiente, SPQR, Habla Fácil, Hablando con Nuevos Amigos, Weavly, Speak4Me, Matraquina) e instituciones mexicanas (Teletón/CRIT, DIF, CONADIS, Tec de Monterrey) quedaron **sin verificar o sin encontrar**. Ver §10.

---

## 0. Resumen ejecutivo

1. **Ya existen dos plataformas SAAC gratuitas, de código abierto, maduras y muy activas: Asterics AAC (antes "AsTeRICS Grid") y Cboard.** En los últimos 12 meses tienen 546 y 687 commits [código]; la última versión de Asterics AAC salió el 21-oct-2026 y el último commit de Cboard es del 29-oct-2026. Las dos importan y exportan Open Board Format (OBF/OBZ), tienen barrido, TTS, ARASAAC e interfaz en español.
2. **Asterics AAC es la más cercana a "gratis de verdad y casi completa"**: AGPL-3.0, sin anuncios ni suscripciones, offline-first (PWA), el abanico de acceso más amplio del ecosistema gratuito (barrido por filas/columnas o binario, secuencial, direccional, Huffman, hover, conmutadores, y mirada/cabeza/EMG vía AsTeRICS Framework), predicción de palabras con diccionario en español, "formas de palabra" para flexión, y comunicadores robustos de ARASAAC en español. **Sus huecos son reales**: no está en Google Play ni en App Store (solo PWA), los comunicadores en español usan léxico de España ("zumo", "patatas", "ordenador", "coche", "vosotros") y traen **0 formas de palabra** (no hay conjugación ni concordancia lista para usar) [código], y casi todo el desarrollo depende de una persona (~82 % de los commits del último año).
3. **Cboard es más pulida y está en todas las tiendas**, pero es *freemium*: suscripción Pro de 8 USD/mes o 79 USD/año, funciones premium (voces en la nube, grabar voz por celda, copiar o compartir tableros, analíticas, "mejorar frase" con IA) y anuncios AdSense en la pantalla de Ajustes de la versión web [código]. **En México hoy las funciones premium están desbloqueadas**: México no figura en la lista de 51 países que exigen premium [código, solo cliente]. Pero esa es una decisión comercial reversible y no una garantía. No tiene gramática propia, el idioma es `es-ES` (no hay `es-MX`) y depende de un backend pesado (MongoDB, Azure, OpenAI).
4. **En español casi todo lo demás es antiguo, de nicho o no es un comunicador**: agendas, cuentos, traductores texto→pictograma. Entre las apps activas destacan **Háblalo** (Argentina; texto a voz y voz a texto gratuito, muy usada por adultos que leen y escriben, pero no es un SAAC pictográfico robusto) y **LetMeTalk** (gratuita, offline, más de 9.000 pictos ARASAAC, sencilla, sin vocabulario núcleo ni gramática). Ya hubo intentos de generar frases gramaticales en español a partir de pictogramas (PictoDroid Lite 3.1, Jocomunico), pero hoy no tienen tracción visible.
5. **México:** no se encontró ninguna app SAAC gratuita, robusta y hecha en México o para México. Solo hay apps pequeñas recientes (HablemosTEA, 2026, de una sola persona; país de origen [NV]) y prototipos académicos sin publicar (UAEMex/UNAM FES Aragón 2020; IPN 2015).
6. **Recomendación preliminar:** **no construir un motor SAAC desde cero.** El mayor valor por peso invertido está en una **capa mexicana**:
   - vocabulario núcleo y periférico en `es-MX`, con formas de palabra y conjugación;
   - un motor de morfología en español contribuido *upstream*;
   - empaquetado para las tiendas y voces `es-MX` offline;
   - implementación y capacitación en México.

   La base técnica preferida es **Asterics AAC**, con **Cboard** como alternativa si se necesita tienda nativa ya resuelta y se acepta quitar la monetización. Construir desde cero solo se justifica si el producto busca algo que ninguna de las dos resuelve bien, como rendimiento nativo en Android de gama baja o voz neuronal `es-MX` 100 % offline integrada, y aun así conviene reutilizar OBF y ARASAAC.

---

## 1. Tabla A. Open source y gratuitas internacionales

| App | Creador | Plataformas | Precio real | Licencia | Español / es-MX | Offline | Pictogramas | Mantenimiento | Fortalezas | Limitaciones concretas |
|---|---|---|---|---|---|---|---|---|---|---|
| **Asterics AAC** (antes AsTeRICS Grid) | UAS Technikum Wien (Viena) + AsTeRICS Foundation; ARASAAC colabora desde 2022 | Web/PWA en Windows, macOS, Linux, Android, iOS. **Sin app en tiendas** (se instala como acceso directo) | **Gratis total**, sin anuncios, donaciones | **AGPL-3.0** (código); CC BY-SA 4.0 (docs); repo de tableros AGPL-3.0 | UI en `es`. Comunicadores ARASAAC en **español de España**. Voces `es-MX` si el SO o navegador las tiene (Android, Windows e iOS listan "Spanish (Mexico)") | **Sí** tras la primera carga. Las voces online (ResponsiveVoice) no | ARASAAC (API), OpenSymbols, Global Symbols, imágenes propias | **Muy activo**: último commit 5-nov-2026, release 21-oct-2026, 546 commits en 12 meses, ~82 % de una persona. Financiado (InDiKo, Ciudad de Viena) hasta 2028 | Barrido (filas/columnas, binario, temporizado), secuencial, direccional, Huffman, hover, teclado, conmutadores; mirada/cabeza/EMG vía AsTeRICS Framework; OBF/OBZ import y export; predicción de palabras con diccionario `default_es`; formas de palabra; grid global para núcleo; PDF; sync cifrada E2E; mensajería Matrix; radio, YouTube, domótica | No está en Play Store ni App Store (problema de descubrimiento y confianza para familias). Las formas de palabra se cargan a mano o desde hoja de cálculo; **los 3 comunicadores en español traen 0 formas** [código]. Léxico peninsular. ResponsiveVoice con retrasos de 5 s o más y errores aleatorios (doc. oficial). Ace Centre: sin predicción de frases, sin banco de frases precargado, sin páginas solo-símbolo. Vue 2.7 (EOL). Bus factor de 1 |
| **Cboard** | Comunidad Cboard + Assistive Communication LLC (Martín Bedouret). Digital Public Good; proyecto con UNICEF "For every child, a voice" | Web/PWA, Android, iOS, Windows (Microsoft Store), Amazon | **Freemium**: base gratis; Pro **8 USD/mes o 79 USD/año** (iOS). Premium **gratis en países fuera de una lista de 51** (México incluido) [código]. **Anuncios AdSense** en Ajustes de la versión web (no en apps Cordova) [código] | **GPL-3.0** (front y API) | `es-ES` (léxico mixto: más "jugo" y "computadora" que "zumo" y "ordenador", pero los dos aparecen). **No hay `es-MX`** como idioma | Parcial: según la web oficial, offline solo en Chrome (escritorio y Android). La app iOS dice "offline support" | Mulberry (local), ARASAAC (caché IndexedDB), Global Symbols, "Cboard Symbols" (API propia) | **Muy activo**: commit 29-oct-2026, 687 commits en 12 meses (3 devs principales + empresa). iOS 1.38.4 del 23-dic-2025 | 46 idiomas; barrido automático y manual; **control por parpadeo** con MediaPipe on-device (sep-2026); OBF/OBZ import y export; voces en la nube (Azure, ElevenLabs); "mejorar frase" con IA; comunicadores; PDF | Sin conjugación ni concordancia propias (solo "mejorar frase" vía OpenAI, con login y premium). Una etiqueta por celda. Ace Centre: sin buscador o localizador de palabras. Requiere cuenta para guardar de forma fiable. Reseña en Play: "copiar y otras funciones antes gratuitas pasaron a suscripción". Backend pesado (MongoDB, Azure, OpenAI, ipinfo). App iOS de 200 MB; 3.1★ (14 valoraciones) en iOS US |
| **CoughDrop** | CoughDrop → vendida a Forbes AAC / MavWare (mar-2023) | Web, iOS, Android, Windows [NV para todas] | **De pago**: 6 USD/mes o 200 USD vitalicio; prueba de 2 meses; cuentas "supporter" gratis | Era open source; **desde 2023 las versiones nuevas son cerradas**; el repo viejo quedó congelado en la cuenta OpenAAC | [NV] | [NV] | OpenSymbols + add-ons de pago (SymbolStix, PCS) a 25 USD | Activa comercialmente | Robusta; la creó el autor de OBF | No es gratis; el código abierto está congelado desde 2023 |
| **FreeSpeech AAC** | Merkie (Archer Calder) / patrocinio Optum | Web PWA | Gratis | **MIT** | Inglés [NV español] | Parcial: tableros cacheados; editar, buscar y las voces en la nube requieren red | [NV] | 594★; fecha del último commit [NV] | Stack moderno (SvelteKit/TS); conjugación con GPT | Depende de OpenAI y de TTS en la nube de pago (AWS, Azure, Google); centrada en inglés |
| **LibreAAC** | Luke Howson y contribuidores | Web PWA + envoltorio Android (WebView) | Gratis | **GPL-3.0** | [NV] | **Sí** (offline-first) | Lo que traiga el OBF | **Muy nuevo** (2026; 36 commits, 0★) | OBF/OBZ como formato **nativo**; barrido; sin cuentas ni telemetría | Inmaduro; sin comunidad |
| **Jellow Communicator** | Ravi Poovaiah (IDC, IIT Bombay) | iOS, Android | Gratis | [NV si es open source] | Incluye español (no es-MX); voces con acentos de inglés | [NV] | ~1.000 íconos propios | v8, mar-2026 (probable) | Más de 10.000 frases preprogramadas, botones de emociones, teclado | Pensada para India; búsqueda solo en inglés; vocabulario pequeño |
| **LetMeTalk** | AppNotize UG (Alemania) | Android, iOS | **Gratis** (donaciones) | Propietaria | Español (peninsular) entre 17 idiomas | **Sí** | ARASAAC (más de 9.000) | v1.4.32 (fecha [NV]) | Muy simple; offline; perfiles TEA; cambio rápido entre 2 idiomas | Sin vocabulario núcleo robusto ni conjugación; barrido [NV, no anunciado]; interfaz antigua |
| **Leeloo AAC** | DOYBLS (Turquía) | iOS, Android | Freemium: 6,99 USD/mes, 59,99 USD/año, 149 USD vitalicio | Propietaria | Español; ficha en la tienda es-MX | [NV] | Ilustraciones propias | iOS 2.7.6, **jul-2023** | Muy fácil para niños pequeños | Vocabulario limitado (no sirve para adultos); paquetes bajo paywall; 3,7★ |
| **SymboTalk** | Elad Elram (Israel) | Web, Android, iOS, Mac | Gratis; sync, backup y nube de pago (0,99 USD, 8,99 USD, 0,99 USD/mes) | Propietaria | UI en español; TTS en 27-35 idiomas | **Sí** | ARASAAC, Mulberry, Sclera (más de 60.000) | v2.0.13 con asistente IA (fecha [NV]) | Flexible, multiplataforma, IA para generar tableros | **Máx. 60 celdas** por tablero; sin gramática; sync de pago |
| **Otsimo AAC** | Otsimo (Turquía) | iOS, Android | **Suscripción tras prueba** (5,49 USD/mes; 35,90 USD/año) | Propietaria | **Solo inglés** en iOS | Sí | Propios | v1.0.250508, may-2025 | Conjugación verbal (en inglés), 1.700 palabras | No es gratis; sin español |
| **Card Talk** | LITALICO (Japón) | iOS (Android [NV]) | Gratis hasta 200 tarjetas; "All functions" 2,99 GBP | Propietaria | Español | [NV] | Propios | v1.2.1, may-2025 | Sin anuncios; tarjetas propias con foto y voz | Muy básica; no es un SAAC robusto |
| **Voice4u** | Spectrum Visions | iOS | **59,99 USD** | Propietaria | Inglés y japonés (**sin español**) | Sí | 180 símbolos | v3.25.0, abr-2026 (probable) | Conmutador Bluetooth | De pago; sin español |
| **Sono Flex Lite** | Tobii Dynavox | iOS | Lite gratis limitada; completa de pago | Propietaria | Inglés | [NV] | SymbolStix | v2.0.0 (compatibilidad iOS 11): **abandonada de facto** | Núcleo + 50 vocabularios temáticos | Sin español; reseña: anuncios de la versión completa cada 3-4 frases |
| **Spoken** | Spoken Inc. | iOS, Android | Freemium: hablar es gratis; Premium desde 6,49 USD/mes hasta 249 USD vitalicio | Propietaria | **Solo inglés** | Parcial | Íconos | v1.9.6, 2026 (probable) | Predicción adaptativa, escritura a mano a voz, ElevenLabs | Inglés; para adultos que leen y escriben |
| **AAC Talking Tabs** | [NV desarrollador] | Android | [NV] | Propietaria | Símbolos ARASAAC en español | [NV] | ARASAAC (9.000) | Antigua (Android 2.2-4.4): **abandonada aparentemente** | Libros con pictos; envío por WhatsApp | Obsoleta |
| **Global Symbols Board Builder** | Global Symbols (operador [NV]) | Web | Gratis con registro (precio [NV]) | — | Etiquetas en cualquier idioma | No | Global Symbols, OpenSymbols, Noun Project | [NV] | **Exporta OBF/OBZ** para Cboard, CoughDrop y Grid; PDF | **No es comunicador** (no tiene TTS propio) |
| **Proloquo / Proloquo2Go** | AssistiveWare | iOS | **Proloquo: 229 MXN/mes, 2.299 MXN/año** (prueba de 1 mes). Proloquo2Go: 299,99 € | Propietaria | Proloquo: solo inglés. Proloquo2Go: con español (CATEDU) | Sí | Propios | Activa | Referencia de calidad (núcleo con planificación motora) | **No hay versión gratuita**, solo la prueba |
| **TD Snap** | Tobii Dynavox | Windows, iPad, Android | Descarga gratis con **voz bloqueada**; iPad 59,99 € (compras dentro de la app); Windows 199 € | Propietaria | Con español (CATEDU) | [NV] | PCS | Activa | Núcleo, buena planificación motora | La versión gratis no habla; CATEDU: "carece de sinónimos, conjugación y concordancias" |
| **Niki Talk** | Alessandro La Rocca | iOS, Android | App gratis; **Designer por suscripción** (precio [NV]); álbum en español vía prueba | Propietaria | Español; TTS en 31 idiomas | [NV] | Fotos y propios | v2.2.4, nov-2026 | Activa; Designer en PC, Mac y iPad | El álbum en español requiere Designer o la prueba |
| **ALSChat** | NeoChat (Corea) | Web / Android | Gratis | Propietaria | Español entre muchos | Detección de parpadeo on-device | Letras (sin pictos) | Actualizada 26-oct-2026 | Barrido por parpadeo con solo la cámara frontal (útil en ELA) | Más de 100 descargas; sin pictogramas. Dato parcial (ver nota en §11) |
| **Lingraphica SmallTalk** | Lingraphica | iOS | Gratis | Propietaria | Afasia: solo inglés. Existe "SmallTalk Frases de Conversación" en español | [NV] | Fotos y video | [NV] | Videos de articulación y frases para afasia | Solo iOS; contenido de afasia en inglés |
| **KC TalkBoard** | KultureCity | iOS, Android | **4,99 USD/mes, 49,99 USD/año, 99,99 USD vitalicio** | Propietaria | [NV] | Mayormente | Tablero de letras y elecciones | 2025 | Tablero de letras + frases rápidas | No es gratis |

**No verificados o no encontrados de la lista original:** Speak4Me (la búsqueda no dio una app identificable), Weavly (sin evidencia de que sea una app SAAC [NV]), "Proloquo free" (no existe tier gratis, solo la prueba de 1 mes).

---

## 2. Tabla B. Apps en español (España y Latinoamérica)

| App | Creador | Plataformas | Precio | Licencia | Español / es-MX | Offline | Pictogramas | Mantenimiento | Fortalezas | Limitaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| **Háblalo / Hearlo** | Asteroid Technologies (ASTECH S.A.S., Argentina) | iOS, Android | **Gratis** ("100 % free, forever") | Propietaria | Español (variante [NV]) + 18 idiomas | **Sí**: comunicación offline en más de 10 idiomas; dictado offline desde v4.5.3 | Biblioteca de pictogramas personalizable | **Activa** (v4.5.3, oct; año probable 2026). 4,4★ (29) en iOS US | Texto a voz, voz a texto, traducción; pensada para parálisis cerebral, ELA e hipoacusia; adoptada por empresas (Vueling, Farmacity, según prensa) | No es un SAAC pictográfico robusto (sin vocabulario núcleo ni gramática); sirve sobre todo a quien lee y escribe |
| **PictoTEA** | Velociteam (Argentina) | Android (iOS [NV]) | Gratis | Propietaria | Español | [NV] | ARASAAC | [NV] (la ficha de BlueStacks es de nov-2025) | 5 niveles progresivos | "Chat y reportes próximamente"; no robusto; sin datos de mantenimiento |
| **Pictogramas.arg** | Guadalupe Torino (estudiante, Argentina) | Web | Gratis, sin registro | [NV] | Español | [NV] | ARASAAC | Lanzada en 2025; más de 7.000 usuarios en más de 35 países **incluido México** (jun-2026) | Texto o voz a secuencia de pictos; exporta a PDF o Word | **No es comunicador** (genera materiales) |
| **e-Mintza** | Fundación Orange + Fund. Dr. Carlos Elósegui (Policlínica Gipuzkoa) | iPad (otras [NV]) | Gratis | Propietaria | Voz en castellano y euskera | [NV] | ARASAAC + fotos | **Abandonada de facto** (requiere iPadOS 4.3; de 2012). 3,0★ (2) | Tablero + agenda + editor | Obsoleta |
| **José Aprende** | Fundación Orange / Aprendices Visuales | iOS | Gratis | Propietaria | Español | — | Pictos | v3.1, jul-2021 | Cuentos interactivos | **No es comunicador** |
| **PictogramAgenda** | Lorenzo Moreno | Web, Android, iOS | Gratis (CATEDU) | Propietaria | Español | [NV] | ARASAAC, #SoyVisual | INTEF publicó ficha en abr-2026 | Agenda visual sencilla | **No es comunicador**; tope de 20 a 48 pictos |
| **DictaPicto** | Fundación Orange + BJ Adaptaciones | Android, iOS | Gratis | Propietaria | es, ca, en | **Requiere internet** (reconocimiento y análisis) | ARASAAC | iOS v1.0.1, **feb-2019** | Voz a pictogramas | Abandonada; no es comunicador |
| **Día a Día** | Fundación Orange + BJ Adaptaciones | Android | Gratis | Propietaria | Español | [NV] | [NV] | 2016 | Diario visual | No es comunicador; antigua |
| **AraSuite** (AraWord, TICO, AraBoard) | Universidad de Zaragoza / ARASAAC | Windows, Linux, macOS (Java 1.6) | Gratis | GPL | Español | Sí | ARASAAC | Último update en SourceForge **23-oct-2020** | Procesador de texto con pictos; tableros (TICO) | Solo escritorio; Java antiguo; sin móvil |
| **Plaphoons** | Jordi Lagares / Projecte Fressa | Windows, Android | Gratis | [NV] | Catalán y español | Sí | Símbolos (ARASAAC) | [NV] | Pensado para discapacidad motora (barrido) | Antiguo [NV]; interfaz desfasada |
| **PictoDroid Lite** | Univ. de Vigo (GTI: García Doval, Costa Montenegro) + Accegal | Android | Gratis [NV] | [NV] | Español (+ sueco); **generación automática de frases en español** (v3.1) | [NV] | ARASAAC | Fecha de la v3.1 [NV] | Modo puntual + acumulativo; el NLG añade artículos y preposiciones y hace concordancia | Solo Android; los tableros se instalan copiando carpetas por USB |
| **Jocomunico** | Tesis doctoral (con Fundación Adecco y Telefónica Talentum) | Web; offline en Windows y Mac | Gratis | [NV] | **Catalán y español**: pictos a frase natural ("yo ir escuela mañana" → "mañana iré a la escuela") | Solo escritorio | ARASAAC | [NV]; la ficha de ARASAAC enlaza descargas a *localhost* (rotas) | NLG, predicción contextual, barrido configurable, 1-2 pulsadores | Mantenimiento dudoso |
| **ComunicaTEA** | Alfonso Cosme Colchón (psicopedagogo; España probable) | iOS; Android en lista de espera | **Gratis "durante el lanzamiento"** | Propietaria | Español (variante [NV]); **conjugación** en es, fr, it, pt | **Sí** (tablero, frase, voz del dispositivo, predicción) | ComunicaTEA Symbols + Mulberry (~1.000 palabras) | 2026 | 4 niveles (8 a 70 palabras), predicción, agenda, tablero de emergencia | Gratis solo de forma temporal; solo iOS; vocabulario pequeño; voces naturales limitadas y online |
| **pictoYA** | adri.care (autor [NV]) | Android, iOS | Gratis | Propietaria | Español | **Sí** (incluido el reconocimiento de voz) | ARASAAC | © 2025 | Voz o texto a pictos en tiempo real; agendas; PDF | Más traductor/agenda que comunicador robusto [NV] |
| **Pictotraductor** | Fundación Pictoaplicaciones (A Coruña) / Grupo Promedia | Web | Gratis | — | Español | No | ARASAAC | [NV] | Traduce frases a pictos | No es comunicador |
| **SymboTalk / Niki Talk** | ver Tabla A | | | | | | | | | |
| **CPA** (Comunicador Personal Adaptable) | [NV] (lo citan ARASAAC y Autismo España) | [NV] | [NV] | [NV] | Español | [NV] | [NV] | [NV] | Ordena imágenes para formar frases; casos graves | **No verificado** |
| **InTIC** | [NV] (Universidade da Coruña, según la memoria previa) | [NV] | [NV] | [NV] | | | | | | **No verificado** |
| **SPQR, Habla Fácil, Hablando con Nuevos Amigos** | — | — | — | — | — | — | — | — | — | **No encontradas** con esos nombres |

---

## 3. Tabla C. México

| Iniciativa | Quién | Estado | Notas |
|---|---|---|---|
| **HablemosTEA** | Martín Javier Tavera Tejeda ("creada por padres de un niño con autismo"); vendedor en el App Store de EE. UU.; **nacionalidad [NV]** | iOS/Mac, gratis, lanzada el 11-mar-2026, v1.40, 4,3★ (24) | Más de 1.000 pictos, juegos, agendas, "zona de calma", teclado con voz; 5 idiomas. Mezcla app educativa y comunicador; no es un SAAC robusto; un solo desarrollador |
| **Mand AAC** | I Can Infotech Inc. | En el App Store MX, pero **solo en inglés** | No sirve para México |
| **Prototipo SAAC con Raspberry Pi** | UAEMex + UNAM FES Aragón (Research in Computing Science, 2020) | Prototipo académico, **no publicado** | Botón por GPIO + barrido + ARASAAC + eSpeak; 9 participantes. El artículo afirma que los SAAC comerciales son inaccesibles por costo para la mayoría y cita ~6.000 casos de ELA diagnosticados en México |
| **Guante traductor IPN** | IPN (UPIITA), 2015 | App gratis en Play (2015); guante pendiente de fabricación | Deletreo dactilológico a voz; no es SAAC pictográfico |
| **Cboard en México** | — | **Premium desbloqueado en México** según el código cliente (MX no está en `REQUIRING_PREMIUM_COUNTRIES`) | Hoy es la opción más completa en tiendas para México, pero depende de una política comercial |
| **Teletón/CRIT, DIF, CONADIS, Tec de Monterrey, startups** | — | **Sin hallazgos** (búsqueda limitada; [NV]) | No se encontró ninguna app SAAC pública de estas instituciones. Conviene confirmarlo con contactos directos (CRIT, USAER/CAM de la SEP) |

---

## 4. Calidad: ¿qué tan buenas son?

- **Plataformas de nivel profesional (gratis):** Asterics AAC y Cboard. El Ace Centre (Reino Unido) las cataloga en su *Language Library*: Grid con unos 70 idiomas, gramática (plurales y conjugaciones mediante formas de palabra), búsqueda, control de entorno y PDF; Cboard con unos 45 idiomas, voces infantiles y adultas, vocabulario núcleo y por categorías, y cambio de código entre idiomas. Ninguna llega al nivel de Proloquo2Go o TD Snap en investigación de vocabulario ni en planificación motora. **Los comunicadores "Global-Core" de ARASAAC para Grid** (57 grids y 1.406 celdas; 45 grids y 1.443 celdas) son el vocabulario robusto gratuito en español más completo que se encontró [código].
- **Apps simples (gratis o casi):** LetMeTalk, SymboTalk, Jellow, Card Talk, PictoTEA, HablemosTEA. Sirven para necesidades básicas y niños pequeños. No tienen vocabulario núcleo con posiciones estables, gramática, ni (en su mayoría) barrido.
- **Texto a voz para adultos alfabetizados:** Háblalo es la mejor opción gratis en español. Spoken es buena, pero solo en inglés.
- **Materiales y agendas:** muchas herramientas de Fundación Orange, ARASAAC y otros son excelentes para apoyos visuales, pero no son comunicadores.
- **Abandonadas u obsoletas:** e-Mintza, DictaPicto, Día a Día, AraSuite (2020), Sono Flex, AAC Talking Tabs, Leeloo en iOS (2023).

---

## 5. Análisis de huecos (ecosistema gratuito en español, especialmente México)

1. **Localización `es-MX` real.** No hay ningún vocabulario robusto gratuito en español de México. Los comunicadores de ARASAAC en Grid usan léxico peninsular: "zumo" 3, "patatas" 3, "ordenador" 3, "coche" 5, "vosotros" 4, frente a 0 de "jugo", "papas", "computadora", "carro" y "ustedes" [código, conteo aproximado por grep]. Cboard se ofrece como `es-ES`. Falta el léxico mexicano (popote, camión, elote, chamarra, colonia, tianguis, recreo, pesos), la cultura (comida, fiestas, escuela SEP, servicios de salud IMSS/ISSSTE) y una voz `es-MX` configurada por defecto.
2. **Gramática del español: conjugación y concordancia.** Es el hueco técnico más grande, porque el español flexiona verbos, género y número.
   - Grid tiene el *mecanismo* (formas de palabra con etiquetas e importación desde hoja de cálculo), pero **ningún comunicador en español lo usa**.
   - Cboard no tiene morfología; solo "mejorar frase" con LLM en la nube.
   - Las soluciones en español que hubo (PictoDroid Lite NLG, Jocomunico) están estancadas.
   - ComunicaTEA conjuga, pero es iOS-only y gratis solo de forma temporal.
   - Otsimo conjuga solo en inglés y es de pago.
3. **Adultos con afasia, ELA o ACV.**
   - Para escribir con predicción en español y acceso por conmutador o parpadeo hay piezas: Grid (predicción + barrido), Cboard (parpadeo desde sep-2026), ALSChat (parpadeo) y Háblalo (texto a voz).
   - Falta un flujo pensado para afasia en español: frases guionizadas, escalas de dolor, conversación con apoyo del interlocutor, fotos personales y guiones para citas médicas.
   - Tampoco hay **banco de mensajes ni de voz en español** integrado y gratuito.
4. **Parálisis cerebral: acceso motor.** El barrido existe (Grid es el más completo), pero falta:
   - configuración guiada sencilla para terapeutas y familias en México;
   - una lista de **hardware barato** compatible (pulsadores USB o Bluetooth, adaptadores, protectores de pantalla);
   - el seguimiento ocular de bajo costo, que en Grid requiere AsTeRICS Framework en PC.
5. **Distribución y confianza.** Grid no está en las tiendas (una familia mexicana lo busca en Play Store y no lo encuentra; iOS limita las PWA). Cboard sí está, pero es *freemium*, con anuncios web, cuenta obligatoria para guardar y el antecedente de funciones que pasaron a pago.
6. **Implementación.** No hay materiales de capacitación, modelado ni guías para USAER/CAM/CRIT en español mexicano. La literatura (y la experiencia del sector) indica que el abandono de SAAC se debe más a la falta de implementación que a la app [NV como dato cuantitativo].
7. **Dispositivos de gama baja y conectividad.** Hace falta funcionar 100 % offline en Android barato. Cboard ofrece offline robusto solo en Chrome y pesa 200 MB en iOS. Grid funciona offline, pero sus voces dependen del sistema, y en Android eso significa instalar el paquete de voz `es-MX` de Google (lo hace el usuario).
8. **Privacidad.** Cboard usa Application Insights, Google Analytics y AdSense (web) [código]. Grid tiene usuarios offline y sync cifrada E2E. Para población vulnerable (menores), la opción sin telemetría es la deseable.

---

## 6. ¿Alguna app gratuita ya cubre casi todo?

**Respuesta honesta: técnicamente, sí, casi. Asterics AAC cubre alrededor del 75-80 % de lo que necesitaría una app SAAC benéfica para México. Cboard cubre una proporción parecida con mejor distribución, pero con monetización.** La estimación es cualitativa, a partir de la matriz de abajo. Lo que les falta es sobre todo **contenido, localización, gramática del español, empaquetado e implementación**, no la plataforma.

| Necesidad | Asterics AAC | Cboard |
|---|---|---|
| Gratis sin anuncios ni paywall | ✅ | ⚠️ freemium + AdSense web (premium hoy gratis en MX) |
| Offline | ✅ PWA | ⚠️ Chrome / app |
| Barrido y conmutadores | ✅ (varios métodos) | ✅ (automático/manual) |
| Mirada / cabeza | ⚠️ vía AsTeRICS Framework (PC) | ⚠️ parpadeo como conmutador (cámara) |
| OBF/OBZ | ✅ import y export | ✅ import y export |
| Pictos ARASAAC / Mulberry | ✅ ARASAAC, OpenSymbols, Global Symbols | ✅ Mulberry, ARASAAC, Global Symbols |
| Vocabulario robusto en español | ✅ (ARASAAC, peninsular) | ⚠️ (por categorías, `es-ES`) |
| Conjugación y concordancia en español | ⚠️ mecanismo sin datos | ❌ (solo IA en la nube) |
| Predicción de palabras en español | ✅ | [NV] |
| Voces `es-MX` | ⚠️ las del SO/navegador | ⚠️ las del SO + Azure (premium) |
| App en tiendas | ❌ | ✅ |
| Desarrollo activo | ✅ (bus factor 1) | ✅ (equipo + empresa) |

**Conclusión:** construir otra app SAAC genérica desde cero duplicaría años de trabajo (Grid: 10.689 commits; Cboard: 5.561) y sería probablemente inferior durante 2 o 3 años en acceso motor e interoperabilidad.

---

## 7. Análisis técnico para forkear

### 7.1 Comparación de arquitectura

| Aspecto | **Asterics AAC (AsTeRICS Grid)** | **Cboard** |
|---|---|---|
| Repo | github.com/asterics/AsTeRICS-Grid → **renombrado `asterics/Asterics-AAC`**; datos en `asterics/Asterics-AAC-Data` | github.com/cboard-org/cboard + `cboard-org/cboard-api` |
| Estrellas / forks | 129★ / 69 | 766★ / 297 |
| Licencia | **AGPL-3.0** (cualquier versión modificada que se sirva por red debe publicar su código); datos de tableros también AGPL; docs CC BY-SA 4.0 | **GPL-3.0-only** (front y API) |
| Front | **Vue 2.7** (EOL), jQuery/jQuery UI, Bootstrap, webpack, vue-i18n, interact.js | **React 17**, Redux, **Material-UI v4** (sin mantenimiento [NV]), CRA/Craco, react-intl, react-grid-layout |
| Persistencia | **PouchDB** (IndexedDB) local; CouchDB + couch-auth solo para sincronizar "usuarios online"; cifrado E2E (SJCL) | Redux-persist / localforage / idb local; **backend obligatorio** para cuentas, guardar tableros, comunicadores públicos y suscripciones |
| Backend | Opcional (CouchDB) | **Node/Express + MongoDB**, Azure Storage, Azure Speech, **OpenAI**, ipinfo, Passport (Google, Apple, Facebook), Swagger |
| Offline / PWA | Diseño offline-first; Workbox; "usuarios offline" sin servidor | Service worker (sw-precache); offline robusto en Chrome; apps vía **Cordova** (`build-cordova-*`) |
| OBF/OBZ | `obfConverter.js`: **importa** `.obf/.obz/.zip` y **exporta OBZ** (`open-board-0.1`: etiquetas, imágenes, navegación, hablar) [código] | Import con `obfImportAdapter` y `obzImportAdapter`; export "OpenBoard" [código] |
| Acceso | `scanning.js` (filas/columnas, binario, vertical/horizontal, temporizado), `sequentialInput`, `directionInput`, `huffmanInput`, `hovering`, `clicking`; atajos de teclado; UART/Bluetooth; AsTeRICS Framework (mirada, cabeza, EMG) | Barrido automático/manual (`react-scannable`); **GazeController** con MediaPipe FaceLandmarker on-device (parpadeo como conmutador; requiere barrido; también en Cordova) |
| TTS | Web Speech API (voces nativas); **ResponsiveVoice** (online, licencia CC BY-NC-ND no comercial); **servicio de voz externo** configurable por URL (permite autoalojar un TTS, p. ej. neural) | Web Speech / TTS nativo; **Azure Cognitive Services** (voces "cloud" = premium); ElevenLabs (notas de versión iOS) |
| Símbolos | ARASAAC (API), OpenSymbols (API), Global Symbols | Mulberry (empaquetado), ARASAAC (caché IndexedDB), Global Symbols, Cboard Symbols (API propia) |
| Gramática | Formas de palabra con etiquetas, importables por hoja de cálculo; `predictionary` (predicción + autoaprendizaje); diccionario `default_es.json` | Ninguna nativa; "improve phrase" vía backend/OpenAI (premium + login) |
| i18n | ~60 archivos de UI (incluye `es`); Crowdin | ~68 archivos (incluye `es-ES`, no `es-MX`); Crowdin |
| Tiendas | Ninguna (PWA) | Play, App Store, Microsoft, Amazon |
| Tests / CI | Jest | Jest, Playwright, BrowserStack |
| Monetización a retirar si se forkea | Ninguna | Suscripciones (PayPal + IAP), `PremiumFeature`, AdSense, analíticas, lógica por país |
| Actividad (12 meses) | 546 commits; ~82 % de un desarrollador | 687 commits; 3 desarrolladores principales + empresa |

### 7.2 Opciones

**Opción A (recomendada): contribuir a Asterics AAC + "distribución mexicana" ligera**
- *Contenido upstream* (repo `Asterics-AAC-Data`, flujo documentado por PR): comunicadores `es-MX` para los 3 perfiles (niño TEA o retraso del lenguaje; adulto con afasia, ELA o ACV; parálisis cerebral con barrido), con **formas de palabra** cargadas (conjugación de los ~200-300 verbos núcleo, género y número).
- *Código upstream*: un generador automático de formas para español (reglas + excepciones o lexicón abierto) que alimente las formas de palabra; un preset `es-MX` (idioma, voz, teclado, diccionario de predicción `es-MX`).
- *Empaquetado*: envolver la PWA (TWA o Capacitor) para publicarla en Play Store a nombre de la organización benéfica, con la configuración por defecto para México.
  - La AGPL lo permite si se publica el código.
  - Hay que coordinar con los mantenedores para no fragmentar.
- *Voz*: usar el "servicio de voz externo" o integrar TTS neural offline `es-MX`. Hay modelos abiertos, como voces Piper `es_MX` [NV en esta sesión].
- **Pros:** sin monetización que quitar, offline-first, el mejor acceso motor, AGPL alineada con una organización benéfica, ARASAAC ya es socio.
- **Contras:** Vue 2 (deuda técnica), bus factor de 1, UI densa, sin presencia nativa.

**Opción B: fork de Cboard**
- Útil si la prioridad es tener ya apps nativas en tiendas y una UI más amigable.
- Hay que eliminar `PremiumFeature`, AdSense y analíticas, y montar y pagar un backend propio (MongoDB, almacenamiento, auth) o rehacerlo como local-first. La parte de Azure y OpenAI es opcional.
- **Riesgo:** separarse de un upstream con empresa detrás. Alternativa: **colaborar con Cboard** para un "modo ONG México" o contenido `es-MX`, aprovechando que México ya es "país gratuito".

**Opción C: construir desde cero**
- Solo se justifica si se prioriza:
  - app **nativa** de alto rendimiento para Android de gama baja;
  - TTS neural `es-MX` integrado 100 % offline;
  - un motor de morfología del español en el núcleo;
  - UX específica para afasia.
- Aun así hay que reutilizar **OBF/OBZ** (interoperabilidad con Grid, Cboard, CoughDrop y Board Builder), ARASAAC/Mulberry y, si se quiere, la lógica de barrido de Grid como referencia. LibreAAC (GPL, OBF nativo) es un ejemplo de núcleo mínimo.
- **Coste:** alto; meses o años para igualar el acceso motor y la madurez.

**Recomendación:** A como camino principal, con B o colaboración con Cboard como respaldo para la distribución. Empezar con un piloto de 4-8 semanas: un comunicador `es-MX` con formas de palabra en Grid, probado con 5-10 usuarios por perfil (CRIT, CAM, USAER o asociaciones de ELA y afasia). Así se valida si el hueco es el contenido y la implementación (hipótesis principal) o la plataforma.

---

## 8. Licencias relevantes (símbolos y voces)

- **ARASAAC:** CC BY-NC-SA 4.0. El uso no comercial (organización benéfica) está permitido, con atribución y *share-alike*. Lo usan Grid, Cboard y casi todas las apps hispanas.
- **Mulberry:** CC BY-SA 4.0 (Cboard la incluye localmente).
- **ResponsiveVoice** (en Grid): CC BY-NC-ND (no comercial).
- **Código:** Grid AGPL-3.0; Cboard GPL-3.0; FreeSpeech MIT; LibreAAC GPL-3.0.

---

## 9. Datos verificados en código (commit / fecha)

- Asterics AAC: último commit 2026-11-05 ("reverted release version to placeholder"); 546 commits desde 2025-11-01 (Benjamin Klaus 445, juanjofau 59, Aleksandar Angelov 23, otros).
- Cboard: último commit 2026-10-29 (merge PR #2380); 687 commits desde 2025-11-01 (Rodri Sanchez 248, Agus 224, Martín Bedouret 120, tomivm 39, otros). cboard-api: último commit 2026-10-22.
- Cboard `REQUIRING_PREMIUM_COUNTRIES` (51): AE, AT, AU, BE, BH, BM, CA, CH, CL, CY, CZ, DE, DK, EE, **ES**, FI, FR, GB, GE, GI, GR, HK, HU, IE, IS, IT, JP, KY, LI, LK, LT, LU, MC, NL, NO, NZ, PA, PL, PT, QA, RU, SA, SE, SG, SK, SI, SM, TW, **US**, VA, ZA. **MX, AR y CO no están.** Se decide en el cliente con el país de la IP o del perfil; el servidor podría cambiarlo [NV].
- Funciones premium de Cboard [código]: voces en la nube, grabadora de voz por celda, copiar celdas, compartir o publicar tableros, copiar o compartir frase, analíticas, "mejorar frase" (IA, requiere login).
- Tableros por defecto de Cboard: conjunto "advanced" de 44 tableros y 825 celdas; "core PicSeePal" de 6 tableros y 157 celdas.
- Comunicadores de Grid en español: "Global-Core Communicator ARASAAC" (57 grids, 1.406 elementos), "ARASAAC Global Grid Core Communicator" (45 / 1.443), "CACE-UTAC 2021 ST-G" (29 / 1.041). Los tres tienen **0 formas de palabra**. Hay además 5 tableros temáticos en español.

---

## 10. Pendiente / no verificado

- Descargas en Google Play de Cboard, LetMeTalk, PictoTEA y Háblalo: no se obtuvieron. La consulta de la ficha de Cboard en Play devolvió otra app.
- CPA, InTIC, Tico (como app), Plaphoons (versión y licencia actuales), Jellow (si es open source), CoughDrop (licencia histórica exacta), FreeSpeech (última actividad).
- Iniciativas mexicanas institucionales (Teletón/CRIT, DIF, CONADIS, SEP, Tec, UNAM, IPN) y startups: sin hallazgos con búsqueda limitada. Hay que confirmarlo con contactos directos.
- Disponibilidad y calidad de voces neurales `es-MX` offline (p. ej. Piper): no verificada en esta sesión.
- Si Cboard funciona offline completo en Android (app Cordova) sin Chrome: la web oficial dice "solo Chrome"; la app iOS dice "offline support".

---

## 11. Fuentes (páginas abiertas o repos clonados en esta investigación)

**Asterics AAC / AsTeRICS Grid**
- https://github.com/asterics/AsTeRICS-Grid (redirige a Asterics-AAC; clonado)
- https://raw.githubusercontent.com/asterics/AsTeRICS-Grid/master/README.md
- https://github.com/asterics/AsTeRICS-Grid/releases
- https://github.com/asterics/Asterics-AAC-Data (clonado)
- https://grid.asterics.eu/
- https://acecentre.org.uk/language-library/asterics-grid
- https://aulaabierta.arasaac.org/en/asterics-aac_home
- https://www.asterics-foundation.org/asterics-grid-releases/
- https://www.technikum-wien.at/en/news/asterics-grid-innovative-tool-for-augmentative-and-alternative-communication/

**Cboard**
- https://github.com/cboard-org/cboard (clonado)
- https://github.com/cboard-org/cboard-api (clonado)
- https://www.cboard.io/en/
- https://www.cboard.io/cboard/openboard/open-source/2018/06/30/cboard-openboard-support/
- https://apps.apple.com/app/aac-cboard-app/id6453683048
- https://apps.apple.com/gb/app/aac-cboard-app/id6453683048
- https://acecentre.org.uk/language-library/cboard-aac
- https://freedom251.com/apps/cboard/

**Otras internacionales**
- https://beta.mycoughdrop.com/pricing
- https://blog.mycoughdrop.com/coughdrop-has-joined-forbes-aac/
- https://www.openaac.org/
- https://github.com/merkie/freespeech
- https://github.com/libretastic/libreaac
- https://apps.apple.com/in/app/jellow-aac-communicator/id1456459072
- https://apps.apple.com/es/app/letmetalk/id919990138?l=en
- https://apps.apple.com/us/app/id1508952198 (Leeloo)
- https://apps.apple.com/us/app/id1294023783 (SymboTalk)
- https://aulaabierta.arasaac.org/en?p=81619 (SymboTalk, ARASAAC)
- https://apps.apple.com/us/app/otsimo-aac/id6443643989
- https://apps.apple.com/gb/app/card-talk/id1219854974
- https://apps.apple.com/us/app/id339916109 (Voice4u)
- https://apps.apple.com/ca/app/sono-flex-lite/id463709444
- https://apps.apple.com/us/app/spoken-aac/id1034487817
- https://spokenaac.com/best-no-cost-aac-apps/ (blog de un competidor)
- https://ul.gpii.net/content/aac-talking-tabs
- https://globalsymbols.com/about/board-builder-and-symbol-creator-instructions
- https://apps.apple.com/mx/app/proloquo/id1521978238
- https://apps.apple.com/mx/app/niki-talk/id556798417?l=en-GB
- https://lingraphica.com/aac-communication-apps/
- https://talkboard.kulturecity.org/terms
- https://apps.apple.com/id/app/id6754293620 (Spanish Español AAC, suscripción de 0,99 USD/mes)
- https://play.google.com/store/apps/details?id=com.unicef.cboard (la consulta devolvió la ficha de ALSChat, de NeoChat; los datos de ALSChat vienen de ahí)
- https://github.com/Pictalk-speech-made-easy/pictranslate (Pictalk, GPL-3.0, traductor en/fr)

**Español**
- https://apps.apple.com/us/app/hablalo/id1386834397
- https://discapnet.es/innovacion/aplicaciones-moviles/apps-accesibles/comunicaci%C3%B3n
- https://www.bluestacks.com/campaign/ar.com.velociteam.pictoTEA/es
- https://www.iprofesional.com/negocios/455697-es-argentina-creo-una-app-para-su-hermana-con-autismo-y-hoy-es-un-exito (Pictogramas.arg)
- https://apps.apple.com/us/app/-/id738387685 (e-Mintza)
- https://apps.apple.com/es/app/id815105400 (José Aprende)
- https://aulaabierta.arasaac.org/en?p=78652 (PictogramAgenda)
- https://apps.apple.com/us/app/id1449019695 (DictaPicto)
- https://aulaabierta.arasaac.org/en/dictapicto-0-home
- https://psiquiatria.com/trastornos-infantiles-y-de-la-adolescencia/dia-a-dia-50950/
- https://sourceforge.net/projects/arasuite/
- https://aulaabierta.arasaac.org/en?p=78021 (PictoDroid Lite)
- https://www.gti.uvigo.es/index.php/en/component/k2/item/283-new-version-of-pictodroid-lite-with-automatic-natural-language-generation-in-spanish
- https://aulaabierta.arasaac.org/en?p=79159 (Jocomunico)
- https://www.comunicatea.com/
- https://pictoya.web.app/
- https://pictotraductor.com/aviso-legal
- https://equiposespecializados.catedu.es/wp-content/uploads/sites/234/2022/12/APPS-DE-COMUNICACION-AUMENTATIVA-dic22.pdf
- https://equiposespecializados.catedu.es/wp-content/uploads/sites/234/2023/12/TABLA-COMPARATIVA-SOFTWARE-PARA-CAA-1.pdf
- https://autismo.org.es/wp-content/uploads/2023/12/2023_SolucionesDigitalesPersonasAutismo_AutismoEspana.pdf
- https://www.autismvictory.app/blog-es/apps-autismo-espanol (blog comercial)

**México**
- https://mwm.ai/apps/hablemostea-asd-autism-app/6760207146
- https://appstore-discounts.com/en/app/6760207146
- https://apps.apple.com/mx/app/mand-aac/id6738563315
- https://rcs.cic.ipn.mx/2020_149_10/Sistema computacional aumentativo y alternativo de comunicacion con interfaz pictografica dinamica.pdf
- https://repositoriodigital.ipn.mx/jspui/bitstream/123456789/21853/2/COM-151-2015.pdf

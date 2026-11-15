# App SAAC gratuita para México: bloques técnicos y legales verificados

**Fecha de la investigación:** 10 de noviembre de 2026
**Alcance:** app de Comunicación Aumentativa y Alternativa (SAAC) gratuita y benéfica, en español de México, para niños con TEA, adultos con afasia, ELA o ACV y personas con parálisis cerebral. Se piensa en Android de gama baja y conexión inestable. La programará después un modelo de IA (Claude).

**Cómo leer este documento**
- **[V]** = verificado en una página abierta durante esta investigación (la URL va en la sección).
- **[NV]** = no verificado: viene de conocimiento previo o de una inferencia. Hay que confirmarlo antes de usarlo.
- **[I]** = interpretación o recomendación del autor, no un hecho.
- **Límites de la investigación.** Se agotó el presupuesto de búsquedas web. Además, varios sitios bloquearon el acceso automatizado: api.arasaac.org, arasaac.org (es una SPA con JavaScript), PubMed, los issues de GitHub (robots.txt), gob.mx/cofepris y el SAT. Esos puntos están marcados [NV] y se indica cómo verificarlos.

---

## 0. Resumen ejecutivo (decisiones recomendadas)

| Bloque | Recomendación | Motivo principal |
|---|---|---|
| Pictogramas | **ARASAAC** como set principal. Opcionales: **Mulberry** (CC BY-SA) y **OpenMoji** (CC BY-SA 4.0) para emociones y emojis. | Es el set más grande y maduro en español, gratuito y con API pública. Su licencia NC es compatible con una app 100 % gratuita, sin anuncios ni compras internas [I]. |
| Voz | Capa de abstracción **TTS** con tres motores: (1) TTS del sistema (Google TTS con la voz es-MX descargada para uso offline); (2) **Piper es_MX** embebido vía **sherpa-onnx** como respaldo offline garantizado; (3) **grabaciones propias** (message banking). | En gama baja muchas veces no hay un motor TTS instalado, o falta la voz es-MX. El respaldo embebido asegura que siempre haya voz. |
| Datos | Esquema interno propio, compatible con un superconjunto de **OBF/OBZ** (extensiones `ext_`). Importar y exportar OBZ desde la v1. | Permite el intercambio con Cboard, CoughDrop y AsTeRICS Grid (que importa OBF), además de copias de seguridad portables. |
| Arquitectura | **Web app (TypeScript + React/Preact, Vite, Workbox, IndexedDB)** como núcleo. Se empaqueta para Android con **Capacitor**, con plugins nativos de TTS, voz embebida y bloqueo de pantalla. La misma build se publica como PWA en Cloudflare Pages para iOS, escritorio y uso sin tienda. | Es el patrón que ya probó Cboard (React PWA + Cordova + plugin TTS nativo). Usa un solo código y es el stack con el que un modelo de IA es más productivo. |
| Privacidad | **Local-first**: sin cuentas, sin analítica personal y con copia de seguridad en un archivo exportable. La sincronización en la nube queda como opción futura, con cifrado de extremo a extremo. | La nueva LFPDPPP (DOF 20/03/2025) clasifica los datos de salud como sensibles: exige consentimiento expreso y por escrito y un aviso de privacidad. |
| Acceso alternativo | Barrido (scanning) propio con 1 o 2 interruptores que se capturan como teclas. Head-tracking con MediaPipe como función avanzada. Remitir a Camera Switches de Android. | Los switches Bluetooth emulan un teclado. El seguimiento ocular con webcam es poco preciso en gama baja [I]. |
| Distribución | Google Play (cuenta de organización, US$25 una vez) + PWA por URL. Evitar depender de APK sideload. | Google exigirá verificación de desarrollador para el sideload en todo el mundo en 2027. |

---

## 1. Pictogramas y licencias

### 1.1 ARASAAC (Gobierno de Aragón)

**Licencia [V]**
- Los recursos de ARASAAC se publican bajo licencia Creative Commons **BY-NC-SA**. La página de términos del Aula Abierta enlaza la escritura de **CC BY-NC-SA 4.0**, aunque el texto no cita la versión. La ficha del set ARASAAC en Global Symbols sí dice "Creative Commons BY NC SA 4.0", y el README de Cboard dice "ARASAAC (CC BY-NC-SA 4.0)".
- **Propiedad:** Gobierno de Aragón (Diputación General de Aragón). **Autor de los pictogramas:** Sergio Palao.
- **No se permite el uso comercial.** Los términos dicen literalmente "DO NOT MAKE COMMERCIAL USE OF THEM". Las obras derivadas deben distribuirse con la misma licencia (BY-NC-SA), citando a los autores, la procedencia y la licencia.
- La página de términos **no menciona apps, software ni uso offline** [V: se comprobó que no hay ninguna cláusula específica].

**Atribución (texto recomendado)**
- La plantilla oficial del Aula Abierta tiene los campos Autor / Procedencia / Licencia / Propiedad [V]. Global Symbols muestra "Pictograms Author: Sergio Palao, Owner: Government of Aragon (Spain)" [V]. El proyecto Lautstark/bildquelle exige la atribución en pantalla y también en todo lo que se imprima o exporte [V].
- Texto propuesto para el "Acerca de", el pie de cada exportación o impresión y la ficha de la tienda [I]:
  > "Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han sido creados por Sergio Palao para ARASAAC (https://arasaac.org), que los distribuye bajo Licencia Creative Commons BY-NC-SA 4.0."
  - El texto exacto que publica arasaac.org no se pudo abrir porque el sitio requiere JavaScript [NV en la redacción literal].

**API pública**
- Endpoints confirmados por terceros [V]:
  - `GET https://api.arasaac.org/v1/pictograms/{idioma}/search/{término}`. El idioma va en la ruta, por ejemplo `es` (fuente: Lautstark/bildquelle).
  - `GET https://api.arasaac.org/v1/pictograms/{id}`, que devuelve la imagen del pictograma por su número (fuente: artículo CEUR Vol-4038, paper 192).
  - Las imágenes estáticas están en `https://static.arasaac.org/pictograms/{id}/...` (Lautstark). El sufijo exacto aparece elidido en la fuente.
  - Base alternativa: `https://api.arasaac.org/api` (configuración del proyecto kitsteam/pictosearch).
- La especificación Swagger está en `https://api.arasaac.org/arasaac.json`, con Swagger UI en arasaac.org/developers/api (según docs/api.md del repo juanda99/arasaac-docker) [V que existe la referencia]. Desde este entorno el servidor respondió con error y **no se pudo leer** [NV en su contenido].
- **No requiere clave de API.** Lautstark no usa ninguna clave ni cuenta, y cachea las búsquedas 30 días en IndexedDB [V]. No se encontraron límites de tasa documentados [NV].
- La infraestructura es Node.js + Express + Swagger + MongoDB, con licencia MIT para el código del backend y del frontend (juanda99/arasaac-docker, juanda99/arasaac-frontend) [V]. Existe una imagen Docker pública, `cateduac/arasaac-api` [V], así que en teoría se podría alojar un espejo propio.
- **Parámetros de variantes:** pelo, piel, plural, tiempo pasado o futuro, color/blanco y negro, resolución y descarga. Se recuerdan como parámetros de consulta del endpoint `/v1/pictograms/{id}` (`plural`, `color`, `action=past|future`, `skin`, `hair`, `resolution`, `download`) **[NV: confirmar en el Swagger]**.
- Lo que sí está verificado en el tutorial oficial de ARASAAC [V]:
  - Hay pictogramas descriptivos y esquemáticos.
  - Hay versiones masculinas y femeninas para acciones, profesiones y cualidades.
  - El plural se marca con el signo "+".
  - Lautstark ofrece una versión en escala de grises generada por ARASAAC.

**Número de pictogramas: [NV]**
- No se pudo abrir ninguna fuente oficial con la cifra. El estudio de Frontiers (2024) analiza 1,525 pictogramas, pero es una muestra, no el total del catálogo [V].
- Es habitual leer "más de 13 000" [NV].

**¿Se puede empaquetar offline en una app gratuita? [I]**
- CC BY-NC-SA permite reproducir y distribuir con fines no comerciales. Empaquetar los archivos dentro de la app es una forma de reproducción, así que se permite si se cumplen tres condiciones: atribución, aviso de licencia y ausencia de fines comerciales.
- Si se modifican pictogramas (recortes, colores, composiciones), los derivados deben llevar la misma licencia BY-NC-SA.
- El código de la app no es una "obra derivada" de los pictogramas, así que puede tener su propia licencia. Se recomienda GPLv3 o AGPLv3, como Cboard y AsTeRICS Grid (ver §2.5 sobre espeak-ng).
- **Recomendación práctica:**
  - Empaquetar un **vocabulario núcleo** (entre 500 y 1,500 pictogramas, en PNG de 300 px o SVG/WebP) dentro de la app.
  - Descargar el resto bajo demanda desde la API y guardarlo en caché persistente.
  - Ojo: Cloudflare Pages limita el plan gratuito a 20,000 archivos por sitio [V], así que no conviene re-hospedar el catálogo completo como archivos sueltos.
- **Antes del lanzamiento**, pedir a ARASAAC una confirmación escrita del uso previsto (app gratuita, sin anuncios, ONG que recibe donativos), mediante su formulario de contacto (aulaabierta.arasaac.org/en/contact_us) [V que existe el formulario].
- **Nota de localización [I]:** las palabras clave de ARASAAC suelen estar en español de España (p. ej., "coche" frente a "carro", "zumo" frente a "jugo"). El modelo de datos debe separar la *etiqueta mostrada o hablada* (editable, es-MX) del *identificador del pictograma*.

**¿Es compatible CC BY-NC-SA con una app gratuita en tiendas y con donativos?**
- La definición de NC en CC 4.0 es "not primarily intended for or directed towards commercial advantage or monetary compensation" [V]. Lo que cuenta es el **propósito principal del uso**, no el tipo de organización. Ser ONG no basta por sí solo, y ser empresa tampoco descalifica automáticamente [V, CC wiki].
- La wiki de CC **no trata explícitamente** los donativos, la publicidad ni la distribución en tiendas [V].
- **Interpretación [I]:** una app gratuita, sin anuncios, sin compras internas y sin funciones premium cumple razonablemente el NC. Los donativos a la ONG deben ser:
  - **voluntarios**;
  - **no ligados al acceso a los pictogramas ni a ninguna función**;
  - preferentemente gestionados **fuera de la app**, en el sitio web.
- Hay precedentes de apps gratuitas en tiendas con ARASAAC: Cboard (Android/iOS/Windows) y AsTeRICS Grid [V que usan ARASAAC]. Global Symbols afirma que sus símbolos pueden integrarse "en productos gratuitos y comerciales", pero no aclara cómo encaja eso con el NC de ARASAAC [V].
- **Reglas de tiendas sobre donativos [V]:**
  - Apple 3.2.1(vi): solo las "Approved nonprofits" pueden recaudar dentro de la app, y deben ofrecer Apple Pay.
  - Apple 3.2.2(iv): las demás apps deben ser gratuitas y recaudar solo **fuera de la app** (Safari o SMS).
  - Apple 3.1.1: cualquier cosa que desbloquee funciones requiere compra integrada.
  - Google Play: su sistema de facturación **no debe usarse** para "tax exempt donations".
  - Recomendación: un enlace "Apoya el proyecto" que abra la web de la ONG en el navegador, sin desbloquear nada.

### 1.2 Otros sets

| Set | Licencia | Tamaño | Idioma y notas | Fuente |
|---|---|---|---|---|
| **Mulberry Symbols** (Steve Lee) | CC BY-SA. OpenSymbols indica "CC BY-SA 2.0 UK"; el README de Cboard indica "CC BY-SA 4.0" (discrepancia, verificar en mulberrysymbols.org) | 3,116 compartidos en OpenSymbols | Estilo adulto y neutro; etiquetas en inglés. Permite uso comercial (con SA). | [V] opensymbols.org/repositories/mulberry; github.com/cboard-org/cboard |
| **Global Symbols** | Agregador; la licencia depende de cada set | 37 sets (ARASAAC, Mulberry, Sclera, Tawasol, OpenMoji, Blissymbolics, PiCom, Jellow, etc.) | Tiene Board Builder. AsTeRICS Grid planea integrarlo vía OBF y OAuth. | [V] globalsymbols.com/symbolsets; netidee.at (PDF AsTeRICS Grid & Global Symbols) |
| **OpenMoji** | Gráficos CC BY-SA 4.0; código LGPL-3.0 | No indicado en el README [NV ~4,000] | Útil para emociones y conceptos. Atribución sugerida: "All emojis designed by OpenMoji…" | [V] cdn.jsdelivr.net/npm/openmoji@17.0.0/README.md |
| **Sclera** (Bélgica) | CC BY-NC 2.0 BE. El uso comercial requiere un acuerdo firmado | No indicado | Blanco y negro, alto contraste. Atribución: "www.sclera.be". | [V] sclera.be/en/picto/copyright |
| **Tawasol** (Mada, Qatar) | CC BY-SA 4.0 | — | Orientado a cultura y lengua árabe; poco útil para es-MX. | [V] globalsymbols.com/about/terms-and-conditions |
| **Blissymbolics** (BCI) | **CC BY 4.0** (no SA). Se permite el uso comercial con atribución clara a BCI | BCI-AV con versiones 2022–2026 | Sistema semántico; requiere enseñanza; nicho (parálisis cerebral con buen nivel cognitivo). | [V] blissymbolics.org/index.php/licensing |
| **PCS** (Tobii Dynavox / Boardmaker) | Comercial. Se necesita licencia para publicar PCS en apps o webs públicas con fines de lucro. "Maker Free" es gratuita para ONG o personas que distribuyen **materiales** PCS gratuitos (requiere suscripción activa a Boardmaker o TD Snap); "Maker Business" tiene precio a medida | 85,000+ símbolos, 25+ idiomas | Boardmaker 7: US$99/año (Personal), US$199/año (Professional) | [V] us.tobiidynavox.com/pages/pcs-licensing; …/boardmaker-7-purchase-options |
| **SymbolStix** (Everway/n2y) | Comercial | "Over 100K symbols"; incluye español | SymbolStix PRIME: US$190.99/año (1 educador + 15 alumnos). No se encontró información sobre licencias para apps de terceros. | [V] everway.com/products/symbolstix-prime/features |
| **OpenSymbols API** | Agregador con API (token, secreto compartido, límite 429) | — | Pide no exponer el secreto en el JS ni en el binario, así que exigiría un backend propio. | [V] opensymbols.org/api |

### 1.3 Recomendación de símbolos [I]
1. **ARASAAC** como set principal: es el más completo en español, tiene comunidad hispanohablante, es gratuito, tiene API sin clave y ofrece variantes de género y plural.
2. **Mulberry y OpenMoji** como sets secundarios opcionales. Su licencia CC BY-SA es más permisiva y no tiene NC, lo cual sirve como plan B si algún día hubiera dudas sobre el NC.
3. **Fotos propias** (cámara del dispositivo) como pictogramas personales. Son esenciales en afasia y TEA (familia, objetos reales) y se guardan solo en local.
4. **PCS y SymbolStix: descartados** por costo y licencia.
5. Guardar en cada símbolo su `license`, `author` y `source_url`, en línea con el objeto `license` de OBF. Así se puede generar automáticamente una pantalla de créditos y atribución.

---

## 2. Voz (TTS) en español de México

### 2.1 Web Speech API (`speechSynthesis`)

- **Soporte [V caniuse]:**
  - Chrome Android, Samsung Internet, Firefox Android y Safari iOS 7+: sí.
  - **Android WebView: NO.** Esto es crítico para Capacitor y Cordova: dentro de un WebView no hay `speechSynthesis`, así que hace falta un plugin nativo.
  - La confirmación práctica es que Cboard tuvo que crear `cboard-speech-tts`, un plugin Cordova que implementa la interfaz Web Speech sobre `android.speech.tts.TextToSpeech`, **solo para Android** [V].
  - Una **Trusted Web Activity** (TWA) corre en Chrome y no en WebView, así que sí tendría Web Speech [I, a probar].
- **Comportamiento en Android Chrome [V readium.org]:**
  - Chrome devuelve una lista de idiomas sin filtrar, que incluye idiomas cuyas voces **no están instaladas**. Si se elige uno de esos, cae a una voz en inglés.
  - No marca la voz por defecto.
  - Android "vanilla" ofrece voces de alta calidad para 67 idiomas o regiones (abril de 2024), pero el usuario muchas veces tiene que **descargarlas a mano**.
  - Edge en Android devuelve una lista vacía.
- **Ajustes de TTS en Android [V soporte Google]:** se elige el motor (Google, el del fabricante o uno de terceros), se instala la voz con "Instalar datos de voz", y se ajustan la velocidad y el tono.
- **¿Funciona offline en Android Chrome?** Si la voz es-MX de "Servicios de voz de Google" está descargada en el dispositivo, la síntesis local debería funcionar sin red **[NV: probar en dispositivo con modo avión; revisar `voice.localService`]**. La página de soporte de Google no menciona el uso offline [V que no lo menciona].
- **Gama baja y tablets genéricas:** según la guía de ARASAAC sobre AsTeRICS Grid, **la mayoría de las tablets Android no traen motor TTS instalado**; hay que instalar Servicios de voz de Google (recomendado), Samsung TTS, AhoTTS (español y euskera, gratis), o motores de pago como Acapela (unos 4–7 €) o Vocalizer [V].
  - Las tablets Samsung con One UI 7 **impiden que apps de terceros usen las voces Samsung** [V].
  - Vocalizer no funciona en Android reciente [V].
- **iOS / iPadOS [V readium]:**
  - Las voces descargables **no aparecen** en `getVoices()`.
  - Instalar la versión de mayor calidad de una voz precargada puede hacerla desaparecer.
  - Todas las voces reportan `default=true`.
  - Todos los navegadores de iOS usan WebKit.
  - La guía de ARASAAC recomienda **Paulina o Mónica** como voces offline en iOS, y dice que en iOS no se pueden añadir ni comprar voces [V].
  - Otras voces es-MX (p. ej., "Juan") [NV].
- **Windows [V Microsoft]:** voces es-MX naturales **Jorge** (masculina) y **Dalia** (femenina); estándar **Raúl** (masculina) y **Sabina** (femenina).
  - Según readium, Chrome y Firefox no listan las voces naturales; solo Edge las muestra, y ahí son solo en línea [V].
- **Otros bugs conocidos [V readium]:** en Chrome escritorio, las frases de más de 14 segundos fallan con algunas voces.

### 2.2 Motores offline open source

| Motor | Voces es-MX | Calidad y tamaño | Licencia | Notas |
|---|---|---|---|---|
| **Piper** (Rhasspy → OHF-Voice) | `es_MX-ald-medium` (63.2 MB .onnx, 22,050 Hz, 1 hablante; afinada desde `es_ES-davefx-medium`; dataset bajo Unlicense) y `es_MX-claude-high` (carpeta de 63.3 MB; dataset Apache-2.0). También hay carpetas es_ES y es_AR. | Neural (VITS), natural para su tamaño [I]. | El repositorio de voces es MIT. El motor nuevo `OHF-Voice/piper1-gpl` pasó a **GPLv3** en la v1.3.0; la última versión vista es v1.8.0. | [V] huggingface.co/rhasspy/piper-voices (MODEL_CARD); github.com/OHF-Voice/piper1-gpl/releases |
| **sherpa-onnx** (k2-fsa) | Ejecuta modelos Piper/VITS, Kokoro, Matcha y otros. Más de 100 modelos preentrenados en 40+ idiomas. | Funciona en Android (arm64/arm32/x86), iOS, **WebAssembly**, Flutter (Android/iOS/web/escritorio) y NodeJS. Para React Native solo hay un wrapper de terceros (`@siteed/sherpa-onnx.rn`). | Apache-2.0 (según SherpaTTS) | Hay APKs de ejemplo por voz; en Hugging Face aparece el nombre `sherpa-onnx-1.8.10-arm64-v8a-es-tts-vits-piper-es_MX-ald-medium.apk` [V que el nombre existe; no se pudo abrir]. |
| **SherpaTTS** (woheller69; F-Droid) | Cualquier voz Piper o Coqui; la descarga desde Hugging Face al primer arranque y luego funciona offline. | APK v3.4 de 86 MiB. Requiere **Android 10+**. | GPLv3; usa datos de eSpeak NG (GPLv3). | Se instala como **motor TTS del sistema**, de modo que cualquier app que use el TTS de Android lo aprovecha. El autor advierte que la verificación obligatoria de desarrolladores de Google podría impedir su instalación en dispositivos certificados [V]. |
| **eSpeak NG** | "es" / Latinoamérica [NV en la variante exacta es-419] | Síntesis por formantes: clara y útil a alta velocidad, pero menos natural; ocupa "pocos MB"; 100+ idiomas; Android 4.0+. | GPLv3+ | [V] github.com/espeak-ng/espeak-ng. Sirve como último recurso o para usuarios que prefieren velocidad. |
| **Coqui TTS / XTTS** | XTTS clona voz en español | Pesado para gama baja [I] | XTTS bajo **CPML** (Coqui Public Model License), no comercial | La empresa cerró su SaaS; los servidores se apagaron el **11 de diciembre de 2023** [V analyticsindiamag]. **No recomendado** por licencia y abandono. |

**Implicación de licencia [I]:** las voces Piper usan la fonemización de espeak-ng (GPLv3), y lo mismo pasa cuando se ejecutan en sherpa-onnx (SherpaTTS declara usar datos de eSpeak NG bajo GPLv3). Para embeber Piper sin problemas, la app debería ser **GPLv3 o AGPLv3**. Es coherente con un proyecto benéfico abierto: Cboard es GPLv3 y AsTeRICS Grid es AGPL-3.0 [V].

**Voces infantiles en español [V parcial]**
- Acapela, AssistiveWare y Tobii crearon **Emilio y Valeria** (2014), voces infantiles bilingües en "American Spanish" para niños de Latinoamérica y EE. UU. Acapela iba a licenciarlas a otros desarrolladores a partir de julio de 2014 (costo no publicado) [V assistiveware.com].
- No se encontró ninguna voz infantil es-MX open source en Piper [V: el catálogo es_MX solo tiene ald y claude].
- Alternativas [I]:
  - (a) Subir el `pitch` y la `rate` de una voz adulta: resultado pobre.
  - (b) **Grabar voces infantiles reales** con consentimiento, para frases clave.
  - (c) Entrenar o afinar una voz Piper con un dataset infantil propio: costoso y delicado éticamente.

### 2.3 Voz propia: voice banking y message banking

| Opción | Español | Costo | Notas | Fuente |
|---|---|---|---|---|
| **Apple Personal Voice** | **Sí, Spanish (Mexico)**, además de inglés de EE. UU. y mandarín | Gratis | iPhone 12+ / iPad Air 5+ / Mac con Apple silicon; iOS 17+. Se graba un conjunto de frases y se **procesa en el dispositivo**. Las apps nativas de terceros pueden usarla con `AVSpeechSynthesizer.requestPersonalVoiceAuthorization` si el usuario activa "Allow Apps to Request to Use". **No se documenta su uso desde web o Safari** [V que la fuente no lo menciona]. | [V] apple.com/ios/feature-availability; support.apple.com/HT213878; bendodson.com |
| **ElevenLabs Impact Program** | Clonación multilingüe [NV en la calidad del es-MX] | Voz gratis a través de organizaciones socias (ELA/EMN, AAC, AMS, ACV, cáncer de cabeza y cuello) | Acuerdo con **adELA** (España) del 28/10/2026: acceso gratuito para personas con ELA. Requiere internet y una cuenta en la nube, así que no es offline [I]. | [V] elevenlabs.io/impact-learn-more; elevenlabs.io/blog/elevenlabs-adela |
| **AhoMyTTS** (Aholab, UPV/EHU) | **Español** y euskera | No indicado en la página [NV, se cree gratuito] | Banco de voces: donantes sanos y personas con patología del habla. Las voces personalizadas se usan con el motor **AhoTTS**, gratis en Android. | [V] aholab.ehu.eus/ahomytts/what-is-ahomytts; aulaabierta.arasaac.org |
| **Acapela my-own-voice** | 23 idiomas; el español no se confirma en la fuente | Grabar 50 frases es gratis; se paga por descargar la voz | Tobii Dynavox la incluye sin costo con algunos dispositivos (2026) | [V] techcrunch.com (2023) |
| **ModelTalker** (Nemours) | No indicado [NV, enfocado en inglés] | US$100 por voz personalizada; US$10 por voz donada | — | [V] nemours.org |
| **Message banking** (grabar frases propias) | Cualquiera | Gratis | **Hay que implementarlo en la app**: MediaRecorder en web o grabación nativa; se guarda como `sound` en OBF. Es lo más valioso para ELA en etapas tempranas [I]. | — |

### 2.4 TTS en la nube (si se usara)

**Google Cloud TTS [V]**

| Tipo de voz | Gratis al mes | Precio por 1 M de caracteres después |
|---|---|---|
| Standard | 0–4 M caracteres | US$4 |
| WaveNet | 0–4 M caracteres | US$4 |
| Neural2 | 0–1 M | US$16 |
| Chirp 3: HD | 0–1 M | US$30 |
| Studio | 0–1 M | US$160 |

Los espacios y las etiquetas SSML también cuentan como caracteres.

**Azure [V parcial]:** voces neuronales con 0.5 M de caracteres gratis al mes. Los precios aparecen como "$-" en la página, así que no se pudieron leer.

**Recomendación [I]:** la nube **no debe usarse en el camino crítico**, porque la conexión es inestable y además implica privacidad (el texto que se habla es un dato sensible). Como mucho, serviría para **pregenerar** audios de un vocabulario núcleo en una voz de mejor calidad durante la build, y distribuirlos como archivos estáticos. Para unas 2,000 frases cortas (unos 30 k caracteres), cabe holgadamente en la capa gratuita [I, con base en los precios verificados].

### 2.5 Diseño recomendado de la capa de voz [I]

```
SpeechService (interfaz)
├── SystemTTS     → Web: speechSynthesis | Android: TextToSpeech nativo (plugin Capacitor)
├── EmbeddedTTS   → sherpa-onnx + Piper es_MX (descarga opcional ~63 MB, o incluida en un APK "con voz")
├── RecordedAudio → clips grabados por el usuario o la familia (message banking), prioridad máxima
└── PrebakedAudio → audios pregenerados del vocabulario núcleo (opcional)
```

- **Orden de resolución:**
  1. ¿Hay audio grabado para este botón?
  2. ¿Hay una voz del sistema es-MX/es-US/es-* *verificada* mediante una frase de prueba?
  3. Si no, usar el motor embebido.
- Un **asistente de primer uso** reproduce una frase de prueba y detecta si el sistema cayó a una voz en inglés. Si es así, ofrece:
  - (a) abrir los ajustes de TTS con `openInstall()` del plugin `@capacitor-community/text-to-speech`, solo en Android [V];
  - (b) descargar la voz embebida.
- En Android 11+, el manifiesto debe declarar en `<queries>` el intent del servicio TTS [V, documentación del plugin].

---

## 3. Formato de datos: Open Board Format (OBF/OBZ)

### 3.1 Qué es [V]
- Lo creó **CoughDrop** y lo anunció el 26/01/2015 como un formato de licencia abierta, para evitar el encierro de datos en los formatos propietarios de AAC (blog.mycoughdrop.com).
- Identificador de formato: `"open-board-0.1"`, versión actual 0.1 (gema Ruby `obf`, constante `FORMAT_CURRENT_VERSION`).
- **.obf** = un tablero en JSON. **.obz** = un ZIP con varios .obf, imágenes y sonidos, más un `manifest.json`.
- La web openboardformat.org es una SPA y no se pudo leer. Los campos siguientes salen del código de referencia `lib/obf/external.rb` (repo CoughDrop/obf, licencia MIT).

### 3.2 Campos (según el código de referencia) [V]

**Tablero**
- `format`, `id`, `locale`, `name`, `url`, `license`, `description_html`, `buttons[]`, `grid`, `images[]`, `sounds[]`.
- Además: `default_layout`, `background`, `data_url`, `default_locale`, `label_locale`, `vocalization_locale`.
- Cualquier clave `ext_*`: extensiones propietarias que se preservan.

**Botón**
- Identidad y texto: `id`, `label`, `vocalization`.
- Acción: `action` o `actions`.
- Posición libre: `left`, `top`, `width`, `height`.
- Apariencia: `border_color`, `background_color` (normalizados a `rgb()`).
- Navegación: `load_board {id, url, data_url, path}`.
- Otros: `hidden`, `url`, `image_id`, `sound_id`, `translations` (etiqueta, vocalización e inflexiones por idioma), `ext_*`.

**Imagen:** `id`, `width`, `height`, `url`, `data` (data URI), `data_url`, `content_type`, `license`, `protected`, `protected_source`, `path` (dentro del OBZ).

**Sonido:** `id`, `duration`, `license`, `url`, `data`, `data_url`, `content_type`, `path`.

**Cuadrícula:** `grid` = `{rows, columns, order[][]}`. El orden es una matriz de ids de botón; la gema la pasa por `parse_grid` y los subcampos están en `OBF::Utils`, que no se leyó [NV en el detalle].

**manifest.json (OBZ):** `{format, root: "boards/xxx.obf", paths: {boards:{id:path}, images:{id:path}, sounds:{id:path}}}`.

**Acciones especiales** del tipo `:clear`, `:backspace`, `:speak`, `:home`, `+a` (añadir letra) [NV: no se pudo abrir la especificación; confirmar en openboardformat.org/docs].

### 3.3 Quién lo soporta [V]
- **CoughDrop:** creador del formato.
- **Cboard:** importación con adaptador y exportación "OpenBoard" desde ajustes, desde 2018.
- **AsTeRICS Grid:** **solo importa** OBF. La exportación OBZ (con su .grd embebido) estaba planificada en el proyecto netidee de 2024.
- **SpeakPad:** importa y exporta; el OBZ es de pago.
- **obf-node** (MIT): convierte Grid 3 (.gridset), Snap (.spb/.sps) y TouchChat (.ce) a OBF, y valida OBF/OBZ.
- Soporte en Grid 3 nativo: [NV]. Solo se verificó que existe el conversor de terceros.

### 3.4 Recomendación [I]
- **Adoptar OBF/OBZ como formato de intercambio y de respaldo.** El modelo interno puede ser propio (más rico), pero cada tablero debe poder serializarse sin pérdida a OBF, con extensiones `ext_saac_mx_*` para lo que OBF no cubre:
  - configuración de barrido;
  - marcas de "palabra núcleo";
  - conjugaciones y género;
  - colores de la clave Fitzgerald;
  - referencia a una voz grabada.
- **Ventajas:**
  - Copia de seguridad portable: un archivo .obz que se comparte por WhatsApp o USB.
  - Interoperabilidad: un terapeuta puede preparar tableros en Cboard o CoughDrop.
  - Facilidad para la IA: el formato es JSON y está bien acotado.
- **Usar `data` (data URI) o `path` en el OBZ** para que los tableros sean autocontenidos y funcionen offline. Guardar `license` por imagen.

---

## 4. Arquitectura

### 4.1 Cómo lo resolvieron Cboard y AsTeRICS Grid [V]

**Cboard** (github.com/cboard-org/cboard)
- Stack: React, PWA con service worker y funcionamiento offline tras la primera visita; empaquetado con **Cordova** en un repo aparte (CCBoard).
- Plataformas: Android, iOS y Windows. Licencia GPLv3; 766 estrellas; 210 issues abiertos.
- Voz: la Speech Synthesis API del navegador. En Android usa su propio plugin `cboard-speech-tts`, porque el WebView no tiene Web Speech.
- Símbolos: Mulberry, ARASAAC y Global Symbols.
- Problema reconocido: traducciones a 40–50 idiomas, la mayoría automáticas y sin revisión nativa.

**AsTeRICS Grid** (github.com/asterics/AsTeRICS-Grid)
- Stack: Vue.js + PouchDB (sincronización con CouchDB), Workbox, PWA. Licencia AGPL-3.0 (documentación en CC BY-SA 4.0).
- Funciones: modo offline; barrido, interruptor, teclado y **eye tracking**; símbolos de ARASAAC y OpenSymbols; sincronización opcional **cifrada de extremo a extremo**; predicción de palabras.
- Problemas conocidos (guía de ARASAAC):
  - En iOS no se pueden añadir voces.
  - En Android normalmente hay que instalar un motor TTS.
  - Si no detecta una voz offline, usa voces **ResponsiveVoice en línea**, que la propia guía desaconseja en móviles por la latencia.
  - Samsung One UI 7 bloquea sus voces a las apps de terceros.
- Los issues de GitHub no se pudieron consultar (robots.txt) [NV en el detalle de cada issue].

**Lección [I]:** ambos eligieron una web app; el punto débil común es la **voz**. Hay que diseñar desde el día 1 una capa TTS con plugin nativo y una voz embebida de respaldo.

### 4.2 Comparación de opciones

| Criterio | PWA pura (React/Preact + SW + IndexedDB) | PWA + Capacitor (Android) | Nativa Android (Kotlin/Compose) | Flutter | React Native / Expo |
|---|---|---|---|---|---|
| Offline | Bueno, con service worker y Workbox. Hay riesgo de desalojo del almacenamiento "best-effort"; se mitiga con `navigator.storage.persist()`, que Chrome concede según la interacción del usuario [V MDN]. | Bueno: los archivos van en el APK y el almacenamiento es nativo. | Excelente | Excelente | Excelente |
| TTS | Depende del motor del sistema vía Chrome. En gama baja puede no haber voz es-MX [V]. Hay voz embebida posible vía sherpa-onnx WASM, pero es pesada [I]. | El WebView **no tiene** `speechSynthesis` [V], así que se usa un plugin nativo (`@capacitor-community/text-to-speech`, MIT) y se puede embeber sherpa-onnx nativo. | TextToSpeech nativo + sherpa-onnx (Kotlin API) | `flutter_tts` + sherpa-onnx con soporte **oficial** para Flutter [V] | `expo-speech` o `react-native-tts`; sherpa-onnx solo vía wrapper de terceros [V] |
| Almacenamiento | IndexedDB. Chrome: hasta ~60 % del disco por origen [V MDN] | IndexedDB + sistema de archivos nativo | SQLite/Room | SQLite / Isar | SQLite / MMKV |
| Switches (teclas) | `keydown` en `document`. Los switches BT/USB envían pulsaciones [V Google]. No se pueden capturar los botones de volumen [I]. | Igual, más `dispatchKeyEvent` nativo si hiciera falta | `onKeyDown` / `dispatchKeyEvent` | `KeyboardListener` / `Focus` | `onKeyDown` vía librería [NV] |
| Android Switch Access | Funciona si los botones son elementos accesibles (`<button>` con nombre) [I] | Igual | Nativo (contentDescription) | Semantics | accessibilityLabel |
| Modo kiosco | Solo fijación manual de pantalla (Android) o Acceso Guiado (iOS) [V] | Plugin que llama a `startLockTask()`. Sin DPC, entra en **fijación de pantalla** (que el usuario puede abandonar) [V] | Igual + lock task completo con DPC | Igual (plugin) | Igual (módulo) |
| Rendimiento en gama baja | Bueno si el bundle es pequeño (Preact/Svelte, imágenes WebP, virtualización) [I] | Similar a la PWA; el WebView de Android 7–9 puede ser lento [NV] | El mejor | Muy bueno (motor propio); APK base más grande [NV] | Bueno |
| Distribución | URL, sin tienda; no se ve afectada por la verificación de Google | Play Store + APK | Play Store + APK | Play, App Store y web | Play y App Store |
| iOS / escritorio | Sí (PWA) | iOS con Capacitor (sumando otro plugin) | No | Sí | Sí |
| Mantenimiento | Bajo | Bajo-medio (Gradle y plugins) | Medio (solo Android) | Medio | Medio (actualizaciones de Expo/RN) |
| Facilidad para la IA | **Muy alta** (TS/React es el stack con más ejemplos) [I] | Alta | Alta | Media-alta | Alta |

### 4.3 Recomendación [I]

**Núcleo web único (TypeScript)**
- Stack: Preact o React + Vite + Workbox + Dexie (IndexedDB) + Zustand.
- Rutas: modo comunicación, edición y ajustes.
- Se distribuye de tres formas:
  1. **APK y AAB para Google Play con Capacitor**, con plugins:
     - TTS nativo;
     - sherpa-onnx + Piper es_MX como módulo nativo propio (voz descargable o empaquetada en una variante "con voz");
     - lock task / fijación de pantalla;
     - sistema de archivos para importar y exportar OBZ.
  2. **PWA en Cloudflare Pages o GitHub Pages**, para iOS, escritorio, Chromebooks y quien no use la tienda. Usa `speechSynthesis` del navegador y audios pregrabados.
  3. Opcional: **TWA** si se quisiera evitar el WebView. Corre en Chrome y conserva Web Speech, pero pierde los plugins nativos [I, a probar].

**Motivos**
- Se reutiliza el patrón que ya funciona en Cboard.
- La parte "difícil" (voz offline) queda resuelta en nativo.
- Toda la lógica de la interfaz y el barrido se escribe una sola vez.

**Si el presupuesto o el tiempo obligan a elegir una sola plataforma**, nativa Kotlin es la alternativa más robusta en gama baja, aunque pierde iOS y web.

**Requisitos no funcionales sugeridos [I]**
- Arranque en frío menor de 2 s en un dispositivo de 2 GB de RAM.
- Bundle JS inicial menor de 300 KB gzip.
- Vocabulario núcleo empaquetado menor de 25 MB.
- Funcionamiento 100 % offline después de la instalación.
- Latencia de pulsación a voz menor de 300 ms (voz del sistema) y menor de 600 ms (voz embebida).
- Probar en Android 8–10, que siguen comunes en gama baja [NV en la distribución exacta de versiones en México].

**Persistencia y respaldo**
- Pedir `navigator.storage.persist()` [V].
- Exportación automática periódica a .obz en Descargas (nativo).
- Recordatorio de copia de seguridad.

---

## 5. Acceso alternativo

### 5.1 Barrido (scanning): implementación [I, buenas prácticas]
- **Entradas:** cualquier `keydown` configurable (Espacio, Enter, flechas o la tecla que mande el switch BT/USB), toque en una zona grande de la pantalla, clic de mouse o joystick.
  - Google confirma que los switches externos envían pulsaciones por USB o Bluetooth, y que las teclas de un teclado normal pueden actuar como interruptores [V support.google.com/accessibility/android/answer/6122836].
- **Modos:**
  - automático con 1 switch: el resaltado avanza solo y se selecciona con el switch;
  - paso a paso con 2 switches: uno avanza y otro selecciona;
  - barrido inverso: avanza mientras se mantiene presionado.
- **Patrones:** lineal, fila-columna, por bloques o grupos, y barrido auditivo (dice la etiqueta en voz baja o con otra voz antes de seleccionar; útil con baja visión o parálisis cerebral).
- **Parámetros configurables por usuario:**
  - intervalo (0.3–5 s);
  - tiempo de aceptación (mantener X ms para que cuente);
  - retardo post-selección (ignorar pulsaciones repetidas);
  - ignorar `event.repeat`;
  - número de vueltas antes de pausar;
  - empezar en el último elemento usado;
  - resaltado de alto contraste (borde grueso + escala), que cumple WCAG 2.4.11 (foco no oculto) [V que el criterio existe].
- **Conflicto con Switch Access de Android:** si el servicio está activo, captura las teclas que tiene asignadas. Hay que documentar que se use el barrido propio **o** Switch Access, no los dos a la vez.
- **Interacción con Camera Switches:**
  - Camera Switches se configura dentro de Switch Access y **no puede usarse junto con otras apps que usen la cámara** [V].
  - El head-tracking propio y Camera Switches son incompatibles al mismo tiempo.

### 5.2 Seguimiento ocular y de cabeza con cámara
- **WebGazer.js** [V webgazer.cs.brown.edu]:
  - Corre 100 % en el navegador, se calibra con clics (demo de 9 puntos) y tiene licencia **GPLv3**.
  - Desde el 24/02/2026 "updates are no longer guaranteed".
  - **El sitio no publica cifras de precisión**, y el código actual ya no coincide con el del paper de IJCAI 2016.
  - Su precisión real en grados: [NV]. **[I]** No es apto para seleccionar celdas pequeñas en gama baja; como mucho, para 2–4 zonas grandes.
- **MediaPipe Face Landmarker** [V developers.google.com]:
  - Da 478 landmarks 3D y 52 blendshapes (p. ej., `jawOpen`, `browDown*`) en tiempo real.
  - Funciona en web (`@mediapipe/tasks-vision`), Android, iOS y Python.
  - **[I]** Permite: (a) **puntero por movimiento de cabeza** (nariz → cursor, con selección por permanencia o *dwell*); (b) **switches faciales** (sonrisa, boca abierta, cejas, parpadeo sostenido) que alimentan el barrido.
  - Es más robusto que la mirada con una webcam barata. Requiere probar FPS en gama baja [NV].
- **Google Look to Speak** [V blog.google]:
  - Android 9+, publicada el 8/12/2020.
  - Se eligen frases preescritas con la mirada (izquierda, derecha, arriba).
  - **Idiomas: no verificados** (la Play Store y la página no los muestran) [NV].
- **Google Project Activate:** no se pudo abrir ninguna página oficial [NV en idiomas y países].
- **Camera Switches (Android)** [V]:
  - Gestos: mirar a la derecha, izquierda o arriba; sonreír; abrir la boca; levantar las cejas.
  - Se ajustan el tamaño del gesto y el tiempo de sostenido.
  - Requiere Switch Access. La página cita Android 6 o posterior.
  - Idiomas no indicados.
  - **[I]** Es la vía "gratis" recomendable para personas con ELA o parálisis cerebral, siempre que la app sea accesible (botones nativos o semánticos).

### 5.3 Hardware
- **Switches comerciales:** Google menciona como ejemplos a AbleNet, Enabling Devices, RJ Cooper y Tecla [V]. Precios en México [NV].
- **Opciones de bajo costo [I]:**
  - un teclado BT o USB barato, usando 1–2 teclas grandes;
  - un mouse USB por OTG (clic = selección);
  - interruptor DIY: microcontrolador con BLE HID (p. ej., ESP32) + jack de 3.5 mm para switches estándar, que emula una tecla. Costo estimado [NV].
- **Tobii Dynavox PCEye** [V]:
  - Solo Windows, pantallas de hasta 27".
  - **Precio no publicado** en la página de producto; se gestiona por "How to Buy" [NV en el costo].
- **Fijación de pantalla y kiosco:**
  - **Android:** "Fijar apps" en Ajustes > Seguridad. Para desfijar pide PIN, patrón o contraseña [V].
  - Una app puede llamar a `startLockTask()`. Sin estar en la lista permitida de un DPC, entra en **modo fijación**, que el usuario puede abandonar. El lock task completo requiere un DPC o dispositivo gestionado [V developer.android.com].
  - **iOS:** Acceso Guiado bloquea en una sola app; permite desactivar zonas táctiles, botones y teclado, y poner límites de tiempo; se sale con un código, Face ID o Touch ID [V support.apple.com/111795].

---

## 6. Contexto México y marco legal

### 6.1 Estadísticas
- **ENADID 2023 (INEGI, comunicado 684/24)** [V]:
  - **8.8 millones** de personas de 5 años o más con discapacidad: **7.2 %** de 121.6 millones. 53.5 % son mujeres.
  - El 50 % tiene 60 años o más.
  - Por estado: Zacatecas tiene el máximo (11.2 %) y Coahuila el mínimo (5.2 %).
  - Causas: enfermedad 43.9 %, edad avanzada 27.2 %, nacimiento 14.0 %, accidente 11.4 %.
  - Asistencia escolar (5–29 años): 46 de cada 100 con discapacidad, frente a 60 de cada 100 sin discapacidad.
  - **"Hablar o comunicarse":** aparece en la gráfica 3. El valor extraído (~9.2 %) salió de una gráfica mal legible, así que es **[NV]**; verificar en la base de datos de la ENADID 2023.
  - Fuente: inegi.org.mx/contenidos/saladeprensa/aproposito/2024/EAP_PCD24.pdf
- **Censo 2020 (INEGI, comunicado 713/21)** [V]:
  - **7,168,178** personas con discapacidad y/o condición mental: **5.69 %** de 126,014,024.
  - Desglose: 5,577,595 solo con discapacidad; 723,770 solo con condición mental; 602,295 con ambas.
  - **Unas 945 mil personas** con dificultad para **hablar o comunicarse** (la actividad menos reportada).
  - Unos 899 mil niños de 0 a 14 años con discapacidad y/o condición mental.
  - Fuente: inegi.org.mx/contenidos/saladeprensa/aproposito/2021/EAP_PersDiscap21.pdf
- **TEA, estudio de León, Guanajuato** [V]:
  - Fombonne E., Marcin C., Manero A.C. et al. *Prevalence of Autism Spectrum Disorders in Guanajuato, Mexico: The Leon survey*. J Autism Dev Disord 46(5):1669–1685, 2016.
  - **Prevalencia de 0.87 % (IC 95 %: 0.62–1.1 %)** en niños de 8 años; 36 casos confirmados. Muestra: escuelas regulares (N = 11,684) y educación especial o registros médicos (N = 432).
  - El estudio no extrapola un número nacional [V].
  - Fuente: link.springer.com/article/10.1007/s10803-016-2696-6
- **Android frente a iOS en México (StatCounter, octubre de 2026)** [V]: **Android 74.1 %**, **iOS 25.89 %**. Fuente: gs.statcounter.com/os-market-share/mobile/mexico
- **Ingreso de los hogares (ENIGH 2024, INEGI)** [V]:
  - Ingreso corriente promedio **mensual** por hogar: **$25,955 MXN**.
  - Decil I: **$5,598 MXN/mes**. Decil X: $78,698.
  - Fuente: inegi.org.mx/contenidos/saladeprensa/boletines/2025/enigh/ENIGH2024.pdf
- **Costo de las soluciones comerciales (referencia)** [V]:
  - Proloquo2Go: US$249.99–299.99 (iOS); exige iOS 18+, es decir, un iPad reciente.
  - Boardmaker 7: US$99/año.
  - SymbolStix PRIME: US$190.99/año.
  - Precios de los dispositivos dedicados de Tobii Dynavox: no publicados [NV].
  - **[I]** Con un tipo de cambio supuesto de ~18–20 MXN/USD [NV], Proloquo2Go equivale aproximadamente al **ingreso mensual completo de un hogar del decil I**, sin contar el iPad. Eso justifica una solución gratuita para Android de gama baja.

### 6.2 Protección de datos: nueva LFPDPPP (2025) [V]
- **Publicación:** DOF del **20 de marzo de 2025**; última reforma, DOF del 14/11/2025.
- **Autoridad:** **Secretaría Anticorrupción y Buen Gobierno** (art. 2 fr. XV; arts. 38–39). Sustituye al INAI en este ámbito.
- **Datos sensibles** (art. 2 fr. VI): incluyen el "estado de salud presente o futuro".
- **Consentimiento para datos sensibles** (art. 8): debe ser **expreso y por escrito** (firma autógrafa, firma electrónica u otro mecanismo de autenticación). Además, se prohíbe crear bases de datos sensibles sin una finalidad legítima y concreta.
- **Excepciones al consentimiento** (art. 9): disposición legal, fuentes de acceso público, disociación previa, relación jurídica, emergencia, atención médica cuando el titular no puede consentir, o mandato judicial.
- **Aviso de privacidad** (arts. 14–17):
  - Contenido mínimo: identidad y domicilio del responsable; datos tratados (señalando los sensibles); finalidades; opciones para limitar el uso; medios ARCO; cambios al aviso.
  - Se permite un aviso simplificado en medios electrónicos, con enlace al completo.
- **Derechos ARCO** (arts. 21–31): respuesta en 20 días, prorrogables una vez. Pueden ejercerse por medio de un **representante legal**; los detalles quedan para el Reglamento (art. 41).
- **Menores y personas en estado de interdicción:** en el texto revisado no se encontró ninguna regla específica [V que no aparece]. **[I]** Aplica la representación legal (madre, padre o tutor) según el Código Civil, y conviene recabar el consentimiento del representante.
- **Implicaciones para la app [I]:**
  - **Solo local:** el vocabulario, las frases, las fotos de la familia y los audios se quedan en el dispositivo; la ONG no recibe ni accede a nada. En ese caso es defendible que la ONG no actúa como "responsable" del tratamiento, porque solo provee software. Aun así, conviene publicar un **aviso de privacidad** que lo explique: "no recabamos datos; todo se guarda en tu dispositivo".
  - **Nube, sincronización o analítica con datos identificables:** la ONG pasa a ser responsable de datos **sensibles** (el uso de la app revela una discapacidad o condición de salud). Eso exige consentimiento expreso y por escrito del titular o su representante, aviso completo, medidas de seguridad, atención de derechos ARCO y contratos con los encargados (hosting).
  - **Recomendación:** local-first, sin cuentas en la v1, telemetría desactivada por defecto (y si se usa, agregada y anónima) y exportación de respaldo por archivo. Si se añade sincronización, que use **cifrado de extremo a extremo**, como el modelo opcional de AsTeRICS Grid [V que AsTeRICS lo ofrece].

### 6.3 ¿Es un "dispositivo médico" ante COFEPRIS?
- **[V parcial]:**
  - La Ley General de Salud (última reforma DOF 15/01/2026) incluye en el art. 3 fr. XXIII, entre los productos sujetos a control sanitario, los equipos médicos y las "**prótesis, órtesis y ayudas funcionales**".
  - No se pudo leer el art. 262 con las definiciones (el PDF se truncó) [NV en el texto literal].
  - La página de COFEPRIS sobre dispositivos médicos no se pudo abrir [NV].
- **Referencia internacional [V]:** en EE. UU., el "Powered communication system" (21 CFR 890.3710) es un **dispositivo médico clase II** (controles especiales), **exento de 510(k)**, "intended for medical purposes".
- **[I]** Hay un riesgo regulatorio no nulo si la app se presenta con fines terapéuticos o de rehabilitación. Para mitigarlo:
  - posicionarla como **herramienta de comunicación y educativa de uso general**;
  - no afirmar diagnóstico, tratamiento ni rehabilitación;
  - no venderla;
  - **consultar formalmente a COFEPRIS** (o a un abogado regulatorio) antes de alianzas con instituciones de salud.

### 6.4 Ley General para la Inclusión de las Personas con Discapacidad (LGIPD) [V]
- **Última reforma:** DOF del 14/06/2024.
- **Art. 2 fr. V, "Comunicación":** incluye lenguaje escrito y oral, LSM, Braille y "otros modos, medios, sistemas y formatos **aumentativos o alternativos** de comunicación". Es el respaldo legal explícito del SAAC.
- **Art. 2 fr. IV, ayudas técnicas:** dispositivos tecnológicos que compensan limitaciones.
- **Art. 7 fr. IV:** la Secretaría de Salud debe crear bancos de ayudas técnicas.
- **Art. 32:** acceso a las TIC.
- **Art. 2 fr. I y XV:** definiciones de accesibilidad y diseño universal.
- **[I]** Sirve para fundamentar alianzas con el DIF y los CRIT y para gestionar donaciones de tablets.

### 6.5 Normas de accesibilidad
- **WCAG 2.2** [V]: es la Recomendación W3C (versión fechada el 12/12/2024). Criterios nuevos:
  - 2.4.11 Foco no oculto (AA);
  - 2.5.7 Movimientos de arrastre (AA);
  - **2.5.8 Tamaño del objetivo (mínimo) (AA)**; el umbral de 24×24 px no se leyó por truncamiento [NV en la cifra];
  - 3.2.6 Ayuda consistente (A);
  - 3.3.7 Entrada redundante (A);
  - 3.3.8 Autenticación accesible (AA).
  - Se eliminó el 4.1.1.
  - **[I]** Para SAAC, apuntar a AA y superarlo: celdas mucho más grandes, sin arrastre, sin autenticación cognitiva y con contraste alto.
- **NOM mexicana de accesibilidad para software o apps:** no se encontró ni se verificó [NV]. No se conoce ninguna NOM obligatoria para apps privadas.

---

## 7. Financiamiento y sostenibilidad

| Recurso | Datos verificados | Fuente |
|---|---|---|
| **Google Play** | Registro único de **US$25**. La cuenta de **organización** requiere número **D-U-N-S** (gratuito, hasta 30 días); hay verificación alternativa si D&B no lo da. Las cuentas **personales** creadas después del 13/11/2023 necesitan una prueba cerrada con **12 testers durante 14 días** consecutivos. No se menciona exención para ONG. | [V] support.google.com/googleplay/android-developer/answer/6112435, /13628312, /14151465 |
| **Verificación de desarrolladores Android (sideload)** | Desde el 30/09/2026 aplica en Brasil, Indonesia, Singapur y Tailandia; **global en 2027**. Cuenta de distribución limitada gratuita (hasta 20 dispositivos, sin ID). Las apps de desarrolladores no registrados requieren un "flujo avanzado" con bloqueo de 24 h. | [V] androidauthority.com; thehackernews.com (06/2026) |
| **Apple Developer** | US$99/año. **Exención** para organizaciones sin fines de lucro reconocidas por una autoridad de su región, instituciones educativas acreditadas y gobierno. No aplica a personas físicas; no se puede tener firmado el Paid Applications Agreement ni vender bienes digitales. Lista de países no publicada (México [NV]). | [V] developer.apple.com/help/account/membership/fee-waivers |
| **Google for Nonprofits** | Requiere una ONG "in good standing" verificada por un socio. **Excluye** gobierno, **hospitales u organizaciones de salud** y escuelas. La página no confirma a México [NV]. **[I]** Conviene definir el objeto social como asistencia o inclusión y no como "salud" para no quedar excluidos. | [V] google.com/nonprofits/eligibility |
| **GitHub Pages** | Sitio de hasta 1 GB; 100 GB al mes (límite suave); 10 builds por hora. Prohíbe su uso como hosting de negocio, e-commerce o SaaS comercial; un proyecto benéfico gratuito encaja [I]. | [V] docs.github.com |
| **Cloudflare Pages (gratis)** | 500 builds al mes; **20,000 archivos por sitio**; 25 MiB por archivo; 100 proyectos. El ancho de banda no se indica en esa página. | [V] developers.cloudflare.com/pages/platform/limits |
| **Donataria autorizada (SAT)** | No se pudo verificar en sitios oficiales [NV]. Lo conocido: figura de A.C. o I.A.P., actividades asistenciales que incluyen atención a personas con discapacidad (LISR, Título III, art. 79), requisitos del art. 82 (destino del patrimonio, transparencia, límite de gastos de administración) y deducibilidad para donantes con tope [NV en cifras y fracciones]. **Asesorarse con un contador.** | — |
| **Donativos en apps** | Apple: dentro de la app solo para "approved nonprofits" con Apple Pay; si no, solo fuera de la app. Google Play: no usar su facturación para "tax exempt donations". | [V] developer.apple.com/app-store/review/guidelines; support.google.com/googleplay/android-developer/answer/9858738 |

**Costo operativo mínimo estimado [I]**
- Hosting: US$0 (Cloudflare Pages).
- Dominio: unos US$10–15 al año [NV].
- Google Play: US$25 una sola vez.
- Apple: US$0 con exención, o US$99 al año.
- Sin servidores: sin backend en la v1 y con la API de ARASAAC llamada desde el cliente, con caché.

Riesgos de dependencia externa: la API de ARASAAC (se mitiga empaquetando el núcleo) y Hugging Face para descargar voces (se mitiga alojando el modelo de 63 MB en Cloudflare R2 o en GitHub Releases [NV en límites]).

---

## 8. Pendientes de verificación (para la siguiente iteración)

1. **ARASAAC:**
   - número actual de pictogramas;
   - Swagger (`api.arasaac.org/arasaac.json`) con los parámetros `skin`, `hair`, `plural`, `action` y `resolution`;
   - límites de uso de la API;
   - texto literal de atribución en arasaac.org;
   - confirmación escrita del uso en una app gratuita con donativos.
2. **Voz:** idiomas de Look to Speak y Project Activate; voces iOS es-MX además de Paulina; comportamiento offline de Chrome Android con la voz es-MX descargada (prueba en dispositivo).
3. **COFEPRIS:** clasificación del software SAAC (art. 262 de la LGS, Reglamento de Insumos para la Salud y NOM-241-SSA1).
4. **SAT:** requisitos vigentes de donataria autorizada (LISR arts. 79, 82 y 151; RMF 2026).
5. **Datos:** "hablar o comunicarse" en la ENADID 2023 (base de datos INEGI).
6. **Hardware y precios:** Tobii PCEye en México; precio de los switches; salario mínimo 2026 (CONASAMI).
7. **WCAG:** umbral 2.5.8 (24×24 CSS px) y fecha de la primera publicación de WCAG 2.2.

---

## 9. Fuentes abiertas (todas consultadas el 10/11/2026)

**Pictogramas y licencias**
- https://aulaabierta.arasaac.org/en/terms-of-use
- https://aulaabierta.arasaac.org/en?p=67394
- https://globalsymbols.com/symbolsets/arasaac/symbols/90713?locale=es
- https://globalsymbols.com/about/terms-and-conditions?locale=en
- https://globalsymbols.com/symbolsets?locale=en
- https://github.com/Lautstark/bildquelle
- https://ceur-ws.org/Vol-4038/paper_192.pdf
- https://github.blesdmm.dns-dynamic.net/kitsteam/pictosearch
- https://github.com/juanda99/arasaac-frontend
- https://github.com/juanda99/arasaac-docker
- https://github.com/juanda99/arasaac-docker/blob/master/docs/api.md
- https://hub.docker.com/r/cateduac/arasaac-api
- https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1467796/pdf
- https://www.opensymbols.org/repositories/mulberry
- https://www.opensymbols.org/api
- https://www.sclera.be/en/picto/copyright
- https://cdn.jsdelivr.net/npm/openmoji@17.0.0/README.md
- https://blissymbolics.org/index.php/licensing
- https://us.tobiidynavox.com/pages/pcs-licensing
- https://us.tobiidynavox.com/pages/boardmaker-7-purchase-options
- https://www.everway.com/products/symbolstix-prime/features/
- https://wiki.creativecommons.org/NonCommercial_interpretation

**Voz**
- https://caniuse.com/speech-synthesis
- https://readium.org/speech/docs/WebSpeech.html
- https://support.google.com/accessibility/android/answer/6006983?hl=en
- https://aulaabierta.arasaac.org/en/dinamic-communicator-asterics-aac-synthesised-voices-tts-android-ios
- https://github-users.yhajoa.workers.dev/cboard-org/cboard-speech-tts
- https://www.skypack.dev/view/@capacitor-community/text-to-speech
- https://huggingface.co/rhasspy/piper-voices/tree/main/es
- https://huggingface.co/rhasspy/piper-voices/blob/main/es/es_MX/ald/medium/MODEL_CARD
- https://huggingface.co/rhasspy/piper-voices/blob/main/es/es_MX/claude/high/MODEL_CARD
- https://huggingface.co/rhasspy/piper-voices/tree/53a69cdc2086f67104aed8f7e1e35706a90b040d/es/es_MX/ald/medium
- https://github.com/OHF-Voice/piper1-gpl/releases
- https://cdn.jsdelivr.net/gh/k2-fsa/sherpa-onnx@master/README.md
- https://f-droid.org/ca/packages/org.woheller69.ttsengine
- https://github.com/biodranik/ttsengine
- https://github.com/espeak-ng/espeak-ng
- https://analyticsindiamag.com/conversational-ai-startup-coqui-shuts-down/
- https://www.apple.com/ios/feature-availability/
- https://support.apple.com/HT213878
- https://bendodson.com/weblog/2024/04/03/using-your-personal-voice-in-an-ios-app/
- https://support.microsoft.com/en-us/Accessibility/windows/narrator/appendix-a-supported-languages-and-voices
- https://elevenlabs.io/impact-learn-more
- https://elevenlabs.io/blog/elevenlabs-adela
- https://aholab.ehu.eus/ahomytts/what-is-ahomytts
- https://techcrunch.com/2023/05/08/acapela-lets-anyone-back-up-their-own-voice-for-free-in-minutes-just-in-case
- https://www.nemours.org/pediatric-research/research-labs/speech.html
- https://assistiveware.com/press-releases/worlds-first-bilingual-spanish-english-childrens-text-speech-voices
- https://cloud.google.com/text-to-speech/pricing
- https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/

**Formato OBF**
- https://raw.githubusercontent.com/CoughDrop/obf/master/lib/obf/external.rb
- https://github.com/CoughDrop/obf
- https://www.rubydoc.info/gems/obf/0.7.0/OBF/OBF
- https://blog.mycoughdrop.com/unlocking-board-files
- https://www.cboard.io/en/blog/2018-06-30-cboard-openboard-support/
- https://www.netidee.at/sites/default/files/2024-09/AsTeRICS%20Grid%20and%20Global%20Symbols.pdf
- https://www.speakpadapp.com/blog/import-aac-boards-obf-obz/
- https://willwade.github.io/obf-node

**Arquitectura y acceso**
- https://github.com/cboard-org/cboard
- https://github.com/asterics/AsTeRICS-Grid
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- https://developer.android.com/work/dpc/dedicated-devices/lock-task-mode
- https://support.google.com/android/answer/9455138?hl=en
- https://support.apple.com/en-us/111795
- https://support.google.com/accessibility/android/answer/6122836?hl=en
- https://support.google.com/accessibility/android/answer/11150722?hl=en
- https://webgazer.cs.brown.edu/
- https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker
- https://experiments.withgoogle.com/looktospeak
- https://blog.google/outreach-initiatives/accessibility/look-to-speak/
- https://us.tobiidynavox.com/products/pceye

**México y marco legal**
- https://www.inegi.org.mx/contenidos/saladeprensa/aproposito/2024/EAP_PCD24.pdf
- https://www.inegi.org.mx/contenidos/saladeprensa/aproposito/2021/EAP_PersDiscap21.pdf
- https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enigh/ENIGH2024.pdf
- https://link.springer.com/article/10.1007/s10803-016-2696-6
- https://gs.statcounter.com/os-market-share/mobile/mexico
- https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- https://www.diputados.gob.mx/LeyesBiblio/pdf/LGIPD.pdf
- https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf
- https://www.ecfr.gov/current/title-21/chapter-I/subchapter-H/part-890/subpart-D/section-890.3710
- https://www.w3.org/TR/WCAG22/
- https://www.assistiveware.com/products/proloquo2go

**Financiamiento y distribución**
- https://support.google.com/googleplay/android-developer/answer/6112435?hl=en
- https://support.google.com/googleplay/android-developer/answer/13628312?hl=en
- https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- https://support.google.com/googleplay/android-developer/answer/9858738?hl=en
- https://www.androidauthority.com/android-sideloading-changes-timeline-3679204/
- https://thehackernews.com/2026/06/google-sets-sept-30-deadline-for.html
- https://developer.apple.com/help/account/membership/fee-waivers/
- https://developer.apple.com/app-store/review/guidelines/
- https://www.google.com/nonprofits/eligibility/
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/pages/platform/limits/

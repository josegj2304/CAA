# Contexto de la mesa de expertos

## El proyecto
- José (estudiante/practicante en México, no es desarrollador senior) quiere construir una app SAAC (comunicación aumentativa y alternativa) GRATUITA y benéfica, en español de México, para gente que no puede pagar software de ~US$300 (Proloquo2Go, TouchChat, LAMP) o suscripciones (TD Snap US$9.99/mes).
- Poblaciones objetivo: niños con TEA / retraso del lenguaje, adultos con afasia/ELA/ACV, personas con parálisis cerebral/discapacidad motriz. (Habrá que recortar para una v1.)
- La app la programará principalmente un modelo de IA de programación ("Fable", un modelo de Claude) guiado por José. Presupuesto casi cero. Sin restricción técnica definida por José: el debate debe decidir.
- Datos de México: Android 74 % / iOS 26 % (StatCounter oct-2026); decil más pobre gana ~MXN 5,598/mes por hogar (ENIGH 2024); ~945 mil personas con dificultad para hablar o comunicarse (Censo 2020).

## Investigación disponible (léela antes de argumentar; cita de ahí)
- r1_software_comercial.md — funciones y precios del software comercial líder.
- r2_alternativas_gratuitas.md — alternativas gratuitas (Asterics AAC/AsTeRICS Grid, Cboard, etc.), huecos, análisis de forkear vs construir.
- r3_clinica_vocabulario.md — evidencia clínica, principios de diseño, listas de vocabulario.
- r4_tecnico_mexico.md — pictogramas/licencias, TTS es-MX, OBF, arquitectura, acceso alternativo, marco legal México.

Hallazgos que pesan mucho:
- Asterics AAC (AGPL, Vue 2 sin soporte, PWA, no está en tiendas, ~82 % commits de una persona) ya tiene el barrido/acceso más completo del ecosistema gratuito, OBF import, predicción; pero sus tableros en español son de España y sin formas de palabra cargadas.
- Cboard (GPL-3, React PWA + apps nativas en tiendas, freemium 8 USD/mes, México hoy en la lista de países sin cobro, depende de backend pesado y analítica, solo es-ES).
- Hueco principal: español de México real (léxico, conjugación, concordancia de género/número), voz es-MX offline confiable en Android barato (Android WebView NO tiene speechSynthesis; muchas tablets sin motor TTS), módulo adulto (afasia/ELA), implementación/capacitación.
- Voces Piper es_MX (ald, claude) ~63 MB, offline; sherpa-onnx corre en Android/iOS/WASM/Flutter.

## Las dos preguntas del debate
1. ESTRATEGIA Y ARQUITECTURA: ¿Cómo debe construirse la app? (contribuir/forkear Asterics AAC, forkear/colaborar con Cboard, construir desde cero como PWA TypeScript + Capacitor, construir desde cero nativa/multiplataforma con Flutter, u otra.)
2. FORMATO DE ENTREGA DE ESTA INVESTIGACIÓN para que Fable construya la app: ¿qué paquete de documentos/datos le damos a Fable? (p.ej. un documento único de requisitos; un "kit de arranque" de repositorio con PRD.md + especificaciones por módulo + criterios de aceptación + datos de vocabulario en JSON/OBF + CLAUDE.md; un doc vivo para humanos + Excel; etc.). Considera que José también necesita entenderlo y que terapeutas podrían revisar el vocabulario.

## Criterios de evaluación (los usará el juez)
1. Valor clínico para los usuarios (funciones con evidencia, español MX, acceso motor).
2. Viabilidad real para José + un modelo de IA como programador principal (complejidad, deuda técnica, tamaño del código a entender).
3. Funcionamiento offline en Android de gama baja y voz es-MX confiable.
4. Costo de operación ~0 y sostenibilidad a 3 años (mantenimiento, dependencia de terceros, bus factor).
5. Licencias y marco legal (ARASAAC CC BY-NC-SA, GPL/AGPL, LFPDPPP datos sensibles).
6. Tiempo hasta una v1 útil probada con usuarios reales.
7. Impacto en el ecosistema (no fragmentar, interoperabilidad OBF).

# Réplica: ingeniero móvil (postura C)

## 1. Puntos débiles de los oponentes

**A (Asterics):**
- **La voz queda para después.** A admite que, si sherpa-onnx se atora, "la v1 sale con la voz del sistema". En gama baja eso es una tablet muda, porque la mayoría no trae motor TTS (r4 §2.1).
- **"No tocar el núcleo" no es realista.** El polyfill, el preset es-MX y quitar Matomo, que el propio A encontró en producción, obligan a mantener una build propia de ~40 mil líneas en Vue 2.7 sin soporte. Habría que rebasarla en cada release de un upstream donde una sola persona firma el 82 % de los commits (r2 §7.1).
- **H0 depende de terceros.** La v1 espera la respuesta de unos mantenedores.

**B (TS + Capacitor):**
- **B reconoce que necesita "un plugin Kotlin propio".** sherpa-onnx no tiene integración con Capacitor y en Flutter es oficial (r4 §2.2). La ventaja de TS para la IA desaparece justo en el módulo más riesgoso.
- **Mantiene dos sistemas de voz:** Web Speech en la PWA y el plugin en el APK, lo que duplica las pruebas. Además, en iOS web las voces descargadas no aparecen y Personal Voice no está documentado (r4 §2.1, §2.3).
- **B y yo coincidimos en un 90 %:** desde cero, OBF, local-first, Piper y GPLv3. Lo único que nos separa es el runtime, y eso deben decidirlo los datos.

## 2. Concesiones

- La PWA llega sin tienda; Flutter web es débil.
- Hay más ejemplos de TS para la IA.
- Un plugin Kotlin serviría tanto a A como a B; el código Flutter no se reutiliza en ninguna de esas rutas.
- Quien más pierde empezando de cero es el usuario con parálisis cerebral que usa barrido (r2 §6).
- Asterics **sí exporta OBZ**. Eso hace más viable pilotar el contenido ahí.
- La hipótesis de r2 de que el hueco es de contenido se valida más barato sin escribir una app.

## 3. Postura final (híbrido): primero el contenido, después el runtime según la evidencia

1. **Contenido (semanas 0–8), independiente de la plataforma.** Un CSV es-MX revisado por terapeutas y un generador de conjugación que produce un **OBZ** y el **TSV de formas de palabra de Asterics**. Piloto inmediato en la PWA de Asterics y PR upstream: hay usuarios reales hacia la semana 6 sin código de app.
2. **Prueba de voz comparativa (semanas 1–3).** Flutter con sherpa-onnx oficial frente a Capacitor con plugin Kotlin, en 3 equipos de 2 GB (uno arm32). Se mide:
   - latencia menor de 600 ms en modo avión y sin TTS del sistema;
   - RAM y tamaño;
   - horas de trabajo de la IA.

   El ADR-001 se decide con esos números. Mi pronóstico es que gana Flutter; si Capacitor empata, acepto B.
3. **App Android propia (semanas 4–20).** Solo cubre lo que Asterics no resuelve: voz garantizada en equipos baratos, presencia en Play, interfaz simple, fijación de pantalla y barrido básico. Quien necesite Huffman o mirada pasa a Asterics con el mismo OBZ.

## 4. Paquete final para Fable

Un kit de repositorio en dos capas, que reúne lo mejor de las tres propuestas:
- **Capa agnóstica (desde el día 1):**
  - `data/vocab/nucleo_infantil.csv`, `adulto_hospital.csv`, `data/lexico/es-ES_a_es-MX.csv` y `data/morfologia/oraculo_conjugacion.csv`, con `comentario_terapeuta` (aporte de A);
  - `schemas/*.schema.json`;
  - `tools/generador/` (CSV → OBZ + TSV);
  - `fixtures/*.obz`.
- **Capa de runtime:**
  - `docs/spike-voz/RESULTADOS.md` → `docs/adr/ADR-001-runtime.md`;
  - `specs/M01…M09` con criterios **CA-Mxx-nn** y `tasks/BACKLOG.md` (aporte de B).
- **Para todos:**
  - `CLAUDE.md`, con la definición de terminado y los paquetes permitidos;
  - `docs/00_LEEME_JOSE.md`;
  - `docs/investigacion/r1–r4.md`.

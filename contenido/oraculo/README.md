# Oráculo de conjugaciones (lo escribe una persona)

Este directorio contiene las formas verbales **verificadas por una persona**. Las pruebas de la spec 11 comparan el código contra este archivo.

**El modelo que programa no edita esta carpeta.** Si el modelo escribiera el oráculo, se estaría validando a sí mismo.

## Estado

`oraculo_conjugacion.csv` tiene los 63 verbos de la v0.1 (V001 a V063), revisados por el equipo el 14 de noviembre de 2026 (columna `revisor`: "Equipo SAAC-MX"; puedes reemplazarla por nombres). Incluye los 15 verbos mínimos: querer, gustar, ayudar, ir, mirar, parar, abrir, dar, hacer, poner, tener, estar, ser, comer, jugar.

Los verbos V064 en adelante, en `../vocabulario/verbos_formas_BORRADOR_IA.csv`, son borrador generado con un conjugador y siguen en `Pendiente`: no son oráculo hasta que una persona los verifique.

## Cómo agregar verbos al oráculo

1. Revisa cada forma del borrador con una gramática o un conjugador confiable (p. ej. el de la RAE) y con criterio de uso en México.
2. Copia solo las filas verificadas a `oraculo_conjugacion.csv`, con las mismas columnas, y marca en `revisor` quién la verificó y `estado_revision = Aprobado`.
3. Marca la misma fila como `Aprobado` en `verbos_formas_BORRADOR_IA.csv`.

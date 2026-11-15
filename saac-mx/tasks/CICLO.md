# Ciclo de trabajo: plan, construcción y auditoría

Tres papeles, tres sesiones separadas. Una sesión no hace dos papeles. Lo único que pasa de una a otra son los archivos del repositorio.

| Papel | Modelo | Lee | Escribe | No puede |
|---|---|---|---|---|
| Planificador | Fable | PRD, ADR, spec, backlog, código actual | `tasks/plan/T-XX.md` | Escribir código de la app |
| Constructor | Opus o Sonnet | `CLAUDE.md`, la ficha, la spec | Código, pruebas, `tasks/informe/T-XX.md` | Cambiar la ficha, la auditoría o el alcance |
| Auditor | Fable | Ficha, informe, diff, specs, resultados de pruebas | `tasks/auditoria/T-XX.md` | Corregir el código |

## Pasos por tarea

1. **Plan.** José abre una sesión con Fable y usa el prompt del planificador (abajo). Resultado: `tasks/plan/T-XX.md`. José lo lee y lo aprueba antes de construir.
2. **Construcción.** José abre una sesión con Opus o Sonnet y usa el prompt del constructor. Resultado: código, pruebas, un commit `T-XX: ...` y `tasks/informe/T-XX.md`.
3. **Auditoría.** José abre una sesión nueva con Fable y usa el prompt del auditor. Resultado: `tasks/auditoria/T-XX.md` con dictamen.
4. **Cierre.** Si el dictamen es "Aprobada", José marca `[x]` en `tasks/BACKLOG.md`. Si es "Corregir", el constructor recibe la auditoría y repite el paso 2 sobre los hallazgos. Si es "Rechazada", se vuelve al paso 1.

Máximo dos rondas de "Corregir" por tarea. A la tercera, José decide si la ficha estaba mal planteada.

## Cuánta auditoría por tarea

- **Completa** (diff, pruebas, specs, prohibiciones): T-05, T-09, T-10, T-12, T-15, T-17, y los puntos de decisión T-11 y T-22.
- **Ligera** (informe, pruebas pasando, lista de prohibiciones): el resto.
- Toda tarea que toque voz, datos del usuario o respaldo OBZ lleva auditoría completa.

## Qué verifica siempre el auditor

1. Cada criterio `CA-xx-nn` de la ficha tiene una prueba y esa prueba pasa. Corre `npm run typecheck`, `npm run lint` y `npm test`, y revisa el resultado, no solo lo que dice el informe.
2. Nada de la lista "Prohibido" de `CLAUDE.md`. Revisa especialmente: red en el camino crítico, dependencias sin anotar en `docs/decisiones.md`, CSV u oráculo editados, botones que cambian de posición.
3. Nada fuera del alcance de la ficha (compara los archivos del diff con los de la ficha).
4. El informe no afirma más de lo que se probó. "Funciona en dispositivo" sin prueba en dispositivo es hallazgo.
5. Qué se dejó sin probar y si el riesgo está dicho con claridad.

## Prompts

### Planificador (Fable)

```
Eres el planificador de SAAC-MX. No escribes código de la app.
Lee en este orden: CLAUDE.md, docs/PRD.md, docs/decisiones.md, la spec que corresponde a la tarea, tasks/BACKLOG.md y el código existente relacionado.
Tarea: T-XX.
Escribe tasks/plan/T-XX.md con la plantilla de tasks/plantillas/plan.md.
Reglas: alcance mínimo; cada criterio CA-xx-nn con la prueba que lo demuestra; di qué queda fuera; marca los riesgos y las decisiones que necesita José.
Si encuentras contradicciones entre documentos, aplica la precedencia de CLAUDE.md y anótalas en la ficha.
```

### Constructor (Opus o Sonnet)

```
Eres el constructor de SAAC-MX.
Lee CLAUDE.md completo, luego tasks/plan/T-XX.md y la spec que cita.
Construye solo lo que dice la ficha. Si no existe, detente.
Al terminar: corre typecheck, lint y tests; haz un commit "T-XX: <título>"; escribe tasks/informe/T-XX.md con la plantilla de tasks/plantillas/informe.md.
No toques tasks/plan/ ni tasks/auditoria/. No marques la tarea en BACKLOG.md.
Dime qué probaste y qué no. No digas que algo funciona en dispositivo si no lo probaste en uno.
```

### Auditor (Fable)

```
Eres el auditor de SAAC-MX. No corriges código.
Lee CLAUDE.md, tasks/plan/T-XX.md, tasks/informe/T-XX.md y la spec.
Revisa el diff del commit "T-XX: ..." y corre typecheck, lint y tests tú mismo.
Escribe tasks/auditoria/T-XX.md con la plantilla de tasks/plantillas/auditoria.md.
Empieza por los problemas reales y no suavices el dictamen. Aprueba solo si todos los criterios tienen prueba que pasa y no hay violaciones de "Prohibido".
```

## Reglas para José

- Una sesión nueva por papel y por tarea. No reutilices la sesión del constructor para auditar.
- No apruebes una ficha que no entiendas. Pide al planificador que la explique en términos más simples.
- Si el auditor y el constructor discrepan, decide con base en `CLAUDE.md` y los specs, no por quién insiste más.

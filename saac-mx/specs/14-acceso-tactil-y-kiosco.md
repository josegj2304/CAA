# Spec 14 — Ajustes de toque y fijación de pantalla

Depende de: 10. (El barrido con switch es v1.1: dejar la arquitectura lista para agregarlo como otro "método de selección".)

## Objetivo

Que niños con temblor, atetosis o poca precisión seleccionen lo que quieren, y que no salgan de la app por accidente.

## Comportamiento

- **Tiempo de permanencia:** la celda se activa tras mantenerla N ms (0–3000), con indicador visual de progreso.
- **Activar al soltar:** se selecciona la última celda tocada al levantar el dedo.
- **Ignorar toques repetidos:** ignora toques en un intervalo configurable (0–2000 ms).
- **Margen entre celdas** configurable, compatible con protector físico (keyguard).
- **Fijación de pantalla** en Android (`startLockTask()` vía Capacitor; sin dispositivo gestionado el usuario puede salir con su PIN) e instrucciones de Acceso Guiado en iOS.
- **Arquitectura:** `access/` define `SelectionMethod` (`touch`, `dwell`, `release`); v1.1 agrega `scan` (switch como evento `keydown`, ignorando autorrepetición).

## Criterios de aceptación

- **CA-14-01** Con permanencia de 1000 ms, un toque de 500 ms no activa la celda y uno de 1100 ms sí.
- **CA-14-02** Con "activar al soltar", arrastrar el dedo de A a B y soltar activa B.
- **CA-14-03** Con "ignorar repetidos" en 800 ms, dos toques a 300 ms de distancia producen una sola selección.
- **CA-14-04** Con fijación activa, el botón de inicio de Android no saca de la app sin PIN (prueba manual en dispositivo).
- **CA-14-05** Agregar un nuevo `SelectionMethod` no requiere cambiar componentes de `board/` (prueba con un método falso).
- **CA-14-06** Si el método es `dwell` o `release`, la pulsación larga para formas de palabra queda desactivada (precedencia definida en spec 11, CA-11-07).

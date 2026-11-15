# Spec 12 — Edición, niveles y bloqueo

Depende de: 10.

## Objetivo

Que la familia y la terapeuta personalicen el tablero en minutos sin poder romper la disposición motora, y que el usuario no lo cambie por accidente.

## Comportamiento

- **Modo edición** protegido: siempre requiere mantener presionado 3 s en una esquina; la contraseña de 4 dígitos es opcional y se recomienda activarla en el primer uso.
- **Editar celda:** etiqueta, texto a pronunciar, imagen (pictograma ARASAAC del caché, foto con la cámara o de la galería), audio grabado (grabar, escuchar, borrar).
- **Agregar celda** solo en espacios vacíos de carpetas; en el núcleo, solo mostrar/ocultar.
- **Mostrar/ocultar** celdas sin moverlas; una celda oculta deja su espacio.
- **Niveles 1, 2, 3:** atajos que muestran las palabras con `nivel ≤ N`. Cambiar de nivel conserva las personalizaciones.
- **Perfiles:** al menos 2 usuarios en el mismo dispositivo (p. ej. hermanos), cada uno con su tablero y ajustes.
- Género gramatical del perfil: `masculino`, `femenino` u `otro` (mismos valores que `ext_saac_mx_genero_usuario`). Resuelve textos con `{masculino|femenino}` como "Estoy {cansado|cansada}". Con `otro`, la familia elige en ajustes qué forma usar (masculina o femenina), porque el español no tiene una forma neutra estándar para estos adjetivos; por defecto la app pregunta en el primer uso.
- Filas con `plantilla = sí` ("Me llamo ___") se muestran en el primer uso para que la familia las complete; no se pronuncian hasta completarse.

## Criterios de aceptación

- **CA-12-01** Fuera de modo edición, ningún gesto del usuario abre la edición (prueba e2e con toques aleatorios durante 60 s).
- **CA-12-02** Tomar una foto, asignarla a una celda y reiniciar la app conserva la foto (almacenada en IndexedDB o sistema de archivos de Capacitor).
- **CA-12-03** Grabar audio en una celda hace que la cascada de voz use ese audio (CA-00-01).
- **CA-12-04** Ocultar una celda no cambia la posición de ninguna otra (comparación de coordenadas).
- **CA-12-05** Pasar de nivel 1 a 3 y volver a 1 conserva fotos, audios y celdas ocultadas a mano.
- **CA-12-06** Dos perfiles no comparten personalizaciones.
- **CA-12-07** Con perfil `femenino`, "Estoy {cansado|cansada}" se pronuncia "Estoy cansada"; con `otro` y forma preferida masculina, "Estoy cansado".
- **CA-12-08** Una frase con `plantilla = sí` sin completar no se pronuncia y muestra "Completa esta frase" en modo edición.

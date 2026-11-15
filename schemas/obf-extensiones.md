# Extensiones OBF de SAAC-MX

Base: Open Board Format `open-board-0.1` (CoughDrop, 2015). Campos verificados en el código de referencia (`lib/obf/external.rb` de CoughDrop/obf):

- Tablero: `format`, `id`, `locale`, `name`, `buttons`, `grid` (`rows`, `columns`, `order`), `images`, `sounds`, `license`.
- Botón: `id`, `label`, `vocalization`, `action`/`actions`, `load_board`, `background_color`, `border_color`, `image_id`, `sound_id`, `hidden`.
- Paquete `.obz`: ZIP con `manifest.json` (`root`, `paths.boards`, `paths.images`, `paths.sounds`).

Verificar contra la especificación vigente antes de implementar. Todo lo propio va con prefijo `ext_saac_mx_` para que otras apps lo ignoren sin romperse.

| Campo | Dónde | Tipo | Uso |
|---|---|---|---|
| `ext_saac_mx_palabra_id` | botón | string | id de la fila en `nucleo.csv` o `periferico.csv` (N001, P010) |
| `ext_saac_mx_tipo` | botón | string | tipo de palabra (pronombre, verbo…) |
| `ext_saac_mx_nivel` | botón | 1–3 | nivel en que se muestra |
| `ext_saac_mx_formas` | botón | objeto | formas aprobadas: `{ "presente": {"yo": "quiero", …}, "preterito": {…}, "ir_a": "voy a querer", "gerundio": …, "participio": …, "imperativo": …, "imperativo_neg": … }` o `{ "genero_numero": ["mío", "mía", "míos", "mías"] }` |
| `ext_saac_mx_genero_usuario` | tablero raíz | string | `masculino`, `femenino` u `otro` |
| `ext_saac_mx_licencia` | imagen | objeto | `{ "autor": "Sergio Palao", "origen": "ARASAAC", "licencia": "CC BY-NC-SA 4.0", "arasaac_id": 1234 }` |
| `ext_saac_mx_ajustes` | manifest | objeto | ajustes del perfil (voz, toque, nivel, color) |
| `ext_saac_mx_version` | manifest | string | versión del esquema de extensiones (empieza en `0.1`) |

Regla: importar un OBZ de otra app nunca debe fallar por campos desconocidos; se conservan tal cual.

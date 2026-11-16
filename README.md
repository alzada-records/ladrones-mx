# ladrones-mx

Sitio web de Ladrones (ladrones.mx), HTML y CSS sin CMS.

## Estructura

```
index.html            Inicio
tour/index.html       Tour (Bandsintown)
lanzamientos/         Música
videos/               Videos (playlist de YouTube)
bio/                  Bio
contacto/             Contacto
404.html              Página de error
css/styles.css        Todos los estilos (colores y fuentes en :root)
js/main.js            Menú en celular
img/                  Imágenes (logo, favicon, fotos, portadas)
```

Cada página vive en su propia carpeta con un `index.html`, así las direcciones quedan igual que en Wix (por ejemplo `ladrones.mx/tour`).

## Ver el sitio en tu computadora

1. Abre la carpeta en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Clic derecho en `index.html` y elige **Open with Live Server**.

Las rutas empiezan con `/` (por ejemplo `/css/styles.css`), por eso no funcionan si abres el archivo con doble clic; usa Live Server.

## Pendientes marcados en el código

Busca estos textos para encontrar lo que falta llenar:

- `UU_ID_DEL_CANAL`: ID del canal de YouTube (inicio)
- `ID_DE_LA_PLAYLIST`: playlist "Web – Destacados" (videos)
- `widget de Bandsintown`: código del widget (inicio y tour)
- `href="#"`: links de Spotify y Apple Music (pie de página)
- `instagram-relleno`: se cambia por el widget de Behold al final

## Dos idiomas

- Español en la raíz (`/`, `/tour/`, `/lanzamientos/`…) e inglés en `/en/` (`/en/`, `/en/tour/`, `/en/music/`, `/en/videos/`, `/en/bio/`, `/en/contact/`).
- **Cada cambio de texto va en las dos versiones**: el archivo en español y su par en `en/`.
- `js/idioma.js`: botón ES | EN (guarda la elección) y, en la portada, manda a `/en/` si la persona eligió inglés o si es su primera visita y su dispositivo no está en español. No redirige a buscadores.
- Los scripts (`newsletter.js`, `merch.js`, `videos.js`) leen `<html lang>` y muestran sus textos en el idioma de la página.
- Cada página tiene etiquetas `hreflang` que le dicen a Google cuál es su versión en el otro idioma.
- `en/404.html` es la página de error en inglés (falta la regla en Netlify para usarla en `/en/*`).

## Lista de pendientes

- [ ] Fotos de la banda en Bio (van en `/img/prensa/`)
- [ ] Portadas en alta de Arriba La L, Ay Ay Ay y Chip S
- [ ] Favicon (logo cuadrado)
- [ ] Feed de Instagram con Behold (inicio)
- [ ] Netlify y conectar el dominio ladrones.mx

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
- `action="#"`: formulario de Mailchimp (inicio)
- `href="#"`: links de Spotify y Apple Music (pie de página)
- `instagram-relleno`: se cambia por el widget de Behold al final

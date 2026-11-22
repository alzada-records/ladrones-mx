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

## Dos idiomas

- Español en la raíz (`/`, `/tour/`, `/lanzamientos/`…) e inglés en `/en/` (`/en/`, `/en/tour/`, `/en/music/`, `/en/videos/`, `/en/bio/`, `/en/contact/`).
- **Cada cambio de texto va en las dos versiones**: el archivo en español y su par en `en/`.
- `js/idioma.js`: botón ES | EN (guarda la elección) y, en la portada, manda a `/en/` si la persona eligió inglés o si es su primera visita y su dispositivo no está en español. No redirige a buscadores.
- Los scripts (`newsletter.js`, `merch.js`, `videos.js`) leen `<html lang>` y muestran sus textos en el idioma de la página.
- Cada página tiene etiquetas `hreflang` que le dicen a Google cuál es su versión en el otro idioma.
- `en/404.html` es la página de error en inglés (la regla está en `_redirects`).

## Lista de pendientes

- [ ] Feed de Instagram con Behold (inicio): conectar la cuenta @ladronesmx y cambiar `instagram-relleno` por el widget
- [ ] Etiquetas en Mailchimp (Ladrones / Alzada / TMF, y opcional idioma)
- [ ] Publicar en Netlify y probar en celular
- [ ] Conectar el dominio ladrones.mx a Netlify (las redirecciones ya están en `_redirects`)
- [ ] Google Search Console: verificar el dominio y enviar `sitemap.xml`
- [ ] Probar la imagen para compartir en WhatsApp y redes

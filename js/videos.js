// Catálogo de videos de Ladrones desde la YouTube Data API.
// Muestra todos los videos del canal (sin Shorts) con miniatura, título y fecha.
// Si no hay clave o la API falla, se queda el reproductor de respaldo con la lista de subidas.

// 1. Pega aquí la clave de Google Cloud (restringida a ladrones.mx).
const API_KEY = "AIzaSyAg_coKJfSwQj63NRfZtm59-AagOwJZnmg";

// Canal de Ladrones: UCOFdvkFfaGgpkP9DawxAvZw.
// "UULF" + el resto del ID = videos largos, sin Shorts. "UU" + el resto = todo lo subido.
const LISTA_SIN_SHORTS = "UULFOFdvkFfaGgpkP9DawxAvZw";
const LISTA_TODO = "UUOFdvkFfaGgpkP9DawxAvZw";

// Guardamos el catálogo 6 horas en el navegador del visitante para no gastar cuota de más.
const CACHE_CLAVE = "ladrones-videos-v2";
const CACHE_HORAS = 6;

// Solo videoclips: se saltan los que en el título dicen "Audio" o "Lyric(s)",
// y los promos con hashtags. Para quitar otro tipo, agrégalo aquí.
const NO_ES_VIDEOCLIP = /audio|lyric|#/i;

const reproductor = document.getElementById("reproductor");
const tituloActual = document.getElementById("video-actual");
const cuadricula = document.getElementById("catalogo");
const estado = document.getElementById("catalogo-estado");

const fecha = new Intl.DateTimeFormat(document.documentElement.lang === "en" ? "en-US" : "es-MX", { day: "numeric", month: "short", year: "numeric" });

function leerCache() {
  try {
    const datos = JSON.parse(localStorage.getItem(CACHE_CLAVE));
    if (datos && Date.now() - datos.guardado < CACHE_HORAS * 3600 * 1000) return datos.videos;
  } catch (e) { /* sin almacenamiento disponible: se ignora */ }
  return null;
}

function guardarCache(videos) {
  try {
    localStorage.setItem(CACHE_CLAVE, JSON.stringify({ guardado: Date.now(), videos }));
  } catch (e) { /* sin almacenamiento disponible: se ignora */ }
}

async function traerLista(lista) {
  const videos = [];
  let pagina = "";
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.search = new URLSearchParams({
      part: "snippet,contentDetails",
      maxResults: "50",
      playlistId: lista,
      key: API_KEY,
      ...(pagina && { pageToken: pagina }),
    });
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("YouTube respondió " + respuesta.status);
    const datos = await respuesta.json();
    for (const item of datos.items || []) {
      const s = item.snippet;
      if (s.title === "Private video" || s.title === "Deleted video") continue;
      if (NO_ES_VIDEOCLIP.test(s.title)) continue;
      const miniaturas = s.thumbnails || {};
      videos.push({
        id: item.contentDetails.videoId,
        titulo: s.title,
        fecha: item.contentDetails.videoPublishedAt || s.publishedAt,
        imagen: (miniaturas.maxres || miniaturas.standard || miniaturas.high || miniaturas.medium || {}).url,
      });
    }
    pagina = datos.nextPageToken || "";
  } while (pagina);
  return videos;
}

function reproducir(video, desplazar) {
  reproductor.src = `https://www.youtube.com/embed/${video.id}?rel=0`;
  reproductor.title = video.titulo;
  tituloActual.textContent = video.titulo;
  cuadricula.querySelectorAll("[aria-current]").forEach((b) => b.removeAttribute("aria-current"));
  const boton = cuadricula.querySelector(`[data-id="${video.id}"]`);
  if (boton) boton.setAttribute("aria-current", "true");
  if (desplazar) reproductor.scrollIntoView({ behavior: "smooth", block: "center" });
}

function pintar(videos) {
  cuadricula.innerHTML = "";
  for (const video of videos) {
    const li = document.createElement("li");
    li.className = "video-tarjeta";
    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.id = video.id;
    const img = document.createElement("img");
    img.src = video.imagen;
    img.alt = "";
    img.width = 480;
    img.height = 270;
    img.loading = "lazy";
    img.decoding = "async";
    const titulo = document.createElement("span");
    titulo.className = "video-titulo";
    titulo.textContent = video.titulo;
    const cuando = document.createElement("span");
    cuando.className = "video-fecha";
    cuando.textContent = fecha.format(new Date(video.fecha));
    boton.append(img, titulo, cuando);
    boton.addEventListener("click", () => reproducir(video, true));
    li.append(boton);
    cuadricula.append(li);
  }
  estado.textContent = `${videos.length} videos`;
}

async function iniciar() {
  if (!API_KEY || API_KEY.startsWith("PEGA_")) {
    estado.textContent = "";
    return; // sin clave: se queda el reproductor de respaldo
  }
  let videos = leerCache();
  if (!videos) {
    try {
      videos = await traerLista(LISTA_SIN_SHORTS);
    } catch (e) {
      try {
        videos = await traerLista(LISTA_TODO);
      } catch (e2) {
        estado.textContent = "";
        return; // la API falló: se queda el reproductor de respaldo
      }
    }
    videos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    guardarCache(videos);
  }
  if (!videos.length) return;
  pintar(videos);
  reproducir(videos[0], false);
}

iniciar();

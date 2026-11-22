// "Únete a la familia" y "Darme de baja": guardan los datos en la hoja de Google
// "Alzada – Fans y contacto" (pestaña Fans, fuente "Ladrones Web") por medio del Apps Script (herramientas/apps-script-formularios.gs).
// Todo va dentro de su propio bloque para no chocar con los otros scripts de la página.
(() => {
  // URL de la aplicación web de Apps Script (la misma en Alzada, Ladrones y Tattoo Music Fest).
  const FORMULARIOS_URL = "https://script.google.com/macros/s/AKfycbw3XUBhCSspVCCI3nQIg-GEtVpGP2ZChQPaZpUB65EthL0vXAobaTE8q3tlmMF5dasO/exec";

  // Manda los datos al Apps Script sin esperar su respuesta (Google tarda varios segundos y,
  // desde otro sitio, la respuesta ni siquiera se puede leer). sendBeacon deja el envío en cola
  // del navegador y regresa al instante; si no existe, se usa fetch con un tope de 6 segundos.
  function mandar(url, datos) {
    if (!url.startsWith("https://")) return Promise.reject(new Error("Falta la URL del Apps Script"));
    if (navigator.sendBeacon && navigator.sendBeacon(url, datos)) return Promise.resolve();
    const envio = fetch(url, { method: "POST", mode: "no-cors", body: datos, keepalive: true });
    return Promise.race([envio, new Promise((listo) => setTimeout(listo, 6000))]);
  }

  const EN = document.documentElement.lang === "en";
  const T = EN
    ? {
        nombre: "Enter your name.",
        correo: "Check your email address.",
        artistas: "Choose at least one artist.",
        casilla: "Check the box to get news.",
        enviando: "Sending…",
        listo: "You're in! We'll keep you posted on Ladrones.",
        baja: "Done. You won't get any more emails from us.",
        error: "Something went wrong. Please try again.",
      }
    : {
        nombre: "Escribe tu nombre.",
        correo: "Revisa tu correo.",
        artistas: "Elige al menos un artista.",
        casilla: "Marca la casilla para recibir noticias.",
        enviando: "Enviando…",
        listo: "¡Listo! Te avisaremos de todo lo nuevo de Ladrones.",
        baja: "Listo. Ya no te mandaremos correos.",
        error: "Algo salió mal. Inténtalo de nuevo.",
      };
  async function enviar(datos) {
    await mandar(FORMULARIOS_URL, datos);
  }

  function preparar(form, armar, textoListo) {
    const mensaje = form.querySelector(".form-mensaje");
    const boton = form.querySelector('button[type="submit"]');
    const avisar = (texto, tipo) => { mensaje.textContent = texto; mensaje.dataset.tipo = tipo; };

    form.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      const datos = armar(form, avisar);
      if (!datos) return;
      boton.disabled = true;
      avisar(T.enviando, "info");
      try {
        await enviar(datos);
        form.reset();
        avisar(textoListo, "ok");
      } catch (e) {
        avisar(T.error, "error");
      } finally {
        boton.disabled = false;
      }
    });
  }

  const correoOk = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);

  // Suscripción
  document.querySelectorAll(".form-lista").forEach((form) => preparar(form, (f, avisar) => {
    if (!f.nombre.value.trim()) return avisar(T.nombre, "error"), f.nombre.focus(), null;
    if (!correoOk(f.correo.value.trim())) return avisar(T.correo, "error"), f.correo.focus(), null;
    const artistas = f.querySelectorAll('input[name="artistas"]');
    if (artistas.length && ![...artistas].some((c) => c.checked)) return avisar(T.artistas, "error"), artistas[0].focus(), null;
    if (!f.acepto.checked) return avisar(T.casilla, "error"), f.acepto.focus(), null;
    const datos = new URLSearchParams(new FormData(f));
    datos.set("accion", "suscribir");
    datos.set("sitio", f.dataset.sitio || "alzada");
    datos.set("idioma", EN ? "en" : "es");
    return datos;
  }, T.listo));

  // Darse de baja
  document.querySelectorAll(".form-baja").forEach((form) => preparar(form, (f, avisar) => {
    if (!correoOk(f.correo.value.trim())) return avisar(T.correo, "error"), f.correo.focus(), null;
    const datos = new URLSearchParams(new FormData(f));
    datos.set("accion", "baja");
    datos.set("sitio", f.dataset.sitio || "alzada");
    return datos;
  }, T.baja));
})();

// Formulario "Únete a la lista": manda los datos a Mailchimp sin salir de la página.
// Mailchimp acepta envíos por JSONP en /subscribe/post-json (con un parámetro "c" de callback).
// Si algo falla, el formulario se envía normal y Mailchimp abre su propia página en otra pestaña.

document.querySelectorAll(".form-lista").forEach((form) => {
  const mensaje = form.querySelector(".form-mensaje");
  const boton = form.querySelector('button[type="submit"]');
  const acepto = form.querySelector('input[name="acepto"]');

  function avisar(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.dataset.tipo = tipo;
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const correo = form.EMAIL.value.trim();
    if (!form.FNAME.value.trim()) return avisar("Escribe tu nombre.", "error"), form.FNAME.focus();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return avisar("Revisa tu correo.", "error"), form.EMAIL.focus();
    if (acepto && !acepto.checked) return avisar("Marca la casilla para recibir noticias.", "error"), acepto.focus();

    const datos = new URLSearchParams(new FormData(form));
    datos.delete("acepto");
    const callback = "mc" + Date.now();
    const url = form.action.replace("/subscribe/post?", "/subscribe/post-json?") + "&" + datos.toString() + "&c=" + callback;

    boton.disabled = true;
    avisar("Enviando…", "info");

    const script = document.createElement("script");
    const limpiar = () => { delete window[callback]; script.remove(); boton.disabled = false; };
    const respaldo = setTimeout(() => { limpiar(); form.submit(); }, 10000);

    window[callback] = (respuesta) => {
      clearTimeout(respaldo);
      limpiar();
      if (respuesta.result === "success") {
        form.reset();
        avisar("¡Listo! Revisa tu correo para confirmar tu suscripción.", "ok");
      } else {
        const texto = String(respuesta.msg || "");
        if (/already subscribed|ya est/i.test(texto)) avisar("Ese correo ya está en la lista.", "ok");
        else if (/too many/i.test(texto)) avisar("Demasiados intentos con ese correo. Prueba más tarde.", "error");
        else avisar("No se pudo suscribir. Revisa tus datos e inténtalo de nuevo.", "error");
      }
    };
    script.onerror = () => { clearTimeout(respaldo); limpiar(); form.submit(); };
    script.src = url;
    document.body.append(script);
  });
});

// Idioma del sitio (español en /, inglés en /en/).
// - El botón ES | EN guarda la elección de la persona.
// - Al entrar a la portada (/), si la persona eligió inglés, o si es su primera visita y su
//   dispositivo no está en español, la manda a /en/. Los links directos a /en/ siempre se respetan.
// - Los buscadores (bots) no se redirigen, para que Google indexe los dos idiomas.
(function () {
  var CLAVE = "ladrones-idioma";
  var guardado = null;
  try { guardado = localStorage.getItem(CLAVE); } catch (e) {}

  document.addEventListener("click", function (evento) {
    var enlace = evento.target.closest && evento.target.closest("[data-idioma]");
    if (!enlace) return;
    try { localStorage.setItem(CLAVE, enlace.getAttribute("data-idioma")); } catch (e) {}
  });

  var ruta = location.pathname;
  var esBot = /bot|crawl|spider|slurp|lighthouse|preview/i.test(navigator.userAgent);
  if (esBot) return;

  if (ruta === "/" || ruta === "/index.html") {
    var preferido = (navigator.languages && navigator.languages[0]) || navigator.language || "es";
    var quiereIngles = guardado ? guardado === "en" : !/^es\b/i.test(preferido);
    if (quiereIngles) location.replace("/en/");
  }
})();

// Cargar sonido
const sonidoFondo = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
sonidoFondo.loop = true;

// Crear botón de control único
const btnToggle = document.createElement("button");
btnToggle.className = "boton-control";
btnToggle.title = "Reproducir";

btnToggle.innerHTML = `
  <svg id="icono-play" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
    <path d="M8 5v14l11-7z"/>
  </svg>`;

btnToggle.style.top = "20px";
document.body.appendChild(btnToggle);

// Estilos visuales
btnToggle.style.position = "fixed";
btnToggle.style.left = "20px";
btnToggle.style.padding = "12px";
btnToggle.style.background = "#FF0000";
btnToggle.style.border = "none";
btnToggle.style.borderRadius = "50%";
btnToggle.style.cursor = "pointer";
btnToggle.style.zIndex = "999";
btnToggle.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
btnToggle.style.transition = "transform 0.2s ease, background 0.3s ease";
btnToggle.onmouseover = () => (btnToggle.style.transform = "scale(1.1)");
btnToggle.onmouseout = () => (btnToggle.style.transform = "scale(1)");

// Estado de reproducción
let reproduciendo = false;

btnToggle.addEventListener("click", () => {
  const nube = document.getElementById("nube");
  const bici = document.getElementById("bici");
  const sol = document.getElementById("sol");

  if (!reproduciendo) {
    // Reproducir música y animaciones
    sonidoFondo.play();
    nube.style.animationPlayState = "running";
    bici.style.animationPlayState = "running";
    sol.style.animationPlayState = "running";

    // Cambiar a ícono de pausa
    btnToggle.innerHTML = `
      <svg id="icono-pause" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
        <path d="M6 19h4V5H6zm8-14v14h4V5h-4z"/>
      </svg>`;
    btnToggle.title = "Pausar música y animaciones";
    reproduciendo = true;
  } else {
    // Pausar música y animaciones
    sonidoFondo.pause();
    nube.style.animationPlayState = "paused";
    bici.style.animationPlayState = "paused";
    sol.style.animationPlayState = "paused";

    // Cambiar a ícono de play
    btnToggle.innerHTML = `
      <svg id="icono-play" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
        <path d="M8 5v14l11-7z"/>
      </svg>`;
    btnToggle.title = "Reproducir música y animaciones";
    reproduciendo = false;
  }
});

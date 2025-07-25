// Obtener todos los enlaces del menú
const enlacesMenu = document.querySelectorAll('#menu a');
const secciones = document.querySelectorAll('section');

// Función para scroll suave
function scrollSuave(objetivo) {
    const elemento = document.querySelector(objetivo);
    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Agregar evento click a cada enlace del menú
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const objetivo = this.getAttribute('href');
        scrollSuave(objetivo);
    });
});

// Función para marcar el enlace activo
function marcarEnlaceActivo() {
    let seccionActual = '';
    
    secciones.forEach(seccion => {
        const seccionTop = seccion.offsetTop;
        const seccionHeight = seccion.clientHeight;
        
        if (window.scrollY >= (seccionTop - 100)) {
            seccionActual = seccion.getAttribute('id');
        }
    });
    
    enlacesMenu.forEach(enlace => {
        enlace.classList.remove('activo');
        if (enlace.getAttribute('data-seccion') === seccionActual) {
            enlace.classList.add('activo');
        }
    });
}

// Escuchar el evento scroll para actualizar el enlace activo
window.addEventListener('scroll', marcarEnlaceActivo);

// Marcar el enlace activo al cargar la página
document.addEventListener('DOMContentLoaded', marcarEnlaceActivo);

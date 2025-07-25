window.onload = init;

let claveOculta = true;
let valorClave = '';
const inputClave = document.querySelector('.clave');
const botonToggle = document.getElementById('toggleClave');

function init() {
    randomizarTeclado();
    configurarEventos();
}

function randomizarTeclado() {
    const teclado = document.getElementById('teclado');
    const teclas = Array.from(teclado.querySelectorAll('.tecla:not(.borrar)'));
    const botonBorrar = teclado.querySelector('.borrar');
    
    // Mezclar aleatoriamente las teclas numéricas
    for (let i = teclas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teclas[i], teclas[j]] = [teclas[j], teclas[i]];
    }
    
    // Limpiar el teclado y reorganizar
    teclado.innerHTML = '';
    
    // Agregar las teclas mezcladas
    teclas.forEach(tecla => {
        teclado.appendChild(tecla);
    });
    
    // Agregar el botón borrar al final
    teclado.appendChild(botonBorrar);
}

function configurarEventos() {
    const teclas = document.querySelectorAll('.tecla');
    const teclasNumericas = document.querySelectorAll('.tecla:not(.borrar)');
    
    // Guardar valores originales de las teclas
    teclasNumericas.forEach(tecla => {
        tecla.dataset.valorOriginal = tecla.value;
    });
    
    // Configurar eventos para las teclas
    teclas.forEach(tecla => {
        tecla.addEventListener('click', function() {
            let valor;
            
            if (this.value === 'Borrar') {
                borrarUltimoCaracter();
                return;
            }
            
            // Usar el valor original, no el que está mostrando actualmente
            valor = this.dataset.valorOriginal || this.value;
            agregarNumero(valor);
        });
    });
    
    // Configurar hover para todas las teclas numéricas
    teclasNumericas.forEach(tecla => {
        tecla.addEventListener('mouseenter', function() {
            // Ocultar todos los números cuando hay hover sobre cualquiera
            ocultarTodosLosNumeros();
        });
        
        tecla.addEventListener('mouseleave', function() {
            // Mostrar todos los números cuando se quita el hover
            mostrarTodosLosNumeros();
        });
    });
    
    // Configurar botón de mostrar/ocultar
    botonToggle.addEventListener('click', toggleMostrarClave);
    
    // Prevenir escritura directa en el input
    inputClave.addEventListener('keydown', function(e) {
        e.preventDefault();
    });
    
    inputClave.addEventListener('paste', function(e) {
        e.preventDefault();
    });
}

function ocultarTodosLosNumeros() {
    const teclasNumericas = document.querySelectorAll('.tecla:not(.borrar)');
    teclasNumericas.forEach(tecla => {
        tecla.value = '*';
    });
}

function mostrarTodosLosNumeros() {
    const teclasNumericas = document.querySelectorAll('.tecla:not(.borrar)');
    teclasNumericas.forEach(tecla => {
        tecla.value = tecla.dataset.valorOriginal;
    });
}

function agregarNumero(numero) {
    if (valorClave.length < 10) { // Limitar a 10 dígitos
        valorClave += numero;
        actualizarDisplay();
    }
}

function borrarUltimoCaracter() {
    if (valorClave.length > 0) {
        valorClave = valorClave.slice(0, -1);
        actualizarDisplay();
    }
}

function actualizarDisplay() {
    if (claveOculta) {
        inputClave.value = '*'.repeat(valorClave.length);
    } else {
        inputClave.value = valorClave;
    }
}

function toggleMostrarClave() {
    claveOculta = !claveOculta;
    
    if (claveOculta) {
        botonToggle.textContent = '👁️';
        inputClave.type = 'password';
    } else {
        botonToggle.textContent = '🙈';
        inputClave.type = 'text';
    }
    
    actualizarDisplay();
}

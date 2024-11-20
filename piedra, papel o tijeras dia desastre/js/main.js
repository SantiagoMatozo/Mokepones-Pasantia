// 1 es piedra, 2 es papel y 3 es tijera
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
    switch (jugada) {
        case 1: return 'Piedra 🗿';
        case 2: return 'Papel 🧻';
        case 3: return 'Tijeras ✂️';
        default: return 'Opción inválida';
    }
}

// Variables de control
let triunfos = 0;
let perdidas = 0;

// Referencias a elementos del DOM
const puntosUsuario = document.getElementById('puntos-usuario');
const puntosComputadora = document.getElementById('puntos-computadora');
const mensaje = document.getElementById('mensaje');
const eleccionUsuario = document.getElementById('eleccion-usuario');
const eleccionComputadora = document.getElementById('eleccion-computadora');
const ganaPunto = document.getElementById('gana-punto');
const reiniciarBtn = document.getElementById('reiniciar');

// Función principal del juego
function jugar(eleccionJugador) {
    const pc = aleatorio(1, 3);

    // Mostrar elecciones
    eleccionUsuario.textContent = eleccion(eleccionJugador);
    eleccionComputadora.textContent = eleccion(pc);

    // Determinar resultado
    if (pc === eleccionJugador) {
        ganaPunto.textContent = 'Empate 😐';
    } else if (
        (eleccionJugador === 1 && pc === 3) ||
        (eleccionJugador === 2 && pc === 1) ||
        (eleccionJugador === 3 && pc === 2)
    ) {
        ganaPunto.textContent = '¡Ganaste un punto! 🔥';
        triunfos++;
        puntosUsuario.textContent = triunfos;
    } else {
        ganaPunto.textContent = 'Perdiste un punto 😔';
        perdidas++;
        puntosComputadora.textContent = perdidas;
    }

    // Mostrar mensaje
    mensaje.classList.remove('disabled');

    // Verificar si alguien ganó el juego
    if (triunfos === 5 || perdidas === 5) {
        ganaPunto.textContent = triunfos === 5 ? '¡Felicidades, ganaste el juego! 🏆' : 'La computadora ganó el juego 💻';
        reiniciarBtn.classList.remove('disabled');
        deshabilitarBotones(true);
    }
}

// Deshabilitar o habilitar botones
function deshabilitarBotones(estado) {
    document.querySelectorAll('.arma').forEach(boton => boton.disabled = estado);
}

// Reiniciar el juego
reiniciarBtn.addEventListener('click', () => {
    triunfos = 0;
    perdidas = 0;
    puntosUsuario.textContent = '0';
    puntosComputadora.textContent = '0';
    mensaje.classList.add('disabled');
    reiniciarBtn.classList.add('disabled');
    deshabilitarBotones(false);
});

// Añadir eventos a los botones
document.getElementById('piedra🗿').addEventListener('click', () => jugar(1));
document.getElementById('papel🧻').addEventListener('click', () => jugar(2));
document.getElementById('tijera✂️').addEventListener('click', () => jugar(3));
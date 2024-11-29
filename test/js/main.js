// Selección de elementos
const contJuego = document.getElementById('cont-juego');
const pelota = document.getElementById('pelota');
const player = document.getElementById('player');
const pc = document.getElementById('pc');

// Variables de posición
let pelotaX = contJuego.offsetWidth / 2 - 10; // Posición inicial en X (centrada)
let pelotaY = contJuego.offsetHeight / 2 - 10; // Posición inicial en Y (centrada)
let velocidadX = 4; // Velocidad de movimiento horizontal
let velocidadY = 4; // Velocidad de movimiento vertical

let playerY = contJuego.offsetHeight / 2 - player.offsetHeight / 2; // Posición inicial del jugador
let pcY = playerY; // Posición inicial del PC

// Dimensiones del contenedor
const contWidth = contJuego.offsetWidth;
const contHeight = contJuego.offsetHeight;

// Movimiento del jugador
document.addEventListener('keydown', (e) => {
    const step = 20; // Velocidad de movimiento de las paletas
    if (e.key === 'w' || e.key === 'W') {
        playerY = Math.max(0, playerY - step); // Límite superior
    }
    if (e.key === 's' || e.key === 'S') {
        playerY = Math.min(contHeight - player.offsetHeight, playerY + step); // Límite inferior
    }
    player.style.top = `${playerY}px`;
});

// Lógica principal del juego
function gameLoop() {
    // Movimiento de la pelota
    pelotaX += velocidadX;
    pelotaY += velocidadY;

    // Colisiones con bordes superior e inferior
    if (pelotaY <= 0 || pelotaY + pelota.offsetHeight >= contHeight) {
        velocidadY *= -1; // Cambiar dirección vertical
    }

    // Colisiones con las paletas
    if (
        (pelotaX <= player.offsetWidth + 10 &&
            pelotaY + pelota.offsetHeight > playerY &&
            pelotaY < playerY + player.offsetHeight) ||
        (pelotaX + pelota.offsetWidth >= contWidth - pc.offsetWidth - 10 &&
            pelotaY + pelota.offsetHeight > pcY &&
            pelotaY < pcY + pc.offsetHeight)
    ) {
        velocidadX *= -1; // Cambiar dirección horizontal
    }

    // Reiniciar si la pelota sale del área
    if (pelotaX <= 0 || pelotaX >= contWidth) {
        pelotaX = contWidth / 2 - 10; // Recentrar
        pelotaY = contHeight / 2 - 10;
        velocidadX *= -1; // Cambiar dirección
        velocidadY *= -1;
    }

    // Movimiento de la paleta del PC (IA básica)
    if (pelotaY > pcY + pc.offsetHeight / 2) {
        pcY = Math.min(contHeight - pc.offsetHeight, pcY + 3); // Velocidad de la IA
    } else if (pelotaY < pcY + pc.offsetHeight / 2) {
        pcY = Math.max(0, pcY - 3);
    }

    // Actualizar posiciones
    pelota.style.left = `${pelotaX}px`;
    pelota.style.top = `${pelotaY}px`;
    pc.style.top = `${pcY}px`;

    // Continuar el bucle
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();

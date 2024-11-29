var game = function () {
    let time = 11;
    let movement = 5;  // Ajuste en la velocidad de la pelota para pruebas
    let movementBar = 6;
    let width = document.getElementById("cont-juego").clientWidth - 19;
    let height = document.getElementById("cont-juego").clientHeight;
    let controlGame;
    let player1;
    let player2;
    function increaseMovement() {
        const interval = 10000; // 10 segundos en milisegundos
        const maxMovement = 10;
    
        setInterval(() => {
            if (movement < maxMovement) {
                movement += 1;
                console.log(`Nueva velocidad: ${movement}`);
            }
        }, interval);
    }

    increaseMovement();

    const ball = document.getElementById("ball");

    function start() {
        init();
        controlGame = setInterval(play, time);
    }

    function init() {
        ball.style.left = "0px";
        ball.style.top = `${height / 2}px`; 
        ball.state = 1;
        ball.direction = 1; 
        player1 = document.getElementById("player1");
        player2 = document.getElementById("player2");
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    }

    function stop() {
        clearInterval(controlGame);
        document.body.style.background = "#f00";
    }

    function play() {
        moveBar();
        moveBall();
        checkIfLost();
    }

    function checkIfLost() {
        if (ball.offsetLeft >= width) {
            stop();
            console.log("Punto para player 1");
        }
        if (ball.offsetLeft <= 0) {
            stop();
            console.log("Punto para player 2");
        }
    }

    function moveBall() {
        checkStateBall();
        switch (ball.state) {
            case 1: // derecha, abajo
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 2: // derecha, arriba
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
            case 3: // izquierda, abajo
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 4: // izquierda, arriba
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
        }
    }

    function checkStateBall() {
        if (collidePlayer2()) {
            ball.direction = 2;
            if (ball.state === 1) ball.state = 3;
            if (ball.state === 2) ball.state = 4;
        } else if (collidePlayer1()) {
            ball.direction = 1;
            if (ball.state === 3) ball.state = 1;
            if (ball.state === 4) ball.state = 2;
        }

        if (ball.direction === 1) {
            if (ball.offsetTop >= height) ball.state = 2;
            else if (ball.offsetTop <= 0) ball.state = 1;
        } else {
            if (ball.offsetTop >= height) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }
    }

    function collidePlayer1() {
        const ballLeft = ball.offsetLeft;
        const ballRight = ball.offsetLeft + ball.offsetWidth;
        const ballTop = ball.offsetTop;
        const ballBottom = ball.offsetTop + ball.offsetHeight;
    
        const player1Right = player1.offsetLeft + player1.offsetWidth;
        const player1Top = player1.offsetTop;
        const player1Bottom = player1.offsetTop + player1.offsetHeight;

        return (
            ballRight >= player1.offsetLeft &&
            ballLeft <= player1Right &&
            ballBottom >= player1Top &&
            ballTop <= player1Bottom
        );
    }
    
    function collidePlayer2() {
        const ballLeft = ball.offsetLeft;
        const ballRight = ball.offsetLeft + ball.offsetWidth;
        const ballTop = ball.offsetTop;
        const ballBottom = ball.offsetTop + ball.offsetHeight;
    
        const player2Left = player2.offsetLeft;
        const player2Right = player2Left + player2.offsetWidth;
        const player2Top = player2.offsetTop;
        const player2Bottom = player2.offsetTop + player2.offsetHeight;

        return (
            ballLeft <= player2Right &&
            ballRight >= player2Left &&
            ballBottom >= player2Top &&
            ballTop <= player2Bottom
        );
    }

    function moveBar() {
        if (player1.keyPress) {
            if (player1.keyCode === 87 && player1.offsetTop > 0) {
                player1.style.top = (player1.offsetTop - movementBar) + "px";
                if (player1.offsetTop < 0) player1.style.top = "0px"; // Corregir si se excede
            }
            if (player1.keyCode === 83 && (player1.offsetTop + player1.clientHeight) < height) {
                player1.style.top = (player1.offsetTop + movementBar) + "px";
                if (player1.offsetTop + player1.clientHeight > height) player1.style.top = height - player1.clientHeight + "px"; // Corregir si se excede
            }
        }
        if (player2.keyPress) {
            if (player2.keyCode === 38 && player2.offsetTop > 0) {
                player2.style.top = (player2.offsetTop - movementBar) + "px";
                if (player2.offsetTop < 0) player2.style.top = "0px"; // Corregir si se excede
            }
            if (player2.keyCode === 40 && (player2.offsetTop + player2.clientHeight) < height) {
                player2.style.top = (player2.offsetTop + movementBar) + "px";
                if (player2.offsetTop + player2.clientHeight > height) player2.style.top = height - player2.clientHeight + "px"; // Corregir si se excede
            }
        }
    }

    document.onkeydown = function (e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 87: 
            case 83: 
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
                break;
            case 38: 
            case 40: 
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
                break;
        }
    };

    document.onkeyup = function (e) {
        if (e.keyCode === 87 || e.keyCode === 83)
            player1.keyPress = false;
        if (e.keyCode === 38 || e.keyCode === 40)
            player2.keyPress = false;
    };

    start();
}();

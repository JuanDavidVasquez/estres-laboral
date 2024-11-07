function calcularResultado() {
    const preguntas = document.querySelectorAll(".question");
    let correctas = 0;

    preguntas.forEach((pregunta, index) => {
        const seleccion = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (seleccion && seleccion.value === "correcto") {
            correctas++;
        }
    });

    const total = preguntas.length;
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `Obtuviste ${correctas} de ${total} respuestas correctas. 
    ${correctas === total ? "¡Excelente trabajo!" : "Sigue estudiando el tema."}`;
}

// Variables para el ciclo de respiración
const startButton = document.getElementById('start-button');
const circle = document.querySelector('.circle');
const instruction = document.querySelector('.instruction');
const cycleCounter = document.getElementById('cycle-counter');
const timeRemaining = document.getElementById('time-remaining');

let cycle = 1;
const totalCycles = 9;

// Función para iniciar el ciclo de respiración
function startBreathing() {
    startButton.disabled = true;
    cycle = 1; // Reiniciar ciclo
    let timeLeft = 4; // Tiempo inicial de cada fase
    let phase = 1; // 1 = Inhala, 2 = Sostén, 3 = Exhala

    // Actualizar contadores al iniciar
    cycleCounter.textContent = `Ciclo: ${cycle} / ${totalCycles}`;
    timeRemaining.textContent = `Tiempo restante: ${timeLeft}s`;

    const breathingCycle = setInterval(() => {
        // Actualizar el tiempo restante
        timeLeft--;
        timeRemaining.textContent = `Tiempo restante: ${timeLeft}s`;

        if (timeLeft === 0) {
            // Cambiar a la siguiente fase
            if (phase === 1) {
                instruction.textContent = 'Sostén';
                circle.style.transform = 'scale(1.5)';
                timeLeft = 4;
                phase = 2;
            } else if (phase === 2) {
                instruction.textContent = 'Exhala';
                circle.style.transform = 'scale(1)';
                timeLeft = 4;
                phase = 3;
            } else if (phase === 3) {
                // Completar ciclo y reiniciar para la siguiente ronda
                cycle++;
                if (cycle > totalCycles) {
                    clearInterval(breathingCycle);
                    instruction.textContent = 'Ejercicio finalizado';
                    cycleCounter.textContent = `Ciclo: ${totalCycles} / ${totalCycles}`;
                    startButton.disabled = false;
                    return;
                }
                instruction.textContent = 'Inhala';
                circle.style.transform = 'scale(1.5)';
                timeLeft = 4;
                phase = 1;
                cycleCounter.textContent = `Ciclo: ${cycle} / ${totalCycles}`;
            }
        }
    }, 1000); // Intervalo de 1 segundo
}

// Evento al hacer clic en el botón de inicio
startButton.addEventListener('click', startBreathing);

let words = ["ESTABLECER LIMITES", "TECNICAS DE RELAJACION", "ESTRES LABORAL", "TRABAJO", "SALUD"]; // Lista de palabras
let word = ''; // Palabra actual a adivinar
let guessedWord = []; // Palabra adivinada por el jugador
let lives = 6; // Vidas disponibles
let guessedLetters = []; // Letras adivinadas
let gameOver = false;
let wordsGuessed = 0; // Contador de palabras adivinadas

function initializeGame() {
    word = words[Math.floor(Math.random() * words.length)]; // Elige una palabra aleatoria
    guessedWord = word.split('').map(char => (char === ' ' ? '\n' : '_')); // Usa '\n' para los espacios entre las palabras
    document.getElementById('word-display').innerText = guessedWord.join(''); // Muestra la palabra con saltos de línea
    document.getElementById('lives-left').innerText = `Vidas: ${lives}`;
    document.getElementById('word-counter').innerText = `${wordsGuessed}/${words.length}`; // Muestra el contador de palabras adivinadas
    gameOver = false;
    guessedLetters = [];
    generateKeyboard(); // Genera los botones de letras
}

function guessLetter(letter) {
    if (gameOver || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        // Actualiza la palabra adivinada
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        // Muestra la palabra adivinada, con saltos de línea entre las palabras
        document.getElementById('word-display').innerText = guessedWord.join('');
        checkGameStatus();
    } else {
        lives--;
        document.getElementById('lives-left').innerText = `Vidas: ${lives}`;
        updateHangmanDrawing();
        checkGameStatus();
    }
}



function updateHangmanDrawing() {
    let drawing = '';
    switch (lives) {
        case 5:
            drawing = 'O';
            break;
        case 4:
            drawing = 'O\n|';
            break;
        case 3:
            drawing = 'O\n|/\n';
            break;
        case 2:
            drawing = 'O\n|/\n|';
            break;
        case 1:
            drawing = 'O\n|/\n|\\';
            break;
        case 0:
            drawing = 'O\n|/\n|\\\n/\\';
            break;
    }
    document.getElementById('hangman-drawing').innerText = drawing;
}

function checkGameStatus() {
    if (!guessedWord.includes('_')) {
        // Si se adivina la palabra, actualiza el contador de palabras adivinadas
        wordsGuessed++;
        document.getElementById('word-counter').innerText = `${wordsGuessed}/${words.length}`;
        
        // Si se han adivinado todas las palabras, reinicia el juego
        if (wordsGuessed === words.length) {
            alert("¡Felicidades! Has adivinado todas las palabras.");
            resetGame(); // Reinicia el juego con un nuevo ciclo
        } else {
            setTimeout(() => {
                resetGame(); // Pausa de 1 segundo antes de reiniciar
            }, 1000);
        }
    } else if (lives === 0) {
        // Si se quedan sin vidas, reinicia el juego
        setTimeout(() => {
            resetGame();
        }, 1000); // Pausa de 1 segundo antes de reiniciar
    }
}

function resetGame() {
    lives = 6;
    guessedLetters = [];
    initializeGame(); // Inicializa el juego con una nueva palabra aleatoria
    document.getElementById('hangman-drawing').innerText = ''; // Vacia el dibujo
}

function generateKeyboard() {
    let keyboardContainer = document.getElementById('keyboard-container');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    keyboardContainer.innerHTML = '';

    alphabet.split('').forEach(letter => {
        let button = document.createElement('button');
        button.classList.add('letter-btn');
        button.innerText = letter;
        button.onclick = () => guessLetter(letter);
        keyboardContainer.appendChild(button);
    });
}

// Inicializa el juego cuando se carga la página
initializeGame();

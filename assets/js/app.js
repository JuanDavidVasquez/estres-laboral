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

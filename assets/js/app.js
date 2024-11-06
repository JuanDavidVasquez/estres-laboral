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
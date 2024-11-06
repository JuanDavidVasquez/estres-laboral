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

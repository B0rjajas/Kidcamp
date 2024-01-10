document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq .question');

    questions.forEach(question => {
        question.addEventListener('click', function () {
            // Cierra todas las respuestas y desactiva todas las preguntas
            questions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.querySelector('.answer').style.display = 'none';
                }
            });

            // Abre o cierra la respuesta actual y activa/desactiva la pregunta
            question.classList.toggle('active');
            const answer = question.querySelector('.answer');
            answer.style.display = question.classList.contains('active') ? 'block' : 'none';
        });
    });
});

const QUIZ_KEY = 'quiz_data';



function addQuestionHTML() {
    const container = document.getElementById('questions-container');
    const count = container.children.length + 1;

    const div = document.createElement('div');
    div.className = 'q-box';

    div.innerHTML = `
        <div class="q-box-header">Question ${count}</div>

        <input class="q-txt" type="text" placeholder="Enter question">

        <div class="grid">
            <input class="opt1" type="text" placeholder="Option 1">
            <input class="opt2" type="text" placeholder="Option 2">
            <input class="opt3" type="text" placeholder="Option 3">
            <input class="opt4" type="text" placeholder="Option 4">
        </div>

        <input class="correct"
               type="number"
               min="1"
               max="4"
               placeholder="Correct answer (1–4)">
    `;

    container.appendChild(div);
}


function saveQuiz() {
    const titleInput = document.getElementById('quiz-title');
    const title = titleInput.value.trim();

    if (!title) {
        alert("Quiz title is required");
        titleInput.focus();
        return;
    }

    const qElements = document.querySelectorAll('.q-box');
    if (qElements.length === 0) {
        alert("Add at least one question");
        return;
    }

    const questions = [];

    for (let box of qElements) {
        const text = box.querySelector('.q-txt').value.trim();
        const options = [
            box.querySelector('.opt1').value.trim(),
            box.querySelector('.opt2').value.trim(),
            box.querySelector('.opt3').value.trim(),
            box.querySelector('.opt4').value.trim()
        ];
        const correctVal = box.querySelector('.correct').value;

        if (!text || options.some(opt => opt === '')) {
            alert("Please fill all question fields");
            return;
        }

        const correct = parseInt(correctVal, 10);
        if (isNaN(correct) || correct < 1 || correct > 4) {
            alert("Correct answer must be between 1 and 4");
            return;
        }

        questions.push({
            text,
            options,
            correct: correct - 1
        });
    }

    const quizzes = JSON.parse(localStorage.getItem(QUIZ_KEY) || '[]');

    quizzes.push({
        id: Date.now(),
        title,
        questions
    });

    localStorage.setItem(QUIZ_KEY, JSON.stringify(quizzes));

    alert("Quiz saved successfully!");
    window.location.href = 'home.html';
}


function loadQuizList() {
    const list = document.getElementById('quiz-list');
    const quizzes = JSON.parse(localStorage.getItem(QUIZ_KEY) || '[]');

    if (quizzes.length === 0) {
        list.innerHTML = "<p>No quizzes available.</p>";
        return;
    }

    list.innerHTML = quizzes.map(q => `
        <div class="quiz-card">
            <h3>${q.title}</h3>

            <button class="play-btn"
                    onclick="startQuiz(${q.id})">
                ▶ Start Quiz
            </button>
        </div>
    `).join('');
}


function startQuiz(id) {
    window.location.href = `take-quiz.html?id=${id}`;
}
function deleteQuiz(id) {
    const confirmDelete = confirm("Are you sure you want to delete this quiz?");
    if (!confirmDelete) return;

    let quizzes = JSON.parse(localStorage.getItem('quiz_data') || '[]');
    quizzes = quizzes.filter(q => q.id !== id);

    localStorage.setItem('quiz_data', JSON.stringify(quizzes));
    loadQuizList(); 
}
  

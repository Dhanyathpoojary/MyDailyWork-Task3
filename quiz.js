// Correct answer
const correctAnswer = "Hyper Text Markup Language";

// Get form
const form = document.getElementById("quizForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page refresh

    // Get selected option
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        alert("Please select an answer");
        return;
    }

    let score = 0;

    if (selected.value === correctAnswer) {
        score = 1;
    }

    // Save result
    localStorage.setItem("score", score);
    localStorage.setItem("correctAnswer", correctAnswer);

    // Go to result page
    window.location.href = "result.html";
});

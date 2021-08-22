let details = document.querySelector('.details');
let quiz = document.querySelector('.quiz');
let next = document.querySelector('.next');
let topics = document.querySelector(".topics");
let question = document.querySelector(".question");
let optionsEl = document.querySelector(".options");
let one = document.querySelector(".option-1");
let two = document.querySelector(".option-2");
let three = document.querySelector(".option-3");
let four = document.querySelector(".option-4");

// utility functions

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function showQuestion(count, results) {
    let item = results[count];
    optionsEl.style.display = "block";

    // getting options
    let correct = item.correct_answer;
    let options = item.incorrect_answers;
    options.push(correct);
    let arr = shuffle(options);

    // question
    question.innerHTML = item.question;
    // options
    one.innerHTML = arr[0];
    two.innerHTML = arr[1];
    three.innerHTML = arr[2];
    four.innerHTML = arr[3];
}

function showScore(score) {
    question.innerHTML = `Your score is ${score}/20`;
    optionsEl.style.display = "none";
    next.style.display = "inline-block";
}

function play(data) {
    let results = data.results;
    let count = 0,
        score = 0;

    showQuestion(count, results);

    optionsEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("option")) {
            let correct = results[count].correct_answer;

            if (e.target.innerHTML === correct) {
                score++;
            }
            count++;
            if (count >= 20) {
                showScore(score);
            } else {
                showQuestion(count, results);
            }
        }
    });
}

// main functions

function allQuiz() {
    details.classList.add("hide");
    quiz.classList.remove("hide");
    fetch(`https://opentdb.com/api.php?amount=20&type=multiple`).then(res => res.json()).then(data => play(data));
}

function getQuiz(n) {
    details.classList.add("hide");
    quiz.classList.remove("hide");
    fetch(`https://opentdb.com/api.php?amount=20&category=${n}&type=multiple`).then(res => res.json()).then(data => play(data));
}

// events

topics.addEventListener("click", (e) => {
    if (e.target.classList.contains("all")) allQuiz();
    else if (e.target.classList.contains("sn")) getQuiz(17);
    else if (e.target.classList.contains("sc")) getQuiz(18);
    else if (e.target.classList.contains("gk")) getQuiz(9);
    else if (e.target.classList.contains("ef")) getQuiz(11);
    else if (e.target.classList.contains("sm")) getQuiz(19);
});
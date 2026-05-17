const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Transfer Machine Language", correct: false },
      { text: "Hyperlinks Text Mark Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "Which is used for web page functionality?",
    answers: [
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Google", correct: false },
      { text: "Netscape", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, correct) {
  const buttons = answerButtons.children;

  Array.from(buttons).forEach(btn => {
    btn.disabled = true;
  });

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  const currentAnswers = questions[currentQuestionIndex].answers;

  Array.from(buttons).forEach((btn, index) => {
    if (currentAnswers[index].correct) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreElement.innerText = `${score} / ${questions.length}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
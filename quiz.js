let playerName = "";

const nameInputDiv = document.getElementById("nameInput");
const welcomeDiv = document.getElementById("welcomeMessage");
const startBtn = document.getElementById("startBtn");
const nameLabel = document.getElementById("nameLabel");
const playerNameInput = document.getElementById("playerNameInput");

function resetPlayer() {
    playerName = "";
    nameLabel.textContent = "Masukkan Nama:";
}

startBtn.addEventListener("click", function() {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
        Swal.fire("Error!", "Please enter your name.", "error");
    } else {
        Swal.fire("Success!", `Welcome, ${playerName}!`, "success");
        nameLabel.textContent = "Nama Anda adalah: " + playerName;
        nameInputDiv.style.display = "none";
        welcomeDiv.style.display = "block";
    }
});

endBtn.addEventListener("click", function() {
    resetPlayer();
});


const questions = [{
        number: 1,
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin"],
        answer: "Paris"
    },
    {
        number: 1,
        question: "What is the currency of Japan?",
        choices: ["Yen", "Dollar", "Euro"],
        answer: "Yen"
    },
    {
        number: 1,
        question: "What is the largest organ in the human body?",
        choices: ["Liver", "Skin", "Heart"],
        answer: "Skin"
    },
    {
        number: 2,
        question: "What is the tallest mountain in the world?",
        choices: ["Mount Everest", "Mount Kilimanjaro", "Mount Fuji"],
        answer: "Mount Everest"
    },
    {
        number: 2,
        question: "What is the largest ocean in the world?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        number: 2,
        question: "What is the hottest planet in the solar system?",
        choices: ["Venus", "Mars", "Mercury"],
        answer: "Venus"
    },
    {
        number: 3,
        question: "Who wrote the Harry Potter series?",
        choices: ["J.K. Rowling", "Stephen King", "George R.R. Martin"],
        answer: "J.K. Rowling"
    },
    {
        number: 3,
        question: "What is the name of the first man to walk on the moon?",
        choices: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
        answer: "Neil Armstrong"
    },
    {
        number: 3,
        question: "What is the largest animal on earth?",
        choices: ["Elephant", "Blue Whale", "Giraffe"],
        answer: "Blue Whale"
    }
];

const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", generateQuestion);

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", checkAnswer);

let currentQuestion;

function generateQuestion() {
    const selectedNumber = parseInt(document.getElementById("selectedNumber").value);
    const filteredQuestions = questions.filter(question => question.number === selectedNumber);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    currentQuestion = filteredQuestions[randomIndex];
    const questionDiv = document.getElementById("questionDiv");
    questionDiv.innerHTML = ""; // Clear previous question
    const questionElement = document.createElement("div");

    questionElement.innerHTML = `
    <h3>Question ${currentQuestion.number}: ${currentQuestion.question}</h3>
    <ul>
      ${currentQuestion.choices.map(choice => `
      <li><input type="radio" name="answer" value="${choice}">${choice}</li>`).join("")}
    </ul>
  `;
questionDiv.appendChild(questionElement);
}
function checkAnswer() {
  if (!currentQuestion) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please generate a question first.',
    });
    return;
  }
  const selectedAnswer = document.querySelector("input[type=radio]:checked");
  if (!selectedAnswer) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please select an answer.',
    });
    return;
  }
  const userAnswer = selectedAnswer.value;
  if (userAnswer === currentQuestion.answer) {
    Swal.fire({
      icon: 'success',
      title: 'Correct!',
      showCancelButton: true,
      confirmButtonText: 'Close',
      cancelButtonText: 'See Details',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: `Question ${currentQuestion.number}: ${currentQuestion.question}`,
          html: `The correct answer is: ${currentQuestion.answer}`,
          imageUrl: 'test.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonText: 'Close',
          showCancelButton: false,
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect',
      text: `The correct answer is: ${currentQuestion.answer}`,
      showCancelButton: true,
      confirmButtonText: 'Close',
      cancelButtonText: 'See Details',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        generateQuestion();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: `Question ${currentQuestion.number}: ${currentQuestion.question}`,
          html: `The correct answer is: ${currentQuestion.answer}`,
          confirmButtonText: 'Close',
          showCancelButton: false,
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            generateQuestion();
          }
        });
      }
    });
  }
}

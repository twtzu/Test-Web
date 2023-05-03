let playerName = "";

const nameInputDiv = document.getElementById("nameInput");
const welcomeDiv = document.getElementById("welcomeMessage");
const startBtn = document.getElementById("startBtn");
const nameLabel = document.getElementById("nameLabel");
const playerNameInput = document.getElementById("playerNameInput");
let currentQuestion;
const generateBtn = document.getElementById("generateBtn");

let questions = [];

function fetchQuestions() {
    console.log("fetchQuestions function called");
    fetch("questions.json")
        .then((response) => response.json())
        .then((data) => {
            console.log("Questions fetched from server:", data);
            questions = data;
            generateBtn.disabled = false; // Enable the generate button
        })
        .catch((error) => {
            console.error("Error fetching questions:", error);
        });
}

async function startQuiz() {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
        Swal.fire("Error!", "Masukkan Nama", "error");
    } else {
        Swal.fire("Berhasil!", `Selamat datang, ${playerName}!`, "success");
        nameLabel.textContent = "Nama Anda adalah: " + playerName;
        nameInputDiv.style.display = "none";
        welcomeDiv.style.display = "block";
        await fetchQuestions(); // Wait for questions to be fetched before enabling generate button
    }
}

startBtn.addEventListener("click", startQuiz);

async function generateQuestion() {
    if (!questions || questions.length === 0) {
        // Fetch questions if they haven't been fetched yet
        await fetchQuestions();
    }

    const selectedNumber = parseInt(document.getElementById("selectedNumber").value);
    const filteredQuestions = questions.filter((question) => question.numbers && question.numbers.includes(selectedNumber));

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    currentQuestion = filteredQuestions[randomIndex];
    const questionDiv = document.getElementById("questionDiv");
    questionDiv.innerHTML = ""; // Clear previous question
    const questionElement = document.createElement("div");

    questionElement.innerHTML = `
    <h3>Soal: ${currentQuestion.question}</h3>
    <ul>
      ${currentQuestion.choices.map((choice) => `
      <li><input type="radio" name="answer" value="${choice}">${choice}</li>`).join("")}
    </ul>
  `;
  questionElement.style.textAlign = "left";
  questionDiv.appendChild(questionElement);
}

generateBtn.addEventListener("click", generateQuestion);
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", checkAnswer);
function checkAnswer() {

  if (!currentQuestion) {
    Swal.fire({
      icon: 'warning',
      title: 'Gagal',
      text: 'Tolong pencet tombol "soal".',
    });
    return;
  }
  const selectedAnswer = document.querySelector("input[type=radio]:checked");
  if (!selectedAnswer) {
    Swal.fire({
      icon: 'warning',
      title: 'Gagal',
      text: 'Pilih 1 jawaban.',
    });
    return;
  }
  const userAnswer = selectedAnswer.value;
  if (userAnswer === currentQuestion.answer) {
    Swal.fire({
      icon: 'success',
      title: 'Benar!',
      showCancelButton: true,
      confirmButtonText: 'Tutup',
      confirmButtonClass: 'konfirmasi',
      cancelButtonText: 'Tampilkan detail',
      cancelFbButtonClass: 'konfirmasi',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: `${currentQuestion.question}`,
          html: `Jawaban yang benar adalah: ${currentQuestion.details}`,
          imageUrl: currentQuestion.images,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonText: 'Tutup',
          confirmButtonClass: 'konfirmasi',
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
      showCancelButton: true,
      confirmButtonText: 'Tutup',
      confirmButtonClass: 'konfirmasi',
      cancelButtonText: 'Tampilkan detail',
      cancelButtonClass: 'konfirmasi',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: `${currentQuestion.question}`,
          html: `Jawaban yang benar adalah: ${currentQuestion.details}`,
          imageUrl: currentQuestion.images,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonText: 'Tutup',
          confirmButtonClass: 'konfirmasi',
          showCancelButton: false,
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      }
    });
  }
}
const endBtn = document.getElementById("endBtn");

endBtn.addEventListener("click", function() {
  location.reload();
});

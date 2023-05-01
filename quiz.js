let playerName = "";

const nameInputDiv = document.getElementById("nameInput");
const welcomeDiv = document.getElementById("welcomeMessage");
const startBtn = document.getElementById("startBtn");
const nameLabel = document.getElementById("nameLabel");
const playerNameInput = document.getElementById("playerNameInput");
const generateBtn = document.getElementById("generateBtn"); // Add this line

let questions = [];

// Fetch the questions from the JSON file
fetch('./questions.json')
    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(data => {
        questions = data;
        // Enable the generate button
        generateBtn.removeAttribute("disabled");
    })
    .catch(error => {
        console.error("Error fetching questions:", error);
    });


function resetPlayer() {
    playerName = "";
    nameLabel.textContent = "Masukkan Nama:";
    currentQuestion = null;
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
        generateBtn.removeAttribute("disabled"); // Enable the generate button
    }
});

endBtn.addEventListener("click", function() {
    resetPlayer();
    generateBtn.setAttribute("disabled", true); // Disable the generate button
});

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
    <h3>Soal: ${currentQuestion.question}</h3>
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
          title: `${currentQuestion.question}`,
          html: `The correct answer is: ${currentQuestion.details}`,
          imageUrl: currentQuestion.images,
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
      showCancelButton: true,
      confirmButtonText: 'Close',
      cancelButtonText: 'Show Details',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: `Question ${currentQuestion.number}: ${currentQuestion.question}`,
          html: `The correct answer is: ${currentQuestion.details}`,
          imageUrl: currentQuestion.images,
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
  }
}


// const questions = [{
//   number: 1,
//   question: "1.	Apa yang dimaksud dengan reboisasi?",
//   choices: ["A.	Penggundulan hutan secara massal", 
//             "B.	Proses penghijauan kembali lahan yang dulunya ditanami pohon", 
//             "C.	Pemanenan hutan secara teratur untuk dijual",
//             "D.	Perkebunan besar-besaran dengan spesies pohon yang sama"],
//   answer: "B.	Proses penghijauan kembali lahan yang dulunya ditanami pohon",
//   details: "Reboisasi adalah proses penanaman kembali pohon atau pembuatan hutan baru di lahan yang sebelumnya telah rusak atau terdegradasi. Tujuan dari reboisasi adalah untuk memulihkan dan memperbaiki fungsi hutan serta mengurangi dampak negatif perusakan hutan terhadap lingkungan dan kehidupan manusia.",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 1,
//   question: "1.	Apa dampak positif dari reboisasi terhadap pemanasan global?",
//   choices: ["A.	Mengurangi jumlah karbon dioksida dalam atmosfer", 
//             "B.	Proses penghijauan kembali lahan yang dulunya ditanami pohon", 
//             "C.	Meningkatkan kebakaran hutan",
//             "D.	Menurunkan kualitas udara"],
//   answer: "A.	Mengurangi jumlah karbon dioksida dalam atmosfer",
//   details: "Pohon-pohon yang ditanam dalam reboisasi dapat menyerap karbon dioksida dari atmosfer melalui proses fotosintesis, sehingga mengurangi konsentrasi gas rumah kaca dan mengurangi efek pemanasan global.",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 1,
//   question: "1.	Mengapa reboisasi dapat membantu mengurangi pemanasan global?",
//   choices: ["A.	Karena pohon dapat menyerap karbon dioksida dari udara dan mengubahnya menjadi oksigen", 
//             "B.	Karena pohon dapat menghasilkan gas rumah kaca", 
//             "C.	Karena pohon dapat meningkatkan suhu di sekitarnya",
//             "D.	Karena pohon dapat menghasilkan karbon monoksida"],
//   answer: "A.	Karena pohon dapat menyerap karbon dioksida dari udara dan mengubahnya menjadi oksigen",
//   details: "Pohon-pohon yang ditanam dalam reboisasi dapat menyerap karbon dioksida dari atmosfer melalui proses fotosintesis, sehingga mengurangi konsentrasi gas rumah kaca dan mengurangi efek pemanasan global. ",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 1,
//   question: "1.	Apa manfaat lain dari reboisasi selain membantu mengurangi pemanasan global?",
//   choices: ["A.	Meningkatkan keanekaragaman hayati", 
//             "B.	Menurunkan kualitas air", 
//             "C.	Meningkatkan erosi tanah",
//             "D.	Meningkatkan emisi gas rumah kaca"],
//   answer: "A.	Meningkatkan keanekaragaman hayati",
//   details: "Pohon-pohon yang ditanam dapat memperbaiki kondisi tanah dan air di sekitarnya serta memberikan habitat bagi flora dan fauna yang mungkin telah terancam karena kerusakan hutan.",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 1,
//   question: "1.	Apa yang harus dipertimbangkan dalam memilih spesies pohon untuk reboisasi?",
//   choices: ["A.	Daya tahan terhadap hama dan penyakit", 
//             "B.	Kemampuan untuk berbuah", 
//             "C.	Kemampuan menyerap gas rumah kaca",
//             "D.	Kemampuan untuk menghasilkan oksigen"],
//   answer: "A.	Daya tahan terhadap hama dan penyakit",
//   details: "Pertimbangan daya tahan terhadap hama dan penyakit sangat penting karena pohon yang rentan terhadap serangan hama dan penyakit dapat menyebabkan kegagalan dalam reboisasi. ",
//   images: 'reboisasi.jpg'
// },


// {
//   number: 1,
//   question: "1.	Apa manfaat dari reboisasi dalam upaya mitigasi pemanasan global?",
//   choices: ["A.	Menyerap karbon dioksida dan menghasilkan oksigen", 
//             "B.	Meningkatkan konsentrasi gas rumah kaca di atmosfer", 
//             "C.	Meningkatkan suhu global",
//             "D.	Meningkatkan penggunaan bahan bakar fosil"],
//   answer: "A.	Menyerap karbon dioksida dan menghasilkan oksigen",
//   details: "Pohon-pohon yang ditanam dalam reboisasi dapat menyerap karbon dioksida dari atmosfer melalui proses fotosintesis, sehingga mengurangi konsentrasi gas rumah kaca dan mengurangi efek pemanasan global.",
//   images: 'reboisasi.jpg'
// },


// {
//   number: 1,
//   question: "1.	Apa peran penting dari penghijauan kota dalam upaya mitigasi pemanasan global?",
//   choices: ["A.	Meningkatkan keindahan kota dan menarik wisatawan", 
//             "B.	Menurunkan suhu lingkungan dan menyerap karbon dioksida", 
//             "C.	Meningkatkan konsumsi energi dan bahan bakar fosil",
//             "D.	Menurunkan kualitas udara di perkotaan"],
//   answer: "B.	Menurunkan suhu lingkungan dan menyerap karbon dioksida",
//   details: "Pohon-pohon dan tanaman hijau dapat menyerap dan menstabilkan emisi gas rumah kaca seperti karbon dioksida, serta mengurangi efek panas permukaan kota.",
//   images: 'reboisasi.jpg'
// },


// {
//   number: 1,
//   question: "1.	Apa yang dimaksud dengan agroforestri?",
//   choices: ["A.	Sistem pengelolaan lahan yang mengintegrasikan tanaman pertanian dengan tanaman hutan", 
//             "B.	Penanaman pohon pada lahan gambut", 
//             "C.	Teknik pertanian berbasis teknologi tinggi",
//             "D.	Pemanenan kayu tanpa melakukan penghutanan"],
//   answer: "A.	Sistem pengelolaan lahan yang mengintegrasikan tanaman pertanian dengan tanaman hutan",
//   details: "Agroforestri adalah suatu sistem pengelolaan lahan yang mengintegrasikan tanaman pertanian atau peternakan dengan pohon-pohon dalam suatu pola tertentu. Agroforestri mengkombinasikan tanaman tahunan, semusim, dan pohon-pohon dalam satu lahan dengan cara yang terorganisir dan terencana",
//   images: 'reboisasi.jpg'
// },


// {
//   number: 1,
//   question: "1.	Apa tantangan yang mungkin dihadapi dalam pelaksanaan program reboisasi",
//   choices: ["A.	Keterbatasan dana", 
//             "B.	Kelebihan lahan kosong", 
//             "C.	Ketersediaan sumber daya alam yang berlebihan",
//             "D.	Kondisi lingkungan yang mendukung"],
//   answer: "A.	Keterbatasan dana",
//   details: "",
//   images: 'reboisasi.jpg'
// },


// {
//   number: 1,
//   question: "8.	Apa yang dimaksud dengan hutan kota?",
//   choices: ["A.	Hutan yang tumbuh di daerah perkotaan", 
//             "B.	Hutan yang dikelola oleh pemerintah kota", 
//             "C.	Hutan yang digunakan sebagai tempat rekreasi di perkotaan",
//             "D.	Hutan yang dijadikan sebagai kawasan pemukiman penduduk di perkotaan"],
//   answer: "A.	Hutan yang tumbuh di daerah perkotaan",
//   details: "Hutan kota adalah area penghijauan yang dibuat di dalam atau sekitar kota dengan tujuan untuk memberikan manfaat lingkungan dan kesehatan bagi warga kota. Hutan kota dapat berupa taman kota, jalur hijau, atau kawasan hutan kecil yang terletak di tengah-tengah kawasan perkotaan.",
//   images: 'reboisasi.jpg'
// },


// {
//   number: 2,
//   question: "2.	Apa yang dimaksud dengan restorasi perairan?",
//   choices: ["A.	Membersihkan sampah plastik di tepi pantai", 
//             "B.	Memulihkan ekosistem perairan yang rusak", 
//             "C.	Melakukan pengolahan air minum",
//             "D.	Membangun waduk untuk memperbesar volume air"],
//   answer: "B.	Memulihkan ekosistem perairan yang rusak",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 2,
//   question: "2.	Mengapa restorasi perairan penting dalam menangani pemanasan global?",
//   choices: ["A.	Restorasi perairan dapat mengurangi penggunaan bahan bakar fosil", 
//             "B.	Restorasi perairan dapat mengurangi produksi emisi gas rumah kaca", 
//             "C.	Restorasi perairan dapat meningkatkan kualitas air dan memperkuat ekosistem ",
//             "D.	Restorasi perairan dapat mempercepat laju pemanasan global"],
//   answer: "C.	Restorasi perairan dapat meningkatkan kualitas air dan memperkuat ekosistem ",
//   details: "Restorasi perairan biasanya dilakukan untuk memperbaiki kualitas air dan mengembalikan keanekaragaman hayati di perairan yang terdampak oleh aktivitas manusia, seperti pertanian, industri, atau pembangunan pemukiman. Restorasi perairan juga dapat membantu meningkatkan fungsi ekosistem perairan, seperti sebagai sumber daya air bersih dan habitat bagi ikan dan organisme air lainnya.",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 2,
//   question: "1.	Apa contoh program restorasi perairan yang dilakukan oleh pemerintah Indonesia?",
//   choices: ["A.	Program pembuatan waduk di seluruh wilayah Indonesia", 
//             "B.	Program pengurangan penggunaan bahan bakar fosil oleh masyarakat", 
//             "C.	Program penanaman mangrove dan pemulihan ekosistem perairan pantai",
//             "D.	Program pengolahan air minum di daerah perkotaan"],
//   answer: "C.	Program penanaman mangrove dan pemulihan ekosistem perairan pantai",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 2,
//   question: "2.	Apa manfaat restorasi ekosistem mangrove dalam mengurangi dampak pemanasan global?",
//   choices: ["A.	Menyerap emisi gas rumah kaca dari industri dan kendaraan", 
//             "B.	Mengurangi jumlah limbah plastik di laut", 
//             "C.	Meningkatkan produksi oksigen dan mengurangi kadar karbon dioksida di atmosfer",
//             "D.	Menjaga kesehatan populasi ikan dan menjaga keseimbangan ekosistem perairan"],
//   answer: "D.	Menjaga kesehatan populasi ikan dan menjaga keseimbangan ekosistem perairan",
//   details: "Mangrove melindungi garis pantai dari abrasi dan badai, serta menyerap karbon dioksida dari atmosfer. Namun, terumbu karang yang rusak dan perusakan habitat di sekitar pantai dapat mempengaruhi keseimbangan ekosistem perairan dan berdampak buruk pada populasi ikan. Dengan melakukan restorasi ekosistem mangrove, maka kesehatan populasi ikan dan keseimbangan ekosistem perairan dapat dijaga.",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 2,
//   question: "2.	Metode restorasi perairan yang melibatkan pemindahan atau penanaman tanaman air dan tumbuhan yang berkaitan dengan perairan disebut:",
//   choices: ["A.	Aquaponik", 
//             "B.	Riparian buffer", 
//             "C.	Pemulihan lahan basah",
//             "D.	Revegetasi"],
//   answer: "D. Revegetasi",
//   details: "Metode restorasi perairan yang melibatkan pemindahan atau penanaman tanaman air dan tumbuhan yang berkaitan dengan perairan disebut revegetasi. Metode ini dilakukan untuk meningkatkan kualitas habitat perairan, memperbaiki kualitas air, dan mencegah erosi pantai. Revegetasi dapat dilakukan dengan menanam vegetasi air seperti teratai, eceng gondok, dan lamun, yang akan memberikan perlindungan dan tempat berkembang biak bagi berbagai jenis ikan dan hewan air.",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 2,
//   question: "7.	Restorasi perairan dapat mengurangi dampak pemanasan global dengan cara",
//   choices: ["A.	Mengurangi suhu air di perairan", 
//             "B.	Menghilangkan semua spesies invasif di perairan", 
//             "C.	Meningkatkan kekerasan air di perairan",
//             "D.	Mengurangi aliran air di perairan"],
//   answer: "A.	Mengurangi suhu air di perairan",
//   details: "Hal ini dapat dicapai dengan menanam vegetasi di sekitar perairan, seperti mangrove atau tanaman air lainnya, yang dapat menyerap panas dari matahari dan mengurangi efek panas dari permukaan air",
//   images: 'reboisasi.jpg'
// },

// // {
// //   number: 2,
// //   question: "",
// //   choices: ["", 
// //             "", 
// //             "",
// //             ""],
// //   answer: "",
// //   details: "",
// //   images: 'reboisasi.jpg'
// // },

// // {
// //   number: 2,
// //   question: "",
// //   choices: ["", 
// //             "", 
// //             "",
// //             ""],
// //   answer: "",
// //   details: "",
// //   images: 'reboisasi.jpg'
// // },

// // {
// //   number: 2,
// //   question: "",
// //   choices: ["", 
// //             "", 
// //             "",
// //             ""],
// //   answer: "",
// //   details: "",
// //   images: 'reboisasi.jpg'
// // },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// {
//   number: 3,
//   question: "",
//   choices: ["", 
//             "", 
//             "",
//             ""],
//   answer: "",
//   details: "",
//   images: 'reboisasi.jpg'
// },

// ];

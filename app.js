/* ==========================================
   APP DE QUIZ — PREMED ANATOMÍA Y FISIOLOGÍA
========================================== */

const sections = [
  { id: "morfofuncionales", title: "Características morfofuncionales", icon: "🧬", file: "morfofuncionales.json" },
  { id: "planos", title: "Planos anatómicos", icon: "🧭", file: "planos.json" },
  { id: "terminos", title: "Términos anatómicos", icon: "📐", file: "terminos.json" },
  { id: "nervioso", title: "Sistema nervioso", icon: "🧠", file: "nervioso.json" },
  { id: "endocrino", title: "Sistema endócrino", icon: "🌡️", file: "endocrino.json" },
  { id: "inmunologico", title: "Sistema inmunológico", icon: "🛡️", file: "inmunologico.json" },
  { id: "linfatico", title: "Sistema linfático", icon: "💧", file: "linfatico.json" },
  { id: "tegumentario", title: "Sistema tegumentario", icon: "🧴", file: "tegumentario.json" },
  { id: "musculoesqueletico", title: "Sistema musculoesquelético", icon: "🦴", file: "musculoesqueletico.json" },
  { id: "cardiovascular", title: "Aparato cardiovascular", icon: "❤️", file: "cardiovascular.json" },
  { id: "respiratorio", title: "Aparato respiratorio", icon: "🫁", file: "respiratorio.json" },
  { id: "digestivo", title: "Aparato digestivo", icon: "🍽️", file: "digestivo.json" },
  { id: "urinario", title: "Aparato urinario", icon: "🚽", file: "urinario.json" },
  { id: "reproductor", title: "Aparato reproductor", icon: "🧬", file: "reproductor.json" }
];

// ELEMENTOS DEL DOM
const menu = document.getElementById("menu");
const quiz = document.getElementById("quiz");
const backBtn = document.getElementById("backBtn");
const qMeta = document.getElementById("qmeta");
const qText = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const showAnswersBtn = document.getElementById("showAnswersBtn");

let questions = [];
let currentIndex = 0;
let userAnswers = [];
let showCorrect = false;

/* ===========================
   GENERAR MENÚ DE TARJETAS
=========================== */
function loadMenu() {
  menu.innerHTML = "";

  sections.forEach(sec => {
    const card = document.createElement("div");
    card.className = "card-btn";
    card.innerHTML = `
      <div class="icon">${sec.icon}</div>
      <h3>${sec.title}</h3>
    `;
    card.onclick = () => loadSection(sec);
    menu.appendChild(card);
  });
}

loadMenu();

/* ===========================
   CARGAR SECCIÓN (JSON)
=========================== */
function loadSection(section) {
  fetch(section.file)
    .then(res => res.json())
    .then(data => {
      questions = data;
      currentIndex = 0;
      userAnswers = Array(questions.length).fill(null);
      showCorrect = false;

      menu.classList.add("hidden");
      quiz.classList.remove("hidden");

      qMeta.textContent = `${section.title} — ${questions.length} preguntas`;

      renderQuestion();
    })
    .catch(err => {
      alert("Error cargando la sección. ¿Subiste el archivo JSON?");
      console.error(err);
    });
}

/* ===========================
   MOSTRAR PREGUNTA
=========================== */
function renderQuestion() {
  const q = questions[currentIndex];
  qText.textContent = `${currentIndex + 1}. ${q.question}`;

  choicesEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const li = document.createElement("li");
    li.textContent = choice;

    // Respuesta seleccionada
    if (userAnswers[currentIndex] === i) {
      li.classList.add("selected");
    }

    // Mostrar correctas
    if (showCorrect) {
      if (i === q.answer) li.classList.add("correct");
      else if (userAnswers[currentIndex] === i) li.classList.add("incorrect");
    }

    li.onclick = () => {
      userAnswers[currentIndex] = i;
      renderQuestion();
    };

    choicesEl.appendChild(li);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === questions.length - 1;
}

/* ===========================
   BOTONES
=========================== */
prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
};

nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  }
};

showAnswersBtn.onclick = () => {
  showCorrect = !showCorrect;
  showAnswersBtn.textContent = showCorrect ? "Ocultar respuestas" : "Mostrar respuestas";
  renderQuestion();
};

backBtn.onclick = () => {
  quiz.classList.add("hidden");
  menu.classList.remove("hidden");
};


const lessons = [
  {
    name: "AGN Core Parts",
    questions: [
      {
        type: "blank",
        badge: "Fill in the blank",
        prompt: "An AGN is powered by matter falling onto a supermassive ______ hole.",
        hint: "Think of the central engine.",
        answer: ["black"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "Which structure in AGN emits strong thermal UV/optical light?",
        hint: "It's a rotating disk of hot gas.",
        answer: "Accretion disk",
        options: ["Dusty torus", "Accretion disk", "Narrow-line region"]
      },
      {
        type: "blank",
        badge: "Complete the sentence",
        prompt: "The BLR (Broad-Line Region) is called 'broad' because gas there moves at very high ______.",
        hint: "Plural noun.",
        answer: ["velocities", "speeds"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "The dusty torus mostly helps explain differences in AGN ______.",
        hint: "Orientation-based unified model.",
        answer: "types",
        options: ["sizes", "types", "ages"]
      },
      {
        type: "blank",
        badge: "Fill in the blank",
        prompt: "The narrow-line region is located ______ from the black hole than the BLR.",
        hint: "Comparative word.",
        answer: ["farther", "further"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "If a jet is pointed nearly at us, the AGN is often classified as a:",
        hint: "A jet-dominated class.",
        answer: "Blazar",
        options: ["Seyfert 2", "LINER", "Blazar"]
      },
      {
        type: "blank",
        badge: "Complete the sentence",
        prompt: "AGN jets are often called ______ because particles move close to light speed.",
        hint: "Starts with r.",
        answer: ["relativistic"]
      },
      {
        type: "multiple",
        badge: "Quick check",
        prompt: "Which is generally the most luminous AGN class?",
        hint: "Bright enough to outshine host galaxies.",
        answer: "Quasar",
        options: ["Quasar", "Seyfert", "Normal spiral nucleus"]
      }
    ]
  },
  {
    name: "AGN Physics in Action",
    questions: [
      {
        type: "blank",
        badge: "Fill in the blank",
        prompt: "The Eddington limit compares outward radiation pressure against inward ______ pull.",
        hint: "A force due to mass.",
        answer: ["gravity", "gravitational"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "A higher accretion rate usually means: ",
        hint: "Assume all else equal.",
        answer: "Higher AGN luminosity",
        options: ["No emission lines", "Higher AGN luminosity", "No black hole growth"]
      },
      {
        type: "blank",
        badge: "Complete the sentence",
        prompt: "In unified models, Type 1 vs Type 2 AGN can differ mainly by our viewing ______.",
        hint: "Geometry word.",
        answer: ["angle", "orientation"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "Which region is typically more compact?",
        hint: "Close to central SMBH.",
        answer: "Broad-line region",
        options: ["Narrow-line region", "Host galaxy disk", "Broad-line region"]
      },
      {
        type: "blank",
        badge: "Fill in the blank",
        prompt: "A Seyfert galaxy is usually a bright AGN in a relatively nearby ______ galaxy.",
        hint: "General term for galaxies with structure.",
        answer: ["host", "spiral", "disk"]
      },
      {
        type: "multiple",
        badge: "Quick check",
        prompt: "Broad emission lines mainly indicate:",
        hint: "Think Doppler broadening.",
        answer: "Rapid gas motion",
        options: ["Cold gas", "Rapid gas motion", "No ionization"]
      },
      {
        type: "blank",
        badge: "Complete the sentence",
        prompt: "Quasars are AGN with extremely high intrinsic ______.",
        hint: "How bright they are physically.",
        answer: ["luminosity", "brightness"]
      },
      {
        type: "multiple",
        badge: "Final concept",
        prompt: "Main energy source of AGN activity is:",
        hint: "Not nuclear fusion in stars.",
        answer: "Gravitational energy from accretion",
        options: ["Supernova explosions", "Gravitational energy from accretion", "Dark matter annihilation"]
      }
    ]
  }
];

const introScreen = document.getElementById("introScreen");
const quizScreen = document.getElementById("quizScreen");
const summaryScreen = document.getElementById("summaryScreen");
const promptText = document.getElementById("promptText");
const hintText = document.getElementById("hintText");
const inputArea = document.getElementById("inputArea");
const feedbackText = document.getElementById("feedbackText");
const lessonLabel = document.getElementById("lessonLabel");
const questionLabel = document.getElementById("questionLabel");
const streakLabel = document.getElementById("streakLabel");
const typeBadge = document.getElementById("typeBadge");
const progressBar = document.getElementById("progressBar");
const summaryText = document.getElementById("summaryText");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let lessonIndex = 0;
let questionIndex = 0;
let streak = 0;
let score = 0;
let isAnswered = false;
let selectedOption = null;

const totalQuestions = lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);

function showScreen(screen) {
  [introScreen, quizScreen, summaryScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function currentQuestion() {
  return lessons[lessonIndex].questions[questionIndex];
}

function globalQuestionNumber() {
  let number = questionIndex + 1;
  for (let i = 0; i < lessonIndex; i += 1) {
    number += lessons[i].questions.length;
  }
  return number;
}

function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

function renderQuestion() {
  isAnswered = false;
  selectedOption = null;
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  nextBtn.disabled = true;

  const q = currentQuestion();
  typeBadge.textContent = q.badge;
  promptText.textContent = q.prompt;
  hintText.textContent = `Hint: ${q.hint}`;

  lessonLabel.textContent = `${lessonIndex + 1} / ${lessons.length}`;
  questionLabel.textContent = `${questionIndex + 1} / ${lessons[lessonIndex].questions.length}`;
  streakLabel.textContent = streak;

  const progress = (globalQuestionNumber() - 1) / totalQuestions;
  progressBar.style.width = `${Math.max(3, progress * 100)}%`;

  if (q.type === "blank") {
    inputArea.innerHTML = '<input class="text-input" id="answerInput" type="text" autocomplete="off" placeholder="Type your answer..." />';
  } else {
    const optionsHtml = q.options
      .map((option) => `<button class="option-btn" type="button">${option}</button>`)
      .join("");
    inputArea.innerHTML = `<div class="input-grid">${optionsHtml}</div>`;
    inputArea.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (isAnswered) return;
        inputArea.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedOption = btn.textContent;
      });
    });
  }
}

function markFeedback(correct, q) {
  if (correct) {
    feedbackText.textContent = "✅ Correct!";
    feedbackText.className = "feedback ok";
  } else {
    const expected = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    feedbackText.textContent = `❌ Not quite. Expected: ${expected}`;
    feedbackText.className = "feedback bad";
  }
}

function checkAnswer() {
  if (isAnswered) return;
  const q = currentQuestion();
  let correct = false;

  if (q.type === "blank") {
    const input = document.getElementById("answerInput");
    const value = normalize(input.value);
    if (!value) {
      feedbackText.textContent = "Please enter an answer first.";
      feedbackText.className = "feedback bad";
      return;
    }
    correct = q.answer.some((candidate) => value.includes(normalize(candidate)));
  } else {
    if (!selectedOption) {
      feedbackText.textContent = "Choose an option first.";
      feedbackText.className = "feedback bad";
      return;
    }
    correct = normalize(selectedOption) === normalize(q.answer);
  }

  isAnswered = true;
  markFeedback(correct, q);

  if (correct) {
    streak += 1;
    score += 1;
  } else {
    streak = 0;
  }

  streakLabel.textContent = streak;
  nextBtn.disabled = false;
}

function advance() {
  const lesson = lessons[lessonIndex];
  if (questionIndex < lesson.questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
    return;
  }

  if (lessonIndex < lessons.length - 1) {
    lessonIndex += 1;
    questionIndex = 0;
    renderQuestion();
    return;
  }

  progressBar.style.width = "100%";
  summaryText.textContent = `You answered ${score} out of ${totalQuestions} correctly. Keep reviewing these terms and you'll read AGN papers with much more confidence.`;
  showScreen(summaryScreen);
}

function resetSession() {
  lessonIndex = 0;
  questionIndex = 0;
  streak = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

startBtn.addEventListener("click", resetSession);
restartBtn.addEventListener("click", () => {
  showScreen(introScreen);
  progressBar.style.width = "0%";
});
checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", advance);

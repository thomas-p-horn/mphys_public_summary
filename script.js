const questionGroups = [
  {
    name: "AGN Basics",
    questions: [
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "What does AGN stand for?",
        answer: "Active Galactic Nucleus",
        options: ["Active Galactic Nucleus", "Atomic Gyrating Nebula", "Absolutely Gigantic Neptune"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "AGN are found in the centre of certain ______",
        hint: "It's in the name!",
        answer: "Galaxies",
        options: ["Stars", "Galaxies", "Planets"]
      },
      {
        type: "diagram",
        badge: "Diagram label",
        prompt: "In this AGN diagram, what term is hidden by the question marks?",
        hint: "These can be some of the most massive objects in the Universe.",
        answer: ["Supermassive black hole", "Black hole", "SMBH"],
        diagramTargetId: "text10"
      },
      {
        type: "multiple",
        badge: "True or False",
        prompt: "An AGN can be bright enough to outshine its host galaxy",
        answer: "True",
        options: ["True", "False"],
        note: "Some AGN appear as bright as nearby stars, despite being thousands of times farther away!"
      },
      {
        type: "diagram",
        badge: "Diagram label",
        prompt: "In this AGN diagram, what term is hidden by the question marks?",
        hint: "The matter in this disk accretes (falls) onto the black hole, releasing gravitational potential energy as light.",
        answer: ["Accretion Disk", "Accretion Disc"],
        diagramTargetId: "text13"
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "Not all AGN have the same luminosity. What are the brightest AGN called?",
        answer: "Quasars",
        options: ["Quasars", "Supernovae", "Red Giants"],
        note: "Initially mistaken as stars, these objects were dubbed \"Quasi-Stellar Objects\", later shortened to \"Quasars\"."
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "What kind of light does an AGN emit?",
        answer: "All of the above",
        options: ["Ultraviolet", "Visible", "X-Ray", "All of the above"]
      },
      {
        type: "diagram",
        badge: "Diagram label",
        prompt: "In this AGN diagram, what term is hidden by the question marks?",
        hint: "Depending on our viewing angle, this donut-shaped structure can hide the centre of the AGN, drastically changing what we are able to see.",
        answer: ["Dusty Torus", "Dust Torus", "Obscuring Torus", "Torus"],
        diagramTargetId: "text13"
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "What is the main source of energy for an AGN",
        hint: "Which force does a supermassive black hole create?",
        answer: "Gravitational potential energy",
        options: ["Nuclear fusion reactions", "Dark matter annihilation", "Gravitational potential energy"],
        note: "As gas and dust are gravitationally pulled towards the black hole, they lose their potential energy, which is converted into light."
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "The Eddington limit is the maximum rate at which a black hole can accrete matter. It is caused by an equilibrium between gravitational energy (pulling matter in) and ______ (pushing matter out).",
        answer: "Radiation pressure",
        options: ["The Lorentz force", "Electron degeneracy", "Radiation pressure"],
        note: "An AGN can emit so much energy through its radiation that the surrounding gas is pushed outwards."
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "A higher accretion rate usually means: ",
        hint: "Assume all else equal.",
        answer: "Higher AGN luminosity",
        options: ["No emission lines", "Higher AGN luminosity", "No black hole growth"],
        note: "If more matter is falling in towards the black hole, more energy is released and more light is emitted."
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "Quasars (very bright AGN) are known to change in luminosity over time. What's the shortest timescale over which we can observe these changes?",
        hint: "How often can we measure a quasar's brightness and see a measurable change?",
        answer: "Days",
        options: ["Days", "Months", "Years"]
      },
      {
        type: "multiple",
        badge: "True or False",
        prompt: "Changes in quasar luminosity are usually only observed for a small portion of the spectrum, while other parts remain constant over time.",
        answer: "False, we observe variability across all wavelengths.",
        options: ["True, we only observe variability in the UV part of the spectrum.", "False, we observe variability across all wavelengths."]
      },
      {
        type: "blank",
        badge: "Complete the sentence",
        prompt: "The quickest possible time for energy to move across some part of an AGN is called the \"______-crossing timescale\"",
        hint: "What's the fastest thing that exists?",
        answer: "Light",
        note: "Nothing travels faster than light, so if the centre of the AGN suddenly gets brighter it will take a while for the light (and thus the energy) to reach the outer edges of the AGN. Therefore there is an upper limit on how fast the AGN as a whole can change its luminosity."
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "From which element are we likely to observe variability on short timescales?",
        hint: "Due to their size, it takes a long time for energy to move around in AGN. As a result, larger structures will take longer to change in luminosity.",
        answer: "Accretion disk",
        options: ["Accretion disk", "Dusty torus", "Narrow line region"]

      }
    ]
  }
];

const introScreen = document.getElementById("introScreen");
const homeModelCard = document.getElementById("homeModelCard");
const quizScreen = document.getElementById("quizScreen");
const summaryScreen = document.getElementById("summaryScreen");
const promptText = document.getElementById("promptText");
const hintText = document.getElementById("hintText");
const diagramArea = document.getElementById("diagramArea");
const inputArea = document.getElementById("inputArea");
const noteText = document.getElementById("noteText");
const feedbackText = document.getElementById("feedbackText");
const questionLabel = document.getElementById("questionLabel");
const streakLabel = document.getElementById("streakLabel");
const typeBadge = document.getElementById("typeBadge");
const progressBar = document.getElementById("progressBar");
const summaryText = document.getElementById("summaryText");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const actions = document.querySelector(".actions");
const agnFlashOverlay = document.getElementById("agnFlashOverlay");
const agnFlashObject = document.getElementById("agnFlashObject");
const agnStreakText = document.getElementById("agnStreakText");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

const allQuestions = questionGroups.flatMap((group, groupIdx) =>
  group.questions.map((question, questionIdx) => ({
    ...question,
    _qid: `${groupIdx}:${questionIdx}`
  }))
);

let questionQueue = [];
let currentIndex = 0;
let streak = 0;
let score = 0;
let mistakes = 0;
let isAnswered = false;
let selectedOption = null;
const masteredQuestionKeys = new Set();
let agnFlashTimeoutId = null;

const AGN_FLASH_MS = 5000;
const totalQuestions = allQuestions.length;

function showScreen(screen) {
  [introScreen, quizScreen, summaryScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
  if (homeModelCard) {
    homeModelCard.style.display = screen === introScreen ? "block" : "none";
  }
}

function currentQuestion() {
  return questionQueue[currentIndex];
}

function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

function updateProgressUI() {
  questionLabel.textContent = `${score} / ${totalQuestions}`;
  streakLabel.textContent = `${streak}`;
  const progress = totalQuestions === 0 ? 0 : score / totalQuestions;
  progressBar.style.width = `${Math.max(3, progress * 100)}%`;
}

function renderDiagramQuestion(targetId) {
  diagramArea.style.display = "block";
  diagramArea.innerHTML = '<object id="diagramQuestionObject" class="diagram-object" type="image/svg+xml" data="agn model drawing - annotated - white text.svg" aria-label="Annotated AGN diagram for question"></object>';
  const obj = document.getElementById("diagramQuestionObject");
  obj.addEventListener("load", () => {
    try {
      const svgDoc = obj.contentDocument;
      if (!svgDoc) return;
      const textEl = svgDoc.getElementById(targetId);
      if (textEl) {
        textEl.textContent = "???";
      }
    } catch (_error) {
      // If browser blocks object document access, diagram still renders without masking.
    }
  });
}

function flashAgnCelebration(currentStreak) {
  if (!agnFlashOverlay || !agnFlashObject) return;
  if (agnStreakText) {
    agnStreakText.textContent = `${currentStreak} in a row!`;
  }
  if (agnFlashTimeoutId !== null) {
    clearTimeout(agnFlashTimeoutId);
    agnFlashTimeoutId = null;
  }
  agnFlashOverlay.classList.remove("active");
  void agnFlashOverlay.offsetWidth;
  agnFlashOverlay.classList.add("active");
  agnFlashTimeoutId = setTimeout(() => {
    agnFlashOverlay.classList.remove("active");
    agnFlashTimeoutId = null;
  }, AGN_FLASH_MS);
}

function renderQuestion() {
  const q = currentQuestion();
  if (!q) return;

  isAnswered = false;
  selectedOption = null;
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  noteText.textContent = "";
  noteText.style.display = "none";
  nextBtn.disabled = true;
  diagramArea.style.display = "none";
  diagramArea.innerHTML = "";

  if (q.type === "blank" || q.type === "diagram") {
    quizScreen.insertBefore(feedbackText, actions);
  } else {
    quizScreen.appendChild(feedbackText);
  }

  if (q.type === "blank" || q.type === "diagram") {
    checkBtn.style.display = "inline-block";
    checkBtn.disabled = true;
    nextBtn.style.display = "none";
  } else {
    checkBtn.style.display = "none";
    checkBtn.disabled = false;
    nextBtn.style.display = "inline-block";
  }

  typeBadge.textContent = q.badge;
  promptText.textContent = q.prompt;
  if (q.hint && q.hint.trim() !== "") {
    hintText.textContent = `Hint: ${q.hint}`;
    hintText.style.display = "block";
  } else {
    hintText.textContent = "";
    hintText.style.display = "none";
  }

  updateProgressUI();

  if (q.type === "diagram") {
    renderDiagramQuestion(q.diagramTargetId);
    inputArea.innerHTML = '<input class="text-input" id="answerInput" type="text" autocomplete="off" placeholder="Type the missing term..." />';
    const answerInput = document.getElementById("answerInput");
    answerInput.addEventListener("input", () => {
      checkBtn.disabled = normalize(answerInput.value) === "";
    });
  } else if (q.type === "blank") {
    inputArea.innerHTML = '<input class="text-input" id="answerInput" type="text" autocomplete="off" placeholder="Type your answer..." />';
    const answerInput = document.getElementById("answerInput");
    answerInput.addEventListener("input", () => {
      checkBtn.disabled = normalize(answerInput.value) === "";
    });
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
        checkAnswer();
      });
    });
  }
}

function markFeedback(correct, q) {
  if (q.type === "multiple") {
    const normalizedSelected = normalize(selectedOption || "");
    const normalizedAnswers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => normalize(a));
    const normalizedAnswer = normalizedAnswers[0];

    inputArea.querySelectorAll(".option-btn").forEach((btn) => {
      const optionText = normalize(btn.textContent || "");
      btn.disabled = true;
      btn.classList.remove("selected");

      if (normalizedAnswers.includes(optionText)) {
        btn.classList.add("correct-outline");
      }

      if (optionText === normalizedSelected) {
        btn.classList.add(correct ? "correct-selected" : "incorrect-selected");
        const resultTag = document.createElement("span");
        resultTag.className = `option-result-tag ${correct ? "ok" : "bad"}`;
        resultTag.textContent = correct ? "Correct" : "Incorrect";
        btn.appendChild(resultTag);
      }
    });

    feedbackText.textContent = "";
    feedbackText.className = "feedback";
    return;
  }

  if (correct) {
    feedbackText.textContent = "Correct!";
    feedbackText.className = "feedback ok";
  } else {
    const expected = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    feedbackText.textContent = `Not quite. Expected: ${expected}`;
    feedbackText.className = "feedback bad";
  }
}

function checkAnswer() {
  if (isAnswered) return;
  const q = currentQuestion();
  if (!q) return;

  let correct = false;
  if (q.type === "blank" || q.type === "diagram") {
    const input = document.getElementById("answerInput");
    const value = normalize(input.value);
    if (!value) {
      feedbackText.textContent = "Please enter an answer first.";
      feedbackText.className = "feedback bad";
      return;
    }
    const acceptedAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    correct = acceptedAnswers.some((candidate) => value.includes(normalize(candidate)));
  } else {
    if (!selectedOption) {
      feedbackText.textContent = "Choose an option first.";
      feedbackText.className = "feedback bad";
      return;
    }
    const acceptedAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    correct = acceptedAnswers.some((candidate) => normalize(selectedOption) === normalize(candidate));
  }

  isAnswered = true;
  markFeedback(correct, q);
  if (q.note && q.note.trim() !== "") {
    noteText.textContent = q.note;
    noteText.style.display = "block";
  }

  if (correct) {
    streak += 1;
    if (!masteredQuestionKeys.has(q._qid)) {
      masteredQuestionKeys.add(q._qid);
      score += 1;
    }
    if (streak > 0 && streak % 3 === 0) {
      flashAgnCelebration(streak);
    }
  } else {
    streak = 0;
    mistakes += 1;
    const insertIndex = Math.min(currentIndex + 3, questionQueue.length);
    questionQueue.splice(insertIndex, 0, q);
  }

  updateProgressUI();
  nextBtn.disabled = false;

  if (q.type === "blank" || q.type === "diagram") {
    checkBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
}

function showSummary() {
  progressBar.style.width = "100%";
  summaryText.textContent = `You answered all ${totalQuestions} questions correctly with ${mistakes} total mistake${mistakes === 1 ? "" : "s"} along the way.`;
  showScreen(summaryScreen);
}

function advance() {
  if (score >= totalQuestions) {
    showSummary();
    return;
  }

  currentIndex += 1;
  if (currentIndex >= questionQueue.length) {
    showSummary();
    return;
  }
  renderQuestion();
}

function resetAppState() {
  questionQueue = allQuestions.map((q) => ({ ...q }));
  currentIndex = 0;
  streak = 0;
  score = 0;
  mistakes = 0;
  isAnswered = false;
  selectedOption = null;
  masteredQuestionKeys.clear();

  agnFlashOverlay.classList.remove("active");
  if (agnFlashTimeoutId !== null) {
    clearTimeout(agnFlashTimeoutId);
    agnFlashTimeoutId = null;
  }

  updateProgressUI();
  progressBar.style.width = "0%";
}

function startQuiz() {
  resetAppState();
  showScreen(quizScreen);
  renderQuestion();
}

function resetToIntro() {
  resetAppState();
  showScreen(introScreen);
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", resetToIntro);
homeBtn.addEventListener("click", resetToIntro);
checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", advance);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  if (!quizScreen.classList.contains("active")) return;

  if (nextBtn.style.display !== "none" && !nextBtn.disabled) {
    event.preventDefault();
    advance();
    return;
  }

  if (checkBtn.style.display !== "none" && !checkBtn.disabled) {
    event.preventDefault();
    checkAnswer();
  }
});

resetAppState();
showScreen(introScreen);


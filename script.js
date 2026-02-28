const lessons = [
  {
    name: "AGN Core Parts",
    questions: [
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "An AGN is powered by matter falling onto a supermassive ______ hole.",
        hint: "Think of the central engine.",
        answer: "black",
        options: ["black", "white", "worm"]
      },
      {
        type: "multiple",
        badge: "Pick one",
        prompt: "Which structure surrounds the immediate vicinity of the central supermassive black hole (SMBH)?",
        hint: "It fuels the growth of the black hole",
        answer: "Accretion disk",
        options: ["Dusty torus", "Accretion disk", "Dark matter halo"]
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
      },
      {
        type: "diagram",
        badge: "Diagram label",
        prompt: "In the AGN diagram, what term is hidden by the question marks?",
        hint: "This structure is doughnut-shaped and obscures the center at some angles.",
        answer: ["dusty torus", "torus"],
        diagramTargetId: "text12"
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
      },
      {
        type: "diagram",
        badge: "Diagram label",
        prompt: "In the AGN diagram, which region is hidden by the question marks?",
        hint: "This is the more compact line-emitting region.",
        answer: ["broad line region", "blr", "broad-line region"],
        diagramTargetId: "text16"
      },
      {
        type: "diagram",
        badge: "Diagram label",
        prompt: "In the AGN diagram, which other line-emitting region is hidden by the question marks?",
        hint: "This one is farther out from the SMBH.",
        answer: ["narrow line region", "nlr", "narrow-line region"],
        diagramTargetId: "text14"
      }
    ]
  }
];

const introScreen = document.getElementById("introScreen");
const homeModelCard = document.getElementById("homeModelCard");
const lessonTransitionScreen = document.getElementById("lessonTransitionScreen");
const reviewScreen = document.getElementById("reviewScreen");
const quizScreen = document.getElementById("quizScreen");
const summaryScreen = document.getElementById("summaryScreen");
const lessonTransitionTitle = document.getElementById("lessonTransitionTitle");
const lessonTransitionText = document.getElementById("lessonTransitionText");
const lessonContinueBtn = document.getElementById("lessonContinueBtn");
const reviewTitle = document.getElementById("reviewTitle");
const reviewText = document.getElementById("reviewText");
const reviewContinueBtn = document.getElementById("reviewContinueBtn");
const lessonName = document.getElementById("lessonName");
const promptText = document.getElementById("promptText");
const hintText = document.getElementById("hintText");
const diagramArea = document.getElementById("diagramArea");
const inputArea = document.getElementById("inputArea");
const feedbackText = document.getElementById("feedbackText");
const lessonLabel = document.getElementById("lessonLabel");
const questionLabel = document.getElementById("questionLabel");
const questionStat = questionLabel.closest(".stat");
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

let lessonIndex = 0;
let lessonQueue = [];
let queuePosition = 0;
let retryQueue = [];
let lessonRound = 1;
let lessonQuestionCount = 0;
let streak = 0;
let score = 0;
let mistakes = 0;
let isAnswered = false;
let selectedOption = null;
const completedQuestionKeys = new Set();
const lessonCompletedKeys = new Set();
let agnFlashTimeoutId = null;
const AGN_FLASH_MS = 5000;

const totalQuestions = lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);

function showScreen(screen) {
  [introScreen, lessonTransitionScreen, reviewScreen, quizScreen, summaryScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
  if (homeModelCard) {
    homeModelCard.style.display = screen === introScreen ? "block" : "none";
  }
}

function currentQuestionIndex() {
  return lessonQueue[queuePosition];
}

function currentQuestion() {
  return lessons[lessonIndex].questions[currentQuestionIndex()];
}

function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
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
  isAnswered = false;
  selectedOption = null;
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  nextBtn.disabled = true;
  diagramArea.style.display = "none";
  diagramArea.innerHTML = "";

  const q = currentQuestion();
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
  hintText.textContent = `Hint: ${q.hint}`;
  lessonName.textContent = lessonRound > 1
    ? `Lesson ${lessonIndex + 1}: ${lessons[lessonIndex].name} (Review round ${lessonRound - 1})`
    : `Lesson ${lessonIndex + 1}: ${lessons[lessonIndex].name}`;

  lessonLabel.textContent = `${lessonIndex + 1} / ${lessons.length}`;
  if (lessonRound === 1) {
    questionStat.style.display = "";
    questionLabel.textContent = `${queuePosition + 1} / ${lessonQuestionCount}`;
  } else {
    questionStat.style.display = "none";
  }
  streakLabel.textContent = streak;

  const progress = lessonCompletedKeys.size / lessonQuestionCount;
  progressBar.style.width = `${Math.max(3, progress * 100)}%`;

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
    const normalizedAnswer = normalize(q.answer);

    inputArea.querySelectorAll(".option-btn").forEach((btn) => {
      const optionText = normalize(btn.textContent || "");
      btn.disabled = true;
      btn.classList.remove("selected");

      if (optionText === normalizedAnswer) {
        btn.classList.add("correct-outline");
      }

      if (optionText === normalizedSelected) {
        btn.classList.add(correct ? "correct-selected" : "incorrect-selected");
        const resultTag = document.createElement("span");
        resultTag.className = `option-result-tag ${correct ? "ok" : "bad"}`;
        resultTag.textContent = correct ? "✅ Correct" : "❌ Incorrect";
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
  const questionIdx = currentQuestionIndex();
  const questionKey = `${lessonIndex}:${questionIdx}`;
  let correct = false;

  if (q.type === "blank" || q.type === "diagram") {
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
    lessonCompletedKeys.add(questionIdx);
    if (!completedQuestionKeys.has(questionKey)) {
      completedQuestionKeys.add(questionKey);
      score += 1;
    }
    if (streak > 0 && streak % 3 === 0) {
      flashAgnCelebration(streak);
    }
  } else {
    streak = 0;
    mistakes += 1;
    if (!retryQueue.includes(questionIdx)) {
      retryQueue.push(questionIdx);
    }
  }

  streakLabel.textContent = streak;
  nextBtn.disabled = false;

  if (q.type === "blank" || q.type === "diagram") {
    checkBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
}

function advance() {
  if (queuePosition < lessonQueue.length - 1) {
    queuePosition += 1;
    renderQuestion();
    return;
  }

  if (retryQueue.length > 0) {
    showReviewTransition();
    return;
  }

  if (lessonIndex < lessons.length - 1) {
    lessonIndex += 1;
    showLessonTransition();
    return;
  }

  progressBar.style.width = "100%";
  summaryText.textContent = `You mastered all ${totalQuestions} questions with ${mistakes} total mistake${mistakes === 1 ? "" : "s"} along the way.`;
  showScreen(summaryScreen);
}

function startLesson() {
  lessonQuestionCount = lessons[lessonIndex].questions.length;
  lessonQueue = Array.from({ length: lessonQuestionCount }, (_, i) => i);
  queuePosition = 0;
  retryQueue = [];
  lessonRound = 1;
  lessonCompletedKeys.clear();
  questionStat.style.display = "";
  showScreen(quizScreen);
  renderQuestion();
}

function startReviewRound() {
  lessonQueue = [...retryQueue];
  retryQueue = [];
  queuePosition = 0;
  lessonRound += 1;
  questionStat.style.display = "none";
  showScreen(quizScreen);
  renderQuestion();
}

function showLessonTransition() {
  lessonTransitionTitle.textContent = `Lesson ${lessonIndex + 1}: ${lessons[lessonIndex].name}`;
  lessonTransitionText.textContent = lessonIndex === 0
    ? "New lesson unlocked. Press begin when you're ready."
    : "Nice work. You've completed the previous lesson and unlocked the next one.";
  lessonContinueBtn.textContent = `Begin Lesson ${lessonIndex + 1}`;
  showScreen(lessonTransitionScreen);
}

function showReviewTransition() {
  reviewTitle.textContent = `Lesson ${lessonIndex + 1} Review`;
  reviewText.textContent = `You have ${retryQueue.length} question${retryQueue.length === 1 ? "" : "s"} to fix. Review continues until all are correct.`;
  reviewContinueBtn.textContent = lessonRound === 1 ? "Start Review" : `Start Review Round ${lessonRound}`;
  showScreen(reviewScreen);
}

function resetAppState() {
  lessonIndex = 0;
  lessonQueue = [];
  queuePosition = 0;
  retryQueue = [];
  lessonRound = 1;
  lessonQuestionCount = 0;
  streak = 0;
  score = 0;
  mistakes = 0;
  completedQuestionKeys.clear();
  lessonCompletedKeys.clear();
  agnFlashOverlay.classList.remove("active");
  if (agnFlashTimeoutId !== null) {
    clearTimeout(agnFlashTimeoutId);
    agnFlashTimeoutId = null;
  }
  questionStat.style.display = "";
  progressBar.style.width = "0%";
  lessonLabel.textContent = `1 / ${lessons.length}`;
  questionLabel.textContent = `1 / ${lessons[0].questions.length}`;
  streakLabel.textContent = "0";
}

function resetSession() {
  resetAppState();
  showLessonTransition();
}

function resetToIntro() {
  resetAppState();
  showScreen(introScreen);
}

startBtn.addEventListener("click", resetSession);
lessonContinueBtn.addEventListener("click", startLesson);
reviewContinueBtn.addEventListener("click", startReviewRound);
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


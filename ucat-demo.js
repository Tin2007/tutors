document.addEventListener('DOMContentLoaded', () => {
  const tabsEl = document.getElementById('subtestTabs');
  if (!tabsEl) return; // widget not on this page

  const subtests = [
    {
      name: "Verbal Reasoning",
      context: "Verbal Reasoning · Reading passage",
      question: "Based on the passage, the author's main claim is that early feedback improves retention primarily because it:",
      options: [
        "Reduces total study time needed",
        "Corrects errors before they are practised into habits",
        "Makes revision more enjoyable",
        "Is required by most exam boards"
      ],
      correct: 1
    },
    {
      name: "Decision Making",
      context: "Decision Making · Venn diagram logic",
      question: "Given the diagram, every item in Set A that is also in Set C must also belong to which set?",
      options: ["Set B", "Set D", "No other set", "Both B and D"],
      correct: 2
    },
    {
      name: "Quantitative Reasoning",
      context: "Quantitative Reasoning · Data table",
      question: "A drug trial shows a 12% relative risk reduction from a 25% baseline risk. What is the new absolute risk?",
      options: ["13%", "22%", "20%", "25%"],
      correct: 1
    },
    {
      name: "Abstract Reasoning",
      context: "Abstract Reasoning · Pattern set",
      question: "Which shape correctly continues the pattern in Set A, based on the rotation rule shown?",
      options: ["Shape 1", "Shape 2", "Shape 3", "Shape 4"],
      correct: 3
    },
    {
      name: "Situational Judgement",
      context: "Situational Judgement · Scenario",
      question: "A colleague misses a key detail during handover. What is the most appropriate first action?",
      options: [
        "Report them to a supervisor immediately",
        "Say nothing, it's a minor detail",
        "Raise it directly and privately with them",
        "Correct it yourself without mentioning it"
      ],
      correct: 2
    }
  ];

  let currentIdx = 1; // start on Decision Making
  let timerInterval = null;
  const DURATION = 22;
  const CIRC = 377;

  const qContext = document.getElementById('qContext');
  const qText = document.getElementById('qText');
  const qOptions = document.getElementById('qOptions');
  const qFeedback = document.getElementById('qFeedback');
  const timerBar = document.getElementById('timerBar');
  const timerNum = document.getElementById('timerNum');

  function buildTabs() {
    tabsEl.innerHTML = '';
    subtests.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'tab' + (i === currentIdx ? ' active' : '');
      b.textContent = s.name.split(' ')[0];
      b.setAttribute('aria-pressed', i === currentIdx);
      b.addEventListener('click', () => loadQuestion(i));
      tabsEl.appendChild(b);
    });
  }

  function loadQuestion(idx) {
    currentIdx = idx;
    const s = subtests[idx];
    qContext.textContent = s.context;
    qText.textContent = s.question;
    qFeedback.textContent = '';
    qOptions.innerHTML = '';
    s.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.textContent = opt;
      b.addEventListener('click', () => answer(i));
      qOptions.appendChild(b);
    });
    buildTabs();
    startTimer();
  }

  function answer(i) {
    clearInterval(timerInterval);
    const s = subtests[currentIdx];
    const opts = qOptions.querySelectorAll('.opt');
    opts.forEach((el, i2) => {
      el.disabled = true;
      if (i2 === s.correct) el.classList.add('correct');
      else if (i2 === i) el.classList.add('incorrect');
    });
    qFeedback.textContent = (i === s.correct)
      ? "Correct — next subtest whenever you're ready."
      : 'Not quite — the highlighted option was correct.';
  }

  function startTimer() {
    clearInterval(timerInterval);
    let remaining = DURATION;
    timerBar.style.strokeDasharray = CIRC;
    timerBar.style.strokeDashoffset = 0;
    timerNum.textContent = remaining + 's';
    timerInterval = setInterval(() => {
      remaining -= 1;
      const offset = CIRC * (1 - remaining / DURATION);
      timerBar.style.strokeDashoffset = offset;
      timerNum.textContent = Math.max(remaining, 0) + 's';
      if (remaining <= 0) {
        clearInterval(timerInterval);
        qFeedback.textContent = "Time's up — that's the real UCAT clock.";
        qOptions.querySelectorAll('.opt').forEach(el => el.disabled = true);
      }
    }, 1000);
  }

  loadQuestion(currentIdx);
});

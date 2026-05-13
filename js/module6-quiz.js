// ── MODULE 6: FINAL QUIZ ──

const RANKS = [
  { min: 10, title: '🏆 Legend',     desc: 'Perfect score. You know baseball better than most fans.' },
  { min: 8,  title: '⭐ All-Star',   desc: 'Outstanding. You\'ve clearly been paying attention.' },
  { min: 6,  title: '⚾ Prospect',   desc: 'Solid foundation. A few more games and you\'ll get there.' },
  { min: 4,  title: '🥎 Rookie',    desc: 'Good start! Review the modules and come back swinging.' },
  { min: 0,  title: '📖 Fan-in-Training', desc: 'Everyone starts somewhere. Baseball rewards patience.' }
];

let quizState = {
  idx: 0,
  score: 0,
  results: []
};

function initQuizModule() {
  quizState = { idx: 0, score: 0, results: [] };
  const screen = document.getElementById('screen-quiz');
  screen.innerHTML = `
    ${makeNav('07 — Final Quiz', '10 questions across all modules').outerHTML}
    <div class="module-content">
      <div class="section-label">Test Your Knowledge</div>
      <h1>What Have You Learned?</h1>
      <p class="mt-8 mb-24">10 questions covering rules, pitching, tactics, and Taiwan baseball history. Answer carefully — each one tests a real concept from the course.</p>
      <div class="quiz-progress" id="quizProgress">
        ${QUIZ_QUESTIONS.map((_, i) => `<div class="progress-dot" id="dot-${i}"></div>`).join('')}
      </div>
      <div id="quizQuestionArea"></div>
    </div>
  `;

  document.getElementById(`dot-0`).classList.add('current');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const area = document.getElementById('quizQuestionArea');
  if (quizState.idx >= QUIZ_QUESTIONS.length) {
    showQuizResult();
    return;
  }

  const q = QUIZ_QUESTIONS[quizState.idx];
  area.innerHTML = `
    <div class="quiz-question">
      <div class="q-number">QUESTION ${quizState.idx + 1} OF ${QUIZ_QUESTIONS.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="q-choices">
        ${q.choices.map((c, i) => `
          <button class="q-btn" onclick="handleQuizAnswer(${i})">${c}</button>
        `).join('')}
      </div>
      <div id="quizExplain" style="display:none;margin-top:16px"></div>
      <div style="margin-top:16px;display:none" id="quizNextWrap">
        <button class="btn btn-green" onclick="nextQuestion()">
          ${quizState.idx + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'See My Results →'}
        </button>
      </div>
    </div>
  `;
}

function handleQuizAnswer(chosen) {
  const q = QUIZ_QUESTIONS[quizState.idx];
  const isRight = chosen === q.correct;

  document.querySelectorAll('.q-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === chosen && !isRight) btn.classList.add('wrong');
  });

  if (isRight) {
    quizState.score++;
    document.getElementById(`dot-${quizState.idx}`).className = 'progress-dot done-right';
  } else {
    document.getElementById(`dot-${quizState.idx}`).className = 'progress-dot done-wrong';
  }
  quizState.results.push(isRight);

  const explain = document.getElementById('quizExplain');
  explain.style.display = 'block';
  explain.innerHTML = `
    <div class="info-box ${isRight ? 'green' : 'red'}" style="padding:12px 16px">
      <p style="font-size:0.9rem">${isRight ? '✓ Correct! ' : '✗ Not quite. '}${q.explain}</p>
    </div>
  `;

  document.getElementById('quizNextWrap').style.display = 'block';

  // Mark next dot as current
  if (quizState.idx + 1 < QUIZ_QUESTIONS.length) {
    document.getElementById(`dot-${quizState.idx + 1}`).classList.add('current');
  }
}

function nextQuestion() {
  quizState.idx++;
  renderQuizQuestion();
}

function showQuizResult() {
  const score = quizState.score;
  const total = QUIZ_QUESTIONS.length;
  const rank = RANKS.find(r => score >= r.min) || RANKS[RANKS.length - 1];

  const area = document.getElementById('quizQuestionArea');
  area.innerHTML = `
    <div class="result-screen">
      <div class="section-label">Results</div>
      <div class="result-rank">${rank.title}</div>
      <div style="font-family:Oswald,sans-serif;font-size:2.5rem;color:#fff;margin-bottom:8px">${score} / ${total}</div>
      <div class="result-score">${rank.desc}</div>

      <div style="margin:24px 0;display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
        ${quizState.results.map((r, i) => `
          <span style="font-size:0.85rem;padding:4px 10px;border-radius:4px;background:${r ? 'rgba(35,134,54,0.2)' : 'rgba(206,17,38,0.2)'};color:${r ? 'var(--green-light)' : '#ff6b7a'}">
            Q${i+1} ${r ? '✓' : '✗'}
          </span>
        `).join('')}
      </div>

      <div class="info-box mt-16" style="text-align:left">
        <h3>Share This</h3>
        <p class="mt-8" style="font-size:0.9rem">Know someone who's curious about baseball but doesn't know where to start? Send them here. The best way to fall in love with baseball is to understand it first.</p>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap">
        <button class="btn btn-outline" onclick="resetModule('quiz')">Retake Quiz</button>
        <button class="btn btn-green" onclick="goHome()">Back to Home</button>
      </div>
    </div>
  `;
}

window.handleQuizAnswer = handleQuizAnswer;
window.nextQuestion = nextQuestion;

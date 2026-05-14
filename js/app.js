// ── THEME TOGGLE ──

function initTheme() {
  const saved = localStorage.getItem('baseball-theme');
  if (saved === 'dark') document.body.classList.add('dark-mode');
  updateToggleButtons();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('baseball-theme', isDark ? 'dark' : 'light');
  updateToggleButtons();
  const simEl = document.getElementById('baseballSim');
  if (simEl && simEl.innerHTML.trim()) renderSim();
}

function updateToggleButtons() {
  const isDark = document.body.classList.contains('dark-mode');
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  });
}

// ── NAVIGATION ──

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function goHome() { showScreen('home'); }

// Module card clicks
document.querySelectorAll('.module-card').forEach(card => {
  card.addEventListener('click', () => {
    const mod = card.dataset.module;
    showScreen(mod);
    initModule(mod);
  });
});

const moduleInits = {};
let initializedModules = {};

function initModule(mod) {
  if (initializedModules[mod]) return;
  initializedModules[mod] = true;
  const inits = {
    field:    initFieldModule,
    pitching: initPitchingModule,
    batting:  initBattingModule,
    tactics:  initTacticsModule,
    leagues:  initLeaguesModule,
    taiwan:   initTaiwanModule,
    quiz:     initQuizModule
  };
  if (inits[mod]) inits[mod]();
}

// Allow re-init for quiz
function resetModule(mod) {
  initializedModules[mod] = false;
  const screen = document.getElementById('screen-' + mod);
  if (screen) screen.innerHTML = '';
  initModule(mod);
}

// Back button helper
function makeNav(titleText, subtitleText) {
  const nav = document.createElement('div');
  nav.className = 'module-nav';
  nav.innerHTML = `
    <button class="back-btn" onclick="goHome()">← Back</button>
    <div style="flex:1">
      <div class="module-nav-title">${titleText}</div>
      ${subtitleText ? `<div class="module-nav-subtitle">${subtitleText}</div>` : ''}
    </div>
    <button class="theme-toggle" onclick="toggleTheme()">🌙 Dark</button>
  `;
  return nav;
}

initTheme();

// ── MODULE 3: TACTICAL DECISIONS ──

function buildTacticDiamondSVG(runners = [], outs = 0) {
  const B = { 1: {x:128,y:72}, 2: {x:80,y:24}, 3: {x:32,y:72} };
  const H = {x:80, y:120};

  function base(cx, cy, lit) {
    const s = 10;
    return `<rect x="${cx-s/2}" y="${cy-s/2}" width="${s}" height="${s}"
      transform="rotate(45,${cx},${cy})"
      fill="${lit ? '#f0b429' : '#21262d'}"
      stroke="${lit ? '#f0b429' : '#388bfd'}" stroke-width="1.5"/>
      ${lit ? `<circle cx="${cx}" cy="${cy-18}" r="5" fill="#f0b429"/>` : ''}`;
  }
  function homePlate(lit) {
    const cx=H.x, cy=H.y, s=9;
    const pts = `${cx},${cy-s} ${cx+s},${cy-s/3} ${cx+s},${cy+s/2} ${cx-s},${cy+s/2} ${cx-s},${cy-s/3}`;
    return `<polygon points="${pts}" fill="${lit?'#f0b429':'#21262d'}" stroke="${lit?'#f0b429':'#388bfd'}" stroke-width="1.5"/>`;
  }

  const outDots = [0,1,2].map(i =>
    `<circle cx="${55+i*22}" cy="${136}" r="6"
      fill="${i < outs ? '#f85149' : 'none'}"
      stroke="${i < outs ? '#f85149' : '#6e7681'}" stroke-width="1.5"/>`
  ).join('');

  return `<svg viewBox="0 0 160 148" width="155" height="143" xmlns="http://www.w3.org/2000/svg" style="display:block;flex-shrink:0">
    <path d="M ${H.x} ${H.y} L ${B[1].x} ${B[1].y} L ${B[2].x} ${B[2].y} L ${B[3].x} ${B[3].y} Z"
      fill="rgba(56,139,253,0.05)" stroke="#388bfd" stroke-width="1.5" stroke-linejoin="round"/>
    ${base(B[3].x, B[3].y, runners.includes(3))}
    ${base(B[2].x, B[2].y, runners.includes(2))}
    ${base(B[1].x, B[1].y, runners.includes(1))}
    ${homePlate(false)}
    <text x="8" y="140" font-size="9" fill="#6e7681" font-family="Inter,sans-serif" letter-spacing="0.5">OUTS</text>
    ${outDots}
    <text x="133" y="140" font-size="9" fill="#6e7681" font-family="Inter,sans-serif">${outs}/3</text>
  </svg>`;
}

let tacticState = {
  scenarioIdx: 0,
  answered: false
};

function initTacticsModule() {
  const screen = document.getElementById('screen-tactics');
  screen.innerHTML = `
    ${makeNav('04 — Tactical Decisions', 'Step into the dugout').outerHTML}
    <div class="module-content">

      <div class="section-label">Manager's Dilemma</div>
      <h1>What Would You Do?</h1>
      <p class="mt-8">Baseball managers make dozens of strategic decisions every game. Unlike other sports, they have precious seconds to think through complex probability. Work through these three classic situations — there's rarely one "correct" answer, but some choices are better than others.</p>

      <div class="info-box orange mt-16">
        <p style="font-size:0.9rem"><strong>Note:</strong> Baseball strategy has evolved significantly with modern data analytics. Where traditional and modern thinking differ, we'll show you both perspectives.</p>
      </div>

      <div id="tacticScenarioArea" class="mt-24"></div>

      <div class="divider" id="baseRunningDivider" style="display:none"></div>
      <div id="baseRunningArea"></div>
    </div>
  `;

  tacticState.scenarioIdx = 0;
  tacticState.answered = false;
  renderTacticScenario();
}

function renderTacticScenario() {
  const area = document.getElementById('tacticScenarioArea');

  if (tacticState.scenarioIdx >= TACTICS_SCENARIOS.length) {
    area.innerHTML = `
      <div class="info-box green">
        <h3>✓ Manager's Dilemma Complete!</h3>
        <p class="mt-8">You've thought through three real game situations. Baseball strategy is genuinely complex — the "right" answer often depends on your specific players, the opponent, and how much data you're willing to trust.</p>
      </div>
    `;
    document.getElementById('baseRunningDivider').style.display = 'block';
    initBaseRunning();
    return;
  }

  const sc = TACTICS_SCENARIOS[tacticState.scenarioIdx];
  const diamondSVG = buildTacticDiamondSVG(sc.runners || [], sc.outs !== undefined ? sc.outs : 0);

  area.innerHTML = `
    <div class="section-label orange">Scenario ${tacticState.scenarioIdx + 1} of ${TACTICS_SCENARIOS.length}</div>
    <div class="scenario-box">
      <div class="scoreboard">
        ${Object.entries(sc.scoreboard).map(([k,v]) => `
          <div class="scoreboard-item">
            <div class="label">${k.toUpperCase()}</div>
            <div class="value" style="${k==='score'||k==='base'?'font-size:1rem;line-height:1.4':''}">${v}</div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:20px;align-items:flex-start;margin-bottom:20px">
        <div style="flex-shrink:0;text-align:center">
          ${diamondSVG}
          <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;letter-spacing:0.5px">FIELD SITUATION</div>
        </div>
        <p style="color:var(--text);font-size:1rem;line-height:1.7;margin:0">${sc.situation}</p>
      </div>
      <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;font-style:italic">As the manager, what do you call?</div>
      <div class="tactic-choices">
        ${sc.choices.map(c => `
          <button class="tactic-btn" data-type="${c.type}" onclick="handleTacticChoice('${c.type}')">
            ${c.text}
          </button>
        `).join('')}
      </div>
      <div class="outcome-box" id="tacticOutcome"></div>
    </div>
  `;
}

function handleTacticChoice(type) {
  if (tacticState.answered) return;
  tacticState.answered = true;

  const sc = TACTICS_SCENARIOS[tacticState.scenarioIdx];
  const outcome = sc.outcomes[type];

  document.querySelectorAll('.tactic-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.type === type) b.classList.add('chosen');
  });

  const ratingIcon = { good:'✓', neutral:'～', bad:'✗' };
  const box = document.getElementById('tacticOutcome');
  box.className = `outcome-box show ${outcome.rating}`;
  box.innerHTML = `
    <h3>${outcome.title}</h3>
    <p class="mt-8">${outcome.body}</p>

    <div style="margin-top:16px;border-top:1px solid var(--border);padding-top:14px">
      <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted);letter-spacing:1px;margin-bottom:10px">WHAT WOULD THE OTHER CHOICES HAVE DONE?</div>
      ${sc.choices.filter(c => c.type !== type).map(c => {
        const o = sc.outcomes[c.type];
        const rating = o.rating;
        const colors = { good:'#7ee787', neutral:'#e3b341', bad:'#ff6b7a' };
        return `<div style="margin-bottom:10px;padding:10px 12px;border-radius:6px;border:1px solid ${colors[rating]}22;background:${colors[rating]}08">
          <div style="font-size:0.78rem;font-weight:600;color:${colors[rating]};margin-bottom:4px">${ratingIcon[rating]} ${c.text}</div>
          <div style="font-size:0.82rem;color:var(--text-muted);line-height:1.5">${o.body}</div>
        </div>`;
      }).join('')}
    </div>

    <button class="btn btn-green mt-16" onclick="nextTacticScenario()">
      ${tacticState.scenarioIdx + 1 < TACTICS_SCENARIOS.length ? 'Next Scenario →' : 'See Wrap-up →'}
    </button>
  `;
}

function nextTacticScenario() {
  tacticState.scenarioIdx++;
  tacticState.answered = false;
  renderTacticScenario();
}

// ── BASE RUNNING GAME ──
const BASE_RUNNING_SCENARIOS = [
  {
    title: 'Tag Up or Hold?',
    description: 'Runner on 3rd. 1 out. The batter hits a deep fly ball to left field — very deep, near the warning track. The fielder catches it. As the runner on third, you\'ve been waiting at the bag. What do you do?',
    options: [
      { text: '🏃 Tag up and sprint home', correct: true,  explain: 'Correct! A deep fly ball to left or center is exactly the situation to tag and score. The fielder has a long throw to make, and a good jump gives you the run. This is called a "sacrifice fly" — the batter sacrifices his out to drive you in.' },
      { text: '🛑 Stay at third — not worth the risk', correct: false, explain: 'Too conservative. A deep fly to left field is one of the clearest scoring opportunities for a runner on third. An experienced third-base coach would be windmilling you home here. You\'d be leaving a run on the table.' },
      { text: '🏃 Run the second the ball is hit', correct: false, explain: 'Dangerous mistake! If you leave the base before the catch and the fielder catches the ball, you must return and re-touch third before advancing. If the defense appeals (throws to third), you\'re called out — potentially a double play.' }
    ]
  },
  {
    title: 'The Steal Attempt',
    description: 'Runner on 1st. Score tied, 8th inning. The pitcher is slow to the plate (takes 1.4 seconds to deliver). Your runner has a 90% stolen base success rate this season. The catcher has an average arm. Next batter is a power hitter.',
    options: [
      { text: '🚀 Send the runner — steal 2nd', correct: false, explain: 'Counterintuitively, this is questionable. With a power hitter up, you want the runner to stay — a home run scores two either way, and with a runner on first, a single could also advance him to third. The stolen base takes away a potential force play AND risks an out. With a 90% success rate though, it\'s a reasonable call — experienced managers disagree here.' },
      { text: '⏸️ Hold the runner — let the power hitter work', correct: true, explain: 'Smart thinking. A power hitter with a runner on first is dangerous because a home run scores two runs. Stealing second doesn\'t change the home run outcome, but getting caught would eliminate a baserunner entirely. Let the bat decide.' },
      { text: '🎭 Hit-and-run — batter swings while runner goes', correct: false, explain: 'Interesting call, but risky with a power hitter who might want to take a pitch. If he doesn\'t swing, the runner might be thrown out easily. Hit-and-run works better with contact hitters.' }
    ]
  },
  {
    title: 'The Rundown',
    description: 'You\'re a runner caught between first and second base in a rundown — trapped with fielders closing in from both sides. The first baseman has the ball and is running toward you.',
    options: [
      { text: '🏃 Run hard toward second base to put pressure on', correct: true, explain: 'Correct strategy! Running aggressively toward the forward base forces the fielder to throw, creating opportunities for errors. A rundown should take as many throws as possible — each throw is a chance for a mistake. Never give up — the record for surviving a rundown is 5 throws before scoring.' },
      { text: '🛑 Stop and surrender — take the out', correct: false, explain: 'Never give up! Rundowns create chaos, and errors happen frequently. Even if you\'re caught eventually, make them work for it. Running hard also buys time for other baserunners to advance.' },
      { text: '🔄 Quickly reverse direction back to first', correct: false, explain: 'Reversing immediately is predictable and often leads to being tagged quickly. The better strategy is to run hard toward second (the forward base), forcing a throw, before considering a change of direction.' }
    ]
  }
];

let baseRunIdx = 0;

function initBaseRunning() {
  baseRunIdx = 0;
  const area = document.getElementById('baseRunningArea');
  area.innerHTML = `
    <div class="section-label game-tag">🎮 Base Running Decisions</div>
    <h2>You're on the Bases</h2>
    <p class="mt-8">Baseball's fastest decisions happen on the basepaths. In real games, you have less than a second to decide. Here, take your time — understand the logic, then it'll be instinct.</p>
    <div id="baseRunScenario" class="mt-16"></div>
  `;
  renderBaseRunScenario();
}

function renderBaseRunScenario() {
  const area = document.getElementById('baseRunScenario');
  if (baseRunIdx >= BASE_RUNNING_SCENARIOS.length) {
    area.innerHTML = `
      <div class="info-box green">
        <h3>✓ Base Running Complete!</h3>
        <p class="mt-8">You now understand three core principles: tag up on deep flies, don't sacrifice outs for aggressive steals with power at the plate, and never give up in a rundown.</p>
        <p class="mt-8">Ready for the big picture? Learn about the world's baseball leagues.</p>
        <button class="btn btn-green mt-16" onclick="showScreen('leagues');initModule('leagues')">World of Baseball →</button>
      </div>
    `;
    return;
  }

  const sc = BASE_RUNNING_SCENARIOS[baseRunIdx];
  area.innerHTML = `
    <div class="scenario-box">
      <div class="section-label" style="margin-bottom:8px">${sc.title}</div>
      <p style="color:var(--text);line-height:1.6;margin-bottom:20px">${sc.description}</p>
      <div class="tactic-choices">
        ${sc.options.map((opt, i) => `
          <button class="tactic-btn" onclick="handleBaseRunChoice(${i})">${opt.text}</button>
        `).join('')}
      </div>
      <div class="outcome-box" id="baseRunOutcome"></div>
    </div>
  `;
}

function handleBaseRunChoice(idx) {
  const sc = BASE_RUNNING_SCENARIOS[baseRunIdx];
  const opt = sc.options[idx];
  document.querySelectorAll('#baseRunScenario .tactic-btn').forEach(b => b.disabled = true);
  document.querySelectorAll('#baseRunScenario .tactic-btn')[idx].classList.add('chosen');

  const box = document.getElementById('baseRunOutcome');
  box.className = `outcome-box show ${opt.correct ? 'good' : 'bad'}`;
  box.innerHTML = `
    <h3>${opt.correct ? '✓ Good instinct!' : '✗ Rethink this one'}</h3>
    <p class="mt-8">${opt.explain}</p>
    <button class="btn btn-green mt-16" onclick="nextBaseRunScenario()">
      ${baseRunIdx + 1 < BASE_RUNNING_SCENARIOS.length ? 'Next Situation →' : 'Finish Base Running →'}
    </button>
  `;
}

function nextBaseRunScenario() {
  baseRunIdx++;
  renderBaseRunScenario();
}

window.handleTacticChoice = handleTacticChoice;
window.nextTacticScenario = nextTacticScenario;
window.handleBaseRunChoice = handleBaseRunChoice;
window.nextBaseRunScenario = nextBaseRunScenario;

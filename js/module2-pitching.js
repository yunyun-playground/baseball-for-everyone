// ── MODULE 2: THE ART OF PITCHING ──

// ── CANVAS DIMENSIONS ──
const CV_W = 280, CV_H = 320;  // catcher view
const TD_W = 280, TD_H = 190;  // top-down view
const SV_W = 280, SV_H = 125;  // side view

// ── COORDINATE NOTES ──
// Catcher's view (looking OUT toward pitcher):
//   1st base = RIGHT, 3rd base = LEFT
//   RHP throwing arm appears on CATCHER'S LEFT (they face each other)
//   → RHP arm-side pitches (sinker, changeup) break LEFT  (x < 140)
//   → RHP glove-side pitches (slider, cutter) break RIGHT (x > 140)
//   → Curveball: drops big + slight glove-side = slight RIGHT for RHP
//
// Base paths below are defined for LHP (arm-side = RIGHT, glove-side = LEFT).
// For RHP, we mirror them. This matches catcher's view reality.

const ZONE_C = { l:90, r:190, t:150, b:255 }; // catcher canvas zone

// ── BASE PATHS (LHP) — catcher's view, quadratic bezier ──
// Release: (140, 36). LHP arm side = RIGHT.
const C_PATHS_BASE = {
  fastball:   { c:{x:140,y:108}, e:{x:140,y:175} }, // straight center + upper zone
  sinker:     { c:{x:144,y:126}, e:{x:176,y:252} }, // arm-side RIGHT + low
  curveball:  { c:{x:136,y:108}, e:{x:106,y:263} }, // glove-side LEFT + big drop
  slider:     { c:{x:136,y:145}, e:{x:102,y:232} }, // glove-side LEFT + sweep
  changeup:   { c:{x:143,y:140}, e:{x:168,y:252} }, // arm-side RIGHT + drop
  cutter:     { c:{x:138,y:143}, e:{x:114,y:200} }, // glove-side LEFT + slight
  splitter:   { c:{x:141,y:130}, e:{x:148,y:268} }, // nearly straight + sharp drop
  sweeper:    { c:{x:126,y:158}, e:{x:72,y:240}  }, // wide LEFT sweep
  knuckleball:{ c:{x:155,y:80},  e:{x:118,y:215} }  // erratic — center-ish
};

// ── BASE PATHS (LHP) — top-down view ──
// Mound: (140,14), Plate: (140,172). LHP arm side = RIGHT.
const T_PATHS_BASE = {
  fastball:   { c:{x:140,y:93},  e:{x:140,y:172} },
  sinker:     { c:{x:143,y:95},  e:{x:163,y:173} }, // arm-side RIGHT
  curveball:  { c:{x:138,y:95},  e:{x:120,y:172} }, // glove-side LEFT
  slider:     { c:{x:136,y:106}, e:{x:110,y:172} }, // glove-side LEFT (more)
  changeup:   { c:{x:142,y:97},  e:{x:160,y:173} }, // arm-side RIGHT
  cutter:     { c:{x:138,y:104}, e:{x:125,y:172} }, // glove-side LEFT (tight)
  splitter:   { c:{x:141,y:96},  e:{x:144,y:172} }, // nearly straight
  sweeper:    { c:{x:130,y:108}, e:{x:86,y:172}  }, // wide LEFT sweep
  knuckleball:{ c:{x:148,y:82},  e:{x:130,y:172} }  // slight erratic
};

// ── SIDE VIEW PATHS — vertical movement only (same for LHP/RHP) ──
// Release: (28, 52). Plate at x≈252. Strike zone y: 65–102.
const S_PATHS = {
  fastball:   { c:{x:140,y:50},  e:{x:252,y:70}  }, // nearly flat, slight drop
  sinker:     { c:{x:140,y:60},  e:{x:252,y:95}  }, // drops noticeably
  curveball:  { c:{x:195,y:36},  e:{x:252,y:112} }, // late big drop (12-to-6)
  slider:     { c:{x:168,y:56},  e:{x:252,y:102} }, // moderate drop, late
  changeup:   { c:{x:140,y:58},  e:{x:252,y:94}  }, // similar to sinker
  cutter:     { c:{x:140,y:52},  e:{x:252,y:76}  }, // nearly flat like fastball
  splitter:   { c:{x:155,y:56},  e:{x:252,y:108} }, // sharp late drop, more than sinker
  sweeper:    { c:{x:162,y:58},  e:{x:252,y:100} }, // moderate drop (horizontal is the story)
  knuckleball:{ c:{x:80,y:38},   e:{x:252,y:88}  }  // floats up then drops — unusual arc
};

const PITCH_COLORS = {
  fastball:'#388bfd', sinker:'#58a6ff', curveball:'#f0883e',
  slider:'#a371f7',   changeup:'#2ea043', cutter:'#e3b341',
  splitter:'#00b4d8', sweeper:'#f72585', knuckleball:'#adb5bd'
};
const PITCH_SPEEDS = { fastball:460, sinker:495, curveball:580, slider:525, changeup:710, cutter:505, splitter:540, sweeper:570, knuckleball:850 };

// ── STATE ──
const GAME_TOTAL = 12;
let pitchGame = { score:0, wrong:0, current:0, queue:[], currentPitch:null };
let demoHandedness = 'righty';
let currentDemoPitch = null;
let activeAnims = [];

// ── PATH HELPERS ──
function mirrorPath(path, W=CV_W) {
  return { c:{x:W-path.c.x, y:path.c.y}, e:{x:W-path.e.x, y:path.e.y} };
}
// RHP = mirror of base (LHP); LHP = base as-is
function getCPath(key, h) { return h==='righty' ? mirrorPath(C_PATHS_BASE[key], CV_W) : C_PATHS_BASE[key]; }
function getTPath(key, h) { return h==='righty' ? mirrorPath(T_PATHS_BASE[key], TD_W) : T_PATHS_BASE[key]; }

function quadBezier(t, p0, c, p1) {
  const m=1-t;
  return { x:m*m*p0.x+2*m*t*c.x+t*t*p1.x, y:m*m*p0.y+2*m*t*c.y+t*t*p1.y };
}
function hexToRgb(h) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;
}

// ── INIT ──
function initPitchingModule() {
  const screen = document.getElementById('screen-pitching');
  screen.innerHTML = `
    ${makeNav('02 — The Art of Pitching', 'Select a pitch to see it from three angles simultaneously').outerHTML}
    <div class="module-content">

      <div class="section-label">Why Pitching Matters</div>
      <h1>Not Just Throwing Hard</h1>
      <p class="mt-8">A pitcher commands up to 9 different pitches — each with unique speed, spin, and trajectory. The duel between pitcher and batter is chess at 95 mph. Understanding pitch types is the key to reading any baseball game.</p>

      <!-- PITCH FAMILY FRAMEWORK -->
      <div class="divider"></div>
      <div class="section-label">The Framework</div>
      <h2>Three Pitch Families</h2>
      <p class="mt-8">Every pitch falls into one of three families. Within each family, pitchers have variations that add unpredictability — but the core movement pattern stays consistent.</p>

      <div class="pitch-family-grid mt-16">
        <div class="pitch-family-card" style="border-left:3px solid #388bfd">
          <h3 style="color:#388bfd">⚡ Fastballs</h3>
          <p>High velocity, relatively straight. The foundation — hitters expect it, pitchers set up everything else with it. Aim: overpowering speed or late movement.</p>
          <div class="pitch-family-tags">
            <span class="pitch-family-tag" style="background:rgba(56,139,253,0.15);color:#79c0ff">4-Seam Fastball</span>
            <span class="pitch-family-tag" style="background:rgba(88,166,255,0.12);color:#88c0fa">Sinker (2-Seam)</span>
            <span class="pitch-family-tag" style="background:rgba(227,179,65,0.15);color:#e3c96d">Cutter</span>
          </div>
        </div>
        <div class="pitch-family-card" style="border-left:3px solid #a371f7">
          <h3 style="color:#a371f7">🌀 Breaking Balls</h3>
          <p>Spin-generated movement — curves drop, sliders and sweepers dart sideways. Aim: bending the ball away from where the batter expects it.</p>
          <div class="pitch-family-tags">
            <span class="pitch-family-tag" style="background:rgba(240,136,62,0.15);color:#f0aa70">Curveball</span>
            <span class="pitch-family-tag" style="background:rgba(163,113,247,0.15);color:#c2a0f8">Slider</span>
            <span class="pitch-family-tag" style="background:rgba(247,37,133,0.15);color:#f772bd">Sweeper</span>
          </div>
        </div>
        <div class="pitch-family-card" style="border-left:3px solid #2ea043">
          <h3 style="color:#7ee787">🐢 Offspeed & Specialty</h3>
          <p>Deception through speed change or unpredictability. Looks like a fastball early — arrives much slower, or completely randomly. Aim: disrupting timing.</p>
          <div class="pitch-family-tags">
            <span class="pitch-family-tag" style="background:rgba(35,134,54,0.15);color:#7ee787">Changeup</span>
            <span class="pitch-family-tag" style="background:rgba(0,180,216,0.15);color:#48cae4">Splitter</span>
            <span class="pitch-family-tag" style="background:rgba(173,181,189,0.15);color:#ced4da">Knuckleball</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>
      <div class="section-label">Explore Each Pitch</div>
      <h2>Click a Pitch to See It in Action</h2>
      <p class="mt-8">Watch from all three angles simultaneously — catcher's view shows left/right break, overhead shows the trajectory path, side view shows rise and drop. Toggle between right-handed and left-handed pitchers to see how the movement mirrors.</p>

      <!-- PITCH CHIPS -->
      <div class="pitch-type-grid mt-16" id="pitchChips"></div>

      <!-- HANDEDNESS TOGGLE -->
      <div id="handControl" style="display:none;margin-top:12px">
        <div class="toggle-group" id="handToggleGroup" style="display:inline-flex">
          <button class="toggle-btn active" data-hand="righty" onclick="setHandedness('righty',this)">⚾ Right-handed (RHP)</button>
          <button class="toggle-btn" data-hand="lefty"  onclick="setHandedness('lefty',this)">⚾ Left-handed (LHP)</button>
        </div>
        <span style="font-size:0.98rem;color:var(--text-dim);margin-left:10px" id="handHint"></span>
      </div>

      <!-- THREE-VIEW DEMO + DETAIL SIDE BY SIDE -->
      <div id="threeViewDemo" style="display:none;margin-top:12px">
        <div class="pitch-and-detail">
          <div>
            <div class="three-view-demo">
              <div class="view-box">
                <div class="view-label">🎯 Catcher's View</div>
                <canvas id="catcherCanvas" class="view-canvas" width="${CV_W}" height="${CV_H}" style="background:#06080e"></canvas>
              </div>
              <div class="demo-sub-views">
                <div class="view-box">
                  <div class="view-label">🛸 Overhead</div>
                  <canvas id="topdownCanvas" class="view-canvas" width="${TD_W}" height="${TD_H}" style="background:#071008"></canvas>
                </div>
                <div class="view-box">
                  <div class="view-label">👁 Side View</div>
                  <canvas id="sideCanvas" class="view-canvas" width="${SV_W}" height="${SV_H}" style="background:#060a12"></canvas>
                </div>
              </div>
            </div>
            <div style="margin-top:8px">
              <button class="btn btn-outline" onclick="rerenderDemo()" style="padding:6px 16px;font-size:1.04rem">↺ Replay All</button>
            </div>
          </div>
          <!-- PITCH DETAIL TEXT — beside the canvas -->
          <div id="pitchDetail" style="min-width:0"></div>
        </div>
        <!-- GRIP ILLUSTRATION -->
        <div id="gripArea" style="display:none;margin-top:20px">
          <div class="section-label" style="font-size:0.79rem;margin-bottom:8px">GRIP ILLUSTRATION</div>
          <div id="gripSVGContainer"></div>
        </div>
      </div>

      <!-- GAME -->
      <div class="divider"></div>
      <div class="section-label game-tag">🎮 Level 1 — Identify the Pitch</div>
      <p class="mt-8">Watch from all three angles simultaneously — an RHP throwing to a right-handed batter. Identify which pitch it is based on the trajectory, speed, and break.</p>
      <p style="font-size:1.04rem;color:var(--text-muted);margin-top:6px">Tip: Use the catcher's view for the break direction, the overhead for horizontal path, and the side view to see rise or drop.</p>

      <div class="pitch-arena mt-16" id="gameArena">
        <div class="game-header">
          <div class="pitch-counter">
            <div class="counter-label">PITCH</div>
            <span class="counter-current" id="pitchCurrent">1</span><span class="counter-sep">/</span><span class="counter-total-num">${GAME_TOTAL}</span>
          </div>
          <div class="score-badges">
            <span class="badge-correct" id="scoreCorrect">✓ 0</span>
            <span class="badge-wrong"   id="scoreWrong">✗ 0</span>
          </div>
        </div>
        <div class="progress-strip" id="progressStrip">
          ${Array.from({length:GAME_TOTAL},(_,i)=>`<div class="pstrip-dot" id="pdot-${i}"></div>`).join('')}
        </div>
        <!-- 3-VIEW GAME CANVASES -->
        <div class="game-three-view" style="margin-top:8px">
          <div class="view-box">
            <div class="view-label">🎯 Catcher's View</div>
            <canvas id="pitchCanvas" width="${CV_W}" height="${CV_H}"
              style="border:1px solid var(--border);border-radius:8px;background:#060c12;display:block;width:100%"></canvas>
          </div>
          <div class="game-sub-views">
            <div class="view-box">
              <div class="view-label">🛸 Overhead</div>
              <canvas id="gameTdCanvas" width="${TD_W}" height="${TD_H}"
                style="border:1px solid var(--border);border-radius:8px;background:#071008;display:block;width:100%"></canvas>
            </div>
            <div class="view-box">
              <div class="view-label">👁 Side View</div>
              <canvas id="gameSvCanvas" width="${SV_W}" height="${SV_H}"
                style="border:1px solid var(--border);border-radius:8px;background:#060a12;display:block;width:100%"></canvas>
            </div>
          </div>
        </div>
        <button class="btn btn-outline" onclick="replayPitch()" style="padding:6px 16px;font-size:1.04rem;margin-top:8px">↺ Replay</button>
        <div class="pitch-choices" id="pitchChoices"></div>
        <div class="pitch-feedback" id="pitchFeedback"></div>
        <button class="btn btn-green" id="nextBtn" onclick="nextPitch()" style="display:none">Next Pitch →</button>
      </div>

      <!-- LEVEL 2 PRE-KNOWLEDGE -->
      <div id="level2teaser" style="display:none">
        <div class="divider"></div>
        <div class="section-label">Pitcher's Chess</div>
        <h2>Pitch Sequencing — How Real Pitchers Think</h2>
        <p class="mt-8">Level 1 taught you to identify pitches by their movement. Level 2 goes deeper: given a specific batter and situation, which pitch do you throw? Here's the framework real pitchers use.</p>

        <div style="display:grid;gap:14px;margin-top:20px">
          <div class="info-box" style="border-left:3px solid #388bfd;padding:14px 18px">
            <h3 style="color:#388bfd;font-size:1rem">1. Attack the Weakness</h3>
            <p class="mt-6" style="font-size:1.07rem">Every batter has a hole in their swing. Power hitters often struggle with breaking balls low and away — they're designed to attack the inner half. Contact hitters get jammed inside by cutters. Know the scouting report.</p>
          </div>
          <div class="info-box" style="border-left:3px solid #a371f7;padding:14px 18px">
            <h3 style="color:#a371f7;font-size:1rem">2. Count Dictates the Pitch</h3>
            <p class="mt-6" style="font-size:1.07rem">Ahead in the count (0-2, 1-2)? You can throw "waste pitches" — balls just off the edge — to get the batter to chase. Behind (2-0, 3-1)? You MUST throw a strike. Batters sit on fastballs when you're behind. Vary your pitch differently by count.</p>
          </div>
          <div class="info-box" style="border-left:3px solid #2ea043;padding:14px 18px">
            <h3 style="color:#7ee787;font-size:1rem">3. Change Eye Levels</h3>
            <p class="mt-6" style="font-size:1.07rem">After throwing low pitches, go high to disrupt timing. After high fastballs, a splitter diving to the knees is devastating. Pitching is about changing what the batter expects — not just throwing hard.</p>
          </div>
          <div class="info-box" style="border-left:3px solid #f0883e;padding:14px 18px">
            <h3 style="color:#f0883e;font-size:1rem">4. Don't Repeat Zone + Pitch</h3>
            <p class="mt-6" style="font-size:1.07rem">Throwing the same pitch to the same location twice in a row is dangerous. Elite batters adjust within the at-bat. After one pitch, the pitcher must sequence — same zone/different pitch, or same pitch/different zone. Never be predictable.</p>
          </div>
        </div>

        <div class="info-box orange mt-16" style="padding:14px 18px">
          <h3>🎮 Ready? Level 2 — Pitch Sequencing</h3>
          <p class="mt-8">You can identify pitches. Now step into the pitcher's role — you'll see the batter's scouting report, the game situation, and choose the right pitch. Five scenarios, each with real consequences.</p>
          <button class="btn btn-orange mt-16" onclick="initLevel2()">Start Level 2 →</button>
        </div>
      </div>
      <div id="level2area"></div>
    </div>
  `;

  demoHandedness = 'righty';
  currentDemoPitch = null;
  activeAnims = [];
  buildPitchChips();
  newPitchGame();
}

// ── PITCH CHIPS ──
function buildPitchChips() {
  const container = document.getElementById('pitchChips');
  if (!container) return;
  Object.entries(PITCHES).forEach(([key, p]) => {
    const chip = document.createElement('div');
    chip.className = `pitch-chip chip-${key}`;
    chip.textContent = p.name;
    chip.onclick = () => showPitchDemo(key, chip);
    container.appendChild(chip);
  });
}

function showPitchDemo(key, chipEl) {
  currentDemoPitch = key;
  document.querySelectorAll('.pitch-chip').forEach(c => c.classList.remove('active'));
  if (chipEl) chipEl.classList.add('active');

  document.getElementById('handControl').style.display = 'block';
  document.getElementById('threeViewDemo').style.display = 'grid';

  updateHandHint();
  rerenderDemo();
  renderPitchDetail(key);
}

function rerenderDemo() {
  if (!currentDemoPitch) return;
  stopAllAnims();
  const t0 = performance.now();
  const cc = document.getElementById('catcherCanvas');
  const tc = document.getElementById('topdownCanvas');
  const sc = document.getElementById('sideCanvas');
  if (cc) activeAnims.push(animateCatcher(cc, currentDemoPitch, demoHandedness, ()=>{}, true, t0));
  if (tc) activeAnims.push(animateTopDown(tc, currentDemoPitch, demoHandedness, t0));
  if (sc) activeAnims.push(animateSide(sc, currentDemoPitch, t0));
}

function stopAllAnims() {
  activeAnims.forEach(fn => fn && fn());
  activeAnims = [];
}

function setHandedness(h, btn) {
  demoHandedness = h;
  document.querySelectorAll('#handToggleGroup .toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateHandHint();
  rerenderDemo();
}

function updateHandHint() {
  const hint = document.getElementById('handHint');
  if (!hint || !currentDemoPitch) return;
  const p = PITCHES[currentDemoPitch];
  const h = demoHandedness === 'righty' ? 'RHP' : 'LHP';
  hint.textContent = `${p.name} · ${p.speed}`;
}

function renderPitchDetail(key) {
  const p = PITCHES[key];
  const detail = document.getElementById('pitchDetail');
  if (!detail) return;
  detail.style.display = 'block';
  const familyLabel = { fastball:'Fastball Family', breaking:'Breaking Ball Family', offspeed:'Offspeed / Specialty', specialty:'Specialty' };
  detail.innerHTML = `
    <div class="info-box" style="border-left:3px solid ${p.color};height:100%">
      ${p.family ? `<div style="font-size:0.83rem;font-weight:700;letter-spacing:0.1em;color:${p.color};margin-bottom:6px;text-transform:uppercase">${familyLabel[p.family]||''}</div>` : ''}
      <h3 style="color:${p.color}">${p.name}
        <span style="font-size:0.98rem;font-weight:400;color:#b1bac4"> ${p.speed}</span>
      </h3>
      <p class="mt-8" style="font-size:1.07rem">${p.explain}</p>
      <ul class="mt-8" style="padding-left:16px;color:#b1bac4;font-size:1.04rem;line-height:1.9">
        ${p.keys.map(k=>`<li>${k}</li>`).join('')}
      </ul>
      <p class="mt-8" style="font-size:1.0rem;color:var(--text-dim)">⭐ ${p.famous}</p>
    </div>
  `;
  const gripArea = document.getElementById('gripArea');
  const gripContainer = document.getElementById('gripSVGContainer');
  if (gripArea && gripContainer) {
    gripArea.style.display = 'block';
    gripContainer.innerHTML = buildGripSVG(key, p);
  } else if (gripArea) {
    gripArea.style.display = 'none';
  }
}

function buildGripSVG(key, p) {
  const color = p.color;
  const grips = {
    fastball: {
      label: '4-Seam Fastball Grip',
      fingers: [
        // index finger across top seam
        { x: 46, y: 18, w: 14, h: 20, rx: 5, label: '☝' },
        // middle finger across top seam
        { x: 62, y: 18, w: 14, h: 20, rx: 5, label: '✌' }
      ],
      desc: 'Index & middle fingers across 4 seams. Thumb underneath for support. Maximum backspin = "rising" fastball effect.'
    },
    sinker: {
      label: '2-Seam / Sinker Grip',
      fingers: [
        { x: 46, y: 20, w: 14, h: 18, rx: 5 },
        { x: 64, y: 20, w: 14, h: 18, rx: 5 }
      ],
      desc: 'Fingers aligned along 2 seams (not across). Creates arm-side run and downward movement.'
    },
    cutter: {
      label: 'Cutter Grip',
      fingers: [
        { x: 50, y: 20, w: 14, h: 18, rx: 5 },
        { x: 66, y: 18, w: 14, h: 20, rx: 5 }
      ],
      desc: 'Like fastball but slightly off-center toward the glove side. Creates late cut movement.'
    },
    curveball: {
      label: 'Curveball Grip',
      fingers: [
        { x: 56, y: 16, w: 14, h: 22, rx: 5 }
      ],
      desc: 'Middle finger pressed firmly along the seam. Thumb braces below. Forward snap at release creates topspin for the 12-to-6 drop.'
    },
    slider: {
      label: 'Slider Grip',
      fingers: [
        { x: 58, y: 18, w: 12, h: 20, rx: 5 },
        { x: 72, y: 20, w: 12, h: 18, rx: 5 }
      ],
      desc: 'Like a fastball but fingers offset to the glove side. Tight spin at release creates late lateral break.'
    },
    changeup: {
      label: 'Circle Change Grip',
      fingers: [
        { x: 44, y: 22, w: 12, h: 16, rx: 4 },
        { x: 58, y: 18, w: 12, h: 20, rx: 5 },
        { x: 72, y: 20, w: 12, h: 18, rx: 4 }
      ],
      desc: 'Three fingers across the ball, grip deep in palm. Index finger and thumb form a circle. Deep grip kills velocity without changing arm action.'
    },
    splitter: {
      label: 'Splitter Grip',
      fingers: [
        { x: 38, y: 18, w: 14, h: 20, rx: 5 },
        { x: 78, y: 18, w: 14, h: 20, rx: 5 }
      ],
      desc: 'Index and middle fingers spread WIDE apart on either side. The wide spread reduces spin dramatically — the ball tumbles and drops sharply at the plate.'
    },
    sweeper: {
      label: 'Sweeper Grip',
      fingers: [
        { x: 52, y: 18, w: 14, h: 20, rx: 5 },
        { x: 68, y: 22, w: 12, h: 16, rx: 4 }
      ],
      desc: 'Wider finger placement than slider, with emphasis on pronation at release. Creates a sweeping, horizontal break across a much larger arc.'
    },
    knuckleball: {
      label: 'Knuckleball Grip',
      fingers: [
        { x: 44, y: 28, w: 10, h: 12, rx: 4 },
        { x: 58, y: 26, w: 10, h: 12, rx: 4 },
        { x: 72, y: 28, w: 10, h: 12, rx: 4 }
      ],
      desc: 'Fingernails (not knuckles) pressed into the ball. Goal is ZERO rotation. Without spin, air currents cause random, unpredictable movement nobody can predict.'
    }
  };
  const g = grips[key] || grips.fastball;
  return `
  <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">
    <div>
      <svg viewBox="0 0 130 120" xmlns="http://www.w3.org/2000/svg" style="width:130px;height:120px">
        <rect width="130" height="120" fill="#060c18" rx="8"/>
        <!-- Baseball -->
        <circle cx="65" cy="70" r="35" fill="#f8f8f8" stroke="#ddd" stroke-width="1"/>
        <!-- Seam lines (simplified) -->
        <path d="M42,52 Q55,62 42,72" stroke="#cc2020" stroke-width="1.5" fill="none"/>
        <path d="M88,52 Q75,62 88,72" stroke="#cc2020" stroke-width="1.5" fill="none"/>
        <path d="M48,56 Q65,50 82,56" stroke="#cc2020" stroke-width="1.5" fill="none"/>
        <path d="M48,78 Q65,84 82,78" stroke="#cc2020" stroke-width="1.5" fill="none"/>
        <!-- Fingers -->
        ${g.fingers.map(f => `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="${f.rx}" fill="${color}" opacity="0.85" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>`).join('')}
        <!-- Thumb indicator -->
        <ellipse cx="48" cy="90" rx="9" ry="6" fill="${color}" opacity="0.6" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
        <text x="48" y="94" text-anchor="middle" fill="white" font-size="7" font-family="Inter">👍</text>
        <!-- Label -->
        <text x="65" y="14" text-anchor="middle" fill="#64748b" font-size="8" font-family="Oswald,sans-serif">${g.label}</text>
      </svg>
    </div>
    <div style="flex:1;min-width:180px">
      <p style="font-size:1.0rem;color:#b1bac4;line-height:1.6">${g.desc}</p>
    </div>
  </div>`;
}

// ── CATCHER'S VIEW ANIMATION ──
// Ball starts tiny (far, at release), grows as it "approaches" the catcher.
// Comet tail thickens toward arrival point — creates depth illusion.
function animateCatcher(canvas, pitchKey, handedness, onComplete, showColor, syncT0) {
  const ctx = canvas.getContext('2d');
  const path = getCPath(pitchKey, handedness);
  const release = { x:140, y:36 };
  const dur = PITCH_SPEEDS[pitchKey];
  let t0 = null, trail = [], rafId = null, done = false;

  function frame(ts) {
    if (done) return;
    if (!t0) t0 = syncT0 != null ? syncT0 : ts;
    const t = Math.min((ts - t0) / dur, 1);
    const pos = quadBezier(t, release, path.c, path.e);
    const bs = 2.5 + t * 17;

    ctx.clearRect(0, 0, CV_W, CV_H);
    drawCatcherBg(ctx);

    trail.push({ x:pos.x, y:pos.y, bs, t });
    if (trail.length > 65) trail.shift();

    for (let i = 1; i < trail.length; i++) {
      const a = trail[i-1], b = trail[i];
      const alpha = showColor ? b.t * 0.72 : b.t * 0.35;
      const rgb = showColor ? hexToRgb(PITCH_COLORS[pitchKey]) : '200,200,200';
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle = `rgba(${rgb},${alpha})`;
      ctx.lineWidth = b.bs * 0.92;
      ctx.lineCap = 'round'; ctx.stroke();
    }
    drawBall(ctx, pos.x, pos.y, bs);

    if (t < 1) { rafId = requestAnimationFrame(frame); }
    else { done = true; setTimeout(onComplete, 280); }
  }
  rafId = requestAnimationFrame(frame);
  return () => { done = true; if (rafId) cancelAnimationFrame(rafId); };
}

function drawCatcherBg(ctx) {
  ctx.fillStyle = '#06080e';
  ctx.fillRect(0, 0, CV_W, CV_H);

  // Perspective depth lines from release point
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const bx = 10 + i * (CV_W-20)/8;
    ctx.beginPath(); ctx.moveTo(140,36); ctx.lineTo(bx, CV_H-10); ctx.stroke();
  }

  const {l,r,t,b} = ZONE_C;
  ctx.fillStyle = 'rgba(56,139,253,0.04)';
  ctx.fillRect(l,t,r-l,b-t);
  ctx.strokeStyle = 'rgba(56,139,253,0.45)';
  ctx.lineWidth = 1.5; ctx.setLineDash([]);
  ctx.strokeRect(l,t,r-l,b-t);

  // 3×3 inner grid
  const tw=(r-l)/3, th=(b-t)/3;
  ctx.strokeStyle='rgba(56,139,253,0.12)'; ctx.lineWidth=0.5;
  for(let i=1;i<3;i++){
    ctx.beginPath();ctx.moveTo(l+tw*i,t);ctx.lineTo(l+tw*i,b);ctx.stroke();
    ctx.beginPath();ctx.moveTo(l,t+th*i);ctx.lineTo(r,t+th*i);ctx.stroke();
  }

  // Home plate — foreshortened pentagon below zone
  const px=CV_W/2, py=b+20, pw=50, pd=15;
  ctx.beginPath();
  ctx.moveTo(px-pw/2,py); ctx.lineTo(px+pw/2,py);
  ctx.lineTo(px+pw/2,py+pd*0.55); ctx.lineTo(px,py+pd);
  ctx.lineTo(px-pw/2,py+pd*0.55); ctx.closePath();
  ctx.fillStyle='rgba(255,255,255,0.07)'; ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=1.2; ctx.stroke();

  // Labels
  ctx.font='8px Inter,sans-serif';
  ctx.fillStyle='rgba(56,139,253,0.5)';
  ctx.fillText('STRIKE ZONE', l+2, t-6);
  ctx.fillStyle='rgba(255,255,255,0.15)';
  ctx.fillText('← 3B', 4, b+18);
  ctx.fillText('1B →', CV_W-34, b+18);
  ctx.fillStyle='rgba(255,255,255,0.12)';
  ctx.textAlign='center';
  ctx.fillText("CATCHER'S VIEW", CV_W/2, CV_H-4);
  ctx.textAlign='left';
}

// ── TOP-DOWN VIEW ANIMATION ──
// Overhead view: ball travels from mound (top) to plate (bottom).
// Shows horizontal break (arm-side vs glove-side).
function animateTopDown(canvas, pitchKey, handedness, syncT0, showColor=true) {
  const ctx = canvas.getContext('2d');
  const path = getTPath(pitchKey, handedness);
  const mound = {x:140,y:14};
  const dur = PITCH_SPEEDS[pitchKey];
  let t0=null, trail=[], rafId=null, done=false;

  function frame(ts) {
    if (done) return;
    if (!t0) t0 = syncT0 != null ? syncT0 : ts;
    const t = Math.min((ts-t0)/dur, 1);
    const pos = quadBezier(t, mound, path.c, path.e);

    ctx.clearRect(0,0,TD_W,TD_H);
    drawTopDownBg(ctx, pitchKey, handedness, showColor);

    trail.push({x:pos.x,y:pos.y,t});
    if(trail.length>70) trail.shift();

    const rgb = showColor ? hexToRgb(PITCH_COLORS[pitchKey]) : '220,220,220';
    for(let i=1;i<trail.length;i++){
      const a=trail[i-1],b=trail[i];
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=`rgba(${rgb},${b.t*(showColor?0.82:0.55)})`;
      ctx.lineWidth=1.5+b.t*5; ctx.lineCap='round'; ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(pos.x,pos.y,4.5,0,Math.PI*2);
    ctx.fillStyle='white'; ctx.fill();

    if(t<1) rafId=requestAnimationFrame(frame);
    else done=true;
  }
  rafId=requestAnimationFrame(frame);
  return () => { done=true; if(rafId) cancelAnimationFrame(rafId); };
}

function drawTopDownBg(ctx, pitchKey, handedness, showColor=true) {
  ctx.fillStyle='#071008'; ctx.fillRect(0,0,TD_W,TD_H);

  // Dirt corridor
  ctx.fillStyle='rgba(139,105,20,0.2)'; ctx.fillRect(TD_W/2-26,8,52,TD_H-16);

  // Pitcher's mound
  ctx.beginPath(); ctx.arc(140,14,7,0,Math.PI*2);
  ctx.fillStyle='rgba(200,160,50,0.5)'; ctx.fill();
  ctx.strokeStyle='rgba(255,220,100,0.35)'; ctx.lineWidth=1; ctx.stroke();

  // Home plate
  const px=TD_W/2, py=168, pw=24, pd=8;
  ctx.beginPath();
  ctx.moveTo(px-pw/2,py); ctx.lineTo(px+pw/2,py);
  ctx.lineTo(px+pw/2,py+pd*0.6); ctx.lineTo(px,py+pd);
  ctx.lineTo(px-pw/2,py+pd*0.6); ctx.closePath();
  ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fill();

  // Batter boxes
  ctx.strokeStyle='rgba(255,255,255,0.14)'; ctx.lineWidth=0.8;
  ctx.setLineDash([2,2]);
  ctx.strokeRect(px-55,160,22,20); // LHB
  ctx.strokeRect(px+33,160,22,20); // RHB
  ctx.setLineDash([]);

  // Dotted straight-line reference
  ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1;
  ctx.setLineDash([3,4]);
  ctx.beginPath(); ctx.moveTo(140,14); ctx.lineTo(140,172); ctx.stroke();
  ctx.setLineDash([]);

  // Arrow indicating break direction at end point (demo only)
  if (showColor) {
    const ep = getTPath(pitchKey, handedness).e;
    if (Math.abs(ep.x - 140) > 5) {
      const dir = ep.x > 140 ? 1 : -1;
      ctx.fillStyle = `rgba(${hexToRgb(PITCH_COLORS[pitchKey])},0.5)`;
      ctx.font='9px Inter,sans-serif';
      ctx.fillText(dir>0 ? '→' : '←', ep.x + dir*6, ep.y+3);
    }
  }

  // Labels
  ctx.font='8px Inter,sans-serif';
  ctx.fillStyle='rgba(255,255,255,0.2)';
  ctx.fillText('3B', 4, TD_H-4);
  ctx.fillText('1B', TD_W-22, TD_H-4);
  ctx.fillStyle='rgba(255,255,255,0.12)';
  ctx.textAlign='center';
  ctx.fillText("OVERHEAD VIEW", TD_W/2, TD_H-4);
  ctx.textAlign='left';
}

// ── SIDE VIEW ANIMATION ──
// Looking from the side (3B line). Shows vertical break clearly.
// Horizontal movement not visible here — that's what top-down is for.
function animateSide(canvas, pitchKey, syncT0, showColor=true) {
  const ctx = canvas.getContext('2d');
  const path = S_PATHS[pitchKey];
  const release = {x:28, y:52};
  const dur = PITCH_SPEEDS[pitchKey];
  let t0=null, trail=[], rafId=null, done=false;

  // Reference "gravity-only" path (no spin) for comparison
  const gravPath = { c:{x:140,y:68}, e:{x:252,y:112} };

  function frame(ts) {
    if (done) return;
    if (!t0) t0 = syncT0 != null ? syncT0 : ts;
    const t = Math.min((ts-t0)/dur, 1);
    const pos = quadBezier(t, release, path.c, path.e);

    ctx.clearRect(0,0,SV_W,SV_H);
    drawSideBg(ctx, t, release, gravPath);

    trail.push({x:pos.x,y:pos.y,t});
    if(trail.length>70) trail.shift();

    const rgb = showColor ? hexToRgb(PITCH_COLORS[pitchKey]) : '220,220,220';
    for(let i=1;i<trail.length;i++){
      const a=trail[i-1],b=trail[i];
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=`rgba(${rgb},${b.t*(showColor?0.82:0.55)})`;
      ctx.lineWidth=1.5+b.t*4; ctx.lineCap='round'; ctx.stroke();
    }

    // Ball
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 3+t*4, 0, Math.PI*2);
    const g=ctx.createRadialGradient(pos.x-1,pos.y-1,0,pos.x,pos.y,3+t*4);
    g.addColorStop(0,'#fff'); g.addColorStop(1,'#ddd');
    ctx.fillStyle=g; ctx.fill();

    if(t<1) rafId=requestAnimationFrame(frame);
    else done=true;
  }
  rafId=requestAnimationFrame(frame);
  return () => { done=true; if(rafId) cancelAnimationFrame(rafId); };
}

function drawSideBg(ctx, progress, release, gravPath) {
  ctx.fillStyle='#060a12'; ctx.fillRect(0,0,SV_W,SV_H);

  // Ground line
  ctx.strokeStyle='rgba(100,140,80,0.3)'; ctx.lineWidth=1; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(0,SV_H-8); ctx.lineTo(SV_W,SV_H-8); ctx.stroke();

  // Pitcher's rubber
  ctx.fillStyle='rgba(200,160,50,0.5)'; ctx.fillRect(18,SV_H-16,14,6);

  // Mound shape (simple triangle)
  ctx.fillStyle='rgba(139,105,20,0.2)';
  ctx.beginPath(); ctx.moveTo(12,SV_H-8); ctx.lineTo(40,SV_H-8); ctx.lineTo(26,SV_H-22); ctx.closePath(); ctx.fill();

  // Home plate
  ctx.fillStyle='rgba(255,255,255,0.7)';
  ctx.fillRect(248,SV_H-12,8,5);

  // Strike zone (vertical box at plate)
  const szTop=62, szBot=102;
  ctx.fillStyle='rgba(56,139,253,0.04)'; ctx.fillRect(246,szTop,14,szBot-szTop);
  ctx.strokeStyle='rgba(56,139,253,0.35)'; ctx.lineWidth=1;
  ctx.strokeRect(246,szTop,14,szBot-szTop);

  // Gravity-only reference line (dashed, shows what ball would do with no spin)
  ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1; ctx.setLineDash([3,4]);
  ctx.beginPath();
  ctx.moveTo(release.x, release.y);
  const steps=20;
  for(let i=1;i<=steps;i++){
    const tt=i/steps;
    const gp=quadBezier(tt, release, gravPath.c, gravPath.e);
    ctx.lineTo(gp.x, gp.y);
  }
  ctx.stroke(); ctx.setLineDash([]);

  // Labels
  ctx.font='7px Inter,sans-serif';
  ctx.fillStyle='rgba(56,139,253,0.5)';
  ctx.fillText('ZONE', 247, szTop-4);
  ctx.fillStyle='rgba(255,255,255,0.15)';
  ctx.fillText('← 60.5 ft / 18.4 m →', 36, SV_H-3);
  ctx.fillStyle='rgba(255,255,255,0.1)';
  ctx.fillText('gravity ref', 140, 80);
  ctx.textAlign='center';
  ctx.fillStyle='rgba(255,255,255,0.12)';
  ctx.fillText('SIDE VIEW', SV_W/2, SV_H-3);
  ctx.textAlign='left';
}

// ── BALL RENDERER ──
function drawBall(ctx, x, y, size) {
  if(size<1) return;
  ctx.beginPath(); ctx.arc(x+size*0.1,y+size*0.1,size,0,Math.PI*2);
  ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fill();
  ctx.beginPath(); ctx.arc(x,y,size,0,Math.PI*2);
  const g=ctx.createRadialGradient(x-size*0.3,y-size*0.3,0,x,y,size);
  g.addColorStop(0,'#ffffff'); g.addColorStop(1,'#dcdcdc');
  ctx.fillStyle=g; ctx.fill();
  ctx.strokeStyle='rgba(160,160,160,0.4)'; ctx.lineWidth=0.5; ctx.stroke();
  if(size>6){
    const op=Math.min(0.85,(size-6)/9);
    ctx.strokeStyle=`rgba(200,38,38,${op})`;
    ctx.lineWidth=Math.max(0.6,size*0.07); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(x-size*0.27,y,size*0.72,0.25,Math.PI-0.25); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+size*0.27,y,size*0.72,Math.PI+0.25,2*Math.PI-0.25); ctx.stroke();
  }
}

// ── GAME: LEVEL 1 ──
function newPitchGame() {
  pitchGame = { score:0, wrong:0, current:0, queue:[], currentPitch:null };
  // Build a queue of GAME_TOTAL pitches from all available pitches
  const keys = Object.keys(PITCHES);
  let pool = [];
  while(pool.length < GAME_TOTAL) pool = [...pool, ...shuffleArray(keys)];
  pitchGame.queue = pool.slice(0, GAME_TOTAL).reverse(); // reverse so we pop from front
  updateGameCounter();
  const d=document.getElementById('pdot-0');
  if(d) d.classList.add('p-current');
  nextPitch();
}

function updateGameCounter() {
  const cur=document.getElementById('pitchCurrent');
  if(cur) cur.textContent = Math.min(pitchGame.current+1, GAME_TOTAL);
}
function updateScoreBadges() {
  const sc=document.getElementById('scoreCorrect');
  const sw=document.getElementById('scoreWrong');
  if(sc) sc.textContent=`✓ ${pitchGame.score}`;
  if(sw) sw.textContent=`✗ ${pitchGame.wrong}`;
}

function nextPitch() {
  document.getElementById('nextBtn').style.display='none';
  document.getElementById('pitchFeedback').classList.remove('show');

  if(pitchGame.queue.length===0){ showPitchGameResult(); return; }

  const key = pitchGame.queue.pop();
  pitchGame.currentPitch = key;
  updateGameCounter();

  for(let i=0;i<GAME_TOTAL;i++){
    const d=document.getElementById(`pdot-${i}`);
    if(d&&d.classList.contains('p-current')) d.classList.remove('p-current');
  }
  const dot=document.getElementById(`pdot-${pitchGame.current}`);
  if(dot){ dot.classList.remove('p-correct','p-wrong'); dot.classList.add('p-current'); }

  document.getElementById('pitchChoices').innerHTML='';
  stopAllAnims();
  const t0 = performance.now();
  const cc = document.getElementById('pitchCanvas');
  const tc = document.getElementById('gameTdCanvas');
  const sc = document.getElementById('gameSvCanvas');
  if(cc) activeAnims.push(animateCatcher(cc, key, 'righty', buildPitchChoices, false, t0));
  if(tc) activeAnims.push(animateTopDown(tc, key, 'righty', t0, false));
  if(sc) activeAnims.push(animateSide(sc, key, t0, false));
}

function replayPitch() {
  if(!pitchGame.currentPitch) return;
  stopAllAnims();
  const t0 = performance.now();
  const cc = document.getElementById('pitchCanvas');
  const tc = document.getElementById('gameTdCanvas');
  const sc = document.getElementById('gameSvCanvas');
  if(cc) activeAnims.push(animateCatcher(cc, pitchGame.currentPitch, 'righty', ()=>{}, false, t0));
  if(tc) activeAnims.push(animateTopDown(tc, pitchGame.currentPitch, 'righty', t0, false));
  if(sc) activeAnims.push(animateSide(sc, pitchGame.currentPitch, t0, false));
}

function buildPitchChoices() {
  const correct=pitchGame.currentPitch;
  const others=shuffleArray(Object.keys(PITCHES).filter(k=>k!==correct)).slice(0,3);
  const choices=shuffleArray([correct,...others]);
  const container=document.getElementById('pitchChoices');
  if(!container) return;
  container.innerHTML='';
  choices.forEach(key=>{
    const btn=document.createElement('button');
    btn.className='pitch-btn';
    btn.textContent=PITCHES[key].name;
    btn.onclick=()=>handlePitchAnswer(key,btn,correct);
    container.appendChild(btn);
  });
}

function handlePitchAnswer(chosen, btn, correct) {
  document.querySelectorAll('.pitch-btn').forEach(b=>b.disabled=true);
  const isRight=chosen===correct;

  if(isRight){ pitchGame.score++; btn.classList.add('correct'); }
  else {
    pitchGame.wrong++; btn.classList.add('wrong');
    document.querySelectorAll('.pitch-btn').forEach(b=>{
      if(b.textContent===PITCHES[correct].name) b.classList.add('correct');
    });
  }

  const dot=document.getElementById(`pdot-${pitchGame.current}`);
  if(dot){ dot.classList.remove('p-current'); dot.classList.add(isRight?'p-correct':'p-wrong'); }
  pitchGame.current++;
  updateScoreBadges();

  const fb=document.getElementById('pitchFeedback');
  fb.classList.add('show');
  fb.innerHTML=`
    <div class="verdict ${isRight?'right':'wrong'}">${isRight?'✓ Correct!':'✗ That was a '+PITCHES[correct].name}</div>
    <p>${PITCHES[correct].explain}</p>
  `;
  document.getElementById('nextBtn').style.display='inline-block';
  if(pitchGame.current>=6) document.getElementById('level2teaser').style.display='block';
}

function showPitchGameResult() {
  const score=pitchGame.score, pct=Math.round(score/GAME_TOTAL*100);
  document.getElementById('gameArena').innerHTML=`
    <div class="result-screen">
      <div class="section-label">Level 1 Complete</div>
      <div class="result-rank">${pct>=83?'🏆':pct>=58?'⚾':'📚'}</div>
      <div style="font-family:Oswald,sans-serif;font-size:2.5rem;color:#fff">${score} / ${GAME_TOTAL}</div>
      <div class="result-score">${pct}% accuracy</div>
      <p>${pct>=83?'Sharp eye! You can read pitches better than most batters.':pct>=58?'Good start! Real batters have 0.4 seconds — you had as long as you needed.':'Pitches are deceptive. Even MLB hitters fail 70% of the time. Try again!'}</p>
      <button class="btn btn-green mt-24" onclick="resetPitchGame()">Play Again</button>
    </div>
  `;
}

function resetPitchGame() {
  const arena=document.getElementById('gameArena');
  arena.innerHTML=`
    <div class="game-header">
      <div class="pitch-counter">
        <div class="counter-label">PITCH</div>
        <span class="counter-current" id="pitchCurrent">1</span><span class="counter-sep">/</span><span class="counter-total-num">${GAME_TOTAL}</span>
      </div>
      <div class="score-badges">
        <span class="badge-correct" id="scoreCorrect">✓ 0</span>
        <span class="badge-wrong" id="scoreWrong">✗ 0</span>
      </div>
    </div>
    <div class="progress-strip" id="progressStrip">
      ${Array.from({length:GAME_TOTAL},(_,i)=>`<div class="pstrip-dot" id="pdot-${i}"></div>`).join('')}
    </div>
    <div class="game-three-view" style="margin-top:8px">
      <div class="view-box">
        <div class="view-label">🎯 Catcher's View</div>
        <canvas id="pitchCanvas" width="${CV_W}" height="${CV_H}"
          style="border:1px solid var(--border);border-radius:8px;background:#060c12;display:block;width:100%"></canvas>
      </div>
      <div class="game-sub-views">
        <div class="view-box">
          <div class="view-label">🛸 Overhead</div>
          <canvas id="gameTdCanvas" width="${TD_W}" height="${TD_H}"
            style="border:1px solid var(--border);border-radius:8px;background:#071008;display:block;width:100%"></canvas>
        </div>
        <div class="view-box">
          <div class="view-label">👁 Side View</div>
          <canvas id="gameSvCanvas" width="${SV_W}" height="${SV_H}"
            style="border:1px solid var(--border);border-radius:8px;background:#060a12;display:block;width:100%"></canvas>
        </div>
      </div>
    </div>
    <button class="btn btn-outline" onclick="replayPitch()" style="padding:6px 16px;font-size:1.04rem;margin-top:8px">↺ Replay</button>
    <div class="pitch-choices" id="pitchChoices"></div>
    <div class="pitch-feedback" id="pitchFeedback"></div>
    <button class="btn btn-green" id="nextBtn" onclick="nextPitch()" style="display:none">Next Pitch →</button>
  `;
  activeAnims=[];
  newPitchGame();
}

// ── GAME: LEVEL 2 ──
const SEQUENCING_SCENARIOS = [
  {
    batter:'Power hitter, right-handed. Known weakness: pitches low and away. Struggles against breaking balls that start middle-in and slide away.',
    count:'1-1', situation:'Runner on 2nd, 1 out. You need a ground ball out.',
    options:[
      {pitch:'fastball',zone:'high and inside',result:'bad',explain:'Giving a power hitter the high fastball is dangerous — he\'s sitting on velocity. He turns on it and drives it to the gap. Runner scores.'},
      {pitch:'slider',  zone:'low and away (outer edge)',result:'good',explain:'Perfect read. He chases the slider out of his power zone. Weak ground ball to shortstop — double play ball. Inning over.'},
      {pitch:'changeup',zone:'middle of zone',result:'bad',explain:'A changeup center-zone is batting practice. He\'s sitting on something slow and drives it hard. Never give a power hitter an offspeed pitch to sit on.'},
      {pitch:'curveball',zone:'bouncing in dirt',result:'neutral',explain:'Ball in the dirt — batter lays off. Count goes to 2-1. Not a disaster, but you gave him a free look. Try again with better location.'}
    ]
  },
  {
    batter:'Contact hitter, left-handed. Rarely strikes out. Sprays the ball to all fields — no obvious pull tendency. Quick bat.',
    count:'0-2', situation:'Two strikes, two outs, bases loaded. One pitch to end the inning.',
    options:[
      {pitch:'fastball',zone:'outside corner',result:'neutral',explain:'Smart location. He fouls it off — still 0-2. Good discipline from both sides. Try a different pitch next.'},
      {pitch:'cutter',  zone:'inside corner',result:'good',explain:'The cutter breaks inside on a lefty and jams his hands. Broken bat grounder to second — inning over. Reading the handedness matchup perfectly.'},
      {pitch:'changeup',zone:'low and away',result:'good',explain:'With two strikes he has to protect the plate. Your fastball arm speed sells the changeup perfectly — it fades away. He chases — strikeout! Great deception.'},
      {pitch:'curveball',zone:'center of zone',result:'bad',explain:'A slow curve center-zone to a contact hitter? He times it and lines it to left field. Two runs score. Never give a contact hitter a breaking ball they can time.'}
    ]
  },
  {
    batter:'Young slugger, right-handed, first time facing you. No scouting data available — you don\'t know his weaknesses yet.',
    count:'0-0', situation:'First pitch of the at-bat. Setting the tone for the game.',
    options:[
      {pitch:'fastball',zone:'down and away',result:'good',explain:'The classic first pitch: establish your fastball down-and-away. If he takes it, you\'re ahead 0-1. If he swings, you learn how his bat path looks. Smart professional pitching.'},
      {pitch:'curveball',zone:'middle of zone',result:'bad',explain:'Throwing a first-pitch curveball in the zone to an unknown batter is a gamble. He may be a great curveball hitter. No information to justify this risk.'},
      {pitch:'changeup',zone:'low and away',result:'neutral',explain:'An interesting choice — first-pitch changeup to a new batter could catch him off-guard. But you also reveal this pitch early. He gets a look at it with no pressure.'},
      {pitch:'sinker',  zone:'inside corner',result:'good',explain:'Sinker inside to establish the inner half of the plate. If he can\'t handle the inside pitch, that\'s invaluable scouting for the rest of the game. Good thinking.'}
    ]
  },
  {
    batter:'Veteran cleanup hitter. Excellent fastball hitter — rarely fooled by hard stuff. Struggles with pitches that change eye level dramatically.',
    count:'2-2', situation:'Full at-bat developing. Runners on first and third, 2 outs. One pitch could end or extend the inning.',
    options:[
      {pitch:'fastball',zone:'elevated, top of zone',result:'bad',explain:'Veteran hitters love elevated fastballs — they have decades of timing them. He elevates it and it barely clears the left field wall. Three runs score. Never give a fastball hitter what he wants.'},
      {pitch:'splitter', zone:'below the zone',result:'good',explain:'Masterful. The splitter looks like a fastball until it dives under his swing. He commits early — huge swing and miss. With eye-level change, even veterans get fooled.'},
      {pitch:'curveball',zone:'bouncing in dirt',result:'neutral',explain:'He lays off the bouncing curve. Ball — counts goes to 3-2. You didn\'t give him anything, but you\'re now behind. The pressure is all on you for the next pitch.'},
      {pitch:'slider',   zone:'inner half',result:'neutral',explain:'The slider catches the inner corner — umpire rings him up! Or does he foul it back? Either way, the slider inside to a pull hitter is a risky but sometimes rewarding call.'}
    ]
  },
  {
    batter:'Elite contact hitter, left-handed. Leads the league in batting average. Adjusts quickly mid-game — you cannot use the same pitch twice in the same zone.',
    count:'1-2', situation:'One strike away from ending the inning. Runners on 2nd and 3rd.',
    options:[
      {pitch:'sweeper',  zone:'outside corner, starting middle',result:'good',explain:'The sweeper starts middle and breaks off the plate — he\'s tracking the path of a strike. The huge horizontal break freezes him. Called strike three. Beautiful pitch design.'},
      {pitch:'fastball', zone:'up and middle',result:'bad',explain:'An elite contact hitter, 1-2 count, fastball up the middle? He\'s sitting on something like this. Line drive to center — both runners score. Always pitch to a hitter\'s weakness.'},
      {pitch:'changeup', zone:'low and away',result:'good',explain:'1-2 count, off-speed low-and-away. He has to protect, and your arm speed sold the fastball look. He rolls over it weakly — easy ground ball to the pitcher. Smart sequencing.'},
      {pitch:'sinker',   zone:'low and away',result:'neutral',explain:'Sinker low-and-away isn\'t bad, but an elite contact hitter can handle this pitch. He goes the other way with it — single to left. Runners score. Good location, wrong pitch for this hitter.'}
    ]
  }
];
let seqIdx=0;

function initLevel2(){seqIdx=0;renderSeq();}

function renderSeq(){
  const area=document.getElementById('level2area');
  if(seqIdx>=SEQUENCING_SCENARIOS.length){
    area.innerHTML=`<div class="info-box green mt-24"><h3>🎯 Level 2 Complete!</h3>
    <p class="mt-8">Pitch selection is a chess match. Real catchers and pitchers make these calls dozens of times per game — in split seconds.</p>
    <button class="btn btn-green mt-16" onclick="showScreen('batting');initModule('batting')">The Art of Batting →</button></div>`;
    return;
  }
  const sc=SEQUENCING_SCENARIOS[seqIdx];
  area.innerHTML=`
    <div class="divider"></div>
    <div class="section-label game-tag">🎮 Level 2 — Pitch Sequencing</div>
    <h2>You're the Pitcher</h2>
    <div class="scenario-box mt-16">
      <div class="scoreboard">
        <div class="scoreboard-item"><div class="label">COUNT</div><div class="value">${sc.count}</div></div>
        <div class="scoreboard-item"><div class="label">SITUATION</div><div class="value" style="font-size:1.1rem;color:var(--text-muted);line-height:1.3">${sc.situation}</div></div>
      </div>
      <div class="info-box blue" style="padding:12px 16px">
        <strong style="color:#79c0ff;font-size:1.04rem">SCOUTING:</strong>
        <p style="margin-top:4px;font-size:1.1rem">${sc.batter}</p>
      </div>
      <div class="tactic-choices" style="margin-top:16px">
        ${sc.options.map((o,i)=>`<button class="tactic-btn" data-idx="${i}" onclick="handleSeqChoice(${i})">
          <strong>${PITCHES[o.pitch]?.name||o.pitch}</strong> — ${o.zone}</button>`).join('')}
      </div>
      <div class="outcome-box" id="seqOutcome"></div>
    </div>`;
}

function handleSeqChoice(idx){
  const sc=SEQUENCING_SCENARIOS[seqIdx], opt=sc.options[idx];
  document.querySelectorAll('[data-idx]').forEach(b=>b.disabled=true);
  document.querySelector(`[data-idx="${idx}"]`).classList.add('chosen');
  const ob=document.getElementById('seqOutcome');
  ob.className=`outcome-box show ${opt.result==='good'?'good':opt.result==='bad'?'bad':'neutral'}`;
  ob.innerHTML=`<h3>${opt.result==='good'?'✓ Great call!':opt.result==='bad'?'✗ Costly mistake':'～ Decent, but...'}</h3>
    <p class="mt-8">${opt.explain}</p>
    <button class="btn ${opt.result==='good'?'btn-green':'btn-orange'} mt-16" onclick="nextSeq()">
      ${seqIdx+1<SEQUENCING_SCENARIOS.length?'Next Scenario →':'Finish Level 2 →'}</button>`;
}
function nextSeq(){seqIdx++;renderSeq();}

// ── UTILS ──
function shuffleArray(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

// ── GLOBAL EXPORTS ──
window.replayPitch=replayPitch; window.nextPitch=nextPitch;
window.resetPitchGame=resetPitchGame; window.initLevel2=initLevel2;
window.nextSeq=nextSeq; window.handleSeqChoice=handleSeqChoice;
window.nextSeqScenario=nextSeq;
window.setHandedness=setHandedness; window.rerenderDemo=rerenderDemo;

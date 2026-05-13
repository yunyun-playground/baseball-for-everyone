// ── MODULE 3: THE ART OF BATTING ──

const PLATE_SCENARIOS = [
  {
    px: 90, py: 95, inZone: true,
    count: { b: 0, s: 0 },
    correct: 'swing',
    explain: 'Count 0-0, pitch right down the middle — don\'t take a gift. A well-located pitch early in the at-bat is often the best pitch you\'ll see all game. Professional hitters attack this pitch.'
  },
  {
    px: 30, py: 95, inZone: false,
    count: { b: 3, s: 0 },
    correct: 'take',
    explain: '3-0 count, pitch clearly outside — you\'re one ball from a free walk. This pitch is a ball. Most coaches give the "take" sign at 3-0, ensuring a walk or at minimum a guaranteed strike to work with on 3-1.'
  },
  {
    px: 90, py: 138, inZone: true,
    count: { b: 0, s: 2 },
    correct: 'swing',
    explain: '0-2 count — you\'re one strike from out. Even though this pitch is at the very bottom of the zone, you must protect the plate. With two strikes, expand your zone. Never let a borderline pitch end your at-bat looking.'
  },
  {
    px: 90, py: 62, inZone: true,
    count: { b: 2, s: 1 },
    correct: 'swing',
    explain: 'Hitter\'s count 2-1, pitch chest-high in the center — this is exactly the pitch to attack. You\'re ahead in the count, the pitcher needs a strike. Chest-high is a power zone for most hitters. Trust your hands.'
  },
  {
    px: 25, py: 95, inZone: false,
    count: { b: 3, s: 2 },
    correct: 'take',
    explain: 'Full count, but the pitch is well off the plate. Even on 3-2, if it\'s clearly a ball, trust your eye. Ball four is a free base. You don\'t have to swing at everything just because the count is full.'
  },
  {
    px: 116, py: 95, inZone: true,
    count: { b: 1, s: 2 },
    correct: 'swing',
    explain: '1-2, inside corner — borderline but catchable. With two strikes, this is a pitch to put in play. Umpires call the corners a strike. Don\'t get caught looking. Shorten your swing and make contact.'
  },
  {
    px: 90, py: 28, inZone: false,
    count: { b: 0, s: 1 },
    correct: 'take',
    explain: 'High pitch, well above the zone. Even 0-1, laying off bad pitches is essential. Pitchers use high pitches to get batters to chase and pop up. Recognizing balls early is the foundation of plate discipline.'
  },
  {
    px: 84, py: 88, inZone: true,
    count: { b: 3, s: 1 },
    correct: 'swing',
    explain: '3-1 "green light" — the hitter\'s dream. You\'re ahead 3-1, and the pitcher HAS to throw a strike or walk you. Most coaches give the swing-away sign. This is your pitch. Attack it with everything.'
  }
];

let pdState = { idx: 0, score: 0, answered: false };

function initBattingModule() {
  pdState = { idx: 0, score: 0, answered: false };
  const screen = document.getElementById('screen-batting');
  screen.innerHTML = `
    ${makeNav('03 — The Art of Batting', 'The mental and physical game at the plate').outerHTML}
    <div class="module-content">

      <div class="section-label">The Other Side of the Battle</div>
      <h1>The Art of Batting</h1>
      <p class="mt-8">A 95 mph fastball takes 0.4 seconds to reach home plate. The batter has about 0.17 seconds to decide whether to swing. In that fraction of a second, they're using every piece of preparation — pitcher tendencies, the count, game situation — to make the right call. Here's what goes into that decision.</p>

      <div class="divider"></div>

      <div class="section-label">First Things First</div>
      <h2>Left-Handed vs. Right-Handed Batters</h2>
      <p class="mt-8">Batters stand on opposite sides of home plate depending on which hand is dominant. This affects which pitches are hardest to hit, which pitchers are a tough matchup, and where the ball tends to go off the bat.</p>

      ${buildBatterHandednessSVG()}

      <div class="two-col mt-20">
        <div class="info-box">
          <h3>The Platoon Advantage</h3>
          <p class="mt-8">In baseball, <strong>same-hand matchups favor the pitcher</strong>. A right-handed pitcher (RHP) has a built-in advantage over a right-handed batter because breaking balls move away from the batter — harder to track, harder to make solid contact.</p>
          <p class="mt-8">That's why managers make late-game substitutions to force the favorable matchup. It's called <strong>"playing the platoon."</strong></p>
        </div>
        <div class="info-box">
          <h3>Switch Hitters</h3>
          <p class="mt-8">Some batters train to hit from <em>both</em> sides of the plate, switching their stance based on the opposing pitcher's handedness. This eliminates the platoon disadvantage entirely.</p>
          <p class="mt-8">Famous switch hitters: Mickey Mantle, Pete Rose, Chipper Jones. In Taiwan's CPBL, <strong>高國輝 (Ko Kuo-hui)</strong> is a notable switch hitter who's used the skill throughout his career.</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">The Most Important Rectangle in Baseball</div>
      <h2>The Strike Zone</h2>
      <p class="mt-8">The strike zone is defined by the rulebook, but in practice, every umpire has personal tendencies — and hitters spend their careers memorizing each one's quirks.</p>

      <div class="two-col mt-20" style="align-items:start">
        <div>
          ${buildStrikeZoneSVG()}
        </div>
        <div>
          <div class="info-box" style="margin-bottom:12px">
            <h3>By the Rules</h3>
            <p class="mt-8" style="font-size:0.88rem">The zone extends from the <strong>midpoint between the batter's shoulders and waist</strong> (roughly the chest) down to the <strong>hollow below the knee</strong>. The width equals the 17-inch width of home plate.</p>
            <p class="mt-8" style="font-size:0.88rem">The zone technically changes for every batter — a taller batter has a larger zone, a crouching batter has a smaller one.</p>
          </div>
          <div class="info-box" style="margin-bottom:12px">
            <h3>In Practice</h3>
            <p class="mt-8" style="font-size:0.88rem">Since 2015, MLB uses <strong>Statcast</strong> to grade umpires' ball/strike calls with sub-inch precision. The real-world zone is slightly shorter than the rulebook zone top-to-bottom, and pitchers target the corners aggressively because edge calls are hardest to get right.</p>
          </div>
          <div class="info-box">
            <h3>The Chase Rate Problem</h3>
            <p class="mt-8" style="font-size:0.88rem">Pitchers don't just throw strikes — they throw <em>chase pitches</em>: balls that look like strikes until the last moment. A batter's ability to lay off these pitches is called <strong>plate discipline</strong>, and it separates good hitters from great ones.</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">The Mental Game</div>
      <h2>Reading the Count</h2>
      <p class="mt-8">The count (Balls — Strikes) shifts power between pitcher and batter with every pitch. Understanding the count tells you exactly what to expect — and what your opponent needs to do.</p>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px">
        ${countCard('3 – 0', 'hitter', "Hitter's Best", 'Pitcher desperately needs a strike. Expect a fastball, center of the zone. Most batters get the swing-away sign — a rare chance to sit on a specific pitch.')}
        ${countCard('3 – 1', 'hitter', 'Green Light', 'Still very favorable. Pitcher needs a strike. Attack anything in your zone — you can still take if it\'s bad and work to a full count.')}
        ${countCard('2 – 0', 'hitter', "Hitter's Count", 'Pitcher is behind. Another fastball is likely. Look for your pitch and be selective — don\'t expand the zone just yet.')}
        ${countCard('0 – 0', 'neutral', 'Even', 'The at-bat begins. Each player is probing — pitcher wants to get ahead with a strike, batter wants to see what\'s coming.')}
        ${countCard('1 – 2', 'pitcher', 'Pitcher Ahead', 'Batter in trouble. Pitcher will throw waste pitches — balls just off the edge — hoping you chase. Stay disciplined and protect the zone.')}
        ${countCard('0 – 2', 'pitcher', "Pitcher's Dream", 'One strike from out. Batter must expand the zone and protect. Expect breaking balls off the plate. The pitcher has all the leverage here.')}
      </div>

      <div class="divider"></div>

      <div class="section-label">The Physics</div>
      <h2>Launch Angle & Exit Velocity</h2>
      <p class="mt-8">Two numbers from Statcast data now define how we evaluate every batted ball — and changed how the modern game is played.</p>

      ${buildLaunchAngleSVG()}

      <div class="two-col mt-20">
        <div class="info-box">
          <h3>Exit Velocity</h3>
          <p class="mt-8">How hard the ball comes off the bat, measured in mph. MLB average is around <strong>88 mph</strong>. Above 95 mph is "hard hit." Power hitters who strike out a lot often lead in exit velocity — when they connect, it's devastating.</p>
          <p class="mt-8">Exit velocity is a function of bat speed and how squarely you make contact. Off-center hits bleed velocity dramatically.</p>
        </div>
        <div class="info-box">
          <h3>The Optimal Zone</h3>
          <p class="mt-8">Research shows <strong>95+ mph exit velocity + 25–35° launch angle</strong> produces the highest rate of extra-base hits. This is why modern coaching teaches an "upward swing path" rather than the old advice to "hit down on the ball."</p>
          <p class="mt-8">Too much angle (50°+) = pop up, easy catch. Not enough (below 10°) = weak grounder. The sweet spot is in between — and teams now build their lineups around it.</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label game-tag">🎮 Plate Discipline Game</div>
      <h2>Swing or Take?</h2>
      <p class="mt-8">A pitch is on its way. Watch where it's crossing the plate — if it's in the strike zone, swing. If it's outside the zone, let it go. Eight pitches, each in a different situation.</p>
      <div class="info-box mt-12" style="padding:12px 16px">
        <p style="font-size:0.85rem"><strong>Basic rule:</strong> ✅ Pitch in the zone → Swing &nbsp;|&nbsp; ❌ Pitch outside the zone → Take<br>
        <span style="color:var(--text-muted);font-size:0.82rem">Advanced note: in real games, the count and situation sometimes change this — a 3-0 hitter's count or a 0-2 danger count both affect the decision. We'll explain each case after you answer.</span></p>
      </div>

      <div id="pdGameArea" class="mt-20"></div>

      <div class="divider"></div>
      <div class="section-label">Up Next</div>
      <h2>Time to think like a manager</h2>
      <p class="mt-8">You understand the pitcher's arsenal and the batter's mindset. Now step into the dugout — where the real chess match happens.</p>
      <div class="mt-16">
        <button class="btn btn-green" onclick="showScreen('tactics'); initModule('tactics')">Tactical Decisions →</button>
      </div>
    </div>
  `;

  renderPDScenario();
}

function buildBatterHandednessSVG() {
  return `
  <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:580px;display:block;margin-top:20px">
    <rect width="520" height="210" fill="#0d1117" rx="10"/>

    <!-- Title -->
    <text x="260" y="18" text-anchor="middle" fill="#64748b" font-size="9" font-family="Oswald,sans-serif" letter-spacing="1">CATCHER'S VIEW — looking toward the pitcher mound</text>

    <!-- Center divider -->
    <line x1="260" y1="24" x2="260" y2="200" stroke="#1e293b" stroke-width="1.5"/>

    <!-- ── LEFT PANEL: RHB ── -->
    <text x="130" y="40" text-anchor="middle" fill="#388bfd" font-size="12" font-family="Oswald,sans-serif" font-weight="700">RIGHT-HANDED BATTER</text>
    <text x="130" y="54" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">stands in the LEFT batter's box</text>

    <!-- Home plate -->
    <polygon points="130,195 116,184 116,172 144,172 144,184" fill="white" opacity="0.8"/>

    <!-- Left batter's box (highlighted = RHB's box) -->
    <rect x="62" y="95" width="42" height="75" fill="#388bfd" opacity="0.1" stroke="#388bfd" stroke-width="1.5" stroke-dasharray="5,3" rx="3"/>
    <!-- Right batter's box (empty) -->
    <rect x="156" y="95" width="42" height="75" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3" rx="3"/>

    <!-- RHB stick figure (in left box, facing RIGHT toward pitcher which is ahead/center) -->
    <!-- Head -->
    <circle cx="83" cy="112" r="11" fill="none" stroke="#388bfd" stroke-width="2.5"/>
    <!-- Body -->
    <line x1="83" y1="123" x2="83" y2="152" stroke="#388bfd" stroke-width="3" stroke-linecap="round"/>
    <!-- Arms + bat (bat held to the right = right side for RHB) -->
    <line x1="83" y1="133" x2="103" y2="138" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Bat -->
    <line x1="103" y1="138" x2="138" y2="128" stroke="#e6edf3" stroke-width="4" stroke-linecap="round"/>
    <!-- Legs -->
    <line x1="83" y1="152" x2="71" y2="175" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="83" y1="152" x2="95" y2="175" stroke="#388bfd" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Annotation -->
    <text x="83" y="87" text-anchor="middle" fill="#388bfd" font-size="8.5" font-family="Inter,sans-serif">← stands in this box</text>

    <!-- ── RIGHT PANEL: LHB ── -->
    <text x="390" y="40" text-anchor="middle" fill="#f0883e" font-size="12" font-family="Oswald,sans-serif" font-weight="700">LEFT-HANDED BATTER</text>
    <text x="390" y="54" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">stands in the RIGHT batter's box</text>

    <!-- Home plate -->
    <polygon points="390,195 376,184 376,172 404,172 404,184" fill="white" opacity="0.8"/>

    <!-- Left batter's box (empty) -->
    <rect x="322" y="95" width="42" height="75" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3" rx="3"/>
    <!-- Right batter's box (highlighted = LHB's box) -->
    <rect x="416" y="95" width="42" height="75" fill="#f0883e" opacity="0.1" stroke="#f0883e" stroke-width="1.5" stroke-dasharray="5,3" rx="3"/>

    <!-- LHB stick figure (in right box, mirror of RHB) -->
    <circle cx="437" cy="112" r="11" fill="none" stroke="#f0883e" stroke-width="2.5"/>
    <line x1="437" y1="123" x2="437" y2="152" stroke="#f0883e" stroke-width="3" stroke-linecap="round"/>
    <!-- Arms + bat (bat held to the left = left side for LHB) -->
    <line x1="437" y1="133" x2="417" y2="138" stroke="#f0883e" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="417" y1="138" x2="382" y2="128" stroke="#e6edf3" stroke-width="4" stroke-linecap="round"/>
    <line x1="437" y1="152" x2="425" y2="175" stroke="#f0883e" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="437" y1="152" x2="449" y2="175" stroke="#f0883e" stroke-width="2.5" stroke-linecap="round"/>

    <text x="437" y="87" text-anchor="middle" fill="#f0883e" font-size="8.5" font-family="Inter,sans-serif">stands in this box →</text>

    <!-- Bottom legend -->
    <text x="260" y="207" text-anchor="middle" fill="#475569" font-size="8.5" font-family="Inter,sans-serif">Pitcher is ahead of both batters — this diagram shows which side of home plate each batter stands on</text>
  </svg>`;
}

function buildStrikeZoneSVG() {
  const W = 340, H = 300;
  const gnd = 272;
  const bx  = 72;

  const zx = 148, zy = 120, zw = 100, zh = 93;
  const row = zh / 3;

  const headCy = 50, headR = 17;
  const shoulderY = 84, hipY = 156;
  const kneeY = 205;
  const feetY = gnd;

  return `
  <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;max-width:420px;display:block;background:#0d1117;border-radius:10px">

    <text x="${W/2}" y="14" text-anchor="middle" fill="#94a3b8" font-size="10"
      font-family="Oswald,sans-serif" font-weight="600" letter-spacing="1.5">STRIKE ZONE · SIDE VIEW</text>

    <!-- Ground line -->
    <line x1="12" y1="${gnd}" x2="${W-12}" y2="${gnd}"
      stroke="rgba(139,105,20,0.35)" stroke-width="1.5"/>

    <!-- Home plate (pentagon, centered under zone) -->
    <polygon points="${zx+zw/2},${gnd+5} ${zx+zw/2-13},${gnd} ${zx+zw/2-13},${gnd-10} ${zx+zw/2+13},${gnd-10} ${zx+zw/2+13},${gnd}"
      fill="white" opacity="0.75"/>

    <!-- ── BATTER (side view, faces right toward pitcher) ── -->

    <!-- Head: filled solid circle -->
    <circle cx="${bx}" cy="${headCy}" r="${headR}" fill="#f0883e" opacity="0.92"/>
    <!-- Helmet brim (right side = pitcher direction) -->
    <path d="M${bx+6},${headCy-headR+2} Q${bx+headR+9},${headCy-headR-2} ${bx+headR+6},${headCy+5}"
      stroke="#c06020" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Neck -->
    <line x1="${bx}" y1="${headCy+headR}" x2="${bx}" y2="${shoulderY}"
      stroke="#f0883e" stroke-width="3.5" stroke-linecap="round"/>

    <!-- Torso (slight forward lean) -->
    <line x1="${bx}" y1="${shoulderY}" x2="${bx+5}" y2="${hipY}"
      stroke="#f0883e" stroke-width="5" stroke-linecap="round"/>

    <!-- Back arm + hands (toward catcher side, gripping bat) -->
    <line x1="${bx}" y1="${shoulderY+8}" x2="${bx-16}" y2="${shoulderY+22}"
      stroke="#f0883e" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="${bx-16}" y1="${shoulderY+22}" x2="${bx-26}" y2="${shoulderY+8}"
      stroke="#f0883e" stroke-width="3.5" stroke-linecap="round"/>

    <!-- Bat (barrel up-back, load position) -->
    <line x1="${bx-26}" y1="${shoulderY+8}" x2="${bx-46}" y2="${headCy-22}"
      stroke="#e6edf3" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${bx-46}" cy="${headCy-22}" r="4" fill="#e6edf3"/>

    <!-- Front shoulder -->
    <line x1="${bx}" y1="${shoulderY}" x2="${bx+14}" y2="${shoulderY+8}"
      stroke="#f0883e" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

    <!-- Front leg (toward pitcher) -->
    <line x1="${bx+5}" y1="${hipY}" x2="${bx+22}" y2="${kneeY}"
      stroke="#f0883e" stroke-width="4" stroke-linecap="round"/>
    <line x1="${bx+22}" y1="${kneeY}" x2="${bx+28}" y2="${feetY}"
      stroke="#f0883e" stroke-width="4" stroke-linecap="round"/>
    <line x1="${bx+28}" y1="${feetY}" x2="${bx+46}" y2="${feetY}"
      stroke="#f0883e" stroke-width="4" stroke-linecap="round"/>

    <!-- Back leg (toward catcher) -->
    <line x1="${bx+5}" y1="${hipY}" x2="${bx-12}" y2="${kneeY}"
      stroke="#f0883e" stroke-width="4" stroke-linecap="round"/>
    <line x1="${bx-12}" y1="${kneeY}" x2="${bx-18}" y2="${feetY}"
      stroke="#f0883e" stroke-width="4" stroke-linecap="round"/>
    <line x1="${bx-18}" y1="${feetY}" x2="${bx-4}" y2="${feetY}"
      stroke="#f0883e" stroke-width="4" stroke-linecap="round"/>

    <!-- BATTER label -->
    <text x="${bx}" y="28" text-anchor="middle" fill="#f0883e"
      font-size="9" font-family="Oswald,sans-serif" font-weight="600" letter-spacing="0.5">BATTER</text>

    <!-- Reference lines: mid-chest & below-knee -->
    <line x1="${bx+8}" y1="${zy}" x2="${zx}" y2="${zy}"
      stroke="#388bfd" stroke-width="1.2" stroke-dasharray="5,3" opacity="0.7"/>
    <text x="${bx-2}" y="${zy-4}" fill="#64748b" font-size="8" font-family="Inter,sans-serif">mid-chest</text>

    <line x1="${bx+30}" y1="${zy+zh}" x2="${zx}" y2="${zy+zh}"
      stroke="#388bfd" stroke-width="1.2" stroke-dasharray="5,3" opacity="0.7"/>
    <text x="${bx-2}" y="${zy+zh+13}" fill="#64748b" font-size="8" font-family="Inter,sans-serif">below knee</text>

    <!-- STRIKE ZONE BOX -->
    <rect x="${zx}" y="${zy}" width="${zw}" height="${zh}"
      fill="#238636" fill-opacity="0.12" stroke="#3fb950" stroke-width="2.5" rx="3"/>

    <line x1="${zx+1}" y1="${zy+row}" x2="${zx+zw-1}" y2="${zy+row}"
      stroke="#7ee787" stroke-width="1" opacity="0.5"/>
    <line x1="${zx+1}" y1="${zy+row*2}" x2="${zx+zw-1}" y2="${zy+row*2}"
      stroke="#7ee787" stroke-width="1" opacity="0.5"/>

    <text x="${zx+zw/2}" y="${zy+row/2+4}" text-anchor="middle"
      fill="#475569" font-size="9" font-family="Oswald,sans-serif" letter-spacing="0.5">HIGH</text>
    <text x="${zx+zw/2}" y="${zy+row+row/2+5}" text-anchor="middle"
      fill="#7ee787" font-size="11" font-family="Oswald,sans-serif" font-weight="700">MID</text>
    <text x="${zx+zw/2}" y="${zy+row*2+row/2+4}" text-anchor="middle"
      fill="#475569" font-size="9" font-family="Oswald,sans-serif" letter-spacing="0.5">LOW</text>

    <text x="${zx+zw/2}" y="${zy-6}" text-anchor="middle"
      fill="#3fb950" font-size="10" font-family="Oswald,sans-serif" font-weight="700" letter-spacing="1">STRIKE ZONE</text>

    <!-- Width dimension -->
    <line x1="${zx}" y1="${zy+zh+18}" x2="${zx+zw}" y2="${zy+zh+18}" stroke="#475569" stroke-width="1"/>
    <line x1="${zx}" y1="${zy+zh+14}" x2="${zx}" y2="${zy+zh+22}" stroke="#475569" stroke-width="1"/>
    <line x1="${zx+zw}" y1="${zy+zh+14}" x2="${zx+zw}" y2="${zy+zh+22}" stroke="#475569" stroke-width="1"/>
    <text x="${zx+zw/2}" y="${zy+zh+32}" text-anchor="middle"
      fill="#64748b" font-size="8" font-family="Inter,sans-serif">17 inches wide (home plate width)</text>

    <!-- Height bracket -->
    <line x1="${zx+zw+8}" y1="${zy}" x2="${zx+zw+12}" y2="${zy}" stroke="#475569" stroke-width="1"/>
    <line x1="${zx+zw+8}" y1="${zy+zh}" x2="${zx+zw+12}" y2="${zy+zh}" stroke="#475569" stroke-width="1"/>
    <line x1="${zx+zw+10}" y1="${zy}" x2="${zx+zw+10}" y2="${zy+zh}" stroke="#475569" stroke-width="1"/>
    <text x="${zx+zw+15}" y="${zy+zh/2+4}" text-anchor="start"
      fill="#64748b" font-size="8" font-family="Inter,sans-serif">~22"</text>

    <!-- Direction labels -->
    <text x="14" y="${gnd+20}" fill="#475569" font-size="8" font-family="Inter,sans-serif">← catcher</text>
    <text x="${W-14}" y="${gnd+20}" text-anchor="end" fill="#475569" font-size="8" font-family="Inter,sans-serif">pitcher →</text>
  </svg>`;
}

function buildLaunchAngleSVG() {
  return `
  <div style="overflow-x:auto;margin-top:20px">
  <svg viewBox="0 0 560 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;display:block;min-width:380px">
    <rect width="560" height="175" fill="#0d1117" rx="10"/>
    <text x="280" y="16" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="Oswald,sans-serif" font-weight="600">LAUNCH ANGLE — What Happens After Contact</text>
    <line x1="20" y1="138" x2="540" y2="138" stroke="#21262d" stroke-width="1.5"/>
    <!-- Impact point -->
    <circle cx="50" cy="138" r="7" fill="#388bfd" stroke="white" stroke-width="1.5"/>
    <text x="50" y="153" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter,sans-serif">contact</text>

    <!-- Pop up ~60° -->
    <path d="M50,138 Q88,25 126,138" stroke="#6e7681" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
    <text x="88" y="22" text-anchor="middle" fill="#6e7681" font-size="9" font-family="Oswald,sans-serif">POP-UP (50°+)</text>
    <text x="88" y="32" text-anchor="middle" fill="#6e7681" font-size="8" font-family="Inter,sans-serif">caught easily</text>

    <!-- Sweet spot ~28° arc -->
    <path d="M50,138 Q230,15 430,45" stroke="#7ee787" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="430" cy="45" r="5" fill="#7ee787"/>
    <text x="480" y="32" text-anchor="middle" fill="#7ee787" font-size="9" font-family="Oswald,sans-serif" font-weight="600">SWEET SPOT (25–35°)</text>
    <text x="480" y="43" text-anchor="middle" fill="#7ee787" font-size="8" font-family="Inter,sans-serif">optimal for home runs</text>
    <text x="480" y="53" text-anchor="middle" fill="#7ee787" font-size="8" font-family="Inter,sans-serif">& extra-base hits</text>

    <!-- Line drive ~15° -->
    <line x1="50" y1="138" x2="370" y2="77" stroke="#f0883e" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="370" cy="77" r="4" fill="#f0883e"/>
    <text x="420" y="75" text-anchor="middle" fill="#f0883e" font-size="9" font-family="Oswald,sans-serif">LINE DRIVE (10–20°)</text>
    <text x="420" y="85" text-anchor="middle" fill="#f0883e" font-size="8" font-family="Inter,sans-serif">highest batting avg.</text>

    <!-- Ground ball ~5° -->
    <line x1="50" y1="138" x2="220" y2="122" stroke="#ff6b7a" stroke-width="2" stroke-linecap="round"/>
    <path d="M220,122 Q260,126 300,122 Q340,118 380,130" stroke="#ff6b7a" stroke-width="1.5" fill="none" stroke-dasharray="3,3"/>
    <text x="265" y="115" text-anchor="middle" fill="#ff6b7a" font-size="9" font-family="Oswald,sans-serif">GROUND BALL (~5°)</text>
    <text x="265" y="125" text-anchor="middle" fill="#ff6b7a" font-size="8" font-family="Inter,sans-serif">usually an easy out</text>

    <!-- Angle indicator -->
    <path d="M80,138 A30,30 0 0,0 77,108" stroke="#475569" stroke-width="1" fill="none" stroke-dasharray="3,2"/>
    <text x="14" y="106" fill="#475569" font-size="8" font-family="Inter,sans-serif">angle</text>
  </svg>
  </div>`;
}

function countCard(count, type, title, desc) {
  const colors = { hitter: '#7ee787', pitcher: '#ff6b7a', neutral: '#94a3b8' };
  const bg = { hitter: 'rgba(35,134,54,0.12)', pitcher: 'rgba(206,17,38,0.12)', neutral: 'rgba(100,116,139,0.1)' };
  return `
  <div style="background:${bg[type]};border:1px solid ${colors[type]}30;border-radius:8px;padding:14px">
    <div style="font-family:Oswald,sans-serif;font-size:1.5rem;font-weight:700;color:${colors[type]};text-align:center;margin-bottom:4px">${count}</div>
    <div style="font-size:0.75rem;font-weight:600;color:${colors[type]};text-align:center;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">${title}</div>
    <p style="font-size:0.8rem;color:var(--text-dim);line-height:1.5">${desc}</p>
  </div>`;
}

function buildPDScenarioSVG(px, py, answered, correct, chosen) {
  const inZone = px >= 62 && px <= 118 && py >= 50 && py <= 140;
  let dotColor = '#f0883e';
  if (answered) dotColor = inZone ? '#7ee787' : '#ff6b7a';
  const zoneStroke = answered ? (inZone ? '#238636' : '#475569') : '#388bfd';
  const zoneFill = answered && inZone ? 'rgba(35,134,54,0.12)' : 'rgba(56,139,253,0.04)';

  return `
  <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:180px;display:block;margin:0 auto">
    <rect width="180" height="220" fill="#0d1117" rx="8"/>
    <ellipse cx="90" cy="207" rx="52" ry="9" fill="#8B6914" opacity="0.25"/>
    <polygon points="90,213 77,204 77,195 103,195 103,204" fill="white" opacity="0.8"/>
    <!-- Batter boxes (dashed) -->
    <rect x="18" y="98" width="42" height="94" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,2" rx="2"/>
    <rect x="120" y="98" width="42" height="94" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,2" rx="2"/>
    <!-- Strike zone -->
    <rect x="62" y="50" width="56" height="90" fill="${zoneFill}" stroke="${zoneStroke}" stroke-width="2" rx="2"/>
    <!-- Clearly visible 3x3 grid -->
    <line x1="62" y1="80" x2="118" y2="80" stroke="${answered ? '#334155' : '#1e3a5f'}" stroke-width="1.2"/>
    <line x1="62" y1="110" x2="118" y2="110" stroke="${answered ? '#334155' : '#1e3a5f'}" stroke-width="1.2"/>
    <line x1="81" y1="50" x2="81" y2="140" stroke="${answered ? '#334155' : '#1e3a5f'}" stroke-width="1.2"/>
    <line x1="99" y1="50" x2="99" y2="140" stroke="${answered ? '#334155' : '#1e3a5f'}" stroke-width="1.2"/>
    <!-- Zone label -->
    <text x="90" y="43" text-anchor="middle" fill="#388bfd" font-size="8" font-family="Oswald,sans-serif" font-weight="600">STRIKE ZONE</text>
    <!-- High/Low labels -->
    <text x="56" y="56" text-anchor="end" fill="#475569" font-size="7" font-family="Inter">Hi</text>
    <text x="56" y="144" text-anchor="end" fill="#475569" font-size="7" font-family="Inter">Lo</text>
    <!-- In/Out labels -->
    <text x="62" y="170" text-anchor="middle" fill="#475569" font-size="7" font-family="Inter">In</text>
    <text x="118" y="170" text-anchor="middle" fill="#475569" font-size="7" font-family="Inter">Out</text>
    <!-- Pitch dot (the ball) -->
    <circle cx="${px}" cy="${py}" r="9" fill="${dotColor}" stroke="white" stroke-width="1.5" opacity="0.95"/>
    <text x="${px}" y="${py+4}" text-anchor="middle" fill="white" font-size="9" font-family="Oswald">⚾</text>
    <!-- Answer reveal -->
    ${answered ? `
      <rect x="22" y="155" width="136" height="20" rx="4" fill="${inZone ? 'rgba(35,134,54,0.25)' : 'rgba(206,17,38,0.2)'}"/>
      <text x="90" y="169" text-anchor="middle" fill="${inZone ? '#7ee787' : '#ff6b7a'}" font-size="10" font-family="Oswald,sans-serif" font-weight="700">${inZone ? '✓ STRIKE — IN THE ZONE' : '✓ BALL — OUTSIDE ZONE'}</text>
    ` : ''}
  </svg>`;
}

function renderPDScenario() {
  const area = document.getElementById('pdGameArea');
  if (!area) return;

  if (pdState.idx >= PLATE_SCENARIOS.length) {
    const pct = Math.round(pdState.score / PLATE_SCENARIOS.length * 100);
    area.innerHTML = `
      <div class="info-box green">
        <h3>✓ Plate Discipline Complete!</h3>
        <p class="mt-8">You got <strong>${pdState.score} / ${PLATE_SCENARIOS.length}</strong> correct (${pct}%).</p>
        <p class="mt-8">${pct >= 75 ? 'Your eye at the plate is sharp. You understand when to be aggressive and when to be patient — the mark of a disciplined hitter.' : 'The key: be aggressive on hitter\'s counts, protect with two strikes, be patient when you\'re ahead. Great hitters don\'t swing at everything — they wait for their pitch.'}</p>
      </div>
    `;
    return;
  }

  const sc = PLATE_SCENARIOS[pdState.idx];
  pdState.answered = false;

  area.innerHTML = `
    <div class="scenario-box">
      <div class="section-label" style="margin-bottom:8px">Situation ${pdState.idx + 1} of ${PLATE_SCENARIOS.length}</div>
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
        <div style="flex:0 0 auto">
          ${buildPDScenarioSVG(sc.px, sc.py, false, sc.correct, null)}
        </div>
        <div style="flex:1;min-width:200px">
          <div style="font-family:Oswald,sans-serif;font-size:0.75rem;color:var(--text-dim);margin-bottom:4px;letter-spacing:1px">CURRENT COUNT</div>
          <div style="font-family:Oswald,sans-serif;font-size:2.2rem;font-weight:700;color:white;margin-bottom:2px">${sc.count.b} — ${sc.count.s}</div>
          <div style="font-size:0.8rem;color:var(--text-dim);margin-bottom:20px">Balls &nbsp;·&nbsp; Strikes</div>
          <div style="font-size:0.88rem;color:var(--text);margin-bottom:16px">The pitch is on its way. What do you do?</div>
          <div style="display:flex;gap:10px">
            <button class="tactic-btn" style="flex:1;background:rgba(35,134,54,0.12);border-color:#238636;color:#7ee787" onclick="handlePDChoice('swing')">⚡ Swing</button>
            <button class="tactic-btn" style="flex:1" onclick="handlePDChoice('take')">🛑 Take</button>
          </div>
        </div>
      </div>
      <div class="outcome-box" id="pdOutcome"></div>
    </div>
  `;
}

function handlePDChoice(choice) {
  if (pdState.answered) return;
  pdState.answered = true;

  const sc = PLATE_SCENARIOS[pdState.idx];
  const correct = choice === sc.correct;
  if (correct) pdState.score++;

  document.querySelectorAll('#pdGameArea .tactic-btn').forEach(b => b.disabled = true);

  const box = document.getElementById('pdOutcome');
  box.className = `outcome-box show ${correct ? 'good' : 'bad'}`;
  box.innerHTML = `
    <div style="margin-bottom:12px">
      ${buildPDScenarioSVG(sc.px, sc.py, true, sc.correct, choice)}
    </div>
    <h3>${correct ? '✓ Good read!' : `✗ The right call was to ${sc.correct}`}</h3>
    <p class="mt-8">${sc.explain}</p>
    <button class="btn btn-green mt-16" onclick="nextPDScenario()">
      ${pdState.idx + 1 < PLATE_SCENARIOS.length ? 'Next Pitch →' : 'See Results →'}
    </button>
  `;
}

function nextPDScenario() {
  pdState.idx++;
  renderPDScenario();
}

window.handlePDChoice = handlePDChoice;
window.nextPDScenario = nextPDScenario;

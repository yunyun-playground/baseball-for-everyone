// ── MODULE 1: THE FIELD & THE GAME ──

function initFieldModule() {
  const screen = document.getElementById('screen-field');

  screen.innerHTML = `
    ${makeNav('01 — The Field & The Game', 'Click any position to learn what they do').outerHTML}
    <div class="module-content">
      <div class="section-label">Start Here</div>
      <h1>The Baseball Diamond</h1>
      <p class="mt-8">Baseball is played on a unique field: an infield shaped like a diamond, surrounded by a vast outfield. Nine players defend the field while the other team sends batters to try to score runs. Click any position marker to learn more.</p>

      <div class="field-wrapper mt-24">
        ${buildFieldSVG()}
        <div class="position-info" id="posInfo">
          <div style="color:var(--text-dim);font-size:1.1rem">👆 Click a position on the field above</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">The Basics</div>
      <h2>How the Game Works</h2>
      <p class="mt-8">Baseball can seem complex at first. Here's the essential structure:</p>

      <div class="three-col mt-24">
        <div class="info-box green">
          <h3>⚾ The At-Bat</h3>
          <p class="mt-8">One batter stands at home plate. The pitcher throws. The batter tries to hit. Each pitch is either a <strong>ball</strong> (outside the zone) or a <strong>strike</strong> (in the zone or swung at).</p>
          <p class="mt-8"><strong>4 balls → Walk</strong> (batter goes to 1st base)<br><strong>3 strikes → Strikeout</strong> (batter is out)</p>
        </div>
        <div class="info-box orange">
          <h3>🏃 The Inning</h3>
          <p class="mt-8">Each team gets 3 outs per inning. One team bats, the other defends, then they switch. A full game is <strong>9 innings</strong>. If tied after 9, the game continues until someone wins.</p>
          <p class="mt-8">Most games last about <strong>3 hours</strong>.</p>
        </div>
        <div class="info-box blue">
          <h3>🏠 Scoring</h3>
          <p class="mt-8">A run scores when a player successfully advances around all <strong>three bases</strong> and touches <strong>home plate</strong>. A home run sends the ball over the outfield wall — everyone on base scores automatically.</p>
          <p class="mt-8">The team with more runs after 9 innings wins.</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">The Scoreboard</div>
      <h2>How to Read a Baseball Scoreboard</h2>
      <p class="mt-8">A baseball scoreboard carries more information than most sports. Here's what every number means — and you'll be reading it fluently within one inning.</p>
      ${buildScoreboardSVG()}

      <div class="three-col mt-24">
        <div class="info-box">
          <h3>🔢 Line Score</h3>
          <p class="mt-8">Each column shows runs scored in that inning. A blank means the inning hasn't been played yet. A dot or dash means the team batted but scored zero. The home team skips the bottom of the 9th if they're already winning.</p>
        </div>
        <div class="info-box">
          <h3>📊 R · H · E</h3>
          <p class="mt-8"><strong>R</strong> = Total Runs (the score). <strong>H</strong> = Hits (successful plate appearances that put the batter on base). <strong>E</strong> = Errors (defensive mistakes). A high E number means sloppy defense — gift runs.</p>
        </div>
        <div class="info-box">
          <h3>⚡ B · S · O Count</h3>
          <p class="mt-8"><strong>B</strong> = Balls this at-bat (0–3). <strong>S</strong> = Strikes (0–2). <strong>O</strong> = Outs this half-inning (0–2). A "full count" is 3–2 — one more pitch decides the whole at-bat. The base diamond shows who's currently on base.</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">Try It Out</div>
      <h2>Baseball Situation Simulator</h2>
      <p class="mt-8">Step up to the plate. Press any play to see what happens on the field — and learn the rule behind it.</p>
      <div id="baseballSim" style="margin-top:20px"></div>

      <!-- Collapsible: how the simulator works -->
      <div style="margin-top:20px">
        <button onclick="(function(btn){const body=document.getElementById('simGuideBody');const arrow=document.getElementById('simGuideArrow');const open=body.style.display==='block';body.style.display=open?'none':'block';arrow.textContent=open?'▸':'▾';})(this)"
          style="width:100%;text-align:left;background:#0d1117;border:1px solid #1e293b;border-radius:8px;padding:12px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;color:#94a3b8;font-family:Oswald,sans-serif;font-size:1.04rem;letter-spacing:1px"
          onmouseover="this.style.borderColor='#334155'" onmouseout="this.style.borderColor='#1e293b'">
          <span id="simGuideArrow" style="font-size:1.1rem;color:#475569">▸</span>
          HOW THE SIMULATOR DECIDES WHAT HAPPENS
        </button>
        <div id="simGuideBody" style="display:none;background:#0d1117;border:1px solid #1e293b;border-top:none;border-radius:0 0 8px 8px;padding:16px 18px">

          <p style="font-size:1.0rem;color:#64748b;margin-bottom:16px;line-height:1.6">Most buttons have a fixed outcome. But several plays use <strong style="color:#94a3b8">game context</strong> (base situation, outs) or <strong style="color:#94a3b8">randomness</strong> to produce different results — just like real baseball.</p>

          ${[
            {
              btn: 'Fly Out', color: '#ff6b7a',
              rows: [
                { cond: 'Runner on 3rd, < 2 outs', result: 'Sacrifice Fly — 1 out, run scores', badge: 'ALWAYS', bc: '#238636' },
                { cond: 'All other situations',     result: 'Regular fly out',                  badge: 'ALWAYS', bc: '#238636' },
              ]
            },
            {
              btn: 'Line Out', color: '#ff6b7a',
              rows: [
                { cond: 'Runner on 1st, < 2 outs', result: 'Runner doubled off — 2 outs',       badge: '35%', bc: '#9e6a03' },
                { cond: 'Runner on 1st, < 2 outs', result: 'Runner holds safely — 1 out',        badge: '65%', bc: '#1f6feb' },
                { cond: 'No runner on 1st',         result: 'Regular line out',                   badge: 'ALWAYS', bc: '#238636' },
              ]
            },
            {
              btn: 'Ground Out', color: '#ff6b7a',
              rows: [
                { cond: 'Runner on 3rd, < 2 outs (priority)',       result: 'RBI Ground Out — 1 out, run scores',          badge: 'ALWAYS', bc: '#238636' },
                { cond: 'Runner on 1st, < 2 outs',                  result: 'Double Play — 2 outs',                        badge: '35%', bc: '#9e6a03' },
                { cond: 'Runner on 1st, < 2 outs',                  result: "Fielder's Choice — 1 out (runner), batter safe at 1st", badge: '15%', bc: '#9e6a03' },
                { cond: 'Runner on 1st, < 2 outs',                  result: 'Regular out — 1 out, runner to 2nd (30% of these show an H&R note)', badge: '50%', bc: '#1f6feb' },
                { cond: 'No runner on 1st (or runner on 3rd only)', result: 'Regular ground out, forced runners advance',   badge: 'ALWAYS', bc: '#238636' },
              ]
            },
            {
              btn: 'Pop-Up Out', color: '#ff6b7a',
              rows: [
                { cond: 'Runners on 1st + 2nd (or bases loaded), < 2 outs', result: 'Infield Fly Rule explained in description', badge: 'ALWAYS', bc: '#238636' },
                { cond: 'All other situations',                               result: 'Regular pop-up out',                       badge: 'ALWAYS', bc: '#238636' },
              ]
            },
            {
              btn: 'Single', color: '#7ee787',
              rows: [
                { cond: 'Runner on 2nd (any)',              result: 'Scoring position — runner scores from 2nd',        badge: '75%', bc: '#9e6a03' },
                { cond: 'Runner on 2nd (any)',              result: 'Scoring position — runner holds at 3rd',           badge: '25%', bc: '#1f6feb' },
                { cond: 'Runner on 1st, no runner on 2nd', result: 'Hit and Run — runner reaches 3rd instead of 2nd',  badge: '25%', bc: '#9e6a03' },
                { cond: 'Runner on 1st, no runner on 2nd', result: 'Standard single',                                   badge: '75%', bc: '#1f6feb' },
                { cond: 'No runner on 1st or 2nd',         result: 'Standard advancement',                              badge: 'ALWAYS', bc: '#238636' },
              ]
            },
            {
              btn: 'Double', color: '#7ee787',
              rows: [
                { cond: 'Runner on 1st, no runner on 2nd', result: 'Hit and Run — runner scores from 1st (instead of stopping at 3rd)', badge: '20%', bc: '#9e6a03' },
                { cond: 'All other situations',            result: 'Standard advancement',                                              badge: '80%', bc: '#1f6feb' },
              ]
            },
            {
              btn: 'Strikeout', color: '#ff6b7a',
              rows: [
                { cond: 'Runner on 1st, < 2 outs', result: 'H&R backfire — 2 outs ("strike \'em out, throw \'em out")', badge: '15%', bc: '#9e6a03' },
                { cond: 'All other situations',    result: 'Regular strikeout — 1 out',                                badge: '85%', bc: '#1f6feb' },
              ]
            },
          ].map(section => `
            <div style="margin-bottom:18px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="background:${section.color}18;border:1px solid ${section.color}44;color:${section.color};font-family:Oswald,sans-serif;font-size:0.88rem;font-weight:600;padding:2px 10px;border-radius:4px">${section.btn}</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px">
                ${section.rows.map(r => `
                  <div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:start;padding:8px 12px;background:${r.bc === '#238636' ? 'rgba(35,134,54,0.08)' : '#0a0e17'};border-radius:6px;border:1px solid ${r.bc === '#238636' ? 'rgba(35,134,54,0.22)' : '#1e293b'}">
                    <div>
                      <div style="font-size:0.88rem;color:#7aa2d4;margin-bottom:3px">${r.cond}</div>
                      <div style="font-size:0.99rem;color:${r.bc === '#238636' ? '#7ee787' : '#c9d1d9'};font-weight:${r.bc === '#238636' ? '500' : '400'}">${r.result}</div>
                    </div>
                    <span style="background:${r.bc === '#238636' ? 'rgba(35,134,54,0.18)' : r.bc + '22'};border:1px solid ${r.bc === '#238636' ? 'rgba(35,134,54,0.45)' : r.bc + '55'};color:${r.bc === '#238636' ? '#7ee787' : r.bc === '#9e6a03' ? '#e3b341' : '#388bfd'};font-family:Oswald,sans-serif;font-size:0.83rem;font-weight:700;padding:2px 8px;border-radius:4px;white-space:nowrap;flex-shrink:0;margin-top:1px">${r.bc === '#238636' ? 'FIXED' : r.badge}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}

          <div style="margin-top:8px;padding:10px 12px;background:#0a0e17;border-radius:6px;border-left:3px solid #388bfd33">
            <p style="font-size:0.93rem;color:#64748b;line-height:1.55">All other buttons — Triple, Home Run, Walk, HBP, Intentional Walk, Stolen Base, Caught Stealing, Sac Bunt — produce <strong style="color:#94a3b8">fixed outcomes</strong> based only on the current base situation (shown with a green <strong style="color:#7ee787">FIXED</strong> badge above).</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">A Critical Rule</div>
      <h2>Force Out vs. Tag Out</h2>

      <div class="info-box orange mt-16">
        <p><strong>The core rule:</strong> If a runner is <em>forced</em> to advance (someone else needs their base), the fielder only has to hold the ball and <strong>touch the base</strong>. If the runner chose to advance on their own, the fielder must physically <strong>tag the runner</strong> with the ball.</p>
      </div>

      <div class="two-col mt-24">
        <div>
          <div class="section-label" style="color:var(--green-light)">Force Out</div>
          <h3 style="margin-bottom:12px">Step on the base is enough</h3>
          ${buildForceOutSVG()}
        </div>
        <div>
          <div class="section-label" style="color:#f0883e">Tag Out</div>
          <h3 style="margin-bottom:12px">Must touch the runner with the ball</h3>
          ${buildTagOutSVG()}
        </div>
      </div>

      <div class="divider"></div>
      <div class="section-label">Ready?</div>
      <h2>Now for the fun part</h2>
      <p class="mt-8">You know the field, how outs work, the rules, and the vocabulary. Let's go deeper — into the most complex and fascinating part of baseball: pitching.</p>
      <div class="mt-16">
        <button class="btn btn-green" onclick="showScreen('pitching'); initModule('pitching')">Go to Pitching →</button>
      </div>
    </div>
  `;
  initSimulator();
}

// ── FIELD SVG + FORCE/TAG SVGs ──


function buildFieldSVG() {
  // Home (300,450), foul poles (0,150) and (600,150) → exact 90° angle at home plate
  // Diamond square: 1B(383,367), 2B(300,284), 3B(217,367)
  return `
  <svg viewBox="0 -30 600 510" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
    <!-- outfield grass -->
    <path d="M300,450 L0,150 A345,345 0 0,1 600,150 Z" fill="#1a5c30"/>
    <!-- infield dirt -->
    <path d="M300,450 L217,367 L300,284 L383,367 Z" fill="#8B6914" opacity="0.75"/>
    <!-- infield grass overlay (diamond cutout) -->
    <path d="M300,440 L222,367 L300,294 L378,367 Z" fill="#1a5c30"/>
    <!-- foul lines -->
    <line x1="300" y1="450" x2="0"   y2="150" stroke="white" stroke-width="2" opacity="0.6"/>
    <line x1="300" y1="450" x2="600" y2="150" stroke="white" stroke-width="2" opacity="0.6"/>
    <!-- foul poles -->
    <line x1="0"   y1="150" x2="0"   y2="120" stroke="#f0883e" stroke-width="4"/>
    <line x1="600" y1="150" x2="600" y2="120" stroke="#f0883e" stroke-width="4"/>
    <!-- base bags -->
    <rect x="288" y="272" width="24" height="24" fill="white" rx="3" transform="rotate(45,300,284)"/>
    <rect x="205" y="355" width="24" height="24" fill="white" rx="3" transform="rotate(45,217,367)"/>
    <rect x="371" y="355" width="24" height="24" fill="white" rx="3" transform="rotate(45,383,367)"/>
    <!-- home plate -->
    <polygon points="300,466 288,454 288,440 312,440 312,454" fill="white"/>
    <!-- pitcher's mound -->
    <circle cx="300" cy="366" r="14" fill="#8B6914" stroke="white" stroke-width="1.2"/>
    <!-- position markers -->
    ${posMarker(300, 366, 'pitcher', '1', 'P')}
    ${posMarker(300, 455, 'catcher', '2', 'C')}
    ${posMarker(383, 360, 'first',   '3', '1B')}
    ${posMarker(355, 310, 'second',  '4', '2B')}
    ${posMarker(217, 360, 'third',   '5', '3B')}
    ${posMarker(245, 310, 'short',   '6', 'SS')}
    ${posMarker(120, 215, 'left',    '7', 'LF')}
    ${posMarker(300, 168, 'center',  '8', 'CF')}
    ${posMarker(480, 215, 'right',   '9', 'RF')}
  </svg>`;
}

function posMarker(x, y, key, num, label) {
  return `
  <g class="pos-marker" onclick="showPosition('${key}')" style="cursor:pointer">
    <circle cx="${x}" cy="${y}" r="16" fill="#238636" stroke="#7ee787" stroke-width="1.5" opacity="0.9"/>
    <text x="${x}" y="${y+5}" text-anchor="middle" fill="white" font-size="10" font-family="Oswald,sans-serif" font-weight="600">${label}</text>
  </g>`;
}

function buildForceOutSVG() {
  return `
  <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px;display:block">
    <rect width="220" height="200" fill="#0d1117" rx="8"/>
    <path d="M110,185 L18,85 A105,105 0 0,1 202,85 Z" fill="#1a5c30" opacity="0.6"/>
    <path d="M110,185 L48,120 L110,55 L172,120 Z" fill="#8B6914" opacity="0.4"/>
    <line x1="110" y1="185" x2="18" y2="85" stroke="white" stroke-width="1" opacity="0.4"/>
    <line x1="110" y1="185" x2="202" y2="85" stroke="white" stroke-width="1" opacity="0.4"/>
    <polyline points="110,185 172,120 110,55 48,120 110,185" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
    <rect x="100" y="46" width="20" height="20" fill="white" rx="2" transform="rotate(45,110,56)"/>
    <rect x="162" y="112" width="18" height="18" fill="#7ee787" rx="2" transform="rotate(45,171,121)"/>
    <rect x="38" y="112" width="18" height="18" fill="white" rx="2" transform="rotate(45,47,121)"/>
    <polygon points="110,192 103,185 103,178 117,178 117,185" fill="white"/>
    <circle cx="172" cy="120" r="9" fill="#f0883e" stroke="#fff" stroke-width="1.5"/>
    <text x="172" y="124" text-anchor="middle" fill="white" font-size="9" font-family="Oswald,sans-serif">R</text>
    <circle cx="110" cy="185" r="7" fill="#388bfd" stroke="#fff" stroke-width="1"/>
    <text x="110" y="189" text-anchor="middle" fill="white" font-size="8" font-family="Oswald,sans-serif">B</text>
    <path d="M117,180 Q145,160 162,128" stroke="#388bfd" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
    <path d="M110,185 Q72,150 78,118" stroke="#f0883e" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
    <path d="M78,118 Q82,70 110,56" stroke="#f0883e" stroke-width="2" fill="none" marker-end="url(#arr-orange)"/>
    <circle cx="78" cy="118" r="8" fill="#6e7681" stroke="#fff" stroke-width="1"/>
    <text x="78" y="122" text-anchor="middle" fill="white" font-size="8" font-family="Oswald,sans-serif">SS</text>
    <circle cx="110" cy="56" r="14" fill="none" stroke="#7ee787" stroke-width="2.5" stroke-dasharray="4,2"/>
    <text x="110" y="26" text-anchor="middle" fill="#7ee787" font-size="9" font-family="Oswald,sans-serif" font-weight="600">FORCE OUT</text>
    <text x="110" y="37" text-anchor="middle" fill="#7ee787" font-size="8" font-family="Oswald,sans-serif">just step on 2nd</text>
    <defs>
      <marker id="arr-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#f0883e"/>
      </marker>
      <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#388bfd"/>
      </marker>
    </defs>
  </svg>`;
}

function buildTagOutSVG() {
  return `
  <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px;display:block">
    <defs>
      <marker id="arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#ff6b7a"/>
      </marker>
      <marker id="arr-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#f0883e"/>
      </marker>
    </defs>
    <rect width="220" height="200" fill="#0d1117" rx="8"/>
    <path d="M110,185 L18,85 A105,105 0 0,1 202,85 Z" fill="#1a5c30" opacity="0.6"/>
    <path d="M110,185 L48,120 L110,55 L172,120 Z" fill="#8B6914" opacity="0.4"/>
    <line x1="110" y1="185" x2="18" y2="85" stroke="white" stroke-width="1" opacity="0.4"/>
    <line x1="110" y1="185" x2="202" y2="85" stroke="white" stroke-width="1" opacity="0.4"/>
    <polyline points="110,185 172,120 110,55 48,120 110,185" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
    <rect x="100" y="46" width="20" height="20" fill="white" rx="2" transform="rotate(45,110,56)"/>
    <rect x="162" y="112" width="18" height="18" fill="white" rx="2" transform="rotate(45,171,121)"/>
    <rect x="38" y="112" width="18" height="18" fill="#f0883e" rx="2" transform="rotate(45,47,121)"/>
    <polygon points="110,192 103,185 103,178 117,178 117,185" fill="white"/>
    <circle cx="110" cy="56" r="9" fill="#ff6b7a" stroke="#fff" stroke-width="1.5"/>
    <text x="110" y="60" text-anchor="middle" fill="white" font-size="9" font-family="Oswald,sans-serif">R</text>
    <path d="M110,56 Q75,85 60,108" stroke="#ff6b7a" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arr-red)"/>
    <circle cx="72" cy="90" r="7" fill="#ff6b7a" opacity="0.35" stroke="#ff6b7a" stroke-width="1"/>
    <circle cx="110" cy="185" r="7" fill="#6e7681" stroke="#fff" stroke-width="1"/>
    <text x="110" y="189" text-anchor="middle" fill="white" font-size="7" font-family="Oswald,sans-serif">C</text>
    <path d="M106,179 Q75,155 52,126" stroke="#f0883e" stroke-width="2" fill="none" marker-end="url(#arr-amber)"/>
    <circle cx="47" cy="121" r="8" fill="#6e7681" stroke="#fff" stroke-width="1"/>
    <text x="47" y="125" text-anchor="middle" fill="white" font-size="7" font-family="Oswald,sans-serif">3B</text>
    <circle cx="47" cy="121" r="15" fill="none" stroke="#f0883e" stroke-width="2.5" stroke-dasharray="4,2"/>
    <text x="172" y="124" text-anchor="middle" fill="#6e7681" font-size="10">—</text>
    <text x="110" y="18" text-anchor="middle" fill="#f0883e" font-size="9" font-family="Oswald,sans-serif" font-weight="600">TAG REQUIRED</text>
    <text x="110" y="29" text-anchor="middle" fill="#f0883e" font-size="8" font-family="Oswald,sans-serif">runner not forced to move</text>
  </svg>`;
}

function buildScoreboardSVG() {
  return `
  <div style="overflow-x:auto;margin-top:24px">
  <svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;min-width:420px">
    <rect width="620" height="180" fill="#111827" rx="10"/>
    <rect x="2" y="2" width="616" height="176" fill="#0f172a" rx="9"/>
    <rect x="2" y="2" width="616" height="32" fill="#1e293b" rx="9"/>
    <rect x="2" y="20" width="616" height="14" fill="#1e293b"/>
    <rect x="2" y="34" width="100" height="72" fill="#1a2236"/>
    <text x="52" y="23" text-anchor="middle" fill="#64748b" font-size="9" font-family="Oswald,sans-serif" font-weight="600" letter-spacing="1">TEAM</text>
    ${[1,2,3,4,5,6,7,8,9].map((n,i) => `
      <text x="${106 + i*36 + 18}" y="23" text-anchor="middle" fill="#64748b" font-size="9" font-family="Oswald,sans-serif" font-weight="600">${n}</text>
    `).join('')}
    <text x="444" y="23" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="Oswald,sans-serif" font-weight="600">R</text>
    <text x="476" y="23" text-anchor="middle" fill="#64748b" font-size="9" font-family="Oswald,sans-serif" font-weight="600">H</text>
    <text x="508" y="23" text-anchor="middle" fill="#64748b" font-size="9" font-family="Oswald,sans-serif" font-weight="600">E</text>
    <line x1="104" y1="2" x2="104" y2="178" stroke="#1e293b" stroke-width="1.5"/>
    <line x1="428" y1="2" x2="428" y2="178" stroke="#1e293b" stroke-width="1.5"/>
    <line x1="460" y1="2" x2="460" y2="178" stroke="#1e293b" stroke-width="0.5" opacity="0.5"/>
    <line x1="492" y1="2" x2="492" y2="178" stroke="#1e293b" stroke-width="0.5" opacity="0.5"/>
    <line x1="524" y1="34" x2="524" y2="178" stroke="#1e293b" stroke-width="1"/>
    <line x1="2" y1="106" x2="618" y2="106" stroke="#1e293b" stroke-width="1"/>
    <text x="14" y="76" fill="#e2e8f0" font-size="12" font-family="Oswald,sans-serif" font-weight="600">NEW YORK</text>
    <text x="14" y="142" fill="#e2e8f0" font-size="12" font-family="Oswald,sans-serif" font-weight="600">CHICAGO</text>
    <text x="14" y="90" fill="#64748b" font-size="8" font-family="Inter,sans-serif">AWAY</text>
    <text x="14" y="156" fill="#64748b" font-size="8" font-family="Inter,sans-serif">HOME</text>
    ${['0','0','2','0','1','0','0','1',''].map((v,i) => `
      <text x="${106 + i*36 + 18}" y="80" text-anchor="middle"
        fill="${v==='2'||v==='1'?'#f0883e':'#94a3b8'}" font-size="14"
        font-family="Oswald,sans-serif" font-weight="${v==='2'||v==='1'?'700':'400'}">${v}</text>
    `).join('')}
    ${['1','0','0','2','0','0','0','0',''].map((v,i) => `
      <text x="${106 + i*36 + 18}" y="146" text-anchor="middle"
        fill="${v==='2'||v==='1'?'#7ee787':'#94a3b8'}" font-size="14"
        font-family="Oswald,sans-serif" font-weight="${v==='2'||v==='1'?'700':'400'}">${v}</text>
    `).join('')}
    <rect x="${106+8*36}" y="34" width="36" height="72" fill="#388bfd" opacity="0.08"/>
    <rect x="${106+8*36}" y="34" width="36" height="1.5" fill="#388bfd" opacity="0.5"/>
    <text x="444" y="80" text-anchor="middle" fill="#f0883e" font-size="16" font-family="Oswald,sans-serif" font-weight="700">4</text>
    <text x="476" y="80" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="Oswald,sans-serif">8</text>
    <text x="508" y="80" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="Oswald,sans-serif">0</text>
    <text x="444" y="146" text-anchor="middle" fill="#7ee787" font-size="16" font-family="Oswald,sans-serif" font-weight="700">3</text>
    <text x="476" y="146" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="Oswald,sans-serif">6</text>
    <text x="508" y="146" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="Oswald,sans-serif">1</text>
    <rect x="530" y="34" width="88" height="144" fill="#0f172a"/>
    <text x="574" y="52" text-anchor="middle" fill="#64748b" font-size="8" font-family="Oswald,sans-serif" letter-spacing="2">B · S · O</text>
    <text x="546" y="72" text-anchor="middle" fill="#388bfd" font-size="20" font-family="Oswald,sans-serif" font-weight="700">2</text>
    <text x="574" y="72" text-anchor="middle" fill="#f0883e" font-size="20" font-family="Oswald,sans-serif" font-weight="700">1</text>
    <text x="602" y="72" text-anchor="middle" fill="#7ee787" font-size="20" font-family="Oswald,sans-serif" font-weight="700">1</text>
    <text x="574" y="95" text-anchor="middle" fill="#64748b" font-size="8" font-family="Oswald,sans-serif" letter-spacing="1">ON BASE</text>
    <rect x="570" y="100" width="8" height="8" fill="white" rx="1" transform="rotate(45,574,104)"/>
    <rect x="555" y="114" width="8" height="8" fill="#f0883e" rx="1" transform="rotate(45,559,118)"/>
    <rect x="585" y="114" width="8" height="8" fill="#f0883e" rx="1" transform="rotate(45,589,118)"/>
    <rect x="570" y="128" width="8" height="8" fill="white" rx="1" transform="rotate(45,574,132)"/>
    <polyline points="574,100 589,115 574,130 559,115 574,100" fill="none" stroke="#334155" stroke-width="1"/>
    <text x="574" y="160" text-anchor="middle" fill="#64748b" font-size="8" font-family="Oswald,sans-serif">TOP 9th</text>
    <!-- Annotations -->
    <text x="220" y="200" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">← runs per inning →</text>
    <line x1="220" y1="193" x2="220" y2="179" stroke="#64748b" stroke-width="1" marker-end="url(#small-arr)"/>
    <text x="475" y="200" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">Runs · Hits · Errors</text>
    <line x1="475" y1="193" x2="475" y2="179" stroke="#64748b" stroke-width="1" marker-end="url(#small-arr)"/>
    <text x="574" y="200" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">Count + Runners</text>
    <line x1="574" y1="193" x2="574" y2="179" stroke="#64748b" stroke-width="1" marker-end="url(#small-arr)"/>
    <defs>
      <marker id="small-arr" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
        <path d="M0,0 L4,2.5 L0,5 Z" fill="#64748b"/>
      </marker>
    </defs>
  </svg>
  </div>`;
}

function showPosition(key) {
  const pos = FIELD_POSITIONS[key];
  if (!pos) return;
  const el = document.getElementById('posInfo');
  el.innerHTML = `
    <div class="pos-number">POSITION ${pos.number}</div>
    <h3>${pos.emoji} ${pos.name}</h3>
    <p class="mt-8">${pos.role}</p>
    <div class="info-box green mt-8" style="padding:10px 14px">
      <p style="font-size:1.0rem;margin:0"><strong>📊 Did you know?</strong> ${pos.fact}</p>
    </div>
  `;
}

window.showPosition = showPosition;

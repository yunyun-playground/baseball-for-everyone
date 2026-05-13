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
          <div style="color:var(--text-dim);font-size:0.9rem">👆 Click a position on the field above</div>
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

      <div class="section-label">Ways to Get Out</div>
      <h2>The 5 Ways to Record an Out</h2>
      <p class="mt-8">Baseball has exactly three outs per half-inning. Here are the five distinct ways an out can be recorded — each with its own rule.</p>

      <div class="out-grid mt-16">
        <div class="out-card">
          <div style="max-width:180px;margin:0 auto 6px">${buildOutSVG_strikeout()}</div>
          <h3 style="color:#388bfd;font-size:0.95rem">1. Strikeout</h3>
          <p style="font-size:0.82rem">Three strikes — you're out. A strike is any pitch the batter swings at and misses, or any pitch in the zone that the batter doesn't swing at.</p>
        </div>
        <div class="out-card">
          <div style="max-width:180px;margin:0 auto 6px">${buildOutSVG_flyout()}</div>
          <h3 style="color:#7ee787;font-size:0.95rem">2. Fly Out</h3>
          <p style="font-size:0.82rem">The batter hits the ball into the air and a fielder catches it before it touches the ground. Distance doesn't matter — if caught in the air, the batter is out.</p>
        </div>
        <div class="out-card">
          <div style="max-width:180px;margin:0 auto 6px">${buildOutSVG_groundout()}</div>
          <h3 style="color:#f0883e;font-size:0.95rem">3. Ground Out at First</h3>
          <p style="font-size:0.82rem">The batter hits a ground ball. A fielder picks it up and throws to first base before the batter arrives. 1st base is always a force situation.</p>
        </div>
        <div class="out-card">
          <div style="max-width:180px;margin:0 auto 6px">${buildOutSVG_forceout()}</div>
          <h3 style="color:#e3b341;font-size:0.95rem">4. Force Out</h3>
          <p style="font-size:0.82rem">A runner forced to advance because the batter needs their base. The fielder just steps on the next base — no tag required.</p>
        </div>
        <div class="out-card">
          <div style="max-width:180px;margin:0 auto 6px">${buildOutSVG_tagout()}</div>
          <h3 style="color:#ff6b7a;font-size:0.95rem">5. Tag Out</h3>
          <p style="font-size:0.82rem">A fielder touches the runner with the ball while they're not safely on a base. Used when a runner isn't forced — like when stealing or caught between bases.</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">A Critical Rule</div>
      <h2>Force Out vs. Tag Out — What's the Difference?</h2>
      <p class="mt-8">This confuses almost every new fan. The rule is simple once you see it in action.</p>

      <div class="info-box orange mt-16">
        <p><strong>The core rule:</strong> If a runner is <em>forced</em> to advance (someone else needs their base), the fielder only has to hold the ball and <strong>touch the base</strong>. If the runner chose to advance on their own, the fielder must physically <strong>tag the runner</strong> with the ball.</p>
      </div>

      <div class="two-col mt-24">
        <div>
          <div class="section-label" style="color:var(--green-light)">Force Out</div>
          <h3 style="margin-bottom:12px">Step on the base is enough</h3>
          ${buildForceOutSVG()}
          <div class="info-box green mt-12" style="padding:12px 14px">
            <p style="font-size:0.85rem">Runner on 1st is <strong>forced to run</strong> because the batter is heading to 1st. So the shortstop throws to 2nd base — the fielder just steps on the bag. No tag needed.</p>
            <p style="font-size:0.85rem;margin-top:8px">1st base is <em>always</em> a force out. 2nd base is a force out if there's a runner on 1st. And so on.</p>
          </div>
        </div>
        <div>
          <div class="section-label" style="color:#f0883e">Tag Out</div>
          <h3 style="margin-bottom:12px">Must touch the runner with the ball</h3>
          ${buildTagOutSVG()}
          <div class="info-box orange mt-12" style="padding:12px 14px">
            <p style="font-size:0.85rem">Runner on 2nd, nobody on 1st. This runner <strong>chose to steal 3rd</strong> — they weren't forced. So the catcher throws to 3rd, but the fielder must <em>tag</em> the runner with the ball or glove to record the out.</p>
            <p style="font-size:0.85rem;margin-top:8px">Steals, rundowns, and runners stranded between bases all require a tag.</p>
          </div>
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

      <div class="section-label">The Language of Baseball</div>
      <h2>Key Terms — Organized by When They Matter</h2>
      <p class="mt-8">Baseball has built up 150 years of vocabulary. These are the terms you'll actually need — organized by the moment in the game they describe.</p>

      <div class="section-label mt-28" style="font-size:0.7rem;color:var(--orange)">WHAT HAPPENS IN A PLATE APPEARANCE</div>
      <p class="glossary-section-intro mt-8">When a batter steps to the plate, one of these outcomes gets recorded in the box score. Understanding these tells you what's happening at any moment of the game.</p>
      <div class="two-col mt-8">
        ${glossaryCard('Home Run (HR)', 'Ball clears the outfield fence in fair territory. The batter — and everyone currently on base — automatically scores. A "Grand Slam" is a HR with the bases loaded: 4 runs on one swing.', buildHRIcon())}
        ${glossaryCard('Walk (BB — Base on Balls)', 'The pitcher throws 4 balls (outside the zone). The batter gets a free pass to 1st base. From a pitcher\'s side, walks are often called the worst outcome — giving something for free.', buildBBIcon())}
        ${glossaryCard('Double Play (DP)', 'Two outs recorded on one play. Classic version: ground ball to short → throw to 2nd (force out) → throw to 1st (force out). Two outs, one pitch. Every pitcher\'s best friend.', buildDPIcon())}
        ${glossaryCard('Sacrifice Fly (SF)', 'Batter hits a fly ball that\'s caught. But a runner on 3rd "tags up" (touches the base) after the catch and races home to score. The batter is out, but the run counts — and the batter isn\'t penalized statistically.', buildSFIcon())}
        ${glossaryCard('Bunt', 'The batter deliberately lets the ball hit the bat lightly, rolling it slowly near home plate. Usually a sacrifice move to advance a runner at the cost of an out. Rare in modern MLB — analytics show it\'s often a bad trade.', buildBuntIcon())}
        ${glossaryCard('Hit by Pitch (HBP)', 'Pitcher hits the batter with the ball. The batter automatically walks to 1st base. If it happens intentionally (retaliation), both managers get warned. Batters who crowd the plate get hit more often.', buildBBIcon())}
      </div>

      <div class="section-label mt-28" style="font-size:0.7rem;color:var(--green-light)">BATTER STATISTICS — HOW HITTERS ARE MEASURED</div>
      <p class="glossary-section-intro mt-8" style="border-left-color:var(--green)">After hundreds of plate appearances, these numbers summarize how effective a batter is. One single game tells you nothing — the stats only become meaningful over a season.</p>
      <div class="two-col mt-8">
        ${glossaryCard('Batting Average (BA)', 'Hits ÷ At-Bats. A batter who gets 3 hits out of 10 at-bats is batting .300 — very good. Under .230 is weak. Ted Williams hit .406 in 1941. Nobody has come close since.', buildBAIcon())}
        ${glossaryCard('On-Base Percentage (OBP)', 'How often a batter reaches base — counting hits, walks, and hit-by-pitches. Modern analysts consider OBP more important than batting average, because reaching base any way is valuable. .380+ is excellent.', buildOBPIcon())}
        ${glossaryCard('Slugging Percentage (SLG)', 'Power measurement: total bases earned ÷ at-bats. Singles = 1, Doubles = 2, Triples = 3, Home Runs = 4. A .500 SLG means you average half a base per at-bat. Power hitters often lead this category.', buildSLGIcon())}
        ${glossaryCard('RBI (Runs Batted In)', 'When a batter gets a hit and a teammate scores as a result, that\'s an RBI (pronounced "ribby"). 100 RBIs in a season is a benchmark for top hitters. It\'s a counting stat — opportunities matter as much as skill.', buildRBIIcon())}
      </div>

      <div class="section-label mt-28" style="font-size:0.7rem;color:#388bfd">PITCHER TERMS — THE BULLPEN SYSTEM</div>
      <p class="glossary-section-intro mt-8" style="border-left-color:#388bfd">Starting pitchers don't finish games anymore. Understanding the bullpen system explains why managers are constantly making pitching changes.</p>
      <div class="two-col mt-8">
        ${glossaryCard('ERA (Earned Run Average)', 'How many runs a pitcher allows per 9 innings pitched. Under 3.00 is excellent. Around 4.00 is average. Think of it like a golfer\'s score — lower wins. ERA doesn\'t count runs scored due to fielding errors.', buildERAIcon())}
        ${glossaryCard('Pitch Count', 'How many pitches a starting pitcher has thrown. Around 100 pitches, a starter\'s velocity and sharpness typically drop. Managers usually pull starters before they reach their limit. "Pitch count limits" protect pitchers from injury.', buildStatIcon('~100 pitches', 'typical starter limit', '#388bfd'))}
        ${glossaryCard('Bullpen', 'The area beyond the outfield fence where relief pitchers warm up before entering the game. Also refers to the collection of relief pitchers on a team\'s roster. "Going to the bullpen" means pulling the starter.', buildStatIcon('SP → RP → CL', 'starter → reliever → closer', '#94a3b8'))}
        ${glossaryCard('Closer', 'The highest-leverage reliever — the specialist who enters in the 9th inning to preserve a lead. A "save" is recorded when the closer holds a lead of 3 runs or less. Most teams have one dominant closer they protect carefully.', buildCloserIcon())}
        ${glossaryCard('Wild Pitch', 'A pitch so far from the target that the catcher can\'t stop it, allowing baserunners to advance. Different from a "passed ball" (catcher\'s error). Either way, it\'s embarrassing and can change a game — an unexpected bonus for the offense.', buildWPIcon())}
        ${glossaryCard('Walk (BB) — Pitcher\'s Perspective', '4 balls means the pitcher loses the duel. Pitchers with high "BB/9" (walks per 9 innings) have control problems. Elite pitchers can throw 7 innings and walk only 1–2 batters. Control is as important as velocity.', buildBBIcon())}
      </div>

      <div class="section-label mt-28" style="font-size:0.7rem;color:var(--text-muted)">FIELD & GAME SITUATIONS</div>
      <p class="glossary-section-intro mt-8" style="border-left-color:var(--border)">These terms describe things that happen on the basepaths or in specific game situations — situations that create tension, controversy, and the most memorable moments.</p>
      <div class="two-col mt-8">
        ${glossaryCard('Stolen Base (SB)', 'A runner attempts to advance a base while the pitcher is delivering. Requires a good "jump" (reading the pitcher\'s motion), speed, and courage. A catcher\'s throw to 2nd takes ~1.9 seconds. Success rates below 70% actually hurt the team statistically.', buildSBIcon())}
        ${glossaryCard('Designated Hitter (DH)', 'A player who bats in place of the pitcher, but doesn\'t take a defensive position. Used in all of MLB since 2022, and in Taiwan\'s CPBL. Purists argue it ruins the "chess" of managing; analytics people say it creates better offense.', buildDHIcon())}
        ${glossaryCard('Infield Fly Rule', 'An automatic out called when a batter pops up in the infield with runners on base and fewer than 2 outs. Prevents fielders from deliberately dropping the ball to start a double play. The rule exists because without it, the defense could trap runners in an unfair way.', buildStatIcon('POP UP', 'runners on base, < 2 outs', '#e3b341'))}
        ${glossaryCard('Double Switch', 'A two-position substitution where a manager replaces both a pitcher and a position player simultaneously. Used to control which spot in the batting order the new pitcher occupies — avoiding the pitcher batting next inning. Common late-game tactic.', buildStatIcon('P + POS', '2 players, 1 move', '#a371f7'))}
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
}

// ── 5 OUT TYPE SVGs ──

function buildOutSVG_strikeout() {
  return `
  <svg viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:6px;margin-bottom:4px">
    <rect width="180" height="100" fill="#060c18" rx="6"/>
    <!-- Strike zone outline -->
    <rect x="70" y="18" width="44" height="55" fill="rgba(56,139,253,0.07)" stroke="rgba(56,139,253,0.4)" stroke-width="1.5" rx="2"/>
    <!-- 3x3 grid -->
    <line x1="70" y1="36" x2="114" y2="36" stroke="rgba(56,139,253,0.2)" stroke-width="0.5"/>
    <line x1="70" y1="54" x2="114" y2="54" stroke="rgba(56,139,253,0.2)" stroke-width="0.5"/>
    <line x1="85" y1="18" x2="85" y2="73" stroke="rgba(56,139,253,0.2)" stroke-width="0.5"/>
    <line x1="100" y1="18" x2="100" y2="73" stroke="rgba(56,139,253,0.2)" stroke-width="0.5"/>
    <!-- Ball in zone -->
    <circle cx="92" cy="45" r="7" fill="white" stroke="#ddd" stroke-width="0.5"/>
    <path d="M88,45 A6,6 0 0,0 96,45" stroke="#cc2020" stroke-width="0.8" fill="none"/>
    <!-- K mark -->
    <text x="28" y="62" fill="#388bfd" font-size="38" font-family="Oswald,sans-serif" font-weight="700" opacity="0.9">K</text>
    <!-- Strike dots -->
    <circle cx="138" cy="30" r="5" fill="#f0883e"/>
    <circle cx="150" cy="30" r="5" fill="#f0883e"/>
    <circle cx="162" cy="30" r="5" fill="#f0883e"/>
    <text x="150" y="52" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter,sans-serif">3 strikes</text>
    <!-- Home plate -->
    <polygon points="92,83 86,78 86,73 98,73 98,78" fill="white" opacity="0.7"/>
  </svg>`;
}

function buildOutSVG_flyout() {
  return `
  <svg viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:6px;margin-bottom:4px">
    <defs>
      <marker id="fo-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L5,3 L0,6 Z" fill="#7ee787"/>
      </marker>
    </defs>
    <rect width="180" height="100" fill="#060c18" rx="6"/>
    <!-- Ground -->
    <line x1="0" y1="88" x2="180" y2="88" stroke="rgba(100,150,80,0.3)" stroke-width="1.5"/>
    <!-- Ball arc -->
    <path d="M30,82 Q90,12 155,35" stroke="#7ee787" stroke-width="2" fill="none" marker-end="url(#fo-arr)" stroke-linecap="round"/>
    <!-- Ball dot at peak -->
    <circle cx="90" cy="22" r="5" fill="white"/>
    <!-- Fielder glove at end -->
    <circle cx="155" cy="35" r="10" fill="rgba(35,134,54,0.2)" stroke="#7ee787" stroke-width="1.5"/>
    <text x="155" y="39" text-anchor="middle" fill="#7ee787" font-size="9" font-family="Oswald,sans-serif">G</text>
    <!-- Batter at start -->
    <circle cx="30" cy="72" r="8" fill="rgba(56,139,253,0.2)" stroke="#388bfd" stroke-width="1.5"/>
    <text x="30" y="76" text-anchor="middle" fill="#388bfd" font-size="8" font-family="Oswald,sans-serif">B</text>
    <!-- CAUGHT label -->
    <text x="155" y="56" text-anchor="middle" fill="#7ee787" font-size="8" font-family="Oswald,sans-serif" font-weight="600">CAUGHT!</text>
    <text x="90" y="10" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter,sans-serif">any height — if caught, out</text>
  </svg>`;
}

function buildOutSVG_groundout() {
  return `
  <svg viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:6px;margin-bottom:4px">
    <defs>
      <marker id="go-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L5,3 L0,6 Z" fill="#f0883e"/>
      </marker>
      <marker id="go-arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L5,3 L0,6 Z" fill="#ff6b7a"/>
      </marker>
    </defs>
    <rect width="180" height="100" fill="#060c18" rx="6"/>
    <!-- Ground -->
    <line x1="0" y1="85" x2="180" y2="85" stroke="rgba(139,105,20,0.3)" stroke-width="1.5"/>
    <!-- Ball rolling on ground -->
    <circle cx="45" cy="80" r="5" fill="white"/>
    <path d="M45,80 Q80,75 110,55" stroke="#f0883e" stroke-width="2" fill="none" stroke-dasharray="4,3" marker-end="url(#go-arr)"/>
    <!-- Fielder picks up -->
    <circle cx="110" cy="55" r="8" fill="rgba(100,116,139,0.3)" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="110" y="59" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="Oswald,sans-serif">F</text>
    <!-- Throw to 1st -->
    <path d="M118,52 L152,38" stroke="#ff6b7a" stroke-width="2" fill="none" stroke-dasharray="4,3" marker-end="url(#go-arr2)"/>
    <!-- 1st base -->
    <rect x="148" y="30" width="14" height="14" fill="#f0883e" rx="2" transform="rotate(45,155,37)"/>
    <text x="155" y="22" text-anchor="middle" fill="#f0883e" font-size="8" font-family="Oswald,sans-serif">1B</text>
    <!-- Batter running -->
    <circle cx="28" cy="78" r="6" fill="rgba(56,139,253,0.2)" stroke="#388bfd" stroke-width="1.5"/>
    <text x="28" y="82" text-anchor="middle" fill="#388bfd" font-size="7" font-family="Oswald,sans-serif">B</text>
    <line x1="34" y1="75" x2="148" y2="35" stroke="#388bfd" stroke-width="1" stroke-dasharray="3,3" opacity="0.35"/>
    <text x="90" y="10" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter,sans-serif">fielder throws to 1st before batter arrives</text>
  </svg>`;
}

function buildOutSVG_forceout() {
  return `
  <svg viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:6px;margin-bottom:4px">
    <defs>
      <marker id="frc-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L5,3 L0,6 Z" fill="#e3b341"/>
      </marker>
    </defs>
    <rect width="180" height="100" fill="#060c18" rx="6"/>
    <!-- Mini diamond -->
    <polyline points="90,82 140,55 90,28 40,55 90,82" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <!-- Home plate -->
    <polygon points="90,88 85,82 85,78 95,78 95,82" fill="white" opacity="0.6"/>
    <!-- Bases -->
    <rect x="35" y="50" width="10" height="10" fill="white" rx="1" transform="rotate(45,40,55)"/>
    <rect x="86" y="24" width="10" height="10" fill="#e3b341" rx="1" transform="rotate(45,91,29)"/>
    <!-- 2nd base highlight -->
    <circle cx="91" cy="29" r="12" fill="none" stroke="#e3b341" stroke-width="1.5" stroke-dasharray="3,2"/>
    <rect x="136" y="50" width="10" height="10" fill="white" rx="1" transform="rotate(45,141,55)"/>
    <!-- Runner on 1st (orange) -->
    <circle cx="141" cy="55" r="7" fill="#f0883e" stroke="#fff" stroke-width="1"/>
    <text x="141" y="59" text-anchor="middle" fill="white" font-size="7" font-family="Oswald">R</text>
    <!-- Runner moving to 2nd -->
    <path d="M141,48 Q118,36 98,31" stroke="#f0883e" stroke-width="1.5" fill="none" stroke-dasharray="3,2" marker-end="url(#frc-arr)"/>
    <!-- Batter at home (blue) -->
    <circle cx="90" cy="82" r="6" fill="#388bfd" stroke="#fff" stroke-width="1" opacity="0.8"/>
    <text x="90" y="86" text-anchor="middle" fill="white" font-size="7" font-family="Oswald">B</text>
    <!-- Fielder at 2nd stepping on base -->
    <circle cx="91" cy="29" r="7" fill="rgba(100,116,139,0.4)" stroke="#e3b341" stroke-width="1.5"/>
    <text x="91" y="33" text-anchor="middle" fill="#e3b341" font-size="6" font-family="Oswald">F</text>
    <!-- NO TAG label -->
    <text x="28" y="18" fill="#e3b341" font-size="7" font-family="Oswald,sans-serif" font-weight="600">step on base</text>
    <text x="28" y="27" fill="#64748b" font-size="6.5" font-family="Inter,sans-serif">no tag needed</text>
  </svg>`;
}

function buildOutSVG_tagout() {
  return `
  <svg viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:6px;margin-bottom:4px">
    <rect width="180" height="100" fill="#060c18" rx="6"/>
    <!-- Ground line -->
    <line x1="0" y1="85" x2="180" y2="85" stroke="rgba(139,105,20,0.25)" stroke-width="1"/>
    <!-- 1st base (far left) -->
    <rect x="22" y="45" width="10" height="10" fill="rgba(255,255,255,0.3)" rx="1" transform="rotate(45,27,50)"/>
    <text x="27" y="38" text-anchor="middle" fill="#64748b" font-size="7" font-family="Oswald">1B</text>
    <!-- 2nd base (far right) -->
    <rect x="148" y="45" width="10" height="10" fill="rgba(255,255,255,0.3)" rx="1" transform="rotate(45,153,50)"/>
    <text x="153" y="38" text-anchor="middle" fill="#64748b" font-size="Oswald">2B</text>
    <!-- Runner caught in middle -->
    <circle cx="90" cy="62" r="9" fill="#ff6b7a" stroke="#fff" stroke-width="1.5"/>
    <text x="90" y="66" text-anchor="middle" fill="white" font-size="8" font-family="Oswald">R</text>
    <!-- Fielder tagging -->
    <circle cx="118" cy="55" r="8" fill="rgba(100,116,139,0.4)" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="118" y="59" text-anchor="middle" fill="#94a3b8" font-size="7" font-family="Oswald">F</text>
    <!-- Tag gesture -->
    <line x1="110" y1="58" x2="100" y2="63" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Ball -->
    <circle cx="100" cy="63" r="4" fill="white"/>
    <!-- TAG label -->
    <text x="90" y="18" text-anchor="middle" fill="#ff6b7a" font-size="10" font-family="Oswald,sans-serif" font-weight="700">TAG!</text>
    <text x="90" y="30" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="Inter,sans-serif">not forced — must be touched</text>
    <!-- "open field" lines -->
    <line x1="27" y1="55" x2="81" y2="62" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="99" y1="62" x2="153" y2="52" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  </svg>`;
}

// ── GLOSSARY MINI ICONS ──

function buildHRIcon() {
  return `
  <svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <line x1="5" y1="35" x2="65" y2="35" stroke="rgba(100,150,80,0.3)" stroke-width="1"/>
    <!-- Fence -->
    <line x1="50" y1="35" x2="50" y2="20" stroke="#475569" stroke-width="1.5"/>
    <line x1="50" y1="22" x2="65" y2="22" stroke="#475569" stroke-width="1.5"/>
    <!-- Ball arc -->
    <path d="M8,33 Q35,2 62,18" stroke="#e3b341" stroke-width="1.5" fill="none"/>
    <circle cx="62" cy="18" r="3" fill="#e3b341"/>
    <text x="35" y="39" text-anchor="middle" fill="#e3b341" font-size="7" font-family="Oswald">HOME RUN</text>
  </svg>`;
}

function buildBBIcon() {
  return `
  <svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <text x="35" y="15" text-anchor="middle" fill="#388bfd" font-size="11" font-family="Oswald,sans-serif" font-weight="700">B B B B</text>
    <line x1="10" y1="20" x2="60" y2="20" stroke="#238636" stroke-width="1.5"/>
    <circle cx="10" cy="30" r="5" fill="none" stroke="#94a3b8" stroke-width="1"/>
    <circle cx="22" cy="30" r="5" fill="none" stroke="#94a3b8" stroke-width="1"/>
    <circle cx="34" cy="30" r="5" fill="none" stroke="#94a3b8" stroke-width="1"/>
    <circle cx="46" cy="30" r="5" fill="#388bfd" stroke="#388bfd" stroke-width="1"/>
    <text x="35" y="39" text-anchor="middle" fill="#388bfd" font-size="6" font-family="Inter">4 balls = walk</text>
  </svg>`;
}

function buildDPIcon() {
  return `
  <svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <text x="35" y="16" text-anchor="middle" fill="#f0883e" font-size="12" font-family="Oswald,sans-serif" font-weight="700">6 – 4 – 3</text>
    <text x="35" y="26" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter">SS → 2B → 1B</text>
    <text x="35" y="37" text-anchor="middle" fill="#ff6b7a" font-size="8" font-family="Oswald">2 OUTS, 1 PITCH</text>
  </svg>`;
}

function buildSFIcon() {
  return `
  <svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <defs>
      <marker id="sf-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
        <path d="M0,0 L4,2.5 L0,5 Z" fill="#7ee787"/>
      </marker>
    </defs>
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <!-- Ball arc -->
    <path d="M10,30 Q35,5 55,15" stroke="#f0883e" stroke-width="1.5" fill="none"/>
    <circle cx="55" cy="15" r="4" fill="rgba(100,116,139,0.5)" stroke="#94a3b8" stroke-width="1"/>
    <!-- Runner scoring from 3rd -->
    <circle cx="12" cy="30" r="4" fill="#7ee787"/>
    <path d="M12,26 L12,8" stroke="#7ee787" stroke-width="1.5" marker-end="url(#sf-arr)"/>
    <circle cx="12" cy="7" r="4" fill="rgba(35,134,54,0.3)" stroke="#7ee787" stroke-width="1"/>
    <text x="35" y="38" text-anchor="middle" fill="#7ee787" font-size="7" font-family="Oswald">runner scores, batter out</text>
  </svg>`;
}

function buildBAIcon() {
  return `
  <svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <text x="35" y="17" text-anchor="middle" fill="#7ee787" font-size="14" font-family="Oswald,sans-serif" font-weight="700">.300</text>
    <text x="35" y="27" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="Inter">3 hits per 10 at-bats</text>
    <text x="35" y="37" text-anchor="middle" fill="#238636" font-size="7" font-family="Inter">H ÷ AB</text>
  </svg>`;
}

function buildStatIcon(formula, example, color) {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <text x="35" y="16" text-anchor="middle" fill="${color}" font-size="9.5" font-family="Oswald,sans-serif" font-weight="700">${formula}</text>
    <line x1="10" y1="20" x2="60" y2="20" stroke="${color}" stroke-width="0.5" opacity="0.4"/>
    <text x="35" y="32" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="Inter,sans-serif">${example}</text>
  </svg>`;
}

function buildBuntIcon() {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <line x1="10" y1="28" x2="55" y2="18" stroke="#e6edf3" stroke-width="3" stroke-linecap="round"/>
    <circle cx="10" cy="30" r="4" fill="white"/>
    <path d="M10,26 L28,12" stroke="#f0883e" stroke-width="1.5" fill="none" stroke-dasharray="2,2"/>
    <circle cx="28" cy="10" r="3" fill="#f0883e" opacity="0.7"/>
    <text x="55" y="38" text-anchor="middle" fill="#94a3b8" font-size="6.5" font-family="Inter">tap, not swing</text>
  </svg>`;
}

function buildSBIcon() {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <rect x="8" y="20" width="10" height="10" fill="white" rx="1" transform="rotate(45,13,25)"/>
    <rect x="52" y="20" width="10" height="10" fill="#7ee787" rx="1" transform="rotate(45,57,25)"/>
    <circle cx="20" cy="22" r="5" fill="#f0883e" stroke="white" stroke-width="1"/>
    <path d="M25,22 L50,22" stroke="#f0883e" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
    <text x="35" y="8" text-anchor="middle" fill="#f0883e" font-size="7" font-family="Oswald">1B → 2B</text>
    <text x="35" y="38" text-anchor="middle" fill="#7ee787" font-size="6.5" font-family="Inter">stolen!</text>
  </svg>`;
}

function buildERAIcon() {
  return buildStatIcon('ER × 9 ÷ IP', 'e.g. 27 ÷ 9 = 3.00 ERA', '#a371f7');
}

function buildOBPIcon() {
  return buildStatIcon('(H + BB + HBP) ÷ PA', '.380+ = excellent', '#7ee787');
}

function buildSLGIcon() {
  return buildStatIcon('Total Bases ÷ AB', 'HR=4, 3B=3, 2B=2, 1H=1', '#f0883e');
}

function buildRBIIcon() {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <circle cx="18" cy="20" r="6" fill="#388bfd" stroke="white" stroke-width="1"/>
    <text x="18" y="24" text-anchor="middle" fill="white" font-size="7" font-family="Oswald">R</text>
    <path d="M18,14 L18,6" stroke="#7ee787" stroke-width="1.5" fill="none"/>
    <circle cx="18" cy="5" r="3" fill="#7ee787" opacity="0.5"/>
    <text x="45" y="16" text-anchor="middle" fill="#7ee787" font-size="11" font-family="Oswald,sans-serif" font-weight="700">RBI</text>
    <text x="45" y="30" text-anchor="middle" fill="#64748b" font-size="6.5" font-family="Inter">runner scores</text>
  </svg>`;
}

function buildCloserIcon() {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <text x="35" y="15" text-anchor="middle" fill="#e3b341" font-size="11" font-family="Oswald,sans-serif" font-weight="700">SAVE</text>
    <text x="35" y="25" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter">lead ≤ 3 runs</text>
    <text x="35" y="36" text-anchor="middle" fill="#475569" font-size="7" font-family="Inter">9th inning closer</text>
  </svg>`;
}

function buildWPIcon() {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <path d="M15,18 Q28,8 30,22 Q32,32 50,30" stroke="#ff6b7a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="50" cy="30" r="4" fill="white"/>
    <text x="35" y="10" text-anchor="middle" fill="#ff6b7a" font-size="8" font-family="Oswald">WILD PITCH</text>
  </svg>`;
}

function buildDHIcon() {
  return `<svg viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:6px">
    <rect width="70" height="40" fill="#060c18" rx="4"/>
    <circle cx="22" cy="18" r="7" fill="rgba(56,139,253,0.2)" stroke="#388bfd" stroke-width="1.5"/>
    <text x="22" y="22" text-anchor="middle" fill="#388bfd" font-size="7" font-family="Oswald">DH</text>
    <text x="22" y="35" text-anchor="middle" fill="#64748b" font-size="6" font-family="Inter">bats only</text>
    <line x1="34" y1="15" x2="38" y2="15" stroke="#475569" stroke-width="1"/>
    <circle cx="46" cy="18" r="7" fill="rgba(100,116,139,0.2)" stroke="#475569" stroke-width="1.5" stroke-dasharray="2,2"/>
    <text x="46" y="22" text-anchor="middle" fill="#475569" font-size="7" font-family="Oswald">P</text>
    <text x="46" y="35" text-anchor="middle" fill="#475569" font-size="6" font-family="Inter">no bat</text>
  </svg>`;
}

// ── EXISTING FIELD SVG + FORCE/TAG SVGs ──

function buildFieldSVG() {
  return `
  <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
    <path d="M200,340 L20,80 A220,220 0 0,1 380,80 Z" fill="#1a5c30"/>
    <path d="M200,340 L90,230 L200,120 L310,230 Z" fill="#8B6914" opacity="0.7"/>
    <path d="M200,330 L95,228 L200,126 L305,228 Z" fill="#1a5c30"/>
    <line x1="200" y1="340" x2="20" y2="80" stroke="white" stroke-width="1.5" opacity="0.6"/>
    <line x1="200" y1="340" x2="380" y2="80" stroke="white" stroke-width="1.5" opacity="0.6"/>
    <rect x="187" y="113" width="26" height="26" fill="white" rx="3" transform="rotate(45,200,126)"/>
    <rect x="82" y="217" width="26" height="26" fill="white" rx="3" transform="rotate(45,95,230)"/>
    <rect x="292" y="217" width="26" height="26" fill="white" rx="3" transform="rotate(45,305,230)"/>
    <polygon points="200,356 188,344 188,332 212,332 212,344" fill="white"/>
    <circle cx="200" cy="228" r="12" fill="#8B6914" stroke="white" stroke-width="1"/>
    <line x1="20" y1="80" x2="20" y2="60" stroke="#f0883e" stroke-width="3"/>
    <line x1="380" y1="80" x2="380" y2="60" stroke="#f0883e" stroke-width="3"/>
    ${posMarker(200, 228, 'pitcher', '1', 'P')}
    ${posMarker(200, 348, 'catcher', '2', 'C')}
    ${posMarker(305, 225, 'first',   '3', '1B')}
    ${posMarker(245, 172, 'second',  '4', '2B')}
    ${posMarker( 95, 225, 'third',   '5', '3B')}
    ${posMarker(155, 172, 'short',   '6', 'SS')}
    ${posMarker(100, 140, 'left',   '7', 'LF')}
    ${posMarker(200, 100, 'center', '8', 'CF')}
    ${posMarker(300, 140, 'right',  '9', 'RF')}
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

function glossaryCard(term, def, iconSVG) {
  return `
  <div class="info-box" style="padding:14px 16px">
    ${iconSVG || ''}
    <h3 style="font-size:0.92rem;margin-bottom:6px">${term}</h3>
    <p style="font-size:0.84rem;color:#b1bac4;line-height:1.55">${def}</p>
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
      <p style="font-size:0.82rem;margin:0"><strong>📊 Did you know?</strong> ${pos.fact}</p>
    </div>
  `;
}

window.showPosition = showPosition;

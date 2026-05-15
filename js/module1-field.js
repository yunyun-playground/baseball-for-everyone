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

      <div class="section-label">Key Concept</div>
      <h2>The Strike Zone</h2>
      <p class="mt-8">The umpire judges every pitch against an invisible rectangle called the <strong>strike zone</strong>. It's the engine that drives every at-bat.</p>

      <div class="two-col mt-24" style="align-items:center">
        <div style="display:flex;justify-content:center">
          ${buildStrikeZoneSVG()}
        </div>
        <div>
          <div class="info-box green" style="margin-bottom:12px">
            <h3>✅ Strike</h3>
            <p class="mt-8">Any pitch that passes through the zone (roughly <strong>knees to letters</strong>, over home plate's 17-inch width). Also counts if the batter <em>swings and misses</em>, or fouls it off.</p>
            <p class="mt-8"><strong>3 strikes = out.</strong></p>
          </div>
          <div class="info-box orange" style="margin-bottom:12px">
            <h3>❌ Ball</h3>
            <p class="mt-8">Any pitch outside the zone that the batter doesn't swing at.</p>
            <p class="mt-8"><strong>4 balls = walk</strong> — batter goes to 1st base free.</p>
          </div>
          <p style="font-size:0.93rem;color:var(--text-dim)">See pitch types in depth in <button onclick="showScreen('batting');initModule('batting')" style="background:none;border:none;color:#7aa2d4;cursor:pointer;font-size:inherit;padding:0;text-decoration:underline;font-family:inherit">Module 3: The Art of Batting →</button></p>
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

      <div class="section-label">At-Bat Outcomes</div>
      <h2>What Can Happen When a Batter Steps Up</h2>
      <p class="mt-8">When a batter comes to the plate, the play ends with one of these outcomes — learn them once and you can follow any game.</p>

      <div class="three-col mt-24">
        <div class="info-box" style="border-color:rgba(255,107,122,0.3);background:rgba(255,107,122,0.05)">
          <h3 style="color:#ff6b7a">⭕ Outs</h3>
          <p class="mt-8" style="font-size:0.93rem;color:var(--text-dim)">Batter fails to reach base. Three outs end the half-inning.</p>
          <div class="mt-12" style="display:flex;flex-direction:column;gap:7px">
            <div style="padding:7px 10px;background:rgba(255,107,122,0.07);border-radius:6px;border-left:3px solid rgba(255,107,122,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#ff6b7a;font-family:Oswald,sans-serif">Strikeout (K)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">3 strikes — swinging or called</div>
            </div>
            <div style="padding:7px 10px;background:rgba(255,107,122,0.07);border-radius:6px;border-left:3px solid rgba(255,107,122,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#ff6b7a;font-family:Oswald,sans-serif">Ground Out</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Ball hit on the ground, thrown to 1st</div>
            </div>
            <div style="padding:7px 10px;background:rgba(255,107,122,0.07);border-radius:6px;border-left:3px solid rgba(255,107,122,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#ff6b7a;font-family:Oswald,sans-serif">Fly Out</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Ball caught in the air by outfielder</div>
            </div>
            <div style="padding:7px 10px;background:rgba(255,107,122,0.07);border-radius:6px;border-left:3px solid rgba(255,107,122,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#ff6b7a;font-family:Oswald,sans-serif">Line Out / Pop-Up</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Hard liner or soft popup caught</div>
            </div>
          </div>
        </div>

        <div class="info-box" style="border-color:rgba(126,231,135,0.3);background:rgba(126,231,135,0.05)">
          <h3 style="color:#7ee787">✅ Hits</h3>
          <p class="mt-8" style="font-size:0.93rem;color:var(--text-dim)">Batter reaches base safely from their own skill. Counts in batting average.</p>
          <div class="mt-12" style="display:flex;flex-direction:column;gap:7px">
            <div style="padding:7px 10px;background:rgba(126,231,135,0.07);border-radius:6px;border-left:3px solid rgba(126,231,135,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#7ee787;font-family:Oswald,sans-serif">Single (1B)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Reaches 1st base safely</div>
            </div>
            <div style="padding:7px 10px;background:rgba(126,231,135,0.07);border-radius:6px;border-left:3px solid rgba(126,231,135,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#7ee787;font-family:Oswald,sans-serif">Double (2B)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Reaches 2nd base (scoring position)</div>
            </div>
            <div style="padding:7px 10px;background:rgba(126,231,135,0.07);border-radius:6px;border-left:3px solid rgba(126,231,135,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#7ee787;font-family:Oswald,sans-serif">Triple (3B)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Reaches 3rd — very rare, requires speed</div>
            </div>
            <div style="padding:7px 10px;background:rgba(126,231,135,0.07);border-radius:6px;border-left:3px solid rgba(126,231,135,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#7ee787;font-family:Oswald,sans-serif">Home Run (HR)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Ball clears the fence — everyone scores!</div>
            </div>
          </div>
        </div>

        <div class="info-box" style="border-color:rgba(56,139,253,0.3);background:rgba(56,139,253,0.05)">
          <h3 style="color:#388bfd">🔵 On Base (No Hit)</h3>
          <p class="mt-8" style="font-size:0.93rem;color:var(--text-dim)">Batter reaches base, but it doesn't count as a hit in the stats.</p>
          <div class="mt-12" style="display:flex;flex-direction:column;gap:7px">
            <div style="padding:7px 10px;background:rgba(56,139,253,0.07);border-radius:6px;border-left:3px solid rgba(56,139,253,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#388bfd;font-family:Oswald,sans-serif">Walk (BB)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">4 balls — free pass to 1st base</div>
            </div>
            <div style="padding:7px 10px;background:rgba(56,139,253,0.07);border-radius:6px;border-left:3px solid rgba(56,139,253,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#388bfd;font-family:Oswald,sans-serif">Hit By Pitch (HBP)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Pitcher hits batter → automatic 1st base</div>
            </div>
            <div style="padding:7px 10px;background:rgba(56,139,253,0.07);border-radius:6px;border-left:3px solid rgba(56,139,253,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#388bfd;font-family:Oswald,sans-serif">Fielder's Choice</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Fielder retires another runner; batter safe</div>
            </div>
            <div style="padding:7px 10px;background:rgba(56,139,253,0.07);border-radius:6px;border-left:3px solid rgba(56,139,253,0.4)">
              <div style="font-weight:600;font-size:0.92rem;color:#388bfd;font-family:Oswald,sans-serif">Error (E)</div>
              <div style="font-size:0.85rem;color:var(--text-dim);margin-top:2px">Fielding mistake — batter reaches safely</div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section-label">The Batting Order</div>
      <h2>How the Lineup Works</h2>
      <p class="mt-8">When the game starts, each attacking player takes a turn coming to the plate — at that moment their role is the <strong>batter</strong>. The batter's one job: turn themselves into a <strong>runner</strong> by getting on base.</p>
      <p class="mt-8">Nine players bat in a fixed rotation called the <strong>batting order</strong>. The order carries over between half-innings: if an inning ends on the 3rd batter, the next inning picks up from the 4th. By the late innings, your top hitters may cycle around to bat a second or third time.</p>
      <p class="mt-8">How a manager arranges the lineup reveals their philosophy. Ask yourself: which slot gets the best hitter?</p>

      <div style="overflow-x:auto;margin-top:20px">
        <table style="width:100%;max-width:600px;border-collapse:collapse;font-size:0.93rem">
          <thead>
            <tr>
              <th style="padding:10px 16px;text-align:center;background:var(--surface2);border-bottom:2px solid var(--border);color:#f0883e;font-family:Oswald,sans-serif;font-size:0.8rem;letter-spacing:1.5px">CLASSIC ORDER</th>
              <th style="padding:10px 16px;text-align:center;background:var(--surface2);border-bottom:2px solid var(--border);color:var(--text-muted);font-family:Oswald,sans-serif;font-size:0.8rem;letter-spacing:1.5px;width:64px">SLOT</th>
              <th style="padding:10px 16px;text-align:center;background:var(--surface2);border-bottom:2px solid var(--border);color:#388bfd;font-family:Oswald,sans-serif;font-size:0.8rem;letter-spacing:1.5px">MODERN ORDER</th>
            </tr>
          </thead>
          <tbody style="font-family:Inter,sans-serif">
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Fastest runner</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">1st</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Best on-base ability</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);background:var(--surface2)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">2nd fastest runner</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">2nd</td>
              <td style="padding:8px 16px;text-align:center;color:#388bfd;font-weight:600">★ Best hitter</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Good contact hitter</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">3rd</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">2nd best hitter</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);background:var(--surface2)">
              <td style="padding:8px 16px;text-align:center;color:#f0883e;font-weight:600">★ Best hitter (cleanup)</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">4th</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Good on-base ability</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">2nd best hitter</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">5th</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Decent on-base</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);background:var(--surface2)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Contact hitter</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">6th</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Still decent OBP</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Decent hitter</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">7th</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">2nd weakest hitter</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);background:var(--surface2)">
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">2nd weakest hitter</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">8th</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Weakest hitter</td>
            </tr>
            <tr>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Weakest hitter</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-dim);font-family:Oswald,sans-serif;font-weight:700;font-size:1.05rem">9th</td>
              <td style="padding:8px 16px;text-align:center;color:var(--text-muted)">Decent contact</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-12" style="font-size:0.92rem;color:var(--text-dim)">Classic managers put the best hitter 4th — the <em>cleanup hitter</em> who drives in the runners ahead. Modern analytics managers prefer 2nd: batting later means fewer plate appearances per game, so put your best bat where he sees the most action.</p>

      <div class="divider"></div>

      <div class="section-label">Try It Out</div>
      <h2>Baseball Situation Simulator</h2>
      <p class="mt-8">A full 9-inning game — press any play to advance the action. Watch the batting lineup cycle through and track exactly which player is on which base.</p>
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
  // Home(300,470), foul poles (0,170)+(600,170). Exact 90° at home. Arc r=424.
  // Bases: 1B(390,380), 2B(300,290), 3B(210,380). Pitcher(300,384).

  // VERTICAL stripes (alternating, clipped to outfield shape)
  const stripes = [];
  for (let x = 0; x < 600; x += 26) {
    stripes.push(`<rect x="${x}" y="0" width="13" height="480" fill="rgba(0,0,0,0.15)"/>`);
  }

  return `
  <svg viewBox="0 0 600 510" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
    <defs>
      <clipPath id="grassClip">
        <path d="M300,470 L19,189 A398,398 0 0,1 581,189 Z"/>
      </clipPath>
    </defs>

    <!-- Brown warning track (outer sector r=424) -->
    <path d="M300,470 L0,170 A424,424 0 0,1 600,170 Z" fill="#b07438"/>

    <!-- Outfield grass (inner sector r=398, ~26px inset) -->
    <path d="M300,470 L19,189 A398,398 0 0,1 581,189 Z" fill="#2e8b2e"/>

    <!-- Vertical outfield stripes -->
    <g clip-path="url(#grassClip)">
      ${stripes.join('')}
    </g>

    <!-- Infield dirt oval -->
    <ellipse cx="300" cy="380" rx="140" ry="102" fill="#a87040"/>

    <!-- Infield grass diamond (between the 4 bases) -->
    <polygon points="300,290 390,380 300,470 210,380" fill="#2e8b2e" opacity="0.9"/>

    <!-- Base path lines (SS side: 3B→2B and 2B→1B) -->
    <line x1="210" y1="380" x2="300" y2="290" stroke="white" stroke-width="2.2"/>
    <line x1="300" y1="290" x2="390" y2="380" stroke="white" stroke-width="2.2"/>

    <!-- Foul lines (also home→3B and home→1B base paths) -->
    <line x1="300" y1="470" x2="0"   y2="170" stroke="white" stroke-width="2.8"/>
    <line x1="300" y1="470" x2="600" y2="170" stroke="white" stroke-width="2.8"/>

    <!-- Foul line labels (rotated along lines, midpoints ~(150,320) and (450,320)) -->
    <text transform="rotate(-45,148,322)" x="148" y="322" text-anchor="middle"
      fill="rgba(255,255,255,0.78)" font-size="11" font-family="Oswald,sans-serif" font-weight="600" letter-spacing="1">FOUL LINE</text>
    <text transform="rotate(45,452,322)" x="452" y="322" text-anchor="middle"
      fill="rgba(255,255,255,0.78)" font-size="11" font-family="Oswald,sans-serif" font-weight="600" letter-spacing="1">FOUL LINE</text>

    <!-- Foul poles (yellow) -->
    <line x1="0"   y1="170" x2="0"   y2="132" stroke="#f5c518" stroke-width="5"/>
    <line x1="600" y1="170" x2="600" y2="132" stroke="#f5c518" stroke-width="5"/>

    <!-- Pitcher's mound -->
    <circle cx="300" cy="384" r="18" fill="#a87040" stroke="rgba(255,255,255,0.4)" stroke-width="1.8"/>
    <rect x="289" y="381" width="22" height="6" rx="2" fill="#7a5025"/>

    <!-- Base bags -->
    <rect x="289" y="279" width="22" height="22" fill="white" rx="2" transform="rotate(45,300,290)"/>
    <rect x="379" y="369" width="22" height="22" fill="white" rx="2" transform="rotate(45,390,380)"/>
    <rect x="199" y="369" width="22" height="22" fill="white" rx="2" transform="rotate(45,210,380)"/>

    <!-- Home plate (pentagon) -->
    <polygon points="300,484 286,471 286,457 314,457 314,471" fill="white"/>

    <!-- Batter's boxes -->
    <rect x="234" y="453" width="50" height="34" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    <rect x="316" y="453" width="50" height="34" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>

    <!-- BASE LABELS -->
    <text x="300" y="262" text-anchor="middle"
      fill="rgba(255,255,255,0.9)" font-size="11" font-family="Oswald,sans-serif" font-weight="700">2ND BASE</text>
    <text x="428" y="378" text-anchor="start"
      fill="rgba(255,255,255,0.9)" font-size="11" font-family="Oswald,sans-serif" font-weight="700">1ST BASE</text>
    <text x="172" y="378" text-anchor="end"
      fill="rgba(255,255,255,0.9)" font-size="11" font-family="Oswald,sans-serif" font-weight="700">3RD BASE</text>
    <text x="300" y="504" text-anchor="middle"
      fill="rgba(255,255,255,0.9)" font-size="11" font-family="Oswald,sans-serif" font-weight="700">HOME PLATE</text>

    <!-- Position markers (r=22) -->
    ${posMarker(300, 384, 'pitcher', '1', 'P')}
    ${posMarker(300, 463, 'catcher', '2', 'C')}
    ${posMarker(394, 372, 'first',   '3', '1B')}
    ${posMarker(356, 322, 'second',  '4', '2B')}
    ${posMarker(206, 372, 'third',   '5', '3B')}
    ${posMarker(248, 322, 'short',   '6', 'SS')}
    ${posMarker(108, 213, 'left',    '7', 'LF')}
    ${posMarker(300, 158, 'center',  '8', 'CF')}
    ${posMarker(492, 213, 'right',   '9', 'RF')}
  </svg>`;
}

function posMarker(x, y, key, num, label) {
  return `
  <g class="pos-marker" onclick="showPosition('${key}')" style="cursor:pointer">
    <circle cx="${x}" cy="${y}" r="22" fill="#1a7f37" stroke="#7ee787" stroke-width="2.5" opacity="0.95"/>
    <text x="${x}" y="${y+6}" text-anchor="middle" fill="white" font-size="13" font-family="Oswald,sans-serif" font-weight="700">${label}</text>
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

function buildStrikeZoneSVG() {
  return `
  <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:180px;display:block">
    <!-- Batter silhouette -->
    <circle cx="128" cy="46" r="16" fill="#334155"/>
    <rect x="113" y="62" width="30" height="70" rx="5" fill="#334155"/>
    <rect x="113" y="130" width="13" height="52" rx="4" fill="#334155"/>
    <rect x="128" y="130" width="13" height="52" rx="4" fill="#334155"/>
    <!-- Bat -->
    <line x1="113" y1="96" x2="52" y2="108" stroke="#a87040" stroke-width="5" stroke-linecap="round"/>
    <line x1="52" y1="108" x2="34" y2="111" stroke="#d4a462" stroke-width="3" stroke-linecap="round"/>
    <!-- Strike zone rectangle (dashed green) -->
    <rect x="28" y="76" width="58" height="88" fill="rgba(126,231,135,0.12)" stroke="#7ee787" stroke-width="2" stroke-dasharray="5,3" rx="2"/>
    <!-- Top boundary: letters -->
    <line x1="86" y1="76" x2="136" y2="76" stroke="#7ee787" stroke-width="1.2" opacity="0.75"/>
    <text x="139" y="80" text-anchor="start" fill="#7ee787" font-size="10" font-family="Inter,sans-serif">Letters</text>
    <!-- Bottom boundary: knees -->
    <line x1="86" y1="164" x2="136" y2="164" stroke="#f0883e" stroke-width="1.2" opacity="0.75"/>
    <text x="139" y="168" text-anchor="start" fill="#f0883e" font-size="10" font-family="Inter,sans-serif">Knees</text>
    <!-- Strike zone label -->
    <text x="57" y="116" text-anchor="middle" fill="#7ee787" font-size="10" font-family="Oswald,sans-serif" letter-spacing="1" opacity="0.85">STRIKE</text>
    <text x="57" y="129" text-anchor="middle" fill="#7ee787" font-size="10" font-family="Oswald,sans-serif" letter-spacing="1" opacity="0.85">ZONE</text>
    <!-- Home plate -->
    <polygon points="57,228 37,212 37,197 77,197 77,212" fill="rgba(255,255,255,0.88)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="57" y="248" text-anchor="middle" fill="#475569" font-size="9" font-family="Inter,sans-serif">17 inches wide</text>
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

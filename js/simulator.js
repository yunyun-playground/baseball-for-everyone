// ── BASEBALL SITUATION SIMULATOR ──

function createSimState() {
  return {
    inning: 1, halfInning: 'top', outs: 0,
    score: { away: 0, home: 0 },
    runners: { first: false, second: false, third: false },
    eventLog: [], lastPlay: null, gameOver: false, lastWasFlyOut: false
  };
}

let _sim = createSimState();

// ── STATE HELPERS ──

function mkPlay(title, result, explanation, rule, term, moves) {
  return { title, result, explanation, rule, term, moves };
}

function applyRuns(state, runs) {
  if (!runs) return state.score;
  const side = state.halfInning === 'top' ? 'away' : 'home';
  return { ...state.score, [side]: state.score[side] + runs };
}

function advanceOnHit(runners, bases) {
  const r = { first: false, second: false, third: false };
  let runs = 0;
  if (runners.third) { if (bases >= 1) runs++; else r.third = true; }
  if (runners.second) {
    const d = 2 + bases;
    if (d >= 4) runs++; else if (d === 3) r.third = true; else r.second = true;
  }
  if (runners.first) {
    const d = 1 + bases;
    if (d >= 4) runs++; else if (d === 3) r.third = true; else if (d === 2) r.second = true; else r.first = true;
  }
  if (bases >= 4) runs++; else if (bases === 3) r.third = true; else if (bases === 2) r.second = true; else r.first = true;
  return { runners: r, runs };
}

function advanceOnWalk(runners) {
  const r = { first: true, second: runners.second, third: runners.third };
  let runs = 0;
  if (runners.first) {
    r.second = true;
    if (runners.second) {
      r.third = true;
      if (runners.third) runs = 1;
    }
  }
  return { runners: r, runs };
}

function advanceOnGroundOut(runners) {
  const r = { first: false, second: false, third: false };
  if (runners.first) r.second = true;
  if (runners.second && runners.first) r.third = true;
  else if (runners.second) r.second = true;
  if (runners.third) r.third = true;
  return { runners: r, runs: 0 };
}

// ── INDIVIDUAL PLAYS ──

function strikeout(state) {
  return {
    ...state,
    outs: state.outs + 1,
    lastPlay: mkPlay('Strikeout', 'OUT',
      'The batter gets strike three — either swinging and missing, or watching a called strike. The most fundamental out in baseball.',
      'Three strikes and you\'re out. A swinging strike is any swing that misses. A called strike is any pitch inside the strike zone that the batter doesn\'t swing at.',
      'K (strikeout)',
      { runners: state.runners, runs: 0 }
    ),
    lastWasFlyOut: false
  };
}

function flyOut(state) {
  return {
    ...state,
    outs: state.outs + 1,
    lastPlay: mkPlay('Fly Out', 'OUT',
      'The batter hits the ball into the air and a fielder catches it before it touches the ground. Runners must "tag up" (return to their base) before they can advance.',
      'Any ball caught in the air — fair or foul territory — is an out. Runners on base must be touching their original base at the moment of the catch before they can advance.',
      'F (fly ball) — caught in the air',
      { runners: state.runners, runs: 0 }
    ),
    lastWasFlyOut: true
  };
}

function lineOut(state) {
  return {
    ...state,
    outs: state.outs + 1,
    lastPlay: mkPlay('Line Drive Out', 'OUT',
      'The batter rips a hard line drive that\'s caught by a fielder before it bounces. A spectacular out — the ball is hit hard but the fielder is in exactly the right spot.',
      'A caught line drive is the same as any caught fly ball: the batter is out. Runners can tag up after the catch. Sometimes a sharp liner is caught so quickly that runners can\'t react in time — risking a double play.',
      'L (line drive) — caught before touching ground',
      { runners: state.runners, runs: 0 }
    ),
    lastWasFlyOut: true
  };
}

function popOut(state) {
  const hasIFRule = state.outs < 2 &&
    (state.runners.first && state.runners.second) ||
    (state.runners.first && state.runners.second && state.runners.third);
  return {
    ...state,
    outs: state.outs + 1,
    lastPlay: mkPlay('Pop-Up Out', 'OUT',
      'The batter hits a soft popup into the infield. ' + (hasIFRule
        ? 'With runners on first and second and fewer than 2 outs, the umpire calls the Infield Fly Rule — automatic out, runners cannot be doubled up.'
        : 'An easy catch for the infielder. Runners may tag up, but popping out to the infield gives them little chance to advance.'),
      'The Infield Fly Rule exists to prevent fielders from intentionally dropping a popup to start a cheap double play. When runners are on 1st and 2nd (or bases loaded) with fewer than 2 outs, the batter is automatically out the moment the ball is popped up in the infield.',
      'IF (Infield Fly Rule applies in specific situations)',
      { runners: state.runners, runs: 0 }
    ),
    lastWasFlyOut: true
  };
}

function groundOut(state) {
  const result = advanceOnGroundOut(state.runners);
  return {
    ...state,
    outs: state.outs + 1,
    runners: result.runners,
    lastPlay: mkPlay('Ground Out', 'OUT',
      'The batter hits the ball on the ground and is thrown out at first base. Forced runners (those who had to move because the batter needed their base) advance one base.',
      'When the batter is put out at first base, the force play is removed. A runner on third who was "forced" is no longer forced — a play at home now requires a tag, not just stepping on the plate.',
      '1-3 putout (fielder to first base)',
      result
    ),
    lastWasFlyOut: false
  };
}

function walk(state) {
  const result = advanceOnWalk(state.runners);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Walk (BB)', 'ON BASE',
      'The pitcher throws four balls — pitches outside the strike zone. The batter gets a free pass to first base. Only "forced" runners advance: those who can\'t stay put because the batter needs their base.',
      'A walk only forces runners who are part of the force chain. A runner on second base with nobody on first is NOT forced — they can stay put, and almost always do.',
      'BB (base on balls) — 4 balls outside the strike zone',
      result
    ),
    lastWasFlyOut: false
  };
}

function single(state) {
  const result = advanceOnHit(state.runners, 1);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Single', 'HIT',
      'The batter hits the ball and reaches first base safely. Runners advance at least one base — sometimes more if the ball is hit to the outfield gap and the runners get a good jump.',
      'A single is the most common hit in baseball. Runners on second and third typically score on a single (unless the ball is hit softly or the fielders are well-positioned).',
      '1B (single) — one base hit',
      result
    ),
    lastWasFlyOut: false
  };
}

function double_(state) {
  const result = advanceOnHit(state.runners, 2);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Double', 'HIT',
      'The batter hits the ball into the gap and reaches second base. A leadoff double puts a runner in "scoring position" immediately. Most runners score on a double; even a runner on first can score.',
      'A double is the highest-value non-homer hit in baseball analytics. The gap between outfielders — especially center and left, or center and right — is the classic spot for a double.',
      '2B (double) — two base hit, batter stops at second',
      result
    ),
    lastWasFlyOut: false
  };
}

function triple(state) {
  const result = advanceOnHit(state.runners, 3);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Triple', 'HIT',
      'The rarest hit in baseball — the batter reaches third base. Requires the ball to be hit to the deepest part of the outfield and the batter to sprint with everything they have. Almost everyone on base scores.',
      'Triples are so rare that some stadiums with short outfield dimensions almost never see them. Speed matters enormously — the same ball that\'s a double for a slow runner is a triple for a fast one.',
      '3B (triple) — three base hit, batter stops at third',
      result
    ),
    lastWasFlyOut: false
  };
}

function homeRun(state) {
  const result = advanceOnHit(state.runners, 4);
  const onBase = [state.runners.first, state.runners.second, state.runners.third].filter(Boolean).length;
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay(
      onBase === 3 ? 'Grand Slam!' : onBase > 0 ? `${result.runs}-Run Home Run!` : 'Solo Home Run!',
      'HOME RUN',
      onBase === 3
        ? `Grand Slam! A home run with the bases loaded — all four runners score. That\'s ${result.runs} runs on one swing, the most dramatic play in baseball.`
        : `The batter hits the ball over the outfield fence in fair territory. ${result.runs === 1 ? 'A solo shot — just the batter scores.' : `${result.runs} runners score, including the batter.`} The entire team erupts.`,
      'On a home run, the batter automatically circles all four bases and scores. Every runner on base also scores. The ball must land in fair territory — a foul ball home run is just a strike.',
      onBase === 3 ? 'Grand Slam (bases loaded home run = 4 runs)' : `HR — ${result.runs} run${result.runs > 1 ? 's' : ''}`,
      result
    ),
    lastWasFlyOut: false
  };
}

function hitByPitch(state) {
  const result = advanceOnWalk(state.runners);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Hit by Pitch (HBP)', 'ON BASE',
      'The pitcher hits the batter with the ball. The batter automatically takes first base — same result as a walk. Forced runners advance exactly as they would on a walk.',
      'A hit-by-pitch advances runners the same way a walk does: only forced runners move. If the umpire suspects the hit was intentional (retaliation), both managers receive warnings — the next HBP results in an ejection.',
      'HBP — hit by pitch, functionally identical to BB for runner advancement',
      result
    ),
    lastWasFlyOut: false
  };
}

function infieldHit(state) {
  const result = advanceOnHit(state.runners, 1);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Infield Hit', 'HIT',
      'The batter beats the throw to first on a slow roller or a ball that just barely eludes the infielder. Pure speed — sometimes called a "leg hit." Counted as a single in the box score.',
      'An infield hit counts as a single and advances runners exactly like any other single. The difference is only how it looked — the batter outran the play rather than hitting the ball into the outfield.',
      '1B — infield single (speed beats the throw)',
      result
    ),
    lastWasFlyOut: false
  };
}

function steal(state) {
  if (!state.runners.first && !state.runners.second) {
    return {
      ...state,
      lastPlay: mkPlay('Stolen Base', 'NO RUNNER',
        'Stolen bases happen from first or second base. There\'s no runner in a stealable position right now.',
        'A stolen base attempt requires the runner to read the pitcher\'s delivery and get a running start. Once the pitcher commits to throwing home, the runner bolts.',
        'SB — stolen base',
        { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const newRunners = { ...state.runners };
  let description;
  if (newRunners.second) {
    newRunners.second = false;
    newRunners.third = true;
    description = 'Runner on second steals third!';
  } else {
    newRunners.first = false;
    newRunners.second = true;
    description = 'Runner on first steals second!';
  }
  return {
    ...state,
    runners: newRunners,
    lastPlay: mkPlay('Stolen Base', 'ADVANCE',
      `${description} The runner read the pitcher\'s motion and bolted before the ball was thrown. The catcher has roughly 1.9 seconds to catch, throw, and reach the bag — the fielder must apply a tag.`,
      'A stolen base always requires a TAG — the fielder cannot just step on the base. This is because the runner isn\'t "forced" (nobody pushed them off their base). Stolen bases are judged on success rate: below ~70% actually hurts the team statistically.',
      'SB — stolen base (requires tag out, not force out)',
      { runners: newRunners, runs: 0 }
    ),
    lastWasFlyOut: false
  };
}

function caughtStealing(state) {
  if (!state.runners.first && !state.runners.second) {
    return {
      ...state,
      lastPlay: mkPlay('Caught Stealing', 'NO RUNNER',
        'No runner in a stealable position.',
        '', '', { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const newRunners = { ...state.runners };
  let description;
  if (newRunners.second) {
    newRunners.second = false;
    description = 'Runner caught trying to steal third.';
  } else {
    newRunners.first = false;
    description = 'Runner caught trying to steal second.';
  }
  return {
    ...state,
    outs: state.outs + 1,
    runners: newRunners,
    lastPlay: mkPlay('Caught Stealing', 'OUT',
      `${description} The catcher\'s throw beat the runner to the bag. A bad jump, a slow read of the pitcher, or simply a perfect throw — this is one of the most momentum-killing plays for the offense.`,
      'Caught stealing requires a TAG — the fielder must touch the runner with the ball or glove before the runner reaches the base. If the fielder drops the ball during the tag, the runner is safe.',
      'CS — caught stealing (out via tag, not force)',
      { runners: newRunners, runs: 0 }
    ),
    lastWasFlyOut: false
  };
}

function tagUp(state) {
  if (!state.lastWasFlyOut) {
    return {
      ...state,
      lastPlay: mkPlay('Tag Up', 'NOT AVAILABLE',
        'Tag up is only possible after a fly ball or line drive is caught in the air. Use "Fly Out" or "Line Out" first, then tag up.',
        'The tag-up rule lets runners advance after a caught fly ball — but only if they were touching their original base at the moment the ball was caught.',
        'Tag-up rule (only applies after caught fly balls)',
        { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  if (!state.runners.second && !state.runners.third) {
    return {
      ...state,
      lastPlay: mkPlay('Tag Up', 'NO RUNNER',
        'No runner in a position to tag up into scoring position.',
        '', '', { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const newRunners = { ...state.runners };
  let runs = 0;
  let description;
  if (newRunners.third) {
    newRunners.third = false;
    runs = 1;
    description = 'Runner on third tags up and scores after the catch!';
  } else {
    newRunners.second = false;
    newRunners.third = true;
    description = 'Runner on second tags up and advances to third after the catch.';
  }
  return {
    ...state,
    runners: newRunners,
    score: applyRuns(state, runs),
    lastPlay: mkPlay('Tag Up', 'ADVANCE',
      `${description} The runner waited at their base until the exact moment the fielder caught the ball, then bolted. This is the mechanics behind a sacrifice fly.`,
      'Tag-up rule: once the ball is caught, any runner may advance at their own risk — but the fielder can throw to any base to try to put the runner out. The runner can be tagged or thrown out at the next base if the throw beats them.',
      'Tag-up — advance after caught fly (fielder can still throw runner out)',
      { runners: newRunners, runs }
    ),
    lastWasFlyOut: false
  };
}

function sacrificeBunt(state) {
  if (!state.runners.first && !state.runners.second && !state.runners.third) {
    return {
      ...state,
      lastPlay: mkPlay('Sacrifice Bunt', 'NO EFFECT',
        'A sacrifice bunt requires runners on base. Without runners, bunting just gives the defense an easy out.',
        '', '', { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  if (state.outs >= 2) {
    return {
      ...state,
      lastPlay: mkPlay('Sacrifice Bunt', 'POOR CHOICE',
        'With 2 outs, a sacrifice bunt is almost never a good play — you\'re giving the defense the third out for nothing. The inning ends with no runners advanced.',
        'This is one of the clearest lessons from baseball analytics: with 2 outs, an out is the most expensive thing you can give away. Managers almost never bunt in this situation.',
        'SAC — sacrifice bunt (why 2-out bunts are rare)',
        { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const newRunners = { first: false, second: false, third: false };
  let runs = 0;
  if (state.runners.third) runs++;
  if (state.runners.second) newRunners.third = true;
  if (state.runners.first) newRunners.second = true;
  return {
    ...state,
    outs: state.outs + 1,
    runners: newRunners,
    score: applyRuns(state, runs),
    lastPlay: mkPlay('Sacrifice Bunt', 'OUT',
      'The batter deliberately taps the ball softly near home plate, letting the defense throw them out at first — but all runners advance one base. A tactical "give" of an out to move runners into scoring position.',
      'Modern analytics have made sacrifice bunts controversial. You\'re trading an out (valuable) for one base advance (less valuable in most situations). MLB managers now bunt far less than they did 20 years ago. Still used by fast runners or in high-leverage pitcher spots.',
      'SAC — sacrifice bunt (batter out, all runners advance one base)',
      { runners: newRunners, runs }
    ),
    lastWasFlyOut: false
  };
}

function sacrificeFly(state) {
  if (!state.runners.third) {
    return {
      ...state,
      lastPlay: mkPlay('Sacrifice Fly', 'NO RUNNER ON THIRD',
        'A sacrifice fly requires a runner on third base. The play scores that runner after the fly ball is caught.',
        '', '', { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  if (state.outs >= 2) {
    return {
      ...state,
      lastPlay: mkPlay('Sacrifice Fly', 'NO EFFECT',
        'With 2 outs, a fly ball is just a fly out — the inning ends before the runner can score. The run would not count.',
        'If the third out is recorded before the runner touches home plate, the run does not count — even if the runner was already running on the play. This is why sacrifice flies only work with fewer than 2 outs.',
        'SAC FLY — requires fewer than 2 outs to score the runner',
        { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const newRunners = { ...state.runners, third: false };
  return {
    ...state,
    outs: state.outs + 1,
    runners: newRunners,
    score: applyRuns(state, 1),
    lastPlay: mkPlay('Sacrifice Fly', 'OUT + RUN SCORES',
      'The batter hits a deep fly ball that\'s caught by the outfielder — but the runner on third tags up and scores. The batter is out, a run scores, and the batter isn\'t penalized in their batting average.',
      'A sacrifice fly (SF) is not counted as an at-bat statistically — so it doesn\'t hurt the batter\'s batting average. The rule recognizes it as a deliberate, skilled play. Requires: runner on third, fewer than 2 outs, fly ball deep enough for the runner to score.',
      'SF — sacrifice fly (batter out, runner on 3rd scores via tag-up)',
      { runners: newRunners, runs: 1 }
    ),
    lastWasFlyOut: false
  };
}

function intentionalWalk(state) {
  const result = advanceOnWalk(state.runners);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Intentional Walk (IBB)', 'ON BASE',
      'The manager signals to intentionally walk the batter — usually to avoid a dangerous hitter, set up a force play, or get a favorable matchup with the next batter. No pitches are thrown; the batter walks directly to first.',
      'Intentional walks are now automatic in MLB — the manager just signals, and the batter takes first. The strategy: sometimes it\'s worth giving up a free base to face a weaker hitter, or to create a force out situation at home plate with a runner on third.',
      'IBB — intentional base on balls (no pitches thrown, automatic free pass)',
      result
    ),
    lastWasFlyOut: false
  };
}

function fieldersChoice(state) {
  if (!state.runners.first && !state.runners.second && !state.runners.third) {
    return {
      ...state,
      lastPlay: mkPlay("Fielder's Choice", 'NO EFFECT',
        "A fielder's choice requires runners on base — the fielder chooses to throw to a base other than first.",
        '', '', { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const newRunners = { ...state.runners };
  let description;
  if (state.runners.third) {
    newRunners.first = true;
    newRunners.third = false;
    description = 'The fielder throws home trying to get the runner — caught! Batter reaches first safely.';
  } else if (state.runners.second) {
    newRunners.first = true;
    newRunners.second = false;
    description = 'The fielder throws to third to get the advancing runner — out! Batter reaches first safely.';
  } else {
    newRunners.first = true;
    newRunners.second = false;
    description = 'The fielder throws to second to get the forced runner — out! Batter reaches first on the play.';
  }
  return {
    ...state,
    outs: state.outs + 1,
    runners: newRunners,
    lastPlay: mkPlay("Fielder's Choice", 'OUT (RUNNER)',
      `${description} The batter reaches base, but a different runner is put out. This is a "fielder's choice" — the fielder chose to retire a different runner instead of throwing to first.`,
      "A fielder's choice is NOT a hit. The official scorer rules that the batter would have been out if the fielder had thrown to first. It doesn't help or hurt the batter's batting average. The batter simply reached base because the defense chose to make a different play.",
      "FC — fielder's choice (batter reaches safely, but different runner is retired)",
      { runners: newRunners, runs: 0 }
    ),
    lastWasFlyOut: false
  };
}

function hitAndRun(state) {
  if (!state.runners.first) {
    return {
      ...state,
      lastPlay: mkPlay('Hit and Run', 'NO RUNNER ON FIRST',
        'The hit and run play requires a runner on first base — the runner breaks for second as the pitch is delivered.',
        '', '', { runners: state.runners, runs: 0 }
      ),
      lastWasFlyOut: false
    };
  }
  const result = advanceOnHit(state.runners, 2);
  return {
    ...state,
    runners: result.runners,
    score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Hit and Run', 'HIT',
      'The runner on first breaks for second the moment the pitcher starts their windup — before the ball is thrown. The batter must swing at anything. With the runner\'s head start, a single now advances them all the way to third.',
      'The hit and run is a gamble: if the batter misses or pops up, the runner is almost certainly caught stealing. But if it works, the batter has "moved" the middle infielder to cover second — opening a hole in the infield for the hit to go through.',
      'Hit and run — runner breaks early, batter swings on any pitch (runner gets extra base from head start)',
      result
    ),
    lastWasFlyOut: false
  };
}

// ── PLAY DISPATCH ──

const _plays = {
  strikeout, flyOut, lineOut, popOut, groundOut,
  walk, single, double: double_, triple, homeRun,
  hitByPitch, infieldHit, steal, caughtStealing, tagUp,
  sacrificeBunt, sacrificeFly, intentionalWalk, fieldersChoice, hitAndRun
};

function checkInningEnd(state) {
  if (state.outs < 3) return state;
  if (state.inning === 9 && state.halfInning === 'bottom' && state.score.home > state.score.away) {
    return { ...state, gameOver: true };
  }
  if (state.halfInning === 'top') {
    return { ...state, halfInning: 'bottom', outs: 0, runners: { first: false, second: false, third: false }, lastWasFlyOut: false };
  }
  if (state.inning >= 9) {
    return { ...state, gameOver: true };
  }
  return { ...state, inning: state.inning + 1, halfInning: 'top', outs: 0, runners: { first: false, second: false, third: false }, lastWasFlyOut: false };
}

function executePlay(key) {
  if (_sim.gameOver) return;
  let next = _plays[key](_sim);
  const logEntry = next.lastPlay ? { ...next.lastPlay, inning: _sim.inning, half: _sim.halfInning, outs: _sim.outs } : null;
  next = checkInningEnd(next);
  if (logEntry) next.eventLog = [logEntry, ..._sim.eventLog].slice(0, 24);
  _sim = next;
  renderSim();
}

// ── RENDER ──

function renderDiamond(runners) {
  const fill = k => runners[k] ? '#f0883e' : '#1e293b';
  const stroke = k => runners[k] ? '#f0883e' : '#334155';
  return `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="width:120px;height:120px;display:block">
      <rect width="120" height="120" fill="#0d1117" rx="8"/>
      <polyline points="60,15 95,50 60,85 25,50 60,15" fill="none" stroke="#334155" stroke-width="1.5"/>
      <rect x="53" y="8" width="14" height="14" fill="${fill('second')}" stroke="${stroke('second')}" stroke-width="1.5" rx="2" transform="rotate(45,60,15)"/>
      <rect x="18" y="43" width="14" height="14" fill="${fill('third')}" stroke="${stroke('third')}" stroke-width="1.5" rx="2" transform="rotate(45,25,50)"/>
      <rect x="88" y="43" width="14" height="14" fill="${fill('first')}" stroke="${stroke('first')}" stroke-width="1.5" rx="2" transform="rotate(45,95,50)"/>
      <polygon points="60,95 54,89 54,83 66,83 66,89" fill="white" opacity="0.7"/>
      <text x="60" y="6" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter,sans-serif">2B</text>
      <text x="13" y="54" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter,sans-serif">3B</text>
      <text x="107" y="54" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter,sans-serif">1B</text>
      <text x="60" y="112" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter,sans-serif">HOME</text>
    </svg>`;
}

function resultColor(result) {
  const map = {
    'OUT': '#ff6b7a', 'HOME RUN': '#e3b341', 'HIT': '#7ee787',
    'ON BASE': '#388bfd', 'ADVANCE': '#f0883e', 'OUT + RUN SCORES': '#a371f7'
  };
  return map[result] || '#64748b';
}

function renderSim() {
  const el = document.getElementById('baseballSim');
  if (!el) return;
  const s = _sim;
  const half = s.halfInning === 'top' ? 'TOP' : 'BOT';
  const inn = s.inning === 1 ? '1st' : s.inning === 2 ? '2nd' : s.inning === 3 ? '3rd' : `${s.inning}th`;

  const btns = [
    { key: 'strikeout',       label: 'Strikeout',        color: '#ff6b7a',  cat: 'out' },
    { key: 'flyOut',          label: 'Fly Out',           color: '#ff6b7a',  cat: 'out' },
    { key: 'lineOut',         label: 'Line Out',          color: '#ff6b7a',  cat: 'out' },
    { key: 'popOut',          label: 'Pop-Up Out',        color: '#ff6b7a',  cat: 'out' },
    { key: 'groundOut',       label: 'Ground Out',        color: '#ff6b7a',  cat: 'out' },
    { key: 'single',          label: 'Single',            color: '#7ee787',  cat: 'hit' },
    { key: 'double',          label: 'Double',            color: '#7ee787',  cat: 'hit' },
    { key: 'triple',          label: 'Triple',            color: '#7ee787',  cat: 'hit' },
    { key: 'homeRun',         label: 'Home Run',          color: '#e3b341',  cat: 'hit' },
    { key: 'infieldHit',      label: 'Infield Hit',       color: '#7ee787',  cat: 'hit' },
    { key: 'walk',            label: 'Walk (BB)',          color: '#388bfd',  cat: 'special' },
    { key: 'hitByPitch',      label: 'Hit By Pitch',       color: '#388bfd',  cat: 'special' },
    { key: 'intentionalWalk', label: 'Int. Walk (IBB)',    color: '#388bfd',  cat: 'special' },
    { key: 'steal',           label: 'Stolen Base',        color: '#f0883e',  cat: 'baserunning' },
    { key: 'caughtStealing',  label: 'Caught Stealing',    color: '#ff6b7a',  cat: 'baserunning' },
    { key: 'tagUp',           label: 'Tag Up ↑',           color: '#f0883e',  cat: 'baserunning' },
    { key: 'sacrificeBunt',   label: 'Sac Bunt',           color: '#a371f7',  cat: 'tactical' },
    { key: 'sacrificeFly',    label: 'Sac Fly',            color: '#a371f7',  cat: 'tactical' },
    { key: 'fieldersChoice',  label: "Fielder's Choice",   color: '#a371f7',  cat: 'tactical' },
    { key: 'hitAndRun',       label: 'Hit and Run',        color: '#a371f7',  cat: 'tactical' },
  ];

  const catMeta = {
    out:         { label: '⭕ Outs',        order: 0 },
    hit:         { label: '✅ Hits',         order: 1 },
    special:     { label: '🔵 On Base',      order: 2 },
    baserunning: { label: '🏃 Baserunning',  order: 3 },
    tactical:    { label: '🧠 Tactical',     order: 4 }
  };

  const grouped = {};
  btns.forEach(b => { if (!grouped[b.cat]) grouped[b.cat] = []; grouped[b.cat].push(b); });

  const btnHTML = Object.keys(catMeta)
    .sort((a, b) => catMeta[a].order - catMeta[b].order)
    .map(cat => `
      <div style="margin-bottom:10px">
        <div style="font-size:0.68rem;font-weight:600;color:#64748b;letter-spacing:1px;margin-bottom:5px">${catMeta[cat].label}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">
          ${(grouped[cat] || []).map(b => `
            <button onclick="simPlay('${b.key}')"
              style="padding:4px 10px;border:1px solid ${b.color}33;border-radius:6px;background:${b.color}0f;color:${b.color};font-size:0.75rem;font-family:Inter,sans-serif;cursor:pointer;transition:background 0.12s,border-color 0.12s"
              onmouseover="this.style.background='${b.color}22';this.style.borderColor='${b.color}88'"
              onmouseout="this.style.background='${b.color}0f';this.style.borderColor='${b.color}33'"
            >${b.label}</button>
          `).join('')}
        </div>
      </div>
    `).join('');

  const occupiedBases = [s.runners.third ? '3rd' : '', s.runners.second ? '2nd' : '', s.runners.first ? '1st' : ''].filter(Boolean);

  const lastPlayHTML = s.lastPlay ? `
    <div style="background:#0d1117;border-radius:10px;padding:14px 16px;border:1px solid #1e293b;margin-top:14px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
        <span style="font-family:Oswald,sans-serif;font-size:1.05rem;font-weight:700;color:#e2e8f0">${s.lastPlay.title}</span>
        <span style="background:${resultColor(s.lastPlay.result)};color:#0d1117;font-size:0.68rem;font-weight:700;padding:2px 8px;border-radius:4px;font-family:Oswald,sans-serif;flex-shrink:0">${s.lastPlay.result}</span>
      </div>
      <p style="font-size:0.86rem;color:#b1bac4;line-height:1.6;margin-bottom:8px">${s.lastPlay.explanation}</p>
      ${s.lastPlay.rule ? `
        <div style="background:#161b22;border-left:3px solid #388bfd33;border-radius:0 6px 6px 0;padding:9px 13px">
          <p style="font-size:0.8rem;color:#94a3b8;line-height:1.55"><strong style="color:#7aa2d4">Rule:</strong> ${s.lastPlay.rule}</p>
          ${s.lastPlay.term ? `<p style="font-size:0.72rem;color:#475569;margin-top:5px;font-family:Oswald,sans-serif">📚 ${s.lastPlay.term}</p>` : ''}
        </div>
      ` : ''}
    </div>
  ` : `
    <div style="background:#0d1117;border-radius:10px;padding:18px;border:1px solid #1e293b;margin-top:14px;text-align:center;color:#475569;font-size:0.86rem">
      Press any play button — see what happens on the field and learn the rule behind it.
    </div>
  `;

  const gameOverHTML = s.gameOver ? `
    <div style="background:linear-gradient(135deg,#0f2318,#111827);border:1px solid #238636;border-radius:10px;padding:18px;margin-top:14px;text-align:center">
      <div style="font-family:Oswald,sans-serif;font-size:1.3rem;font-weight:700;color:#7ee787;margin-bottom:6px">FINAL</div>
      <div style="font-size:1.1rem;color:#e2e8f0;font-family:Oswald,sans-serif">AWAY ${s.score.away} &nbsp;·&nbsp; HOME ${s.score.home}</div>
      <div style="margin-top:8px;color:#64748b;font-size:0.82rem">${s.score.away > s.score.home ? 'Away wins.' : s.score.home > s.score.away ? 'Home wins.' : 'Tied — extra innings in real life.'}</div>
      <button onclick="simReset()" style="margin-top:12px;padding:7px 18px;background:#238636;border:none;border-radius:6px;color:white;font-family:Oswald,sans-serif;font-size:0.88rem;cursor:pointer">New Game</button>
    </div>
  ` : '';

  const logHTML = s.eventLog.length > 0 ? `
    <div style="margin-top:16px">
      <div style="font-size:0.68rem;font-weight:600;color:#334155;letter-spacing:1px;margin-bottom:6px">PLAY LOG</div>
      <div style="max-height:180px;overflow-y:auto;display:flex;flex-direction:column;gap:3px">
        ${s.eventLog.map((e, i) => `
          <div style="display:flex;align-items:center;gap:8px;padding:5px 9px;background:${i===0?'#161b22':'transparent'};border-radius:5px;border:1px solid ${i===0?'#1e293b':'transparent'}">
            <span style="font-size:0.68rem;color:#475569;font-family:Oswald,sans-serif;min-width:54px;flex-shrink:0">${e.half==='top'?'TOP':'BOT'} ${e.inning} · ${e.outs}out</span>
            <span style="width:7px;height:7px;border-radius:2px;background:${resultColor(e.result)};flex-shrink:0"></span>
            <span style="font-size:0.78rem;color:#94a3b8">${e.title}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  el.innerHTML = `
    <div style="background:#111827;border-radius:12px;border:1px solid #1e293b;overflow:hidden">
      <div style="background:#161b22;padding:10px 16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;border-bottom:1px solid #1e293b">
        <div style="font-family:Oswald,sans-serif;font-size:0.8rem;color:#7aa2d4;letter-spacing:1px">${half} ${inn}</div>
        <div style="display:flex;gap:6px;align-items:center">
          ${[0,1,2].map(i => `<div style="width:9px;height:9px;border-radius:50%;background:${i<s.outs?'#ff6b7a':'#1e293b'};border:1px solid ${i<s.outs?'#ff6b7a':'#334155'}"></div>`).join('')}
          <span style="font-size:0.72rem;color:#475569;margin-left:2px">${s.outs} out${s.outs!==1?'s':''}</span>
        </div>
        <div style="margin-left:auto;display:flex;gap:14px">
          <span style="font-family:Oswald,sans-serif;font-size:0.88rem;color:#94a3b8">AWAY <strong style="color:#f0883e">${s.score.away}</strong></span>
          <span style="font-family:Oswald,sans-serif;font-size:0.88rem;color:#94a3b8">HOME <strong style="color:#7ee787">${s.score.home}</strong></span>
        </div>
        <div style="display:flex;gap:6px">
          <button onclick="simReset()" style="padding:3px 9px;background:transparent;border:1px solid #1e293b;border-radius:4px;color:#475569;font-size:0.7rem;font-family:Inter,sans-serif;cursor:pointer" onmouseover="this.style.borderColor='#334155';this.style.color='#64748b'" onmouseout="this.style.borderColor='#1e293b';this.style.color='#475569'">New Game</button>
          <button onclick="simResetInning()" style="padding:3px 9px;background:transparent;border:1px solid #1e293b;border-radius:4px;color:#475569;font-size:0.7rem;font-family:Inter,sans-serif;cursor:pointer" onmouseover="this.style.borderColor='#334155';this.style.color='#64748b'" onmouseout="this.style.borderColor='#1e293b';this.style.color='#475569'">Clear Bases</button>
        </div>
      </div>

      <div style="padding:14px 16px">
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <div style="flex-shrink:0">
            ${renderDiamond(s.runners)}
            <div style="margin-top:6px;font-size:0.7rem;color:#475569;text-align:center;max-width:120px">
              ${occupiedBases.length === 0 ? 'Bases empty' : occupiedBases.join(', ') + ' occupied'}
            </div>
          </div>
          <div style="flex:1;min-width:220px">
            ${s.gameOver ? '<div style="color:#475569;font-size:0.88rem;padding:8px 0">Game over — press New Game to play again.</div>' : btnHTML}
          </div>
        </div>
        ${lastPlayHTML}
        ${gameOverHTML}
        ${logHTML}
      </div>
    </div>
  `;
}

// ── PUBLIC API ──

window.simPlay = key => executePlay(key);
window.simReset = () => { _sim = createSimState(); renderSim(); };
window.simResetInning = () => { _sim = { ..._sim, outs: 0, runners: { first: false, second: false, third: false }, lastWasFlyOut: false }; renderSim(); };
window.initSimulator = () => { _sim = createSimState(); renderSim(); };

// ── BASEBALL SITUATION SIMULATOR ──

const SIM_AWAY_ROSTER = [
  { name: 'Chen',  num: 1, color: '#7ee787' },
  { name: 'Wang',  num: 2, color: '#f0883e' },
  { name: 'Lin',   num: 3, color: '#388bfd' },
  { name: 'Lee',   num: 4, color: '#e3b341' },
  { name: 'Wu',    num: 5, color: '#a371f7' },
  { name: 'Yang',  num: 6, color: '#79c0ff' },
  { name: 'Huang', num: 7, color: '#ffa657' },
  { name: 'Chang', num: 8, color: '#56d364' },
  { name: 'Hsu',   num: 9, color: '#ff6b7a' },
];

const SIM_HOME_ROSTER = [
  { name: 'Ohtani',    num: 1, color: '#ff6b7a' },
  { name: 'Suzuki',    num: 2, color: '#79c0ff' },
  { name: 'Kim',       num: 3, color: '#ffa657' },
  { name: 'Park',      num: 4, color: '#56d364' },
  { name: 'Rodriguez', num: 5, color: '#e3b341' },
  { name: 'Williams',  num: 6, color: '#a371f7' },
  { name: 'Johnson',   num: 7, color: '#388bfd' },
  { name: 'Garcia',    num: 8, color: '#f0883e' },
  { name: 'Lopez',     num: 9, color: '#7ee787' },
];

// Each team has its own batting order that advances independently
function getBatter(state) {
  const roster = state.halfInning === 'top' ? SIM_AWAY_ROSTER : SIM_HOME_ROSTER;
  const idx = state.halfInning === 'top' ? state.awayBatterIndex : state.homeBatterIndex;
  return roster[idx % 9];
}

// Returns a partial state patch — spread it into the return object
function nextBatterIndex(state) {
  if (state.halfInning === 'top') {
    return { awayBatterIndex: (state.awayBatterIndex + 1) % 9 };
  }
  return { homeBatterIndex: (state.homeBatterIndex + 1) % 9 };
}

function createSimState() {
  return {
    inning: 1, halfInning: 'top', outs: 0,
    score: { away: 0, home: 0 },
    runners: { first: null, second: null, third: null },
    inningScores: { away: [], home: [] },
    eventLog: [], lastPlay: null, gameOver: false,
    awayBatterIndex: 0,
    homeBatterIndex: 0
  };
}

let _sim = createSimState();

// ── STATE HELPERS ──

function mkPlay(title, result, explanation, rule, term) {
  return { title, result, explanation, rule, term };
}

function applyRuns(state, runs) {
  if (!runs) return state.score;
  const side = state.halfInning === 'top' ? 'away' : 'home';
  return { ...state.score, [side]: state.score[side] + runs };
}

function advanceOnHit(runners, bases, batter) {
  const r = { first: null, second: null, third: null };
  let runs = 0;
  if (runners.third) { if (bases >= 1) runs++; else r.third = runners.third; }
  if (runners.second) {
    const d = 2 + bases;
    if (d >= 4) runs++; else if (d === 3) r.third = runners.second; else r.second = runners.second;
  }
  if (runners.first) {
    const d = 1 + bases;
    if (d >= 4) runs++; else if (d === 3) r.third = runners.first; else if (d === 2) r.second = runners.first; else r.first = runners.first;
  }
  if (bases >= 4) runs++; else if (bases === 3) r.third = batter; else if (bases === 2) r.second = batter; else r.first = batter;
  return { runners: r, runs };
}

function advanceOnWalk(runners, batter) {
  const r = { first: batter, second: runners.second, third: runners.third };
  let runs = 0;
  if (runners.first) {
    r.second = runners.first;
    if (runners.second) { r.third = runners.second; if (runners.third) runs = 1; }
  }
  return { runners: r, runs };
}

function advanceOnGroundOut(runners) {
  const r = { first: null, second: null, third: null };
  if (runners.first) r.second = runners.first;
  if (runners.second && runners.first) r.third = runners.second;
  else if (runners.second) r.second = runners.second;
  if (runners.third) r.third = runners.third;
  return { runners: r, runs: 0 };
}

// ── INDIVIDUAL PLAYS ──

function strikeout(state) {
  if (state.runners.first && state.outs < 2 && Math.random() < 0.15) {
    const newRunners = { ...state.runners, first: null };
    return { ...state, outs: state.outs + 2, runners: newRunners, ...nextBatterIndex(state),
      lastPlay: mkPlay("Strike 'Em Out, Throw 'Em Out", '2 OUTS',
        "Hit-and-run backfires! The runner broke on the pitch, but the batter struck out. The catcher fires to second — runner hung out to dry. Two outs on one pitch.",
        "The nightmare hit-and-run outcome: the batter whiffs while the runner is fully committed. The catcher easily throws to second before the runner arrives. This 'strike 'em out, throw 'em out' double play can end an inning in an instant and kills momentum.",
        "K + CS — hit-and-run backfire ('strike 'em out, throw 'em out')"
      )
    };
  }
  return { ...state, outs: state.outs + 1, ...nextBatterIndex(state),
    lastPlay: mkPlay('Strikeout', 'OUT',
      'The batter gets strike three — either swinging and missing, or watching a called strike in the zone.',
      'Three strikes and you\'re out. A swinging strike is any swing that misses. A called strike is any pitch inside the strike zone that the batter doesn\'t swing at.',
      'K (strikeout)'
    )
  };
}

function flyOut(state) {
  if (state.runners.third && state.outs < 2) {
    return {
      ...state, outs: state.outs + 1,
      runners: { ...state.runners, third: null },
      score: applyRuns(state, 1),
      ...nextBatterIndex(state),
      lastPlay: mkPlay('Sacrifice Fly', 'OUT + RUN SCORES',
        'The batter hits a deep fly ball that\'s caught — but the runner on third tags up and scores after the catch. The batter is out, but a run scores and the batter isn\'t penalized in their batting average.',
        'A sacrifice fly (SF) is not counted as an at-bat — so it doesn\'t hurt the batter\'s average. The runner on third must "tag up": stay on the base until the moment of the catch, then sprint home. Requires fewer than 2 outs.',
        'SF — sacrifice fly (fly out + runner on 3rd scores via tag-up)'
      )
    };
  }
  return { ...state, outs: state.outs + 1, ...nextBatterIndex(state),
    lastPlay: mkPlay('Fly Out', 'OUT',
      'The batter hits the ball into the air and a fielder catches it before it touches the ground. Runners must "tag up" — touch their original base at the moment of the catch — before they can advance.',
      'Any ball caught in the air is an out, fair or foul. After the catch, runners may advance at their own risk. With a runner on third and fewer than 2 outs, a deep enough fly ball becomes a sacrifice fly.',
      'F (fly ball) — caught in the air'
    )
  };
}

function lineOut(state) {
  if (state.runners.first && state.outs < 2) {
    if (Math.random() < 0.35) {
      const doubledDesc = [
        'The runner broke early on the pitch — the fielder snags the line drive and fires back to first before the runner can scramble back. Doubled off!',
        'Hit-and-run gone wrong: the runner was moving, the fielder makes a tremendous catch, and the relay back to first completes the double play.',
      ][Math.floor(Math.random() * 2)];
      const newRunners = { ...state.runners, first: null };
      return { ...state, outs: state.outs + 2, runners: newRunners, ...nextBatterIndex(state),
        lastPlay: mkPlay('Line Drive — Doubled Off', '2 OUTS',
          doubledDesc,
          'A "doubled off" play: the runner left first base expecting the ball to drop in for a hit. When it\'s caught instead, they can\'t get back to the base before the throw arrives. The fielder steps on first — no tag needed, just like a force out. This happens roughly 35% of the time when a runner is moving on the pitch.',
          'Double play via line drive — runner doubled off first base (~35% chance when runner is moving)'
        )
      };
    } else {
      const holdDesc = [
        'Hard line drive caught — but the runner on first froze the moment it left the bat. Smart read. Safe back at first.',
        'Screaming liner caught on the run — the runner read it perfectly and held. 1 out, runner stays.',
        'Line drive caught by the second baseman — runner hit the brakes just in time. No second out.',
      ][Math.floor(Math.random() * 3)];
      return { ...state, outs: state.outs + 1, ...nextBatterIndex(state),
        lastPlay: mkPlay('Line Drive Out', 'OUT',
          holdDesc,
          'Smart baserunning: on a line drive, good runners hold until they\'re sure the ball won\'t be caught. It costs them a potential advance, but saves them from being doubled off. The defense converted only one out this time.',
          'L (line drive) — runner held, no double play (~65% outcome with runner on 1st)'
        )
      };
    }
  }
  return { ...state, outs: state.outs + 1, ...nextBatterIndex(state),
    lastPlay: mkPlay('Line Drive Out', 'OUT',
      'The batter rips a hard line drive that\'s caught by a fielder before it bounces. Spectacular — hit hard, but the fielder was in exactly the right place.',
      'A line drive caught in the air is the same as any fly out. Caught so quickly that runners often can\'t react — leaving early can get them "doubled off" their base before they can return.',
      'L (line drive) — caught before touching the ground'
    )
  };
}

function popOut(state) {
  const ifr = state.outs < 2 && state.runners.first && state.runners.second;
  return { ...state, outs: state.outs + 1, ...nextBatterIndex(state),
    lastPlay: mkPlay('Pop-Up Out', 'OUT',
      'The batter hits a soft popup into the infield. ' + (ifr
        ? 'Infield Fly Rule in effect — automatic out called by the umpire to protect the runners.'
        : 'An easy catch. Runners can try to tag up but a shallow popup gives them almost no chance.'),
      'The Infield Fly Rule prevents fielders from deliberately dropping an easy popup to start a double play. When there are runners on 1st and 2nd (or bases loaded) with fewer than 2 outs, the batter is automatically out the moment the infield popup goes up.',
      'IF (Infield Fly Rule — only in specific base/out situations)'
    )
  };
}

function groundOut(state) {
  if (state.runners.third && state.outs < 2) {
    const newRunners = { first: null, second: null, third: null };
    if (state.runners.second) newRunners.third = state.runners.second;
    if (state.runners.first) newRunners.second = state.runners.first;
    return { ...state, outs: state.outs + 1, runners: newRunners, score: applyRuns(state, 1), ...nextBatterIndex(state),
      lastPlay: mkPlay('RBI Ground Out', 'OUT + RUN SCORES',
        'The batter grounds out to first — but the runner on third scores on the play. A "productive out": the batter goes down, but a run crosses home plate.',
        'With fewer than 2 outs and a runner on third, the defense usually takes the sure out at first rather than risk an unlikely throw home. The runner times the ground ball and sprints in. This counts as an RBI for the batter despite making an out.',
        'RBI — run batted in (scored on a ground out, not a sacrifice fly)'
      )
    };
  }
  if (state.runners.first && state.outs < 2) {
    const batter = getBatter(state);
    const roll = Math.random();
    if (roll < 0.35) {
      const dpDesc = [
        'Sharply hit to short — a textbook 6-4-3. SS fires to second, relay to first in time. The runner from first never had a chance.',
        'Right at the second baseman — quick 4-6-3 double play. Ball to second, flip to short, relay to first.',
        'Hard grounder to third — 5-4-3 twin killing. Fast throw across the diamond to second, then on to first.',
      ][Math.floor(Math.random() * 3)];
      const newRunners = { first: null, second: state.runners.second, third: state.runners.third };
      return { ...state, outs: state.outs + 2, runners: newRunners, ...nextBatterIndex(state),
        lastPlay: mkPlay('Double Play (6-4-3)', '2 OUTS',
          dpDesc,
          'The double play works because of the force: with a runner on first, the fielder steps on second before the runner arrives — no tag needed — then relays to first. Whether it converts depends on where the ball is hit, fielder positioning, and the batter\'s speed. A GIDP (grounded into double play) is a negative stat for the batter.',
          'GIDP — grounded into double play (~35% with runner on 1st)'
        )
      };
    } else if (roll < 0.50) {
      const fcDesc = [
        'Fielder charges, grabs the slow roller, and fires to second for the force on the runner. No time for the relay — batter reaches first safely.',
        'Ground ball to short — the SS fires to second to get the lead runner. The defense takes the sure out, batter on first.',
      ][Math.floor(Math.random() * 2)];
      const newRunners = { first: batter, second: state.runners.second, third: state.runners.third };
      return { ...state, outs: state.outs + 1, runners: newRunners, ...nextBatterIndex(state),
        lastPlay: mkPlay("Fielder's Choice", 'OUT (RUNNER)',
          fcDesc,
          "A fielder's choice (FC): the fielder chose to retire the baserunner at second instead of the batter. The batter reaches first safely but gets no hit credit — the scorer rules they'd have been out with a throw to first. FC doesn't hurt the batter's batting average.",
          "FC — fielder's choice (batter safe at 1st, runner out at 2nd; ~15% of ground balls with runner on 1st)"
        )
      };
    } else {
      const result = advanceOnGroundOut(state.runners);
      const isHR = Math.random() < 0.30;
      const regularDesc = isHR
        ? [
          'Hit-and-run was called — the runner was already moving toward second. No chance for the double play. Defense settles for the one out at first.',
          'The manager called the hit-and-run: the early jump made the double play impossible. Batter out, but runner safely at second.',
          ][Math.floor(Math.random() * 2)]
        : [
          'Hit to the right side — first baseman takes the easy out at the bag, but the runner from first slides safely into second.',
          'Slow roller up the middle — defense gets one out at first. Not fast enough to turn two. Runner moves to second.',
          'Ball hit in the hole at short — just enough time to retire the batter at first. Runner on first safely reaches second.',
          ][Math.floor(Math.random() * 3)];
      return { ...state, outs: state.outs + 1, runners: result.runners, ...nextBatterIndex(state),
        lastPlay: mkPlay('Ground Out', 'OUT',
          regularDesc,
          isHR
            ? "The hit-and-run tactic: the runner breaks early, which disrupts the fielder's ability to set up the double play. The defense can only record one out instead of two. This is one reason managers still call the hit-and-run despite modern analytics skepticism."
            : 'Not every ground ball with a runner on first becomes a double play. A ball to the right side, a slow roller, or a ball in the hole gives the runner extra time. The defense takes the guaranteed out at first.',
          isHR ? 'H&R — hit and run prevented the double play' : '1-3 putout — runner advances to 2nd, no double play'
        )
      };
    }
  }
  const result = advanceOnGroundOut(state.runners);
  return { ...state, outs: state.outs + 1, runners: result.runners, ...nextBatterIndex(state),
    lastPlay: mkPlay('Ground Out', 'OUT',
      'The batter hits the ball on the ground and is thrown out at first base. Forced runners — those who had to move because the batter needed their base — advance one base.',
      'When the batter is put out at first, the force is removed. A runner on third who was "forced" is no longer forced — a play at home now requires a tag, not just stepping on the plate.',
      '1-3 putout (ball to fielder, throw to first base)'
    )
  };
}

function walk(state) {
  const batter = getBatter(state);
  const result = advanceOnWalk(state.runners, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Walk (BB)', 'ON BASE',
      'The pitcher throws four balls outside the strike zone. The batter takes first base free. Only "forced" runners advance — those who can\'t stay because the batter needs their base.',
      'A runner on second with nobody on first is NOT forced on a walk — they stay put. Only the chain from first base backward is forced. A bases-loaded walk forces everyone, including the runner on third who scores.',
      'BB (base on balls) — 4 balls outside the zone'
    )
  };
}

function single(state) {
  const batter = getBatter(state);
  if (state.runners.first && !state.runners.second && Math.random() < 0.25) {
    const runs = state.runners.third ? 1 : 0;
    const newRunners = { first: batter, second: null, third: state.runners.first };
    return { ...state, runners: newRunners, score: applyRuns(state, runs), ...nextBatterIndex(state),
      lastPlay: mkPlay('Single — Hit and Run', 'HIT',
        'Hit and run was on — the runner broke the moment the pitcher started their delivery. The batter made contact and the head start puts the runner all the way at third instead of second.',
        'The hit and run payoff: instead of 1st and 2nd, you now have 1st and 3rd. The runner\'s early jump gains a full extra base. The risk is if the batter misses or pops up — the runner is fully exposed with no protection.',
        'H&R — hit and run (runner advances an extra base on the head start)'
      )
    };
  }
  if (state.runners.second) {
    const scoresFromSecond = Math.random() < 0.75;
    let runs = state.runners.third ? 1 : 0;
    if (scoresFromSecond) runs++;
    const newRunners = {
      first: batter,
      second: state.runners.first ? state.runners.first : null,
      third: scoresFromSecond ? null : state.runners.second
    };
    return { ...state, runners: newRunners, score: applyRuns(state, runs), ...nextBatterIndex(state),
      lastPlay: mkPlay(
        scoresFromSecond ? 'Single — Scores from 2nd' : 'Single',
        scoresFromSecond ? 'HIT + RUN SCORES' : 'HIT',
        scoresFromSecond
          ? 'Runner on second scores easily — this is exactly why 2nd and 3rd base are called "scoring position." The ball reached the outfield and the runner had more than enough time to come all the way home.'
          : 'The runner on second read the ball and held at third — smart, cautious baserunning. The ball was fielded quickly enough that going home would have been risky. Still in scoring position, just at third now.',
        '"Scoring position" means a runner on 2nd or 3rd can score on a single. A runner on 1st almost never scores on a single — they can only reach 3rd. Getting a runner to 2nd (via double, stolen base, or sacrifice bunt) dramatically increases the chance of scoring.',
        scoresFromSecond
          ? 'Scoring position — 2nd base runner scores on a single (~75% of the time)'
          : 'Scoring position — runner held at 3rd by quick fielding (~25% of the time)'
      )
    };
  }
  const result = advanceOnHit(state.runners, 1, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Single', 'HIT',
      'The batter hits the ball and reaches first base safely. All runners advance at least one base.',
      'A single is the most common hit. Runners on second and third typically score. A runner on first usually reaches third on a ball hit into the outfield gap.',
      '1B (single) — one base hit'
    )
  };
}

function double_(state) {
  const batter = getBatter(state);
  if (state.runners.first && !state.runners.second && Math.random() < 0.2) {
    const runs = (state.runners.third ? 1 : 0) + 1;
    const newRunners = { first: null, second: batter, third: null };
    return { ...state, runners: newRunners, score: applyRuns(state, runs), ...nextBatterIndex(state),
      lastPlay: mkPlay('Double — Hit and Run', 'HIT',
        'Hit and run was on — the runner from first was already in full sprint. The double scores them easily; without the head start they would have stopped at third.',
        'The H&R turns a normal double into a run scored. A stationary runner on first reaches third on a double; a running runner scores. This is why managers call H&R with a fast runner: the extra base can mean the difference between a runner in scoring position and a run on the board.',
        'H&R double — runner scores from 1st (would only reach 3rd without the head start)'
      )
    };
  }
  const result = advanceOnHit(state.runners, 2, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Double', 'HIT',
      'The batter hits the ball into the gap and reaches second base. A leadoff double immediately puts a runner in scoring position.',
      'The gap between outfielders is the classic target for a double. Analytically, doubles are the highest-value non-homer hit because they combine base advancement with RBI potential.',
      '2B (double) — two base hit'
    )
  };
}

function triple(state) {
  const batter = getBatter(state);
  const result = advanceOnHit(state.runners, 3, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Triple', 'HIT',
      'The rarest hit in baseball — the batter reaches third base. Requires the ball to land in the deepest part of the outfield and the batter to have exceptional speed. Almost everyone on base scores.',
      'Triples are so rare that some ballparks almost never see them. Speed matters enormously: the same ball is a double for a slow runner and a triple for a fast one.',
      '3B (triple) — three base hit'
    )
  };
}

function homeRun(state) {
  const batter = getBatter(state);
  const result = advanceOnHit(state.runners, 4, batter);
  const onBase = [state.runners.first, state.runners.second, state.runners.third].filter(Boolean).length;
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay(
      onBase === 3 ? 'Grand Slam!' : onBase > 0 ? `${result.runs}-Run Home Run!` : 'Solo Home Run!',
      'HOME RUN',
      onBase === 3
        ? `Grand Slam! A home run with the bases loaded — all four runners score. ${result.runs} runs on one swing, the most dramatic play in baseball.`
        : `The batter hits the ball over the outfield fence. ${result.runs === 1 ? 'Solo shot — just the batter scores.' : `${result.runs} runners score, including the batter.`}`,
      'On a home run, the batter automatically circles all four bases. Every runner on base scores. The ball must land in fair territory — a ball that hooks foul past the pole is just a strike.',
      onBase === 3 ? 'Grand Slam (bases loaded HR = 4 runs)' : `HR — ${result.runs} run${result.runs > 1 ? 's' : ''}`
    )
  };
}

function hitByPitch(state) {
  const batter = getBatter(state);
  const result = advanceOnWalk(state.runners, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Hit by Pitch (HBP)', 'ON BASE',
      'The pitcher hits the batter with the ball. The batter automatically takes first base — same result as a walk. Forced runners advance exactly as on a walk.',
      'A hit-by-pitch advances runners the same way as a walk: only forced runners move. If the umpire suspects it was intentional (retaliation), warnings are issued — next offense means ejection.',
      'HBP — same runner advancement as a walk'
    )
  };
}

function infieldHit(state) {
  const batter = getBatter(state);
  const result = advanceOnHit(state.runners, 1, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Infield Hit', 'HIT',
      'The batter beats the throw to first on a slow roller or a ball that just eludes the infielder. Pure speed — often called a "leg hit." Counts as a single.',
      'An infield hit advances runners exactly like any single. The only difference is how it looked. Not a fielding error — the scorer rules the batter would have beaten any throw.',
      '1B — infield single (speed beats the throw)'
    )
  };
}

function steal(state) {
  if (!state.runners.first && !state.runners.second) {
    return { ...state,
      lastPlay: mkPlay('Stolen Base', 'NO RUNNER',
        'Stolen bases happen from first or second base. No runner is in a stealable position right now.',
        'A steal requires the runner to read the pitcher\'s delivery and get a running start before the ball reaches the plate. The catcher has roughly 1.9 seconds to catch and throw.',
        'SB — stolen base'
      )
    };
  }
  const newRunners = { ...state.runners };
  let description;
  if (newRunners.second) {
    const runner = newRunners.second;
    newRunners.third = runner;
    newRunners.second = null;
    description = `${runner.name} on second steals third!`;
  } else {
    const runner = newRunners.first;
    newRunners.second = runner;
    newRunners.first = null;
    description = `${runner.name} on first steals second!`;
  }
  return { ...state, runners: newRunners,
    lastPlay: mkPlay('Stolen Base', 'ADVANCE',
      `${description} The runner read the pitcher's motion and broke before the pitch. Requires a TAG — the fielder must touch the runner with the ball, not just stand on the base.`,
      'Stolen bases require a tag because the runner wasn\'t forced. Success rates below ~70% actually hurt the team statistically — you\'re trading a baserunner for nothing. The best base-stealers succeed 80%+.',
      'SB — stolen base (tag required, not force)'
    )
  };
}

function caughtStealing(state) {
  if (!state.runners.first && !state.runners.second) {
    return { ...state,
      lastPlay: mkPlay('Caught Stealing', 'NO RUNNER', 'No runner in a stealable position.', '', '')
    };
  }
  const newRunners = { ...state.runners };
  let description;
  if (newRunners.second) {
    const runner = newRunners.second;
    newRunners.second = null;
    description = `${runner.name} caught trying to steal third.`;
  } else {
    const runner = newRunners.first;
    newRunners.first = null;
    description = `${runner.name} caught trying to steal second.`;
  }
  return { ...state, outs: state.outs + 1, runners: newRunners,
    lastPlay: mkPlay('Caught Stealing', 'OUT',
      `${description} The catcher's throw beat the runner to the bag. A bad jump, slow read, or simply a perfect throw — one of the most momentum-killing plays for an offense.`,
      'Caught stealing requires a TAG. If the fielder drops the ball during the tag, the runner is safe. If the throw goes into the outfield, the runner may advance further.',
      'CS — caught stealing (out via tag)'
    )
  };
}

function sacrificeBunt(state) {
  if (!state.runners.first && !state.runners.second && !state.runners.third) {
    return { ...state,
      lastPlay: mkPlay('Sacrifice Bunt', 'NO EFFECT', 'A sacrifice bunt needs runners on base to be worthwhile.', '', '')
    };
  }
  if (state.outs >= 2) {
    return { ...state,
      lastPlay: mkPlay('Sacrifice Bunt', 'POOR CHOICE',
        'With 2 outs, a bunt just gives the defense the third out — the inning ends with nothing gained. Almost never done with 2 outs.',
        'Analytics confirm: with 2 outs, trading an out for one base advance is almost always a losing deal. Modern managers bunt far less than managers did 20 years ago.',
        'SAC — why 2-out bunts are rare'
      )
    };
  }
  const newRunners = { first: null, second: null, third: null };
  let runs = 0;
  if (state.runners.third) runs++;
  if (state.runners.second) newRunners.third = state.runners.second;
  if (state.runners.first) newRunners.second = state.runners.first;
  return { ...state, outs: state.outs + 1, runners: newRunners, score: applyRuns(state, runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Sacrifice Bunt', 'OUT',
      'The batter deliberately taps the ball softly near home plate, letting the defense throw them out at first — but all runners advance one base. A tactical trade of an out for position.',
      'Modern analytics have made sacrifice bunts controversial: you\'re giving up an out (scarce) for one base advance (less valuable). MLB managers now bunt far less than they used to. Still used in specific late-game situations.',
      'SAC — sacrifice bunt (batter out, all runners advance one base)'
    )
  };
}

function intentionalWalk(state) {
  const batter = getBatter(state);
  const result = advanceOnWalk(state.runners, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Intentional Walk (IBB)', 'ON BASE',
      'The manager signals to walk the batter intentionally — no pitches thrown, batter goes straight to first. Usually to avoid a dangerous hitter, set up a force play, or get a better matchup.',
      'Intentional walks are now automatic in MLB — the manager signals, no pitches thrown. Common strategy: with runner on 2nd and 1 out, walk the dangerous hitter to set up a force at any base and face a weaker batter.',
      'IBB — intentional base on balls (automatic, no pitches)'
    )
  };
}

function fieldersChoice(state) {
  if (!state.runners.first && !state.runners.second && !state.runners.third) {
    return { ...state,
      lastPlay: mkPlay("Fielder's Choice", 'NO EFFECT', 'Requires runners on base — the fielder chooses to retire a runner instead of throwing to first.', '', '')
    };
  }
  const batter = getBatter(state);
  const newRunners = { ...state.runners };
  let description;
  if (state.runners.third) {
    newRunners.first = batter; newRunners.third = null;
    description = 'Fielder throws home trying to get the runner — out! Batter reaches first safely.';
  } else if (state.runners.second) {
    newRunners.first = batter; newRunners.second = null;
    description = 'Fielder throws to third to retire the advancing runner — out! Batter reaches first.';
  } else {
    newRunners.first = batter; newRunners.second = null;
    description = 'Fielder throws to second to get the forced runner — out! Batter reaches first on the play.';
  }
  return { ...state, outs: state.outs + 1, runners: newRunners, ...nextBatterIndex(state),
    lastPlay: mkPlay("Fielder's Choice", 'OUT (RUNNER)',
      `${description} The batter reaches base, but a different runner is retired. Not a hit — the fielder chose to make a different play.`,
      "A fielder's choice is NOT a hit. The scorer rules the batter would have been out if the fielder had thrown to first. It doesn't affect the batter's batting average. The batter simply reached because the defense prioritized retiring another runner.",
      "FC — fielder's choice (batter safe, different runner out)"
    )
  };
}

function hitAndRun(state) {
  if (!state.runners.first) {
    return { ...state,
      lastPlay: mkPlay('Hit and Run', 'NO RUNNER ON FIRST', 'The hit and run play requires a runner on first base.', '', '')
    };
  }
  const batter = getBatter(state);
  const result = advanceOnHit(state.runners, 2, batter);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs), ...nextBatterIndex(state),
    lastPlay: mkPlay('Hit and Run', 'HIT',
      'The runner on first breaks for second the instant the pitcher starts their windup. The batter must swing at any pitch. The runner\'s head start turns a single into a two-base advance.',
      'The gamble: if the batter misses or pops up, the runner is almost certainly caught stealing. If it works, the middle infielder breaks to cover second — opening a hole in the infield for the batted ball to go through.',
      'Hit and run — runner breaks early, batter must swing on anything'
    )
  };
}

// ── PLAY DISPATCH ──

const _plays = {
  strikeout, flyOut, lineOut, popOut, groundOut,
  walk, single, double: double_, triple, homeRun,
  hitByPitch, infieldHit, steal, caughtStealing,
  sacrificeBunt, intentionalWalk
};

function checkInningEnd(state) {
  if (state.outs < 3) return state;
  const side = state.halfInning === 'top' ? 'away' : 'home';
  const committed = state.inningScores[side].reduce((s, r) => s + r, 0);
  const halfRuns = state.score[side] - committed;
  const newInningScores = { ...state.inningScores, [side]: [...state.inningScores[side], halfRuns] };

  if (state.inning === 9 && state.halfInning === 'bottom' && state.score.home > state.score.away) {
    return { ...state, inningScores: newInningScores, gameOver: true };
  }
  if (state.halfInning === 'top') {
    return { ...state, inningScores: newInningScores, halfInning: 'bottom', outs: 0,
      runners: { first: null, second: null, third: null } };
  }
  if (state.inning >= 9) return { ...state, inningScores: newInningScores, gameOver: true };
  return { ...state, inningScores: newInningScores, inning: state.inning + 1, halfInning: 'top',
    outs: 0, runners: { first: null, second: null, third: null } };
}

function executePlay(key) {
  if (_sim.gameOver) return;
  const prevInning = _sim.inning;
  const prevHalf = _sim.halfInning;
  const prevScore = { ..._sim.score };
  let next = _plays[key](_sim);
  const logEntry = next.lastPlay
    ? { ...next.lastPlay, inning: _sim.inning, half: _sim.halfInning, outs: _sim.outs }
    : null;
  next = checkInningEnd(next);
  if (logEntry) next.eventLog = [logEntry, ..._sim.eventLog].slice(0, 24);
  _sim = next;
  renderSim();

  const runsScored = (_sim.score.away - prevScore.away) + (_sim.score.home - prevScore.home);
  if (runsScored > 0) {
    requestAnimationFrame(() => requestAnimationFrame(() => triggerCelebration(runsScored)));
  } else if (!_sim.gameOver && (_sim.inning !== prevInning || _sim.halfInning !== prevHalf)) {
    const half = _sim.halfInning === 'top' ? '▲ TOP' : '▼ BOTTOM';
    const text = `${half}  ·  ${innLabel(_sim.inning).toUpperCase()}`;
    requestAnimationFrame(() => requestAnimationFrame(() => triggerInningBanner(text)));
  }
}

// ── CELEBRATION ANIMATION ──

function triggerCelebration(runs) {
  const el = document.getElementById('simCelebration');
  if (!el) return;
  const msg = runs >= 4 ? '⚡ GRAND SLAM!' : runs === 3 ? '🏠 3 RUNS SCORE!' : runs === 2 ? '🏠 2 RUNS SCORE!' : '🏠 RUN SCORES!';
  el.textContent = msg;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'simCelebrate 2s ease-out forwards';

  ['simScoreAway', 'simScoreHome'].forEach(id => {
    const s = document.getElementById(id);
    if (!s) return;
    s.style.animation = 'none';
    void s.offsetWidth;
    s.style.animation = 'simScorePulse 0.6s ease-out';
    setTimeout(() => { if (s) s.style.animation = ''; }, 700);
  });
}

function triggerInningBanner(text) {
  const el = document.getElementById('simInningBanner');
  if (!el) return;
  el.textContent = text;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'simInningFlash 3s ease-out forwards';
}

// ── RENDER HELPERS ──

function innLabel(n) {
  return n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;
}

function resultColor(result) {
  const map = {
    'OUT': '#ff6b7a', 'HOME RUN': '#e3b341', 'HIT': '#7ee787', 'HIT + RUN SCORES': '#7ee787',
    'ON BASE': '#388bfd', 'ADVANCE': '#f0883e',
    'OUT + RUN SCORES': '#a371f7', 'OUT (RUNNER)': '#f0883e',
    '2 OUTS': '#ff6b7a'
  };
  return map[result] || '#64748b';
}

function renderScoreboard(s) {
  const innings = [1,2,3,4,5,6,7,8,9];
  const cols = '52px repeat(9,1fr) 50px';

  function cell(inn, side) {
    const idx = inn - 1;
    const scores = s.inningScores[side];
    if (scores[idx] !== undefined) {
      const v = scores[idx];
      const color = v > 0 ? (side === 'away' ? '#f0883e' : '#7ee787') : '#64748b';
      return `<div style="text-align:center;color:${color};font-size:1.04rem;font-weight:${v>0?'600':'400'}">${v}</div>`;
    }
    const isCurrent = inn === s.inning &&
      ((side === 'away' && s.halfInning === 'top') || (side === 'home' && s.halfInning === 'bottom'));
    if (isCurrent) return `<div style="text-align:center;color:#388bfd;font-size:0.95rem;line-height:1">▶</div>`;
    return `<div style="text-align:center;color:var(--border);font-size:1.0rem">—</div>`;
  }

  const outDots = [0,1,2].map(i =>
    `<div style="width:11px;height:11px;border-radius:50%;background:${i < s.outs ? '#ff6b7a' : 'var(--border)'};border:1.5px solid ${i < s.outs ? '#ff6b7a' : 'var(--border)'}"></div>`
  ).join('');

  return `
    <div style="background:var(--surface);border-radius:10px;overflow:hidden;border:1px solid var(--border);font-family:Oswald,sans-serif">
      <div style="display:grid;grid-template-columns:${cols};padding:5px 14px;background:var(--surface2);border-bottom:1px solid var(--border);align-items:center">
        <div></div>
        ${innings.map(i => `<div style="text-align:center;font-size:0.76rem;color:#475569;letter-spacing:1px">${i}</div>`).join('')}
        <div style="text-align:center;font-size:0.76rem;color:#64748b;letter-spacing:1px">R</div>
      </div>
      <div style="display:grid;grid-template-columns:${cols};padding:5px 14px;border-bottom:1px solid var(--surface);align-items:center">
        <div style="font-size:0.85rem;color:var(--text-muted);letter-spacing:1px">AWAY</div>
        ${innings.map(i => cell(i, 'away')).join('')}
        <div id="simScoreAway" style="text-align:center;font-size:1.15rem;font-weight:700;color:#f0883e">${s.score.away}</div>
      </div>
      <div style="display:grid;grid-template-columns:${cols};padding:7px 14px;border-bottom:1px solid var(--border);align-items:center">
        <div style="font-size:0.85rem;color:var(--text-muted);letter-spacing:1px">HOME</div>
        ${innings.map(i => cell(i, 'home')).join('')}
        <div id="simScoreHome" style="text-align:center;font-size:1.15rem;font-weight:700;color:#7ee787">${s.score.home}</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;padding:4px 14px;background:var(--surface2);flex-wrap:wrap">
        <div style="font-size:0.95rem;color:#7aa2d4;letter-spacing:1px">${s.halfInning === 'top' ? 'TOP' : 'BOT'} ${innLabel(s.inning)}</div>
        <div style="display:flex;gap:5px;align-items:center">
          ${outDots}
          <span style="font-size:0.85rem;color:#64748b;margin-left:3px">${s.outs} out${s.outs !== 1 ? 's' : ''}</span>
        </div>
        <button onclick="simReset()" style="margin-left:auto;padding:3px 11px;background:transparent;border:1px solid var(--border);border-radius:4px;color:var(--text-dim);font-size:0.85rem;font-family:Inter,sans-serif;cursor:pointer" onmouseover="this.style.color='var(--text-muted)';this.style.borderColor='var(--text-dim)'" onmouseout="this.style.color='var(--text-dim)';this.style.borderColor='var(--border)'">New Game</button>
      </div>
    </div>`;
}

function renderDiamond(s) {
  const r = s.runners;
  const currentBatter = getBatter(s);

  // Vertical stripes clipped to outfield
  const stripes = [];
  for (let x = 0; x < 600; x += 26) {
    stripes.push(`<rect x="${x}" y="0" width="13" height="480" fill="rgba(0,0,0,0.13)"/>`);
  }

  // Base bag + runner badge — infield-focused (same SVG coords as main field)
  function base(cx, cy, runner) {
    const w = 24;
    return `
      <rect x="${cx-w/2}" y="${cy-w/2}" width="${w}" height="${w}" rx="2"
        fill="${runner ? runner.color + '55' : 'white'}"
        stroke="${runner ? runner.color : 'rgba(255,255,255,0.6)'}"
        stroke-width="${runner ? 3 : 1.2}"
        transform="rotate(45,${cx},${cy})"/>
      ${runner ? `
        <circle cx="${cx}" cy="${cy}" r="20" fill="${runner.color}" stroke="white" stroke-width="2.5" opacity="0.96"/>
        <text x="${cx}" y="${cy+6}" text-anchor="middle" fill="#000" font-size="15" font-family="Oswald,sans-serif" font-weight="700">${runner.num}</text>
      ` : ''}`;
  }

  const occupiedParts = [];
  if (r.third)  occupiedParts.push(`<span style="color:${r.third.color}">${r.third.name} (3B)</span>`);
  if (r.second) occupiedParts.push(`<span style="color:${r.second.color}">${r.second.name} (2B)</span>`);
  if (r.first)  occupiedParts.push(`<span style="color:${r.first.color}">${r.first.name} (1B)</span>`);
  const occupiedText = occupiedParts.length === 0 ? 'Bases empty' : occupiedParts.join(' &nbsp;·&nbsp; ');

  return `
    <div style="position:relative">
      <svg viewBox="0 185 600 345" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;border-radius:8px;overflow:hidden">
        <defs>
          <clipPath id="simFieldClip">
            <path d="M300,470 L19,189 A398,398 0 0,1 581,189 Z"/>
          </clipPath>
        </defs>

        <!-- Brown warning track -->
        <path d="M300,470 L0,170 A424,424 0 0,1 600,170 Z" fill="#b07438"/>

        <!-- Outfield grass with stripes -->
        <path d="M300,470 L19,189 A398,398 0 0,1 581,189 Z" fill="#2e8b2e"/>
        <g clip-path="url(#simFieldClip)">
          ${stripes.join('')}
        </g>

        <!-- Infield dirt -->
        <ellipse cx="300" cy="380" rx="140" ry="102" fill="#a87040"/>

        <!-- Infield grass diamond -->
        <polygon points="300,290 390,380 300,470 210,380" fill="#2e8b2e" opacity="0.9"/>

        <!-- Base path lines (SS side) -->
        <line x1="210" y1="380" x2="300" y2="290" stroke="white" stroke-width="2.2"/>
        <line x1="300" y1="290" x2="390" y2="380" stroke="white" stroke-width="2.2"/>

        <!-- Foul lines -->
        <line x1="300" y1="470" x2="0"   y2="170" stroke="white" stroke-width="2.5"/>
        <line x1="300" y1="470" x2="600" y2="170" stroke="white" stroke-width="2.5"/>

        <!-- Pitcher's mound -->
        <circle cx="300" cy="384" r="20" fill="#a87040" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <rect x="289" y="381" width="22" height="7" rx="2" fill="#7a5025"/>

        <!-- Bases + runner badges -->
        ${base(300, 290, r.second)}
        ${base(390, 380, r.first)}
        ${base(210, 380, r.third)}

        <!-- Home plate -->
        <polygon points="300,484 286,471 286,457 314,457 314,471" fill="white"/>

        <!-- Batter's boxes -->
        <rect x="234" y="453" width="50" height="34" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <rect x="316" y="453" width="50" height="34" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>

        <!-- Current batter badge at home plate -->
        <circle cx="300" cy="497" r="20" fill="${currentBatter.color}" stroke="white" stroke-width="2.5" opacity="0.96"/>
        <text x="300" y="503" text-anchor="middle" fill="#000" font-size="15" font-family="Oswald,sans-serif" font-weight="700">${currentBatter.num}</text>
      </svg>

      <div id="simCelebration" style="
        position:absolute;top:40%;left:50%;
        transform:translate(-50%,-50%) scale(0.8);opacity:0;
        background:linear-gradient(135deg,#0b1f12,#0f2a1a);
        border:2px solid #238636;border-radius:10px;padding:10px 22px;
        font-family:Oswald,sans-serif;font-size:1.1rem;font-weight:700;color:#7ee787;
        white-space:nowrap;pointer-events:none;z-index:10;text-align:center;letter-spacing:1.5px;
      "></div>
      <div id="simInningBanner" style="
        position:absolute;top:48%;left:50%;
        transform:translate(-50%,-50%) scale(0.8);opacity:0;
        background:linear-gradient(135deg,#0a1929,#0f2342);
        border:2px solid #2d5fa855;border-radius:10px;padding:10px 24px;
        font-family:Oswald,sans-serif;font-size:1.1rem;font-weight:700;color:#7aa2d4;
        white-space:nowrap;pointer-events:none;z-index:11;text-align:center;letter-spacing:2px;
      "></div>
    </div>
    <div style="text-align:center;font-size:0.83rem;color:#64748b;margin-top:5px;line-height:1.6">
      ${occupiedText}
    </div>`;
}

function renderLineup(s) {
  const isTop = s.halfInning === 'top';
  const roster = isTop ? SIM_AWAY_ROSTER : SIM_HOME_ROSTER;
  const currentIdx = (isTop ? s.awayBatterIndex : s.homeBatterIndex) % 9;
  const teamLabel = isTop ? 'AWAY' : 'HOME';
  const teamColor = isTop ? '#f0883e' : '#7ee787';

  const runnerBases = {};
  if (s.runners.first)  runnerBases[s.runners.first.num]  = '1B';
  if (s.runners.second) runnerBases[s.runners.second.num] = '2B';
  if (s.runners.third)  runnerBases[s.runners.third.num]  = '3B';

  const rows = roster.map((p, i) => {
    const isCurrent = i === currentIdx;
    const base = runnerBases[p.num];
    return `
      <div style="display:flex;align-items:center;gap:5px;padding:3px 6px;
        background:${isCurrent ? p.color + '18' : 'transparent'};
        border-radius:4px;border-left:2px solid ${isCurrent ? p.color : 'transparent'}">
        <span style="font-size:0.75rem;color:${isCurrent ? p.color : '#475569'};font-family:Oswald,sans-serif;min-width:20px;flex-shrink:0">#${p.num}</span>
        <span style="font-size:0.8rem;color:${isCurrent ? p.color : '#64748b'};flex:1">${p.name}</span>
        ${base ? `<span style="font-size:0.73rem;font-family:Oswald,sans-serif;color:${p.color};background:${p.color}22;border:1px solid ${p.color}44;padding:1px 6px;border-radius:3px;flex-shrink:0">${base}</span>` : ''}
        ${isCurrent && !base ? `<span style="font-size:0.73rem;font-family:Oswald,sans-serif;color:${p.color};opacity:0.85;flex-shrink:0">AT BAT</span>` : ''}
      </div>`;
  }).join('');

  return `
    <div style="background:var(--surface2);border-radius:8px;border:1px solid var(--border);padding:8px 5px;height:100%;box-sizing:border-box">
      <div style="font-size:0.75rem;color:${teamColor};font-family:Oswald,sans-serif;letter-spacing:1.5px;padding:0 7px;margin-bottom:6px">
        ${teamLabel} BATTING ORDER
      </div>
      ${rows}
    </div>`;
}

function renderSim() {
  const el = document.getElementById('baseballSim');
  if (!el) return;
  const s = _sim;

  function vBtn(key, label, color) {
    return `<button onclick="simPlay('${key}')" style="display:block;width:100%;text-align:left;padding:5px 10px;border:none;border-top:1px solid ${color}18;background:transparent;color:${color};font-size:0.82rem;font-family:Inter,sans-serif;cursor:pointer;line-height:1.3" onmouseover="this.style.background='${color}14'" onmouseout="this.style.background='transparent'">${label}</button>`;
  }

  const btnHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
      <div style="background:rgba(255,107,122,0.05);border:1px solid rgba(255,107,122,0.22);border-radius:8px;overflow:hidden">
        <div style="padding:5px 10px;background:rgba(255,107,122,0.12);font-size:0.78rem;font-weight:700;color:#ff6b7a;letter-spacing:0.5px;font-family:Oswald,sans-serif">⭕ OUTS</div>
        ${vBtn('strikeout','Strikeout','#ff6b7a')}
        ${vBtn('flyOut','Fly Out','#ff6b7a')}
        ${vBtn('lineOut','Line Out','#ff6b7a')}
        ${vBtn('popOut','Pop-Up Out','#ff6b7a')}
        ${vBtn('groundOut','Ground Out','#ff6b7a')}
      </div>
      <div style="background:rgba(126,231,135,0.05);border:1px solid rgba(126,231,135,0.22);border-radius:8px;overflow:hidden">
        <div style="padding:5px 10px;background:rgba(126,231,135,0.12);font-size:0.78rem;font-weight:700;color:#7ee787;letter-spacing:0.5px;font-family:Oswald,sans-serif">✅ HITS</div>
        ${vBtn('single','Single','#7ee787')}
        ${vBtn('double','Double','#7ee787')}
        ${vBtn('triple','Triple','#7ee787')}
        ${vBtn('homeRun','Home Run','#e3b341')}
        ${vBtn('infieldHit','Infield Hit','#7ee787')}
      </div>
      <div style="background:rgba(56,139,253,0.05);border:1px solid rgba(56,139,253,0.22);border-radius:8px;overflow:hidden">
        <div style="padding:5px 10px;background:rgba(56,139,253,0.12);font-size:0.78rem;font-weight:700;color:#388bfd;letter-spacing:0.5px;font-family:Oswald,sans-serif">🔵 ON BASE</div>
        ${vBtn('walk','Walk (BB)','#388bfd')}
        ${vBtn('hitByPitch','Hit By Pitch','#388bfd')}
        ${vBtn('intentionalWalk','Int. Walk (IBB)','#388bfd')}
        <div style="padding:3px 10px;font-size:0.7rem;color:#64748b;border-top:1px solid var(--border);background:var(--surface2);font-family:Oswald,sans-serif;letter-spacing:0.5px">🏃 BASERUNNING</div>
        ${vBtn('steal','Stolen Base','#f0883e')}
        ${vBtn('caughtStealing','Caught Stealing','#ff6b7a')}
        <div style="padding:3px 10px;font-size:0.7rem;color:#64748b;border-top:1px solid var(--border);background:var(--surface2);font-family:Oswald,sans-serif;letter-spacing:0.5px">🧠 TACTICAL</div>
        ${vBtn('sacrificeBunt','Sac Bunt','#a371f7')}
      </div>
    </div>`;

  const lastPlayHTML = s.lastPlay ? `
    <div style="background:var(--surface2);border-radius:10px;padding:14px 16px;border:1px solid var(--border);margin-top:14px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
        <span style="font-family:Oswald,sans-serif;font-size:1.05rem;font-weight:700;color:var(--text)">${s.lastPlay.title}</span>
        <span style="background:${resultColor(s.lastPlay.result)};color:#0d1117;font-size:0.83rem;font-weight:700;padding:2px 9px;border-radius:4px;font-family:Oswald,sans-serif;flex-shrink:0">${s.lastPlay.result}</span>
      </div>
      <p style="font-size:1.05rem;color:var(--text-muted);line-height:1.6;margin-bottom:8px">${s.lastPlay.explanation}</p>
      ${s.lastPlay.rule ? `
        <div style="background:var(--surface);border-left:3px solid #388bfd44;border-radius:0 6px 6px 0;padding:9px 13px">
          <p style="font-size:0.98rem;color:var(--text-muted);line-height:1.55"><strong style="color:#7aa2d4">Rule:</strong> ${s.lastPlay.rule}</p>
          ${s.lastPlay.term ? `<p style="font-size:0.88rem;color:var(--text-dim);margin-top:5px;font-family:Oswald,sans-serif">📚 ${s.lastPlay.term}</p>` : ''}
        </div>
      ` : ''}
    </div>
  ` : `
    <div style="background:var(--surface2);border-radius:10px;padding:18px 16px;border:1px solid var(--border);margin-top:14px;text-align:center;color:var(--text-dim);font-size:1.05rem">
      Press any play button — see what happens on the field and learn the rule behind it.
    </div>
  `;

  const gameOverHTML = s.gameOver ? `
    <div style="background:linear-gradient(135deg,#0f2318,#111827);border:1px solid #238636;border-radius:10px;padding:18px;margin-top:14px;text-align:center">
      <div style="font-family:Oswald,sans-serif;font-size:1.3rem;font-weight:700;color:#7ee787;margin-bottom:6px">FINAL</div>
      <div style="font-size:1.1rem;color:#e2e8f0;font-family:Oswald,sans-serif">AWAY ${s.score.away} &nbsp;·&nbsp; HOME ${s.score.home}</div>
      <div style="margin-top:8px;color:#64748b;font-size:1.0rem">${s.score.away>s.score.home?'Away wins.':s.score.home>s.score.away?'Home wins.':'Tied — extra innings in real life.'}</div>
      <button onclick="simReset()" style="margin-top:12px;padding:7px 20px;background:#238636;border:none;border-radius:6px;color:white;font-family:Oswald,sans-serif;font-size:1.07rem;cursor:pointer">New Game</button>
    </div>
  ` : '';

  const logHTML = s.eventLog.length > 0 ? `
    <div style="margin-top:14px">
      <div style="font-size:0.88rem;font-weight:600;color:var(--text-dim);letter-spacing:1px;margin-bottom:6px;font-family:Oswald,sans-serif">PLAY LOG</div>
      <div style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:3px">
        ${s.eventLog.map((e,i) => `
          <div style="display:flex;align-items:center;gap:8px;padding:5px 9px;background:${i===0?'var(--surface2)':'transparent'};border-radius:5px;border:1px solid ${i===0?'var(--border)':'transparent'}">
            <span style="font-size:0.85rem;color:var(--text-dim);font-family:Oswald,sans-serif;min-width:60px;flex-shrink:0">${e.half==='top'?'TOP':'BOT'} ${e.inning} · ${e.outs}out</span>
            <span style="width:7px;height:7px;border-radius:2px;background:${resultColor(e.result)};flex-shrink:0"></span>
            <span style="font-size:0.95rem;color:var(--text-muted)">${e.title}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  el.innerHTML = `
    <div style="background:var(--surface);border-radius:12px;border:1px solid var(--border);overflow:hidden">

      <!-- Scoreboard: full width -->
      <div style="padding:10px 12px 0">${renderScoreboard(s)}</div>

      <!-- Diamond + Batting Order: side by side -->
      <div style="display:flex;gap:10px;padding:10px 12px 0;align-items:flex-start">
        <div style="flex:1;min-width:0">
          ${renderDiamond(s)}
        </div>
        <div style="flex:0 0 155px;align-self:stretch">
          ${renderLineup(s)}
        </div>
      </div>

      <!-- Play buttons: full width below -->
      <div style="padding:8px 12px 0">
        ${s.gameOver
          ? '<div style="color:#475569;font-size:1.07rem;padding:8px 0">Game over — press New Game to play again.</div>'
          : btnHTML}
      </div>

      <!-- Explanation + log: full width -->
      <div style="padding:0 12px 10px">
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
window.initSimulator = function() {
  _sim = createSimState();
  if (!document.getElementById('simStyles')) {
    const style = document.createElement('style');
    style.id = 'simStyles';
    style.textContent = `
      @keyframes simCelebrate {
        0%   { opacity:0; transform:translate(-50%,-50%) scale(0.7); }
        12%  { opacity:1; transform:translate(-50%,-50%) scale(1.12); }
        25%  { transform:translate(-50%,-50%) scale(1); }
        70%  { opacity:1; transform:translate(-50%,-50%) scale(1); }
        100% { opacity:0; transform:translate(-50%,-50%) scale(0.92); }
      }
      @keyframes simScorePulse {
        0%   { color: inherit; }
        25%  { color: #e3b341; text-shadow: 0 0 12px #e3b34188; transform: scale(1.25); display:inline-block; }
        100% { color: inherit; text-shadow: none; transform: scale(1); }
      }
      @keyframes simInningFlash {
        0%   { opacity:0; transform:translate(-50%,-50%) scale(0.75); }
        10%  { opacity:1; transform:translate(-50%,-50%) scale(1.1); }
        20%  { transform:translate(-50%,-50%) scale(1); }
        70%  { opacity:1; }
        100% { opacity:0; transform:translate(-50%,-50%) scale(0.95); }
      }
    `;
    document.head.appendChild(style);
  }
  renderSim();
};

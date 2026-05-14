// ── BASEBALL SITUATION SIMULATOR ──

function createSimState() {
  return {
    inning: 1, halfInning: 'top', outs: 0,
    score: { away: 0, home: 0 },
    runners: { first: false, second: false, third: false },
    inningScores: { away: [], home: [] },
    eventLog: [], lastPlay: null, gameOver: false
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
    if (runners.second) { r.third = true; if (runners.third) runs = 1; }
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
  // H&R backfire: runner on 1st + fewer than 2 outs, ~15% chance
  if (state.runners.first && state.outs < 2 && Math.random() < 0.15) {
    const newRunners = { ...state.runners, first: false };
    return { ...state, outs: state.outs + 2, runners: newRunners,
      lastPlay: mkPlay("Strike 'Em Out, Throw 'Em Out", '2 OUTS',
        "Hit-and-run backfires! The runner broke on the pitch, but the batter struck out. The catcher fires to second — runner hung out to dry. Two outs on one pitch.",
        "The nightmare hit-and-run outcome: the batter whiffs while the runner is fully committed. The catcher easily throws to second before the runner arrives. This 'strike 'em out, throw 'em out' double play can end an inning in an instant and kills momentum.",
        "K + CS — hit-and-run backfire ('strike 'em out, throw 'em out')"
      )
    };
  }
  return { ...state, outs: state.outs + 1,
    lastPlay: mkPlay('Strikeout', 'OUT',
      'The batter gets strike three — either swinging and missing, or watching a called strike in the zone.',
      'Three strikes and you\'re out. A swinging strike is any swing that misses. A called strike is any pitch inside the strike zone that the batter doesn\'t swing at.',
      'K (strikeout)'
    )
  };
}

function flyOut(state) {
  // Context-smart: if runner on 3rd with fewer than 2 outs, this becomes a sacrifice fly
  if (state.runners.third && state.outs < 2) {
    return {
      ...state, outs: state.outs + 1,
      runners: { ...state.runners, third: false },
      score: applyRuns(state, 1),
      lastPlay: mkPlay('Sacrifice Fly', 'OUT + RUN SCORES',
        'The batter hits a deep fly ball that\'s caught — but the runner on third tags up and scores after the catch. The batter is out, but a run scores and the batter isn\'t penalized in their batting average.',
        'A sacrifice fly (SF) is not counted as an at-bat — so it doesn\'t hurt the batter\'s average. The runner on third must "tag up": stay on the base until the moment of the catch, then sprint home. Requires fewer than 2 outs.',
        'SF — sacrifice fly (fly out + runner on 3rd scores via tag-up)'
      )
    };
  }
  return { ...state, outs: state.outs + 1,
    lastPlay: mkPlay('Fly Out', 'OUT',
      'The batter hits the ball into the air and a fielder catches it before it touches the ground. Runners must "tag up" — touch their original base at the moment of the catch — before they can advance.',
      'Any ball caught in the air is an out, fair or foul. After the catch, runners may advance at their own risk. With a runner on third and fewer than 2 outs, a deep enough fly ball becomes a sacrifice fly.',
      'F (fly ball) — caught in the air'
    )
  };
}

function lineOut(state) {
  // Runner on 1st with fewer than 2 outs → ~35% doubled off, ~65% runner holds
  if (state.runners.first && state.outs < 2) {
    if (Math.random() < 0.35) {
      const doubledDesc = [
        'The runner broke early on the pitch — the fielder snags the line drive and fires back to first before the runner can scramble back. Doubled off!',
        'Hit-and-run gone wrong: the runner was moving, the fielder makes a tremendous catch, and the relay back to first completes the double play.',
      ][Math.floor(Math.random() * 2)];
      const newRunners = { ...state.runners, first: false };
      return { ...state, outs: state.outs + 2, runners: newRunners,
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
      return { ...state, outs: state.outs + 1,
        lastPlay: mkPlay('Line Drive Out', 'OUT',
          holdDesc,
          'Smart baserunning: on a line drive, good runners hold until they\'re sure the ball won\'t be caught. It costs them a potential advance, but saves them from being doubled off. The defense converted only one out this time.',
          'L (line drive) — runner held, no double play (~65% outcome with runner on 1st)'
        )
      };
    }
  }
  return { ...state, outs: state.outs + 1,
    lastPlay: mkPlay('Line Drive Out', 'OUT',
      'The batter rips a hard line drive that\'s caught by a fielder before it bounces. Spectacular — hit hard, but the fielder was in exactly the right place.',
      'A line drive caught in the air is the same as any fly out. Caught so quickly that runners often can\'t react — leaving early can get them "doubled off" their base before they can return.',
      'L (line drive) — caught before touching the ground'
    )
  };
}

function popOut(state) {
  const ifr = state.outs < 2 && state.runners.first && state.runners.second;
  return { ...state, outs: state.outs + 1,
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
  // Context 1: runner on 3rd with fewer than 2 outs → RBI ground out (takes priority)
  if (state.runners.third && state.outs < 2) {
    const newRunners = { first: false, second: false, third: false };
    if (state.runners.second) newRunners.third = true;
    if (state.runners.first) newRunners.second = true;
    return { ...state, outs: state.outs + 1, runners: newRunners, score: applyRuns(state, 1),
      lastPlay: mkPlay('RBI Ground Out', 'OUT + RUN SCORES',
        'The batter grounds out to first — but the runner on third scores on the play. A "productive out": the batter goes down, but a run crosses home plate.',
        'With fewer than 2 outs and a runner on third, the defense usually takes the sure out at first rather than risk an unlikely throw home. The runner times the ground ball and sprints in. This counts as an RBI for the batter despite making an out.',
        'RBI — run batted in (scored on a ground out, not a sacrifice fly)'
      )
    };
  }
  // Context 2: runner on 1st with fewer than 2 outs → 50% regular out / 35% DP / 15% FC
  if (state.runners.first && state.outs < 2) {
    const roll = Math.random();
    if (roll < 0.35) {
      // Double play
      const dpDesc = [
        'Sharply hit to short — a textbook 6-4-3. SS fires to second, relay to first in time. The runner from first never had a chance.',
        'Right at the second baseman — quick 4-6-3 double play. Ball to second, flip to short, relay to first.',
        'Hard grounder to third — 5-4-3 twin killing. Fast throw across the diamond to second, then on to first.',
      ][Math.floor(Math.random() * 3)];
      const newRunners = { first: false, second: state.runners.second, third: state.runners.third };
      return { ...state, outs: state.outs + 2, runners: newRunners,
        lastPlay: mkPlay('Double Play (6-4-3)', '2 OUTS',
          dpDesc,
          'The double play works because of the force: with a runner on first, the fielder steps on second before the runner arrives — no tag needed — then relays to first. Whether it converts depends on where the ball is hit, fielder positioning, and the batter\'s speed. A GIDP (grounded into double play) is a negative stat for the batter.',
          'GIDP — grounded into double play (~35% with runner on 1st)'
        )
      };
    } else if (roll < 0.50) {
      // Fielder's Choice: runner out at 2nd, batter safe at 1st
      const fcDesc = [
        'Fielder charges, grabs the slow roller, and fires to second for the force on the runner. No time for the relay — batter reaches first safely.',
        'Ground ball to short — the SS fires to second to get the lead runner. The defense takes the sure out, batter on first.',
      ][Math.floor(Math.random() * 2)];
      const newRunners = { first: true, second: state.runners.second, third: state.runners.third };
      return { ...state, outs: state.outs + 1, runners: newRunners,
        lastPlay: mkPlay("Fielder's Choice", 'OUT (RUNNER)',
          fcDesc,
          "A fielder's choice (FC): the fielder chose to retire the baserunner at second instead of the batter. The batter reaches first safely but gets no hit credit — the scorer rules they'd have been out with a throw to first. FC doesn't hurt the batter's batting average.",
          "FC — fielder's choice (batter safe at 1st, runner out at 2nd; ~15% of ground balls with runner on 1st)"
        )
      };
    } else {
      // Regular ground out (50%) — runner advances to 2nd
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
      return { ...state, outs: state.outs + 1, runners: result.runners,
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
  return { ...state, outs: state.outs + 1, runners: result.runners,
    lastPlay: mkPlay('Ground Out', 'OUT',
      'The batter hits the ball on the ground and is thrown out at first base. Forced runners — those who had to move because the batter needed their base — advance one base.',
      'When the batter is put out at first, the force is removed. A runner on third who was "forced" is no longer forced — a play at home now requires a tag, not just stepping on the plate.',
      '1-3 putout (ball to fielder, throw to first base)'
    )
  };
}

function walk(state) {
  const result = advanceOnWalk(state.runners);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Walk (BB)', 'ON BASE',
      'The pitcher throws four balls outside the strike zone. The batter takes first base free. Only "forced" runners advance — those who can\'t stay because the batter needs their base.',
      'A runner on second with nobody on first is NOT forced on a walk — they stay put. Only the chain from first base backward is forced. A bases-loaded walk forces everyone, including the runner on third who scores.',
      'BB (base on balls) — 4 balls outside the zone'
    )
  };
}

function single(state) {
  // H&R: runner on 1st (no runner on 2nd), ~25% chance
  if (state.runners.first && !state.runners.second && Math.random() < 0.25) {
    const runs = state.runners.third ? 1 : 0;
    const newRunners = { first: true, second: false, third: true };
    return { ...state, runners: newRunners, score: applyRuns(state, runs),
      lastPlay: mkPlay('Single — Hit and Run', 'HIT',
        'Hit and run was on — the runner broke the moment the pitcher started their delivery. The batter made contact and the head start puts the runner all the way at third instead of second.',
        'The hit and run payoff: instead of 1st and 2nd, you now have 1st and 3rd. The runner\'s early jump gains a full extra base. The risk is if the batter misses or pops up — the runner is fully exposed with no protection.',
        'H&R — hit and run (runner advances an extra base on the head start)'
      )
    };
  }
  // Scoring position: runner on 2nd → 75% scores on a single, 25% holds at 3rd
  if (state.runners.second) {
    const scoresFromSecond = Math.random() < 0.75;
    let runs = state.runners.third ? 1 : 0;
    if (scoresFromSecond) runs++;
    const newRunners = {
      first: true,
      second: state.runners.first ? true : false,
      third: scoresFromSecond ? false : true
    };
    return { ...state, runners: newRunners, score: applyRuns(state, runs),
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
  const result = advanceOnHit(state.runners, 1);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Single', 'HIT',
      'The batter hits the ball and reaches first base safely. All runners advance at least one base.',
      'A single is the most common hit. Runners on second and third typically score. A runner on first usually reaches third on a ball hit into the outfield gap.',
      '1B (single) — one base hit'
    )
  };
}

function double_(state) {
  // H&R: runner on 1st (no runner on 2nd), ~20% chance — runner scores instead of stopping at 3rd
  if (state.runners.first && !state.runners.second && Math.random() < 0.2) {
    const runs = (state.runners.third ? 1 : 0) + 1;
    const newRunners = { first: false, second: true, third: false };
    return { ...state, runners: newRunners, score: applyRuns(state, runs),
      lastPlay: mkPlay('Double — Hit and Run', 'HIT',
        'Hit and run was on — the runner from first was already in full sprint. The double scores them easily; without the head start they would have stopped at third.',
        'The H&R turns a normal double into a run scored. A stationary runner on first reaches third on a double; a running runner scores. This is why managers call H&R with a fast runner: the extra base can mean the difference between a runner in scoring position and a run on the board.',
        'H&R double — runner scores from 1st (would only reach 3rd without the head start)'
      )
    };
  }
  const result = advanceOnHit(state.runners, 2);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Double', 'HIT',
      'The batter hits the ball into the gap and reaches second base. A leadoff double immediately puts a runner in scoring position.',
      'The gap between outfielders is the classic target for a double. Analytically, doubles are the highest-value non-homer hit because they combine base advancement with RBI potential.',
      '2B (double) — two base hit'
    )
  };
}

function triple(state) {
  const result = advanceOnHit(state.runners, 3);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Triple', 'HIT',
      'The rarest hit in baseball — the batter reaches third base. Requires the ball to land in the deepest part of the outfield and the batter to have exceptional speed. Almost everyone on base scores.',
      'Triples are so rare that some ballparks almost never see them. Speed matters enormously: the same ball is a double for a slow runner and a triple for a fast one.',
      '3B (triple) — three base hit'
    )
  };
}

function homeRun(state) {
  const result = advanceOnHit(state.runners, 4);
  const onBase = [state.runners.first, state.runners.second, state.runners.third].filter(Boolean).length;
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
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
  const result = advanceOnWalk(state.runners);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
    lastPlay: mkPlay('Hit by Pitch (HBP)', 'ON BASE',
      'The pitcher hits the batter with the ball. The batter automatically takes first base — same result as a walk. Forced runners advance exactly as on a walk.',
      'A hit-by-pitch advances runners the same way as a walk: only forced runners move. If the umpire suspects it was intentional (retaliation), warnings are issued — next offense means ejection.',
      'HBP — same runner advancement as a walk'
    )
  };
}

function infieldHit(state) {
  const result = advanceOnHit(state.runners, 1);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
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
  if (newRunners.second) { newRunners.second = false; newRunners.third = true; description = 'Runner on second steals third!'; }
  else { newRunners.first = false; newRunners.second = true; description = 'Runner on first steals second!'; }
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
  if (newRunners.second) { newRunners.second = false; description = 'Runner caught trying to steal third.'; }
  else { newRunners.first = false; description = 'Runner caught trying to steal second.'; }
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
  const newRunners = { first: false, second: false, third: false };
  let runs = 0;
  if (state.runners.third) runs++;
  if (state.runners.second) newRunners.third = true;
  if (state.runners.first) newRunners.second = true;
  return { ...state, outs: state.outs + 1, runners: newRunners, score: applyRuns(state, runs),
    lastPlay: mkPlay('Sacrifice Bunt', 'OUT',
      'The batter deliberately taps the ball softly near home plate, letting the defense throw them out at first — but all runners advance one base. A tactical trade of an out for position.',
      'Modern analytics have made sacrifice bunts controversial: you\'re giving up an out (scarce) for one base advance (less valuable). MLB managers now bunt far less than they used to. Still used in specific late-game situations.',
      'SAC — sacrifice bunt (batter out, all runners advance one base)'
    )
  };
}

function intentionalWalk(state) {
  const result = advanceOnWalk(state.runners);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
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
  const newRunners = { ...state.runners };
  let description;
  if (state.runners.third) {
    newRunners.first = true; newRunners.third = false;
    description = 'Fielder throws home trying to get the runner — out! Batter reaches first safely.';
  } else if (state.runners.second) {
    newRunners.first = true; newRunners.second = false;
    description = 'Fielder throws to third to retire the advancing runner — out! Batter reaches first.';
  } else {
    newRunners.first = true; newRunners.second = false;
    description = 'Fielder throws to second to get the forced runner — out! Batter reaches first on the play.';
  }
  return { ...state, outs: state.outs + 1, runners: newRunners,
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
  const result = advanceOnHit(state.runners, 2);
  return { ...state, runners: result.runners, score: applyRuns(state, result.runs),
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
      runners: { first: false, second: false, third: false } };
  }
  if (state.inning >= 9) return { ...state, inningScores: newInningScores, gameOver: true };
  return { ...state, inningScores: newInningScores, inning: state.inning + 1, halfInning: 'top',
    outs: 0, runners: { first: false, second: false, third: false } };
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
  void el.offsetWidth; // force reflow
  el.style.animation = 'simCelebrate 2s ease-out forwards';

  // Also pulse the score column
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
      return `<div style="text-align:center;color:${color};font-size:0.85rem;font-weight:${v>0?'600':'400'}">${v}</div>`;
    }
    const isCurrent = inn === s.inning &&
      ((side === 'away' && s.halfInning === 'top') || (side === 'home' && s.halfInning === 'bottom'));
    if (isCurrent) return `<div style="text-align:center;color:#388bfd;font-size:0.78rem;line-height:1">▶</div>`;
    return `<div style="text-align:center;color:#1e293b;font-size:0.82rem">—</div>`;
  }

  const outDots = [0,1,2].map(i =>
    `<div style="width:11px;height:11px;border-radius:50%;background:${i < s.outs ? '#ff6b7a' : '#1e293b'};border:1.5px solid ${i < s.outs ? '#ff6b7a' : '#2d3748'}"></div>`
  ).join('');

  return `
    <div style="background:#0d1117;border-radius:10px;overflow:hidden;border:1px solid #1e293b;font-family:Oswald,sans-serif">
      <div style="display:grid;grid-template-columns:${cols};padding:5px 14px;background:#161b22;border-bottom:1px solid #1e293b;align-items:center">
        <div></div>
        ${innings.map(i => `<div style="text-align:center;font-size:0.62rem;color:#475569;letter-spacing:1px">${i}</div>`).join('')}
        <div style="text-align:center;font-size:0.62rem;color:#64748b;letter-spacing:1px">R</div>
      </div>
      <div style="display:grid;grid-template-columns:${cols};padding:7px 14px;border-bottom:1px solid #0d1117;align-items:center">
        <div style="font-size:0.7rem;color:#94a3b8;letter-spacing:1px">AWAY</div>
        ${innings.map(i => cell(i, 'away')).join('')}
        <div id="simScoreAway" style="text-align:center;font-size:1.15rem;font-weight:700;color:#f0883e">${s.score.away}</div>
      </div>
      <div style="display:grid;grid-template-columns:${cols};padding:7px 14px;border-bottom:1px solid #1e293b;align-items:center">
        <div style="font-size:0.7rem;color:#94a3b8;letter-spacing:1px">HOME</div>
        ${innings.map(i => cell(i, 'home')).join('')}
        <div id="simScoreHome" style="text-align:center;font-size:1.15rem;font-weight:700;color:#7ee787">${s.score.home}</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;padding:7px 14px;background:#161b22;flex-wrap:wrap">
        <div style="font-size:0.78rem;color:#7aa2d4;letter-spacing:1px">${s.halfInning === 'top' ? 'TOP' : 'BOT'} ${innLabel(s.inning)}</div>
        <div style="display:flex;gap:5px;align-items:center">
          ${outDots}
          <span style="font-size:0.7rem;color:#64748b;margin-left:3px">${s.outs} out${s.outs !== 1 ? 's' : ''}</span>
        </div>
        <button onclick="simReset()" style="margin-left:auto;padding:3px 11px;background:transparent;border:1px solid #1e293b;border-radius:4px;color:#64748b;font-size:0.7rem;font-family:Inter,sans-serif;cursor:pointer" onmouseover="this.style.color='#94a3b8';this.style.borderColor='#334155'" onmouseout="this.style.color='#64748b';this.style.borderColor='#1e293b'">New Game</button>
      </div>
    </div>`;
}

function renderDiamond(s) {
  const r = s.runners;
  const occupied = [r.first, r.second, r.third].filter(Boolean).length;

  const base = (cx, cy, key) => {
    const on = r[key];
    return `
      <rect x="${cx-10}" y="${cy-10}" width="20" height="20" rx="2"
        fill="${on ? '#f0883e' : 'rgba(255,255,255,0.82)'}"
        stroke="${on ? '#f5a040' : 'rgba(255,255,255,0.25)'}"
        stroke-width="${on ? 2.5 : 1.5}"
        transform="rotate(45,${cx},${cy})"/>
      ${on ? `<text x="${cx}" y="${cy+4}" text-anchor="middle" dominant-baseline="middle"
        fill="white" font-size="10" font-family="Oswald,sans-serif" font-weight="700">R</text>` : ''}`;
  };

  return `
    <div style="position:relative;width:100%">
      <svg viewBox="0 0 200 215" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
        <defs>
          <radialGradient id="gGrad" cx="50%" cy="70%" r="65%">
            <stop offset="0%" stop-color="#122a18"/>
            <stop offset="100%" stop-color="#0b1c10"/>
          </radialGradient>
          <radialGradient id="dGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#221508"/>
            <stop offset="100%" stop-color="#160d04"/>
          </radialGradient>
        </defs>

        <!-- Background -->
        <rect width="200" height="215" fill="#0b1018" rx="12"/>

        <!-- Outfield grass sector -->
        <path d="M100,168 L16,62 A112,112 0 0,1 184,62 Z" fill="url(#gGrad)"/>
        <!-- Outfield fence arc -->
        <path d="M16,62 A112,112 0 0,1 184,62" fill="none" stroke="#1e3d28" stroke-width="3" stroke-linecap="round"/>

        <!-- Infield dirt -->
        <ellipse cx="100" cy="122" rx="63" ry="56" fill="url(#dGrad)"/>

        <!-- Infield grass (the square between bases) -->
        <polygon points="100,52 158,110 100,168 42,110" fill="url(#gGrad)"/>

        <!-- Foul lines -->
        <line x1="100" y1="172" x2="16" y2="62" stroke="rgba(255,255,255,0.28)" stroke-width="1.2"/>
        <line x1="100" y1="172" x2="184" y2="62" stroke="rgba(255,255,255,0.28)" stroke-width="1.2"/>

        <!-- Pitcher's mound -->
        <circle cx="100" cy="110" r="11" fill="#1e1208" stroke="#2a1a08" stroke-width="1.5"/>
        <rect x="94.5" y="108" width="11" height="4" rx="1" fill="#2e2010"/>

        <!-- Bases -->
        ${base(100, 52, 'second')}
        ${base(42, 110, 'third')}
        ${base(158, 110, 'first')}

        <!-- Home plate -->
        <polygon points="100,180 90,171 90,161 110,161 110,171" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>

        <!-- Base labels -->
        <text x="100" y="34" text-anchor="middle" fill="#5a6880" font-size="9" font-family="Inter,sans-serif" letter-spacing="0.5">2B</text>
        <text x="22"  y="113" text-anchor="middle" fill="#5a6880" font-size="9" font-family="Inter,sans-serif" letter-spacing="0.5">3B</text>
        <text x="178" y="113" text-anchor="middle" fill="#5a6880" font-size="9" font-family="Inter,sans-serif" letter-spacing="0.5">1B</text>
        <text x="100" y="200" text-anchor="middle" fill="#5a6880" font-size="9" font-family="Inter,sans-serif" letter-spacing="0.5">HOME</text>
      </svg>

      <!-- Celebration overlay -->
      <div id="simCelebration" style="
        position:absolute;top:42%;left:50%;
        transform:translate(-50%,-50%) scale(0.8);opacity:0;
        background:linear-gradient(135deg,#0b1f12,#0f2a1a);
        border:2px solid #238636;border-radius:10px;
        padding:10px 22px;
        font-family:Oswald,sans-serif;font-size:1.1rem;font-weight:700;color:#7ee787;
        white-space:nowrap;pointer-events:none;z-index:10;
        text-align:center;letter-spacing:1.5px;
      "></div>
      <!-- Inning change banner -->
      <div id="simInningBanner" style="
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%) scale(0.8);opacity:0;
        background:linear-gradient(135deg,#0a1929,#0f2342);
        border:2px solid #2d5fa855;border-radius:10px;
        padding:10px 24px;
        font-family:Oswald,sans-serif;font-size:1.1rem;font-weight:700;color:#7aa2d4;
        white-space:nowrap;pointer-events:none;z-index:11;
        text-align:center;letter-spacing:2px;
      "></div>
    </div>
    <div style="text-align:center;font-size:0.78rem;color:#64748b;margin-top:8px;letter-spacing:0.5px">
      ${occupied === 0 ? 'Bases empty' : [r.third?'3rd':'',r.second?'2nd':'',r.first?'1st':''].filter(Boolean).join(' · ') + ' occupied'}
    </div>`;
}

function renderSim() {
  const el = document.getElementById('baseballSim');
  if (!el) return;
  const s = _sim;

  const btns = [
    { key: 'strikeout',       label: 'Strikeout',        color: '#ff6b7a', cat: 'out' },
    { key: 'flyOut',          label: 'Fly Out',           color: '#ff6b7a', cat: 'out' },
    { key: 'lineOut',         label: 'Line Out',          color: '#ff6b7a', cat: 'out' },
    { key: 'popOut',          label: 'Pop-Up Out',        color: '#ff6b7a', cat: 'out' },
    { key: 'groundOut',       label: 'Ground Out',        color: '#ff6b7a', cat: 'out' },
    { key: 'single',          label: 'Single',            color: '#7ee787', cat: 'hit' },
    { key: 'double',          label: 'Double',            color: '#7ee787', cat: 'hit' },
    { key: 'triple',          label: 'Triple',            color: '#7ee787', cat: 'hit' },
    { key: 'homeRun',         label: 'Home Run',          color: '#e3b341', cat: 'hit' },
    { key: 'infieldHit',      label: 'Infield Hit',       color: '#7ee787', cat: 'hit' },
    { key: 'walk',            label: 'Walk (BB)',          color: '#388bfd', cat: 'special' },
    { key: 'hitByPitch',      label: 'Hit By Pitch',       color: '#388bfd', cat: 'special' },
    { key: 'intentionalWalk', label: 'Int. Walk (IBB)',    color: '#388bfd', cat: 'special' },
    { key: 'steal',           label: 'Stolen Base',        color: '#f0883e', cat: 'baserunning' },
    { key: 'caughtStealing',  label: 'Caught Stealing',    color: '#ff6b7a', cat: 'baserunning' },
    { key: 'sacrificeBunt',   label: 'Sac Bunt',           color: '#a371f7', cat: 'tactical' },
  ];

  const catMeta = {
    out:         { label: '⭕ Outs',       order: 0 },
    hit:         { label: '✅ Hits',        order: 1 },
    special:     { label: '🔵 On Base',     order: 2 },
    baserunning: { label: '🏃 Baserunning', order: 3 },
    tactical:    { label: '🧠 Tactical',    order: 4 }
  };

  const grouped = {};
  btns.forEach(b => { if (!grouped[b.cat]) grouped[b.cat] = []; grouped[b.cat].push(b); });

  const btnHTML = Object.keys(catMeta)
    .sort((a, b) => catMeta[a].order - catMeta[b].order)
    .map(cat => `
      <div style="margin-bottom:10px">
        <div style="font-size:0.73rem;font-weight:600;color:#94a3b8;letter-spacing:1px;margin-bottom:6px;font-family:Oswald,sans-serif">${catMeta[cat].label}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">
          ${(grouped[cat]||[]).map(b => `
            <button onclick="simPlay('${b.key}')"
              style="padding:6px 12px;border:1px solid ${b.color}33;border-radius:6px;background:${b.color}0f;color:${b.color};font-size:0.84rem;font-family:Inter,sans-serif;cursor:pointer;transition:background 0.12s,border-color 0.12s;line-height:1.2"
              onmouseover="this.style.background='${b.color}22';this.style.borderColor='${b.color}77'"
              onmouseout="this.style.background='${b.color}0f';this.style.borderColor='${b.color}33'"
            >${b.label}</button>
          `).join('')}
        </div>
      </div>
    `).join('');

  const lastPlayHTML = s.lastPlay ? `
    <div style="background:#0d1117;border-radius:10px;padding:14px 16px;border:1px solid #1e293b;margin-top:14px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
        <span style="font-family:Oswald,sans-serif;font-size:1.05rem;font-weight:700;color:#e2e8f0">${s.lastPlay.title}</span>
        <span style="background:${resultColor(s.lastPlay.result)};color:#0d1117;font-size:0.68rem;font-weight:700;padding:2px 9px;border-radius:4px;font-family:Oswald,sans-serif;flex-shrink:0">${s.lastPlay.result}</span>
      </div>
      <p style="font-size:0.86rem;color:#b1bac4;line-height:1.6;margin-bottom:8px">${s.lastPlay.explanation}</p>
      ${s.lastPlay.rule ? `
        <div style="background:#161b22;border-left:3px solid #388bfd44;border-radius:0 6px 6px 0;padding:9px 13px">
          <p style="font-size:0.8rem;color:#94a3b8;line-height:1.55"><strong style="color:#7aa2d4">Rule:</strong> ${s.lastPlay.rule}</p>
          ${s.lastPlay.term ? `<p style="font-size:0.72rem;color:#64748b;margin-top:5px;font-family:Oswald,sans-serif">📚 ${s.lastPlay.term}</p>` : ''}
        </div>
      ` : ''}
    </div>
  ` : `
    <div style="background:#0d1117;border-radius:10px;padding:18px 16px;border:1px solid #1e293b;margin-top:14px;text-align:center;color:#64748b;font-size:0.86rem">
      Press any play button — see what happens on the field and learn the rule behind it.
    </div>
  `;

  const gameOverHTML = s.gameOver ? `
    <div style="background:linear-gradient(135deg,#0f2318,#111827);border:1px solid #238636;border-radius:10px;padding:18px;margin-top:14px;text-align:center">
      <div style="font-family:Oswald,sans-serif;font-size:1.3rem;font-weight:700;color:#7ee787;margin-bottom:6px">FINAL</div>
      <div style="font-size:1.1rem;color:#e2e8f0;font-family:Oswald,sans-serif">AWAY ${s.score.away} &nbsp;·&nbsp; HOME ${s.score.home}</div>
      <div style="margin-top:8px;color:#64748b;font-size:0.82rem">${s.score.away>s.score.home?'Away wins.':s.score.home>s.score.away?'Home wins.':'Tied — extra innings in real life.'}</div>
      <button onclick="simReset()" style="margin-top:12px;padding:7px 20px;background:#238636;border:none;border-radius:6px;color:white;font-family:Oswald,sans-serif;font-size:0.88rem;cursor:pointer">New Game</button>
    </div>
  ` : '';

  const logHTML = s.eventLog.length > 0 ? `
    <div style="margin-top:14px">
      <div style="font-size:0.72rem;font-weight:600;color:#475569;letter-spacing:1px;margin-bottom:6px;font-family:Oswald,sans-serif">PLAY LOG</div>
      <div style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:3px">
        ${s.eventLog.map((e,i) => `
          <div style="display:flex;align-items:center;gap:8px;padding:5px 9px;background:${i===0?'#161b22':'transparent'};border-radius:5px;border:1px solid ${i===0?'#1e293b':'transparent'}">
            <span style="font-size:0.7rem;color:#64748b;font-family:Oswald,sans-serif;min-width:60px;flex-shrink:0">${e.half==='top'?'TOP':'BOT'} ${e.inning} · ${e.outs}out</span>
            <span style="width:7px;height:7px;border-radius:2px;background:${resultColor(e.result)};flex-shrink:0"></span>
            <span style="font-size:0.78rem;color:#94a3b8">${e.title}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  el.innerHTML = `
    <div style="background:#111827;border-radius:12px;border:1px solid #1e293b;overflow:hidden">
      <!-- Scoreboard full width -->
      <div style="padding:14px 14px 0">${renderScoreboard(s)}</div>

      <!-- Main body: diamond left, buttons right -->
      <div style="display:flex;gap:0;padding:14px">
        <!-- Diamond column -->
        <div style="flex:0 0 280px;min-width:0;padding-right:16px">
          ${renderDiamond(s)}
        </div>
        <!-- Buttons column -->
        <div style="flex:1;min-width:0;overflow:hidden">
          ${s.gameOver
            ? '<div style="color:#475569;font-size:0.88rem;padding:8px 0">Game over — press New Game to play again.</div>'
            : btnHTML}
        </div>
      </div>

      <!-- Explanation + log full width -->
      <div style="padding:0 14px 14px">
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
  // Inject animation keyframes once
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

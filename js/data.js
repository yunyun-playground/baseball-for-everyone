// ── ALL CONTENT DATA ──

const PITCHES = {
  fastball: {
    name: 'Four-Seam Fastball',
    abbr: 'FF',
    color: '#388bfd',
    speed: '90–100 mph',
    movement: 'Straight, slight rise',
    path: { cx1: 0, cy1: -20, cx2: 0, cy2: 0 },   // relative to straight line
    explain: 'The pitch everyone learns first. Pure speed, minimal movement. Top pitchers throw 100+ mph — the ball arrives in about 0.4 seconds.',
    keys: ['High backspin creates "rise" effect', 'Thrown with all four seams rotating', 'Most common pitch in baseball'],
    famous: 'Aroldis Chapman holds the MLB record at 105.8 mph'
  },
  sinker: {
    name: 'Sinker (Two-Seam)',
    abbr: '2S',
    color: '#58a6ff',
    speed: '88–95 mph',
    movement: 'Drops and moves toward arm side',
    path: { cx1: 8, cy1: -10, cx2: 15, cy2: 20 },
    explain: 'Looks like a fastball until the last moment, then dives down and in. Designed to induce weak ground balls.',
    keys: ['Two seams rotate on the same axis', 'Arm-side movement (right for RHP)', 'Generates ground balls → double plays'],
    famous: "Wang Chien-Ming (王建民) built his MLB career on one of the nastiest sinkers ever"
  },
  curveball: {
    name: 'Curveball',
    abbr: 'CU',
    color: '#f0883e',
    speed: '72–82 mph',
    movement: 'Large 12-to-6 drop',
    path: { cx1: -5, cy1: -60, cx2: -12, cy2: 40 },
    explain: 'The classic "breaking ball." Drops sharply, sometimes a foot or more. The slow speed after a fastball makes it look like it falls off a table.',
    keys: ['Topspin causes dramatic downward break', 'Much slower than fastball — disrupts timing', '12-to-6 means straight down, 11-to-5 curves diagonally'],
    famous: 'Sandy Koufax\'s curveball was described as "the most devastating pitch in history"'
  },
  slider: {
    name: 'Slider',
    abbr: 'SL',
    color: '#a371f7',
    speed: '80–90 mph',
    movement: 'Late lateral snap away from arm side',
    path: { cx1: 2, cy1: -10, cx2: 22, cy2: 10 },
    explain: 'Faster than a curveball, breaks sideways at the last moment. Batters hate it because it starts in the zone and darts away.',
    keys: ['Tight spin, late glove-side break', 'Hardest pitch for batters to lay off', 'Often thrown in 2-strike counts'],
    famous: 'Yu Darvish throws up to 7 different variations of the slider'
  },
  changeup: {
    name: 'Changeup',
    abbr: 'CH',
    color: '#2ea043',
    speed: '78–86 mph',
    movement: 'Mimics fastball, then fades and drops',
    path: { cx1: 5, cy1: -5, cx2: 10, cy2: 30 },
    explain: 'The deception pitch. Looks exactly like a fastball coming out of the hand — same arm speed — but arrives 10+ mph slower. The batter swings early and misses.',
    keys: ['Gripped deep in the palm to kill velocity', 'Arm action mirrors fastball (the whole point)', 'Arm-side fade makes it unhittable if perfected'],
    famous: 'Pedro Martínez\'s changeup is considered the greatest off-speed pitch ever thrown'
  },
  cutter: {
    name: 'Cutter (Cut Fastball)',
    abbr: 'FC',
    color: '#e3b341',
    speed: '85–93 mph',
    movement: 'Late glove-side cut',
    path: { cx1: -2, cy1: -8, cx2: -18, cy2: 5 },
    explain: 'A fastball that cuts sharply toward the glove side at the last instant. Devastating for breaking bats on inside pitches.',
    keys: ['Nearly fastball velocity but with late movement', 'Breaks inside on opposite-handed batters', 'Mariano Rivera threw almost exclusively cutters and had a Hall-of-Fame career'],
    famous: 'Mariano Rivera\'s cutter is the most famous single-pitch weapon in baseball history',
    family: 'fastball'
  },
  splitter: {
    name: 'Splitter',
    abbr: 'FS',
    color: '#00b4d8',
    speed: '83–90 mph',
    movement: 'Sharp late drop, minimal horizontal',
    explain: 'Two fingers spread wide apart ("split") deep into the ball, killing rotation and causing a sudden downward drop at home plate. Looks like a fastball until the last foot.',
    keys: ['Wide finger split reduces spin dramatically', 'Drops almost straight down near the plate', 'Batters swing over the top — huge swing-and-miss pitch', 'Very stressful on the elbow; many pitchers avoid it'],
    famous: 'Hideo Nomo\'s splitter was so unhittable it caused "Nomomania" when he came to MLB in 1995',
    family: 'offspeed',
    grip: 'split'
  },
  sweeper: {
    name: 'Sweeper',
    abbr: 'ST',
    color: '#f72585',
    speed: '78–86 mph',
    movement: 'Wide horizontal sweep (18+ inches)',
    explain: 'An evolution of the slider — instead of tight breaking action, it sweeps horizontally across a huge arc. Modern pitchers discovered this creates a completely different visual path for the batter than a curveball.',
    keys: ['Wider horizontal break than a traditional slider', 'Often 18+ inches of horizontal movement', 'Became a dominant pitch in the 2020s analytics era', 'Particularly effective against opposite-handed batters'],
    famous: 'Corbin Burnes and Freddy Peralta helped define the modern sweeper era in 2022–2023',
    family: 'breaking',
    grip: 'sweeper'
  },
  knuckleball: {
    name: 'Knuckleball',
    abbr: 'KN',
    color: '#adb5bd',
    speed: '60–75 mph',
    movement: 'Unpredictable — no consistent direction',
    explain: 'Thrown with the fingertips (not knuckles, despite the name) pressing into the ball to eliminate spin. Without spin, air currents cause the ball to flutter and dance unpredictably — even the pitcher doesn\'t know where it\'s going.',
    keys: ['Almost zero spin — the rarest pitch type', 'Movement is genuinely random; catchers use oversized mitts', 'Extremely hard to hit — and almost as hard to catch', 'Requires decades of practice; very few pitchers ever master it'],
    famous: 'R.A. Dickey won the 2012 Cy Young Award as the only knuckleballer in modern MLB elite',
    family: 'specialty',
    grip: 'knuckle'
  }
};

const FIELD_POSITIONS = {
  pitcher: {
    number: 1, name: 'Pitcher', emoji: '⚾',
    role: 'The most important player on the field. Throws the ball to the batter from 60 feet 6 inches away, trying to get strikes.',
    fact: 'A starting pitcher typically throws 90–100 pitches per game, at speeds ranging from 75–100+ mph.'
  },
  catcher: {
    number: 2, name: 'Catcher', emoji: '🧤',
    role: 'Crouches behind home plate, receives every pitch. Calls pitches by flashing hand signals to the pitcher and is the field\'s general.',
    fact: 'Catchers wear the most protective gear of any player and are typically the smartest baseball minds on the team.'
  },
  first: {
    number: 3, name: 'First Baseman', emoji: '1️⃣',
    role: 'Guards first base. Most ground balls are thrown to first to retire the batter. Must catch difficult throws while keeping a foot on the bag.',
    fact: 'First basemen are often tall and left-handed — a natural stretch toward infield throws. They\'re usually power hitters.'
  },
  second: {
    number: 4, name: 'Second Baseman', emoji: '2️⃣',
    role: 'Covers the area between first and second base. Crucial for turning double plays with the shortstop.',
    fact: 'Second basemen are typically agile and quick — they need to receive throws and relay to first in under a second.'
  },
  third: {
    number: 5, name: 'Third Baseman', emoji: '3️⃣',
    role: 'Positioned at third base, also called "The Hot Corner" because hard-hit balls arrive extremely fast with little reaction time.',
    fact: 'Third basemen need quick reflexes and a strong throwing arm — the throw from third to first is one of the longest in the infield.'
  },
  short: {
    number: 6, name: 'Shortstop', emoji: '⚡',
    role: 'Between second and third base — traditionally the best defensive player. Handles more ground balls than any other position.',
    fact: 'The shortstop position is often called "the most important defensive position." Many great shortstops (Jeter, A-Rod, Ripken) became all-time legends.'
  },
  left: {
    number: 7, name: 'Left Fielder', emoji: '🌿',
    role: 'Covers the left side of the outfield. Handles fly balls and line drives to left field, and backs up third base on ground balls.',
    fact: 'Left fielders need a decent arm since they often throw to third base or home plate on deep hits.'
  },
  center: {
    number: 8, name: 'Center Fielder', emoji: '🏃',
    role: 'Covers the largest area of the outfield. The center fielder is the captain of the outfield, calling off other fielders on balls he can reach.',
    fact: 'Traditionally the fastest player on the team. Legends like Willie Mays and Ken Griffey Jr. made impossible catches look routine.'
  },
  right: {
    number: 9, name: 'Right Fielder', emoji: '💪',
    role: 'Covers right field. Has the most important throwing responsibilities — balls hit to right often need to be thrown to third base or home plate.',
    fact: 'Right fielders typically have the strongest throwing arm of all outfielders. Ichiro Suzuki\'s arm was so powerful that runners stopped testing it.'
  }
};

const TACTICS_SCENARIOS = [
  {
    id: 1,
    runners: [1, 2],
    outs: 0,
    situation: "Bottom of the 9th. Your team trails by 1 run with nobody out — still a real chance. You have runners on 1st and 2nd, the bases are alive. But your next batter is a weak hitter (.220 average, 2-for-15 vs. this pitcher). The opposing closer just struck out the previous two batters with sharp breaking balls. He's cruising. Your dugout is on edge. What do you call?",
    scoreboard: { inning: '9th ▼', score: 'You 3 — Them 4', outs: '0 out', base: '1st & 2nd' },
    choices: [
      { text: 'Bunt both runners over (sacrifice bunt)', type: 'traditional' },
      { text: 'Let the batter swing away', type: 'modern' },
      { text: 'Call a hit-and-run play', type: 'aggressive' },
      { text: 'Pinch-hit with a stronger batter', type: 'strategic' }
    ],
    outcomes: {
      traditional: { rating: 'neutral', title: 'A Classic Call — But Debated', body: 'Traditionalists love this: advance runners to 2nd & 3rd, so ANY hit or wild pitch scores the tying run. But modern analytics show that giving up an out reduces your win probability — you still need a hit anyway. In the 2020s, most MLB managers avoid bunting here.' },
      modern: { rating: 'neutral', title: 'Modern Thinking', body: 'Analytics say: don\'t give away outs. Even a weak hitter could draw a walk, reach on an error, or get a hit. Three chances with the bases loaded (after a walk) creates more run-scoring opportunities than bunting into a runner-on-second situation.' },
      aggressive: { rating: 'good', title: 'Bold Move With Upside', body: 'The hit-and-run gets the runners moving on the pitch, pulling infielders out of position. If the batter makes contact, it likely goes through an open gap. High risk (if he misses, runners could be doubled off), high reward.' },
      strategic: { rating: 'good', title: 'Smart Roster Management', body: 'Great call. Pinch-hitting burns a bench player, but with the season on the line, you want your best hitter at the plate. This is why managers build deep benches.' }
    }
  },
  {
    id: 2,
    runners: [],
    outs: 0,
    situation: "Top of the 8th. You lead by 1 run — slim but real. Your starting pitcher just hit his pitch count limit after 7 solid innings. The opposing lineup's 3-4-5 hitters are coming up: their cleanup hitter is 2-for-3 today with a home run. Your closer is warming in the bullpen but has pitched in back-to-back games — his velocity was already down yesterday. Do you burn him now, or save him for the 9th?",
    scoreboard: { inning: '8th ▲', score: 'You 5 — Them 4', outs: '0 out', base: 'Bases empty' },
    choices: [
      { text: 'Bring in the closer anyway — he\'s your best', type: 'veteran' },
      { text: 'Use your setup reliever for this inning, closer for 9th', type: 'standard' },
      { text: 'Bring in a specialist to face just the lefty cleanup hitter', type: 'matchup' },
      { text: 'Leave your starting pitcher in — he has only thrown 80 pitches', type: 'starter' }
    ],
    outcomes: {
      veteran: { rating: 'bad', title: 'Risky — Fatigue Is Real', body: 'Closers are valuable partly because they\'re managed carefully. A tired closer against a team\'s best hitters is a liability. Most modern managers protect their closers for save situations in the 9th. Using him now risks burning him AND losing the lead.' },
      standard: { rating: 'good', title: 'By the Book — And Correct', body: 'This is modern baseball\'s standard strategy: a "bridge" reliever for the 8th, then the fresh closer for the 9th. Two specialists for two innings. This is what the analytics revolution brought to managing.' },
      matchup: { rating: 'neutral', title: 'LOOGY Strategy (Left-One-Out Guy)', body: 'Very common in baseball — bringing in a left-handed pitcher to face a left-handed batter (lefties hit .80 points worse against same-handed pitchers). However, since 2020, MLB rules require pitchers to face at least 3 batters, limiting this strategy.' },
      starter: { rating: 'neutral', title: 'Old School — Sometimes Right', body: 'If the starter is dealing and feels strong, keeping him in makes sense. 80 pitches isn\'t over the limit. But if he\'s struggling against this lineup, this is a sentimental rather than strategic choice.' }
    }
  },
  {
    id: 3,
    runners: [3],
    outs: 1,
    situation: "7th inning, you trail by 1. Runner on 3rd, 1 out. You need this run. The batter swings and lifts a medium-depth fly ball to center — not shallow, not warning-track deep. The center fielder drifts back and makes the catch. The crowd is tense. You're the runner at 3rd, one foot on the bag, watching the ball fall into the glove. The center fielder has an average arm. What do you do?",
    scoreboard: { inning: '7th ▼', score: 'You 2 — Them 3', outs: '1 out', base: 'Runner on 3rd' },
    choices: [
      { text: 'Tag up and run home after the catch', type: 'tag' },
      { text: 'Stay at third — it\'s too risky', type: 'stay' },
      { text: 'Bluff going home to draw a throw, then go back', type: 'bluff' },
      { text: 'Run immediately when the ball is hit', type: 'run' }
    ],
    outcomes: {
      tag: { rating: 'good', title: 'Textbook Baseball — Tag and Score!', body: 'Correct! After any fly ball is caught, runners may "tag up" (touch their base) and attempt to advance. A medium-depth fly to center is often deep enough to score from third on a tag-up. This is called a "sacrifice fly" and the batter gets credit for an RBI even though he made an out.' },
      stay: { rating: 'neutral', title: 'Conservative — Missing an Opportunity', body: 'Not wrong, but probably leaving a run on the table. Unless the outfielder has a cannon arm or the fly ball was very shallow, a runner on third should almost always try to score on a medium-to-deep fly ball. In a tie game in late innings, you need to be aggressive.' },
      bluff: { rating: 'neutral', title: 'Advanced Technique — But Risky', body: 'The "pump fake" is a real tactic to draw a throw, which might let another runner advance. But with a runner only on third, there\'s no other runner to gain from this. The bluff here mainly creates confusion and probably isn\'t worth the distraction.' },
      run: { rating: 'bad', title: 'Fundamental Mistake!', body: 'If you leave before the catch, you must return and re-touch third base before advancing. If the defense notices and appeals (throws to third), you\'re called out. This is a "leaving early" violation. Always wait for the catch, then run.' }
    }
  }
];

const TAIWAN_TIMELINE = [
  {
    year: '1895',
    title: 'Japan Colonizes Taiwan — and Brings Baseball',
    body: 'After the First Sino-Japanese War, Taiwan becomes a Japanese colony. Japanese administrators, teachers, and soldiers introduce baseball across the island. What starts as a colonial import becomes something uniquely Taiwanese.',
    type: 'normal'
  },
  {
    year: '1920s',
    title: '能高野球團 — The First Dream Team',
    body: 'The Nōkō Baseball Team, made up mostly of indigenous Taiwanese players (primarily Amis), tours Japan and shocks everyone by defeating Japanese university teams. They\'re disadvantaged in society but unbeatable on the field. This story inspired the novel "芭蕉與樹的約定" (Promise Between Banana and Tree). Baseball becomes a symbol of dignity for colonized people.',
    type: 'major'
  },
  {
    year: '1945',
    title: 'The Colonial Era Ends',
    body: 'Japan surrenders in WWII. Taiwan passes from Japanese to Republic of China (ROC) control. Baseball — a Japanese import — somehow survives the political transition and becomes deeply embedded in Taiwanese identity.',
    type: 'normal'
  },
  {
    year: '1968',
    title: 'Little League World Series: Taiwan\'s First Global Stage',
    body: 'Taiwan enters the Little League World Series and wins. Over the next two decades, Taiwanese youth teams dominate the Far East region, winning 17 championships. For a country increasingly shut out of international organizations, these wins matter enormously.',
    type: 'major'
  },
  {
    year: '1971',
    title: 'Taiwan Expelled from the United Nations',
    body: 'The UN votes to transfer China\'s seat to the People\'s Republic of China. Taiwan loses its UN membership and spirals into diplomatic isolation. It cannot join the Olympics under its own name or flag. Baseball — the sport where Taiwan can still compete and win — becomes one of the only windows to the world. The concept of "國際孤兒" (international orphan) takes root.',
    type: 'dark'
  },
  {
    year: '1990',
    title: 'CPBL Founded: Professional Baseball Arrives',
    body: 'The Chinese Professional Baseball League launches with four teams: Brother Elephants (兄弟象), Uni-President Lions (統一獅), Mercuries Tigers (三商虎), and Wei-Chuan Dragons (味全龍). For the first time, Taiwan\'s best players don\'t have to go abroad. Stadiums fill up. Baseball mania peaks.',
    type: 'major'
  },
  {
    year: '1992',
    title: 'Barcelona Olympics: Silver Medal, National Pride',
    body: 'Taiwan competes in baseball at the Barcelona Olympics. Despite competing under the politically compromised name "Chinese Taipei" — no flag, no anthem — the team wins silver. The whole country watches. For one summer, Taiwan is on the world stage.',
    type: 'major'
  },
  {
    year: '1996–2008',
    title: 'The Match-Fixing Scandals That Nearly Broke Baseball',
    body: 'Taiwan\'s professional league is rocked by gambling scandals — three waves over twelve years. Players accept bribes to intentionally lose games (tanking). The 2008–2009 scandal is the worst: 102 illegal gambling cases, 222 people involved, including players from the beloved Brother Elephants. Fan attendance collapses. Parents stop letting children play. The damage takes years to repair.',
    type: 'dark'
  },
  {
    year: '2001',
    title: 'World Cup Bronze: The Comeback Begins',
    body: 'At the Baseball World Cup in Taiwan, the national team wins bronze. Chen Chin-Feng (陳金鋒) and others begin building a new generation of hope. The road back from the scandal era slowly begins.',
    type: 'normal'
  },
  {
    year: '2003',
    title: '"又是高志綱!" — A Moment of Pure Joy',
    body: 'At the Asian Championship, Taiwan needs to beat Korea in a dramatic moment. Gao Zhi-Gang (高志綱) delivers the clutch hit. Broadcaster Zeng Wen-Cheng screams "又是高志綱!" (It\'s Gao Zhi-Gang again!). The clip becomes one of the most replayed moments in Taiwan sports broadcasting history.',
    type: 'major'
  },
  {
    year: '2013',
    title: 'WBC: One Ball Away from History',
    body: 'Taiwan faces Japan in the World Baseball Classic, needing one out to end the inning with a lead. Then Japan scores. Taiwan loses 3–2. The heartbreak is national. But the performance shows Taiwan belongs among the world\'s best.',
    type: 'dark'
  },
  {
    year: '2024',
    title: '2024 Premier 12: The Redemption',
    body: 'Taiwan wins the WBSC Premier 12 championship, defeating Japan — ending a generational wait. For the analysts at 鍵盤球探 and millions of fans, this isn\'t just a trophy. It\'s the resolution of a fifty-year story of a people who put their dreams into a sport because it was the one arena where they could show the world who they were.',
    type: 'major'
  }
];

const PLAYERS = [
  {
    name: 'Chen Chin-Feng',
    nameZh: '陳金鋒',
    role: 'Power Hitter · International Icon',
    description: 'The greatest hitter in Taiwan\'s international baseball history. In 115 international at-bats, he hit 21 home runs — one home run every 5.5 at-bats. He was the emotional backbone of Taiwan\'s early 2000s teams.',
    stats: [
      { val: '21', lbl: 'International HRs' },
      { val: '.330', lbl: 'Intl. AVG' }
    ],
    era: '1998–2008'
  },
  {
    name: 'Wang Chien-Ming',
    nameZh: '王建民',
    role: 'Pitcher · Yankees Legend',
    description: 'Taiwan\'s greatest export to Major League Baseball. Pitched for the New York Yankees, winning 19 games in back-to-back seasons (2006–2007). His devastating sinker — generating ground balls at historic rates — made him briefly one of the best pitchers in MLB.',
    stats: [
      { val: '68', lbl: 'MLB Wins' },
      { val: '19', lbl: 'Wins (2006)' }
    ],
    era: '2005–2016'
  },
  {
    name: 'Wei-Yin Chen',
    nameZh: '陳偉殷',
    role: 'Pitcher · MLB Veteran',
    description: 'Spent 7 seasons in MLB (Baltimore Orioles, Miami Marlins), winning 59 games. Steady and dependable, he opened doors for a new generation of Taiwanese pitchers to believe they could compete at baseball\'s highest level.',
    stats: [
      { val: '59', lbl: 'MLB Wins' },
      { val: '7', lbl: 'MLB Seasons' }
    ],
    era: '2012–2018'
  },
  {
    name: 'Lin Zhi-Sheng',
    nameZh: '林智勝',
    role: 'Versatile Hitter · CPBL Legend',
    description: 'One of Taiwan\'s most versatile and beloved domestic players. A consistent performer in international competition across multiple decades, known for clutch hitting and an ability to play multiple positions.',
    stats: [
      { val: '300+', lbl: 'CPBL HRs' },
      { val: '15+', lbl: 'Pro Seasons' }
    ],
    era: '2004–2021'
  }
];

const LEAGUES = [
  {
    flag: '🇺🇸',
    name: 'MLB',
    fullName: 'Major League Baseball',
    country: 'United States & Canada',
    founded: 1869,
    teams: 30,
    season: '162 games (Mar–Oct)',
    description: 'The pinnacle of professional baseball. 30 teams, massive salaries, the World Series every October. Think of it as the "Premier League" of baseball — the standard everyone else is measured against.',
    color: '#388bfd',
    logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Major_League_Baseball_logo.svg',
    notable: 'Average MLB salary: ~$4.4 million/year. Some stars earn $40M+.'
  },
  {
    flag: '🇯🇵',
    name: 'NPB',
    fullName: 'Nippon Professional Baseball',
    country: 'Japan',
    founded: 1950,
    teams: 12,
    season: '143 games',
    description: 'Japan\'s top league. Almost as old as MLB\'s modern era and taken just as seriously. Japanese baseball has a distinct culture: intense discipline, precise fundamentals, and a level of technical skill that regularly produces MLB stars.',
    color: '#f0883e',
    logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/NPB_logo.svg',
    notable: 'Shohei Ohtani, Yu Darvish, Ichiro — all NPB alumni who dominated MLB.'
  },
  {
    flag: '🇰🇷',
    name: 'KBO',
    fullName: 'Korea Baseball Organization',
    country: 'South Korea',
    founded: 1982,
    teams: 10,
    season: '144 games',
    description: 'South Korea\'s professional league, launched in 1982. Intensely popular domestically. Korean baseball has a passionate fan culture with organized cheer squads making incredible noise in stadiums.',
    color: '#a371f7',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Korea_Baseball_Organization_-_2022_logo_with_wordmark_horizontal_full.svg/200px-Korea_Baseball_Organization_-_2022_logo_with_wordmark_horizontal_full.svg.png',
    notable: 'KBO gained global fans during COVID-19 when it was the only live baseball airing worldwide.'
  },
  {
    flag: '🇹🇼',
    name: 'CPBL',
    fullName: 'Chinese Professional Baseball League',
    country: 'Taiwan',
    founded: 1990,
    teams: 6,
    season: '120 games',
    description: 'Taiwan\'s professional league, founded in 1990. Survived multiple gambling scandals and emerged stronger. Today it fields 6 teams. Several CPBL alumni have gone on to MLB careers, validating the league\'s quality.',
    color: '#ce1126',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Chinese_Professional_Baseball_League.svg/200px-Chinese_Professional_Baseball_League.svg.png',
    notable: 'Current teams: Uni-President Lions, CTBC Brothers, Fubon Guardians, Rakuten Monkeys, Wei-Chuan Dragons, TSG Hawks.'
  }
];

const QUIZ_QUESTIONS = [
  {
    q: 'How many strikes does it take to strike out a batter?',
    choices: ['2', '3', '4', '5'],
    correct: 1,
    explain: '3 strikes and you\'re out — one of baseball\'s most famous phrases. A "strike" is either a pitch in the zone the batter doesn\'t swing at, or any swing and miss.'
  },
  {
    q: 'Which pitch is designed to look like a fastball but arrives 10–15 mph slower to disrupt timing?',
    choices: ['Curveball', 'Slider', 'Changeup', 'Cutter'],
    correct: 2,
    explain: 'The changeup is a deception pitch — same arm speed as a fastball, but held deeper in the palm to kill velocity. Batters swing early and miss.'
  },
  {
    q: 'Taiwan\'s baseball origin is tied to which historical period?',
    choices: ['British trade era (1800s)', 'Japanese colonial rule (1895–1945)', 'American military presence (1950s)', 'Cold War sports diplomacy (1960s)'],
    correct: 1,
    explain: 'Japan colonized Taiwan in 1895 and brought baseball. What started as a colonial sport became central to Taiwanese identity — and even became a form of resistance and dignity for indigenous communities.'
  },
  {
    q: 'What does "tag up" mean in baseball?',
    choices: [
      'Tagging a runner with the ball to get them out',
      'Returning to touch your base before advancing after a caught fly ball',
      'A pitcher touching the rubber before throwing',
      'Reaching base safely on a hit'
    ],
    correct: 1,
    explain: 'When a fly ball is caught, runners must "tag up" — touch their current base — before they can advance. If they left early, they must go back and re-touch. This is why you see runners hovering at their base when a fly ball is in the air.'
  },
  {
    q: 'Why did baseball become so emotionally significant in Taiwan after 1971?',
    choices: [
      'Taiwan hosted the Baseball World Cup that year',
      'Taiwan was expelled from the UN, making baseball one of the only arenas for international recognition',
      'MLB began scouting Taiwanese players that year',
      'The CPBL professional league was founded in 1971'
    ],
    correct: 1,
    explain: 'After being expelled from the UN in 1971, Taiwan became diplomatically isolated — it couldn\'t even compete in the Olympics under its own name. International baseball competitions became one of the only places where Taiwan could exist on the world stage. Winning became tied to national identity.'
  },
  {
    q: 'Wang Chien-Ming\'s most dangerous pitch — the one that made him an MLB star — was:',
    choices: ['Curveball', 'Slider', 'Sinker', 'Changeup'],
    correct: 2,
    explain: 'Wang Chien-Ming\'s sinker was legendary. It dove so sharply that batters beat it into the ground, leading to an extraordinary rate of ground ball outs and double plays. His 2006–2007 back-to-back 19-win seasons were powered almost entirely by this pitch.'
  },
  {
    q: 'What is a "save" in baseball?',
    choices: [
      'When a fielder prevents a run by catching a ball',
      'A statistic awarded to a relief pitcher who finishes a close win without blowing the lead',
      'When a pitcher strikes out the side (three up, three down)',
      'Preventing a stolen base attempt'
    ],
    correct: 1,
    explain: 'A "save" is recorded when a relief pitcher enters a game with a lead of 3 runs or less, or enters with the tying run on deck, and successfully holds the lead to end the game. The pitcher who specializes in this role is called the "closer."'
  },
  {
    q: 'MLB banned the "extreme defensive shift" starting in 2023. What was it?',
    choices: [
      'Positioning all four infielders on the same side of the diamond to combat pull hitters',
      'Moving the outfield wall to make home runs harder',
      'Having a fifth infielder replace an outfielder',
      'Using two catchers behind the plate'
    ],
    correct: 0,
    explain: 'Teams discovered that certain hitters pulled the ball so predictably that stacking three or four infielders on one side dramatically reduced their hits. The 2023 rule now requires at least two infielders on each side of second base — bringing back more "normal" defense.'
  },
  {
    q: 'Which team was at the center of Taiwan\'s worst match-fixing scandal (2008–2009)?',
    choices: ['Uni-President Lions', 'Brother Elephants', 'Fubon Guardians', 'Rakuten Monkeys'],
    correct: 1,
    explain: 'The Brother Elephants (兄弟象) — Taiwan\'s most popular team at the time — were heavily implicated in the 2008–2009 gambling scandal. The damage to trust was enormous. Fan attendance crashed, and Taiwan\'s professional baseball nearly collapsed before slowly rebuilding.'
  },
  {
    q: 'Taiwan won the 2024 WBSC Premier 12 championship by defeating:',
    choices: ['South Korea', 'United States', 'Japan', 'Dominican Republic'],
    correct: 2,
    explain: 'Taiwan defeated Japan to win the 2024 Premier 12 — a deeply symbolic victory. Japan has historically dominated Asian baseball, and beating them in a championship felt like a generational redemption for Taiwanese fans who had experienced so many near-misses against Japan.'
  },
  {
    q: 'In the 9-cell strike zone grid, where is the hardest location for a pitcher to consistently hit?',
    choices: ['Center (Mid-Center)', 'High-In corner', 'Low-Out corner', 'High-Out corner'],
    correct: 2,
    explain: 'The corners of the strike zone — especially the "back door" low-outside corner — are the most difficult to locate consistently. Pitchers who can hit the four corners reliably are considered elite control artists. The center of the zone is easiest to locate but easiest to hit.'
  },
  {
    q: 'A "Force Out" differs from a "Tag Out" because:',
    choices: [
      'A force out only counts in the first inning',
      'In a force out, the fielder only needs to step on the base — no tag on the runner required',
      'A force out requires the runner to be touching the ball',
      'A tag out can only happen at home plate'
    ],
    correct: 1,
    explain: 'When a runner is forced to advance (because the batter is heading to their current base), the fielder only needs to touch the next base while holding the ball — no tag needed. When a runner is NOT forced, the fielder must physically touch the runner with the ball.'
  },
  {
    q: 'Which pitch family uses deception through speed change — looking like a fastball from the pitcher\'s arm action but arriving much slower?',
    choices: ['Fastball family', 'Breaking ball family', 'Offspeed / Specialty', 'There is no such category'],
    correct: 2,
    explain: 'Offspeed and specialty pitches like the changeup and splitter are thrown with the same arm motion as a fastball, but grip and finger pressure dramatically reduce velocity. The batter\'s timing is disrupted because they commit to swinging early. A well-executed changeup is one of the most effective pitches in baseball.'
  },
  {
    q: 'A batter has a count of 3-0. What does this mean and why is it favorable for the batter?',
    choices: [
      '3 strikes, 0 balls — batter is one pitch from a strikeout',
      '3 balls, 0 strikes — pitcher must throw a strike or the batter walks, so a fastball in the zone is very likely',
      '3 outs, 0 runs — it\'s the end of the inning',
      '3 hits, 0 outs — the bases are loaded'
    ],
    correct: 1,
    explain: 'The count is always stated "Balls — Strikes." A 3-0 count means 3 balls, 0 strikes — the pitcher is one more ball away from giving a free walk. The pitcher must throw a strike, so the batter knows a fastball in the zone is coming. This is called a "hitter\'s count" and most managers give the swing-away sign.'
  },
  {
    q: 'Which of the following is the correct MLB playoff structure — from the end of the regular season to the championship?',
    choices: [
      'Wild Card → Division Series → Championship Series → World Series',
      'Division Series → Wild Card → World Series',
      'Regular season → World Series (no playoffs)',
      'Championship Series → Division Series → Wild Card → World Series'
    ],
    correct: 0,
    explain: 'After the 162-game regular season, wild card teams play first. Then the Division Series (best-of-5), followed by the Championship Series (best-of-7) to determine the AL and NL champions. Finally, the World Series (best-of-7) crowns the champion. It\'s a long road — some teams play 180+ games in a season.'
  },
  {
    q: 'The "Knuckleball" is unique among pitches because:',
    choices: [
      'It is thrown faster than any other pitch',
      'It is thrown with almost zero spin, making its path unpredictable even to the pitcher and catcher',
      'It can only be thrown by left-handed pitchers',
      'It always breaks toward the batter\'s knees'
    ],
    correct: 1,
    explain: 'The knuckleball is thrown with fingernails (not knuckles) pressed into the ball to eliminate rotation. Without spin, air currents cause the ball to flutter and dance unpredictably. Even elite catchers struggle to catch it. A good knuckleball is one of baseball\'s rarest skills — only a handful of pitchers in history have mastered it.'
  },
  {
    q: 'In the 1931 KANO baseball team story, what made the team historically remarkable?',
    choices: [
      'They were the first professional baseball team in Asia',
      'A team from a small colonial Taiwanese school reached the Japanese high school national final (Koshien), with a mixed indigenous, Han, and Japanese roster',
      'They introduced baseball to Taiwan for the first time',
      'They were the first team to beat an MLB team in exhibition play'
    ],
    correct: 1,
    explain: 'The KANO team (嘉農) from Chiayi Agricultural School was remarkable for two reasons: First, they reached the Koshien final — the most prestigious high school tournament in Japan. Second, their unique roster of indigenous Amis players, Han Taiwanese, and Japanese students competing together was unheard of in the colonial era. This story became a symbol of dignity for colonized people.'
  }
];

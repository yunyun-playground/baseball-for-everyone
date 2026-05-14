// ── MODULE 4: WORLD OF BASEBALL ──

const MLB_DIVISIONS = [
  { div: 'American League East', teams: [
    { abbr:'NYY', name:'Yankees',   city:'New York',   color:'#003087', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png' },
    { abbr:'BOS', name:'Red Sox',   city:'Boston',     color:'#BD3039', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png' },
    { abbr:'TOR', name:'Blue Jays', city:'Toronto',    color:'#134A8E', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/tor.png' },
    { abbr:'BAL', name:'Orioles',   city:'Baltimore',  color:'#DF4601', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/bal.png' },
    { abbr:'TB',  name:'Rays',      city:'Tampa Bay',  color:'#092C5C', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/tb.png' },
  ]},
  { div: 'American League Central', teams: [
    { abbr:'MIN', name:'Twins',      city:'Minnesota',   color:'#002B5C', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/min.png' },
    { abbr:'CLE', name:'Guardians',  city:'Cleveland',   color:'#E31937', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/cle.png' },
    { abbr:'CWS', name:'White Sox',  city:'Chicago',     color:'#27251F', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/chw.png' },
    { abbr:'DET', name:'Tigers',     city:'Detroit',     color:'#0C2340', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/det.png' },
    { abbr:'KC',  name:'Royals',     city:'Kansas City', color:'#004687', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/kc.png' },
  ]},
  { div: 'American League West', teams: [
    { abbr:'HOU', name:'Astros',    city:'Houston',      color:'#EB6E1F', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png' },
    { abbr:'LAA', name:'Angels',    city:'Los Angeles',  color:'#BA0021', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/laa.png' },
    { abbr:'SEA', name:'Mariners',  city:'Seattle',      color:'#0C2C56', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/sea.png' },
    { abbr:'OAK', name:'Athletics', city:'Oakland',      color:'#003831', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/oak.png' },
    { abbr:'TEX', name:'Rangers',   city:'Texas',        color:'#003278', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png' },
  ]},
  { div: 'National League East', teams: [
    { abbr:'ATL', name:'Braves',    city:'Atlanta',       color:'#CE1141', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png' },
    { abbr:'NYM', name:'Mets',      city:'New York',      color:'#002D72', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/nym.png' },
    { abbr:'PHI', name:'Phillies',  city:'Philadelphia',  color:'#E81828', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/phi.png' },
    { abbr:'MIA', name:'Marlins',   city:'Miami',         color:'#00A3E0', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/mia.png' },
    { abbr:'WSH', name:'Nationals', city:'Washington',    color:'#AB0003', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png' },
  ]},
  { div: 'National League Central', teams: [
    { abbr:'MIL', name:'Brewers',   city:'Milwaukee',  color:'#12284B', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/mil.png' },
    { abbr:'CHC', name:'Cubs',      city:'Chicago',    color:'#0E3386', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/chc.png' },
    { abbr:'STL', name:'Cardinals', city:'St. Louis',  color:'#C41E3A', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/stl.png' },
    { abbr:'CIN', name:'Reds',      city:'Cincinnati', color:'#C6011F', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/cin.png' },
    { abbr:'PIT', name:'Pirates',   city:'Pittsburgh', color:'#27251F', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/pit.png' },
  ]},
  { div: 'National League West', teams: [
    { abbr:'LAD', name:'Dodgers',      city:'Los Angeles',  color:'#005A9C', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png' },
    { abbr:'SF',  name:'Giants',       city:'San Francisco',color:'#FD5A1E', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/sf.png' },
    { abbr:'SD',  name:'Padres',       city:'San Diego',    color:'#2F241D', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/sd.png' },
    { abbr:'COL', name:'Rockies',      city:'Colorado',     color:'#33006F', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/col.png' },
    { abbr:'ARI', name:'Diamondbacks', city:'Arizona',      color:'#A71930', logo:'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png' },
  ]}
];

const NPB_LEAGUES = [
  { league: 'Central League', teams: [
    { abbr:'G',  name:'Giants',   city:'Yomiuri (Tokyo)',   color:'#003087', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Yomiuri_Giants_insignia.svg' },
    { abbr:'T',  name:'Tigers',   city:'Hanshin (Osaka)',   color:'#FFD700', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Hanshin_tigers_insignia.svg' },
    { abbr:'C',  name:'Carp',     city:'Hiroshima',         color:'#E60026', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Hiroshima_Toyo_Carp_insignia.svg' },
    { abbr:'D',  name:'Dragons',  city:'Chunichi (Nagoya)', color:'#002569', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Chunichi_Dragons_insignia.svg' },
    { abbr:'DB', name:'BayStars', city:'DeNA (Yokohama)',   color:'#1961AC', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Yokohama_DeNA_BayStars_insignia.svg' },
    { abbr:'S',  name:'Swallows', city:'Yakult (Tokyo)',    color:'#00704A', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Yakult_Swallows_insignia.svg' },
  ]},
  { league: 'Pacific League', teams: [
    { abbr:'H', name:'Hawks',     city:'SoftBank (Fukuoka)',    color:'#FFD100', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Fukuoka_SoftBank_Hawks_insignia.svg' },
    { abbr:'L', name:'Lions',     city:'Seibu (Saitama)',       color:'#003087', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Seibu_lions_insignia.svg' },
    { abbr:'M', name:'Marines',   city:'Lotte (Chiba)',         color:'#000000', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Chiba_Lotte_Marines_insignia.svg' },
    { abbr:'B', name:'Buffaloes', city:'Orix (Osaka)',          color:'#0E4C96', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Orix_Buffaloes_insignia.svg' },
    { abbr:'E', name:'Eagles',    city:'Rakuten (Sendai)',      color:'#860024', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Rakuten_eagles_insignia.svg' },
    { abbr:'F', name:'Fighters',  city:'Nippon-Ham (Hokkaido)', color:'#003087', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Hokkaido_Nippon-Ham_Fighters_insignia.svg' },
  ]}
];

const KBO_TEAMS = [
  { abbr:'SS',  name:'Lions',   city:'Samsung (Daegu)',   color:'#074CA1', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Lions_insignia.svg' },
  { abbr:'LT',  name:'Giants',  city:'Lotte (Busan)',     color:'#E43035', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Lotte_Giants_insignia.svg' },
  { abbr:'OB',  name:'Bears',   city:'Doosan (Seoul)',    color:'#1B2B8C', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Doosan_Bears_insignia.svg' },
  { abbr:'LG',  name:'Twins',   city:'LG (Seoul)',        color:'#C30452', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/LG_Twins_insignia.svg' },
  { abbr:'HT',  name:'Tigers',  city:'KIA (Gwangju)',     color:'#E61E2B', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Kia_Tigers_2017_New_Team_Logo.png/120px-Kia_Tigers_2017_New_Team_Logo.png' },
  { abbr:'NC',  name:'Dinos',   city:'NC (Changwon)',     color:'#1856A6', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/NC_Dinos_Emblem.svg/120px-NC_Dinos_Emblem.svg.png' },
  { abbr:'SSG', name:'Landers', city:'SSG (Incheon)',     color:'#CE0E2D', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/SSG_Landers.png/120px-SSG_Landers.png' },
  { abbr:'KT',  name:'Wiz',     city:'KT (Suwon)',        color:'#BA0C2F', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/KT_Wiz.svg/120px-KT_Wiz.svg.png' },
  { abbr:'HH',  name:'Eagles',  city:'Hanwha (Daejeon)',  color:'#F37321', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Hanwha_Eagles_2025.svg/120px-Hanwha_Eagles_2025.svg.png' },
  { abbr:'KW',  name:'Heroes',  city:'Kiwoom (Seoul)',    color:'#9B1A21', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Kiwoom_Heroes.png/120px-Kiwoom_Heroes.png' },
];

const CPBL_TEAMS = [
  { abbr:'UNI', name:'Lions 獅',       city:'Uni-President 統一', color:'#E60012', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Lions_Logo.png/120px-Lions_Logo.png' },
  { abbr:'CTB', name:'Brothers 兄弟',  city:'CTBC 中信',          color:'#002D72', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/CTBC_Brothers_%28baseball_team%29_logo.png/120px-CTBC_Brothers_%28baseball_team%29_logo.png' },
  { abbr:'FBG', name:'Guardians 悍將', city:'Fubon 富邦',         color:'#D4AF37', logo:'https://commons.wikimedia.org/wiki/Special:FilePath/Fubon_Guardians_insignia.svg' },
  { abbr:'LAM', name:'Monkeys 猿',     city:'Rakuten 樂天',       color:'#C01933', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Rakuten_Monkeys.png/120px-Rakuten_Monkeys.png' },
  { abbr:'WCL', name:'Dragons 龍',     city:'Wei-Chuan 味全',     color:'#00843D', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Wei_Chuan_Dragons.png/120px-Wei_Chuan_Dragons.png' },
  { abbr:'TSG', name:'Hawks 雄鷹',     city:'TSG 台鋼',           color:'#1B75BC', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/TSG_Hawks.png/120px-TSG_Hawks.png' },
];

const INTL_TOURNAMENTS = [
  {
    name: 'World Baseball Classic',
    abbr: 'WBC',
    color: '#388bfd',
    freq: 'Every 4 years',
    nextYear: '2026',
    teams: 20,
    founded: 2006,
    format: 'Pool play → Quarterfinals → Semifinals → Final',
    desc: 'Baseball\'s closest equivalent to the FIFA World Cup. MLB players participate (unlike most other sports where pros skip international play), making it a true best-on-best tournament. Japan won the 2023 edition with Shohei Ohtani delivering the clinching strikeout against Mike Trout in a legendary finale.',
    winners: '🇯🇵 Japan (2006, 2009, 2023) · 🇩🇴 Dominican Republic (2013) · 🇺🇸 USA (2017)',
    taiwanNote: 'Taiwan (as "Chinese Taipei") has qualified for all editions. The national team is a source of massive pride — matches draw record TV audiences island-wide.'
  },
  {
    name: 'WBSC Premier 12',
    abbr: 'P12',
    color: '#f0b429',
    freq: 'Every 4 years',
    nextYear: '2028',
    teams: 12,
    founded: 2015,
    format: 'Group stage → Super Round → Final',
    desc: 'Organized by the World Baseball Softball Confederation (WBSC), featuring the top 12 ranked national teams. Prize money and Olympic qualification points are on the line. Taiwan stunned the world in 2024, winning the entire tournament on home soil.',
    winners: '🇯🇵 Japan (2015, 2019) · 🇺🇸 USA (runner-up 2015, 2019) · 🇹🇼 Taiwan (2024)',
    taiwanNote: '🏆 Taiwan won the 2024 Premier 12 at home. The championship game drew record viewership. This was Taiwan\'s biggest baseball victory since the Little League era.'
  },
  {
    name: 'Olympic Baseball',
    abbr: 'OLY',
    color: '#3fb950',
    freq: 'Included in most Summer Olympics',
    nextYear: 'LA 2028',
    teams: 6,
    founded: 1992,
    format: '6-team round robin → Semifinals → Bronze/Gold game',
    desc: 'Baseball was an Olympic sport from 1992 to 2008, then removed, then restored for Tokyo 2021. Six national teams qualify through regional tournaments and world rankings. Olympic baseball is shorter and more intense than WBC since rosters are sometimes limited by MLB\'s regular season schedule.',
    winners: '🇨🇺 Cuba (1992, 1996, 2004) · 🇺🇸 USA (2000) · 🇰🇷 Korea (2008) · 🇯🇵 Japan (2021)',
    taiwanNote: 'Taiwan won silver at the 1992 Barcelona Olympics — one of the most celebrated moments in Taiwan sports history, despite competing as "Chinese Taipei" without its flag or anthem.'
  },
  {
    name: 'WBSC Asia Championship',
    abbr: 'ASIA',
    color: '#a371f7',
    freq: 'Irregular (every 2–4 years)',
    nextYear: 'TBD',
    teams: 8,
    founded: 1954,
    format: 'Round robin → Playoff round',
    desc: 'The regional championship for Asian baseball nations. Japan, South Korea, Taiwan, China, and others compete. Historically dominated by Japan and Taiwan, with Korea rising as a powerhouse from the 1980s onward.',
    winners: '🇯🇵 Japan · 🇹🇼 Taiwan · 🇰🇷 Korea (rotating dominance)',
    taiwanNote: '"又是高志綱！" — Taiwan\'s 2003 Asian Championship moment, where a clutch hit against Korea became one of the most replayed clips in Taiwan sports broadcasting history.'
  }
];

function buildLogoFallback(abbr, color, size) {
  const r = size / 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${r}" cy="${r}" r="${r-2}" fill="${color}22" stroke="${color}" stroke-width="2"/><text x="${r}" y="${r+1}" text-anchor="middle" dominant-baseline="middle" font-family="Oswald,sans-serif" font-size="${abbr.length > 3 ? size*0.22 : size*0.28}" font-weight="700" fill="${color}" letter-spacing="0.5">${abbr}</text></svg>`;
}

function buildTeamTile(t) {
  const logoEl = t.logo
    ? `<img src="${t.logo}" alt="${t.name}" width="40" height="40" style="object-fit:contain;display:block;margin:0 auto 6px"
        onerror="this.outerHTML='<div style=\\'font-size:1.04rem;font-weight:800;color:${t.color};letter-spacing:1px\\'>${t.abbr}</div>'">`
    : `<div style="font-size:1.04rem;font-weight:800;color:${t.color};letter-spacing:1px;margin-bottom:6px">${t.abbr}</div>`;
  return `<div class="team-tile" style="border-color:${t.color}44;background:${t.color}18;text-align:center">
    ${logoEl}
    <div class="t-name">${t.name}</div>
    <div class="t-city">${t.city}</div>
  </div>`;
}

const LEAGUE_LOGOS = {
  'MLB':  'https://commons.wikimedia.org/wiki/Special:FilePath/Major_League_Baseball_logo.svg',
  'NPB':  'https://commons.wikimedia.org/wiki/Special:FilePath/NPB_logo.svg',
  'KBO':  'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Korea_Baseball_Organization_-_2022_logo_with_wordmark_horizontal_full.svg/250px-Korea_Baseball_Organization_-_2022_logo_with_wordmark_horizontal_full.svg.png',
  'CPBL': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Chinese_Professional_Baseball_League.svg/330px-Chinese_Professional_Baseball_League.svg.png',
};

function buildLeagueLogoSVG(abbr, color, size = 48) {
  const url = LEAGUE_LOGOS[abbr];
  if (url) {
    const fallback = buildLogoFallback(abbr, color, size)
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `<img src="${url}" alt="${abbr} logo" height="${size}"
      style="width:auto;max-width:${size * 4}px;object-fit:contain;display:block"
      onerror="this.outerHTML='${fallback}'">`;
  }
  return buildLogoFallback(abbr, color, size);
}

function buildTournamentCard(t) {
  return `<div class="tournament-card" style="border-top:3px solid ${t.color}">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
      <div>
        <div class="tournament-name" style="color:${t.color}">${t.name}</div>
        <div style="font-size:0.95rem;color:var(--text-muted);margin-top:2px">${t.teams} teams · Founded ${t.founded}</div>
      </div>
      <div style="text-align:right">
        <div class="tournament-freq">${t.freq}</div>
        <div style="font-size:0.95rem;color:var(--text-muted);margin-top:2px">Next: ${t.nextYear}</div>
      </div>
    </div>
    <p style="font-size:1.1rem;color:var(--text);line-height:1.65;margin-bottom:10px">${t.desc}</p>
    <div style="font-size:1.0rem;padding:8px 10px;background:var(--surface2);border-radius:6px;margin-bottom:8px;color:var(--text-muted)">
      <strong style="color:var(--text)">Format:</strong> ${t.format}
    </div>
    <div style="font-size:1.0rem;padding:8px 10px;background:var(--surface2);border-radius:6px;margin-bottom:8px;color:var(--text-muted)">
      <strong style="color:var(--text)">Champions:</strong> ${t.winners}
    </div>
    <div style="font-size:1.0rem;padding:8px 10px;background:rgba(206,17,38,0.1);border:1px solid rgba(206,17,38,0.25);border-radius:6px;color:var(--text)">
      🇹🇼 ${t.taiwanNote}
    </div>
  </div>`;
}

function buildLeagueCard(league) {
  return `
    <div class="league-card" style="border-left:3px solid ${league.color}">
      <div style="display:flex;align-items:flex-start;gap:16px">
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <div style="font-size:2.2rem;line-height:1">${league.flag}</div>
          ${buildLeagueLogoSVG(league.name, league.color, 44)}
        </div>
        <div style="flex:1">
          <div class="league-name">${league.name}</div>
          <div class="league-subtitle">${league.fullName} · ${league.country}</div>
        </div>
        <div class="league-stats">
          <div class="league-stat" style="text-align:center">
            <div class="val" style="color:${league.color}">${league.teams}</div>
            <div class="lbl">Teams</div>
          </div>
          <div class="league-stat" style="text-align:center">
            <div class="val" style="color:${league.color}">${league.founded}</div>
            <div class="lbl">Founded</div>
          </div>
        </div>
      </div>
      <p style="margin-top:12px;font-size:1.1rem;color:var(--text-muted)">${league.description}</p>
      <div style="margin-top:8px;padding:8px 12px;background:var(--surface2);border-radius:6px;font-size:1.0rem;color:var(--text-dim)">
        📊 ${league.notable}
      </div>
      <div style="margin-top:8px;padding:8px 12px;background:var(--surface2);border-radius:6px;font-size:1.0rem;color:var(--text-muted)">
        📅 <strong style="color:var(--text)">Season:</strong> ${league.season}
      </div>
    </div>
  `;
}

function buildPlayoffFormat(leagueKey) {
  const formats = {
    mlb: {
      color: '#388bfd',
      steps: [
        { label: '162 Games', desc: 'Regular season — 6 divisions, 5 teams each. Best record in each division wins the division title.' },
        { label: 'Wild Card Series', desc: '3 wild card teams per league face off in best-of-3 series. A wild card team can still win it all.' },
        { label: 'Division Series', desc: 'Best-of-5 between 4 remaining teams per league (ALDS / NLDS).' },
        { label: 'Championship Series', desc: 'Best-of-7 — the ALCS and NLCS determine the two World Series teams.' },
        { label: '🏆 World Series', desc: 'Best-of-7 between the AL and NL champions. The biggest game in baseball.' },
      ]
    },
    npb: {
      color: '#f0883e',
      steps: [
        { label: '143 Games', desc: 'Regular season — 6 teams per league (Central / Pacific). Each plays 143 games.' },
        { label: 'Climax Series', desc: 'Top 3 teams in each league play a two-stage series. Wild card format with advantage for top finishers.' },
        { label: '🏆 Japan Series', desc: 'Best-of-7 between the Central and Pacific League winners.' },
      ]
    },
    kbo: {
      color: '#a371f7',
      steps: [
        { label: '144 Games', desc: 'Regular season — 10 teams, single league. Top 5 advance to playoffs.' },
        { label: 'Wild Card', desc: '4th vs 5th place — one game only. The loser is eliminated immediately.' },
        { label: 'Semifinals', desc: 'Best-of-5 between 2nd/3rd and the Wild Card winner.' },
        { label: '🏆 Korean Series', desc: 'Best-of-7 between the regular season champion and the semifinal winner.' },
      ]
    },
    cpbl: {
      color: '#ce1126',
      steps: [
        { label: '120 Games', desc: 'Regular season split into First Half (60 games) and Second Half (60 games). Each half has a separate winner.' },
        { label: 'Playoff Round', desc: 'The two half-season winners face off. If the same team wins both halves, they face the team with the best overall record.' },
        { label: '🏆 Taiwan Series', desc: 'Best-of-7 between the playoff winner and the runner-up. Held every October.' },
      ]
    }
  };

  const f = formats[leagueKey];
  return `<div style="margin-top:12px">
    ${f.steps.map((s, i) => `
      <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start">
        <div style="flex-shrink:0;width:24px;height:24px;border-radius:50%;background:${f.color};display:flex;align-items:center;justify-content:center;font-size:0.88rem;font-weight:700;color:#000;margin-top:1px">${i+1}</div>
        <div>
          <div style="font-size:1.04rem;font-weight:600;color:var(--text)">${s.label}</div>
          <div style="font-size:1.0rem;color:var(--text-muted);line-height:1.5">${s.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function initLeaguesModule() {
  const screen = document.getElementById('screen-leagues');
  screen.innerHTML = `
    ${makeNav('05 — The World of Baseball', 'How one sport spread across the Pacific').outerHTML}
    <div class="module-content">

      <div class="section-label">Global Reach</div>
      <h1>Baseball Around the Pacific</h1>
      <p class="mt-8">Baseball is America's pastime, but it's Japan's obsession, Korea's passion, and Taiwan's soul. The sport spread across the Pacific through trade, colonization, and military contact — and each culture made it distinctly their own.</p>

      <!-- League Overview Cards -->
      <div class="mt-24" style="display:grid;gap:20px">
        ${LEAGUES.map(league => buildLeagueCard(league)).join('')}
      </div>

      <!-- Team Rosters by League -->
      <div class="divider"></div>
      <div class="section-label">The Teams</div>
      <h2>Who Plays in Each League?</h2>
      <p class="mt-8">Each league has its own teams, traditions, and rivalries. Here are all the current clubs — hover over team colors to get a feel for each club's identity.</p>

      <!-- MLB Teams -->
      <div style="margin-top:24px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          ${buildLeagueLogoSVG('MLB', '#388bfd', 36)}
          <h3 style="margin:0">MLB — 30 Teams (6 Divisions)</h3>
        </div>
        ${MLB_DIVISIONS.map(d => `
          <div style="margin-bottom:20px">
            <div style="font-size:0.95rem;letter-spacing:1.5px;font-weight:600;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px">${d.div}</div>
            <div class="team-grid">
              ${d.teams.map(t => buildTeamTile(t)).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- NPB Teams -->
      <div style="margin-top:28px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          ${buildLeagueLogoSVG('NPB', '#f0883e', 36)}
          <h3 style="margin:0">NPB — 12 Teams (2 Leagues)</h3>
        </div>
        ${NPB_LEAGUES.map(l => `
          <div style="margin-bottom:20px">
            <div style="font-size:0.95rem;letter-spacing:1.5px;font-weight:600;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px">${l.league}</div>
            <div class="team-grid">
              ${l.teams.map(t => buildTeamTile(t)).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- KBO Teams -->
      <div style="margin-top:28px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          ${buildLeagueLogoSVG('KBO', '#a371f7', 48)}
          <h3 style="margin:0">KBO — 10 Teams</h3>
        </div>
        <div class="team-grid">
          ${KBO_TEAMS.map(t => buildTeamTile(t)).join('')}
        </div>
      </div>

      <!-- CPBL Teams -->
      <div style="margin-top:28px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          ${buildLeagueLogoSVG('CPBL', '#ce1126', 48)}
          <h3 style="margin:0">CPBL — 6 Teams 🇹🇼</h3>
        </div>
        <div class="team-grid">
          ${CPBL_TEAMS.map(t => buildTeamTile(t)).join('')}
        </div>
      </div>

      <!-- Other Professional Leagues -->
      <div class="divider"></div>
      <div class="section-label">Beyond the Pacific</div>
      <h2>Other Professional Baseball Leagues</h2>
      <p class="mt-8">These four leagues are our focus — but professional baseball reaches much further. Here are the other leagues worth knowing.</p>

      <div style="display:grid;gap:10px;margin-top:20px">
        ${[
          { flag:'🇲🇽', name:'LMB', full:'Liga Mexicana de Béisbol', meta:'Est. 1925 · 16 teams · Summer (Apr–Aug)', color:'#ce1126',
            notes:['Oldest active professional baseball league in the Americas','16 teams; champion advances to the Caribbean Series','A professional destination for MLB-fringe and Latin American development players'] },
          { flag:'🇩🇴', name:'LIDOM', full:'Dominican Winter League', meta:'Est. 1951 · 6 teams · Winter (Oct–Jan)', color:'#1B4F9C',
            notes:['Dominican Republic produces roughly 30% of all active MLB players','Winter season keeps prospects game-ready year-round','Champion advances to the Caribbean Series alongside LMB, LVBP, and Puerto Rico'] },
          { flag:'🇻🇪', name:'LVBP', full:'Venezuelan Professional Baseball League', meta:'Est. 1945 · 8 teams · Winter (Nov–Jan)', color:'#CF142B',
            notes:['Produced Cabrera, Altuve, Machado, and dozens of MLB All-Stars','Many players split their year between MLB/MiLB and their home league','Political instability since ~2015 has slowed the talent pipeline, but the league continues'] },
          { flag:'🇨🇺', name:'Serie Nacional', full:'Cuban National Baseball League', meta:'Est. 1962 · 16 teams', color:'#0032A0',
            notes:['Historically state-run and non-commercial; Cuba began permitting MLB contracts via third-country agreements in 2018','Major talent source — Yordan Alvarez, José Abreu, Aroldis Chapman all came through this system','Players historically left Cuba via defection before agreements were formalized'] },
          { flag:'🇦🇺', name:'ABL', full:'Australian Baseball League', meta:'Est. 2010 · 8 teams · Summer (Nov–Feb)', color:'#00843D',
            notes:['Southern Hemisphere schedule; commonly used by MLB organizations as a winter development destination','Baseball is a minor sport in Australia, but the league has stable infrastructure','Part of the broader Pacific baseball ecosystem, connected to WBSC Asia-Pacific competitions'] },
        ].map(l => `
          <div style="background:var(--surface2);border-radius:10px;border-left:3px solid ${l.color};padding:14px 18px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
              <span style="font-size:1.1rem">${l.flag}</span>
              <span style="font-weight:700;color:${l.color};font-family:'Oswald',sans-serif">${l.name}</span>
              <span style="font-size:0.98rem;color:var(--text-muted)">${l.full}</span>
              <span style="font-size:0.88rem;color:var(--text-muted);padding:2px 7px;border-radius:4px;background:rgba(255,255,255,0.06)">${l.meta}</span>
            </div>
            <ul style="margin:0;padding-left:16px">
              ${l.notes.map(n => `<li style="font-size:1.01rem;color:var(--text-muted);line-height:1.6;margin-bottom:2px">${n}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
        <p style="font-size:1.0rem;color:var(--text-muted);padding:12px 16px;background:var(--surface2);border-radius:8px;line-height:1.65;margin-top:2px"><strong style="color:var(--text)">Also notable:</strong> Semi-professional leagues operate in the Netherlands (Hoofdklasse), Italy, and Spain. China's CBL (中国棒球联赛) is developing. Puerto Rico, Panama, and Colombia each operate winter leagues connected to the Caribbean Series.</p>
      </div>

      <!-- Playoff Formats -->
      <div class="divider"></div>
      <div class="section-label">How Do You Win the Championship?</div>
      <h2>Playoff Formats Explained</h2>
      <p class="mt-8">Each league has a different path to the championship. Think of it like knockout tournaments in football — but with far more games and a more complex bracket.</p>

      <div style="display:grid;gap:20px;margin-top:20px">
        ${[
          { key:'mlb', label:'MLB — Road to the World Series', color:'#388bfd' },
          { key:'npb', label:'NPB — Road to the Japan Series', color:'#f0883e' },
          { key:'kbo', label:'KBO — Road to the Korean Series', color:'#a371f7' },
          { key:'cpbl', label:'CPBL — Road to the Taiwan Series', color:'#ce1126' },
        ].map(l => `
          <div class="league-card" style="border-left:3px solid ${l.color}">
            <div style="font-size:1rem;font-weight:700;color:${l.color}">${l.label}</div>
            ${buildPlayoffFormat(l.key)}
          </div>
        `).join('')}
      </div>

      <!-- International Tournaments -->
      <div class="divider"></div>
      <div class="section-label">Beyond the Leagues</div>
      <h2>International Baseball Tournaments</h2>
      <p class="mt-8">Once every few years, players set aside their club allegiances and represent their countries. These tournaments are where national pride meets world-class baseball — and where Taiwan regularly punches above its weight.</p>

      <div style="display:grid;gap:20px;margin-top:20px">
        ${INTL_TOURNAMENTS.map(t => buildTournamentCard(t)).join('')}
      </div>

      <!-- Compare Table -->
      <div class="divider"></div>
      <div class="section-label">Comparison</div>
      <h2>How the Leagues Stack Up</h2>
      <div style="overflow-x:auto;margin-top:16px">
        <table style="width:100%;border-collapse:collapse;font-size:1.07rem">
          <thead>
            <tr style="border-bottom:2px solid var(--border)">
              <th style="text-align:left;padding:10px;color:var(--text-muted);font-weight:600">League</th>
              <th style="text-align:center;padding:10px;color:var(--text-muted);font-weight:600">Teams</th>
              <th style="text-align:center;padding:10px;color:var(--text-muted);font-weight:600">Season Games</th>
              <th style="text-align:center;padding:10px;color:var(--text-muted);font-weight:600">Founded</th>
              <th style="text-align:center;padding:10px;color:var(--text-muted);font-weight:600">Avg Salary</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { flag:'🇺🇸', name:'MLB', color:'#388bfd', teams:30, games:162, founded:1869, salary:'$4.4M' },
              { flag:'🇯🇵', name:'NPB', color:'#f0883e', teams:12, games:143, founded:1950, salary:'¥50–200M' },
              { flag:'🇰🇷', name:'KBO', color:'#a371f7', teams:10, games:144, founded:1982, salary:'₩200–600M' },
              { flag:'🇹🇼', name:'CPBL', color:'#ce1126', teams:6, games:120, founded:1990, salary:'NT$3–8M' },
            ].map((l, i) => `
              <tr style="border-bottom:1px solid var(--border);${i%2===0?'background:rgba(255,255,255,0.02)':''}">
                <td style="padding:10px;font-weight:700;color:${l.color}">${l.flag} ${l.name}</td>
                <td style="padding:10px;text-align:center;color:var(--text-muted)">${l.teams}</td>
                <td style="padding:10px;text-align:center;color:var(--text-muted)">${l.games}</td>
                <td style="padding:10px;text-align:center;color:var(--text-muted)">${l.founded}</td>
                <td style="padding:10px;text-align:center;color:var(--text-muted);font-size:1.0rem">${l.salary}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="mt-24 text-center">
        <p class="text-muted mb-16">Ready for the story of how baseball became Taiwan's soul?</p>
        <button class="btn btn-red" onclick="showScreen('taiwan');initModule('taiwan')">🇹🇼 Taiwan's Baseball Story →</button>
      </div>
    </div>
  `;
}

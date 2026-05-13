// ── MODULE 5: TAIWAN'S BASEBALL STORY ──

const TIME_STATIONS = [
  {
    era: '1895 — 1945',
    stationNum: '01',
    color: '#f0b429',
    title: 'The Dream of Koshien',
    subtitle: 'Colonial Baseball · 1895–1945',
    theme: 'A colonized people discover their stage',
    keyYear: '1931',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kano_Baseball_Team_1931.jpg/600px-Kano_Baseball_Team_1931.jpg',
    photoCaption: '1931 嘉農棒球隊 — The KANO Baseball Team at Koshien',
    body: `<p>When Japan colonized Taiwan in 1895, it brought baseball. What began as a sport for Japanese administrators and soldiers slowly filtered down to Taiwanese and indigenous communities — and something remarkable happened.</p>
    <p style="margin-top:12px">In 1931, a small agricultural school from Chiayi (嘉義農林學校, shortened to KANO — 嘉農) traveled to Japan to compete in the high school national championship at Koshien Stadium. Their team was uniquely Taiwanese: Han Chinese, indigenous Amis players, and Japanese students playing together — an unprecedented sight in colonial-era Asia.</p>
    <p style="margin-top:12px">They reached the final. In a society where colonized people were systematically disadvantaged, KANO's players showed they were better than anyone on the field. The phrase spoken by their Japanese coach became legendary: <em>"Kano has never given up."</em></p>`,
    quote: '"KANO Never Gives Up." — Coach Kondo Hyotaro',
    quoteContext: 'Words spoken about the KANO (嘉農) team — which defined a generation and a nation'
  },
  {
    era: '1968 — 1990',
    stationNum: '02',
    color: '#388bfd',
    title: 'Taiwan by the Radio',
    subtitle: 'Little League Era · 1968–1990',
    theme: 'Seventeen championships and a nation glued to the radio',
    keyYear: '1968–1981',
    photo: null,
    photoCaption: null,
    body: `<p>In 1971, Taiwan was expelled from the United Nations. It couldn't use its name or flag in international competition. For a country that watched its diplomatic world collapse overnight, baseball became one of the last windows to the world.</p>
    <p style="margin-top:12px">Starting in 1969, Taiwanese youth baseball teams began entering the Little League World Series in Williamsport, Pennsylvania — and they dominated. Taiwan won <strong>17 championships</strong> between 1969 and 1996. During each tournament, families across Taiwan gathered around radio sets to listen to broadcasts, sometimes staying up past midnight.</p>
    <p style="margin-top:12px">These weren't just sports victories. They were proof: <em>Taiwan exists. Taiwan is here. Taiwan can win.</em> The concept of <strong>國際孤兒</strong> (international orphan) — a country abandoned by the world stage — found its answer in a baseball field in Pennsylvania.</p>`,
    quote: '"Winning Heals All Illnesses" — Taiwan\'s baseball rallying cry',
    quoteContext: 'A phrase that captured how baseball victories felt like medicine for a diplomatically isolated nation'
  },
  {
    era: '2001 — 2012',
    stationNum: '03',
    color: '#3fb950',
    title: "Taiwan's Light in the Majors",
    subtitle: 'MLB Breakthrough · 2001–2012',
    theme: 'Individual heroes on baseball\'s biggest stage',
    keyYear: '2003–2009',
    photo: null,
    photoCaption: null,
    body: `<p>A new century brought a new kind of Taiwan baseball story: individual excellence at the highest level. Where youth teams had represented the nation collectively, now single players carried the flag into Major League Baseball — and succeeded.</p>
    <p style="margin-top:12px"><strong>王建民 Wang Chien-Ming</strong> became a New York Yankee and won 19 games in 2006 — one of the best seasons by any starting pitcher that year. Every game he pitched, Taiwan watched. His sinker induced ground balls at historic rates and made him briefly one of the most dominant pitchers in MLB.</p>
    <p style="margin-top:12px">Meanwhile, <strong>陳金鋒 Chen Chin-Feng</strong> was hitting home runs at impossible rates in international competition, and <strong>陳偉殷 Wei-Yin Chen</strong> would follow with 7 MLB seasons. The message: Taiwan could produce world-class baseball talent.</p>
    <p style="margin-top:12px">And then came a moment pure enough to become legend. At the 2003 Asian Championship, Taiwan needed a clutch hit against Korea. <strong>高志綱 Gao Zhi-Gang</strong> delivered. Broadcaster Zeng Wen-Cheng's scream — <em>"又是高志綱！"</em> (It's Gao Zhi-Gang again!) — became one of the most replayed moments in Taiwan sports broadcasting history.</p>`,
    quote: '"It\'s Gao Zhi-Gang Again!" — Broadcaster Zeng Wen-Cheng, 2003',
    quoteContext: 'The legendary call at the 2003 Asian Championship vs. Korea — one of the most replayed moments in Taiwan sports broadcasting'
  },
  {
    era: '2020 — Present',
    stationNum: '04',
    color: '#ce1126',
    title: 'Glory at Home',
    subtitle: 'Modern Era · 2020–Present',
    theme: 'Cheerleaders, content culture, and the 2024 world championship',
    keyYear: '2024',
    photo: null,
    photoCaption: null,
    body: `<p>Modern CPBL baseball in Taiwan has evolved into something unique in world baseball: a full entertainment experience anchored by <strong>professional cheerleader squads</strong> for each team. Every team fields trained, choreographed cheerleader units who perform throughout the game — a feature that has made CPBL games a must-see cultural event, especially for younger fans and visitors.</p>
    <p style="margin-top:12px">The cheerleader culture has attracted international media coverage and brought a new generation to the ballpark — proof that baseball can evolve its entertainment format without losing its soul.</p>
    <p style="margin-top:12px">Then came <strong>2024</strong>. Taiwan hosted the WBSC Premier 12 — one of baseball's top international tournaments. The national team advanced game by game through pool play and the Super Round. In the final, they faced Japan — perhaps the greatest baseball nation on earth — and won.</p>
    <p style="margin-top:12px">Adults who had watched the radio broadcasts of the 1970s Little League era wept. Younger fans who grew up watching cheerleaders and social media highlights danced in stadiums. <em>Taiwan won.</em></p>`,
    quote: '"Taiwan Won!" — 2024 WBSC Premier 12 Championship',
    quoteContext: 'Taiwan defeated Japan on home soil — the biggest baseball victory since the Little League era'
  }
];

const PLAYER_SHOWCASE = [
  {
    name: 'Wang Chien-Ming',
    nameZh: '王建民',
    tag: 'MLB',
    role: 'Starting Pitcher · New York Yankees',
    era: '2005–2013',
    statNum: '19',
    statLabel: 'WINS',
    statContext: 'Most wins in a single MLB season by any Taiwan-born pitcher — 2006 Yankees',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Chien-Ming_Wang_by_Keith_Allison.jpg',
    description: 'Taiwan\'s most celebrated MLB export. His devastating sinker generated ground balls at historic rates, making him briefly one of the most dominant pitchers in baseball. Every game he started, Taiwan watched.',
    color: '#003087'
  },
  {
    name: 'Chen Chin-Feng',
    nameZh: '陳金鋒',
    tag: 'Intl.',
    role: 'Outfielder · Los Angeles Dodgers',
    era: '1998–2008',
    statNum: '1:5.5',
    statLabel: 'HR RATE',
    statContext: 'One home run per 5.5 international at-bats — the most feared bat in Taiwan\'s tournament era',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Chin-Feng_Chen_2005_%285%29_%28Cropped%29.jpg',
    description: 'Pioneer and icon. The emotional anchor of Taiwan\'s golden era national team — and the first Taiwanese position player to carve out an MLB career. Made the impossible look routine.',
    color: '#005A9C'
  },
  {
    name: 'Wei-Yin Chen',
    nameZh: '陳偉殷',
    tag: 'MLB',
    role: 'Starting Pitcher · Baltimore / Miami',
    era: '2012–2019',
    statNum: '59',
    statLabel: 'MLB WINS',
    statContext: 'Most career MLB wins by any Taiwan-born pitcher — 7 seasons across two franchises',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Wei-Yin_Chen_2015.jpg',
    description: 'Durable, reliable, professional. Proved that Taiwan could export not just one MLB star, but a generation of capable major leaguers who could sustain careers at the top level.',
    color: '#DF4601'
  },
  {
    name: 'Kuo Hong-Chih',
    nameZh: '郭泓志',
    tag: 'MLB',
    role: 'Relief Pitcher · Los Angeles Dodgers',
    era: '2005–2012',
    statNum: '10.7',
    statLabel: 'K/9',
    statContext: 'Elite career strikeout rate in the Dodgers bullpen — despite surviving 3 career-ending arm surgeries',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Hong-Chih_Kuo.jpg',
    description: 'A left-handed weapon out of the Dodgers bullpen. Three times, doctors said his arm was finished. Three times, he came back. His perseverance became a story Taiwan told about itself.',
    color: '#005A9C'
  },
  {
    name: 'Lin Tzu-wei',
    nameZh: '林子偉',
    tag: 'MLB',
    role: 'Infielder · Boston Red Sox',
    era: '2017–2019',
    statNum: '2018',
    statLabel: 'W.S. RING',
    statContext: 'First Taiwan-born player to appear in a World Series game — Boston Red Sox championship',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Tzu-Wei_Lin_in_2017_%2836962867110%29_%28cropped%29.jpg',
    description: 'A defensive specialist with elite speed. When the Red Sox won the 2018 World Series, Lin Tzu-wei was on the roster — making history as the first Taiwanese-born player in a Fall Classic.',
    color: '#BD3039'
  },
  {
    name: 'Chang Yu-chang',
    nameZh: '張育成',
    tag: 'Active',
    role: 'Infielder · Cleveland Guardians / multiple teams',
    era: '2020–present',
    statNum: 'NOW',
    statLabel: 'ACTIVE MLB',
    statContext: 'Current Taiwan-born player in MLB — representing the island\'s next generation in the 2020s',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Yu_Chang_%2852103060016%29_%28cropped%29.jpg',
    description: 'The flag carrier for modern Taiwan baseball. While legends retire, Chang Yu-chang is out there today — proving that Taiwan\'s pipeline to MLB is alive and still producing.',
    color: '#002D62'
  },
  {
    name: 'Peng Cheng-min',
    nameZh: '彭政閔',
    tag: 'CPBL',
    role: 'Outfielder · CTBC Brothers',
    era: '2001–2019',
    statNum: '2,030',
    statLabel: 'CPBL HITS',
    statContext: 'CPBL all-time career hits record — 18 professional seasons, the face of domestic baseball',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Peng_Cheng-min_by_boomer-44_%281%29.jpg',
    description: 'The most beloved player in CPBL history. Nicknamed "The Brother," every Taiwanese kid who grew up in the 2000s dreamed of being him. His 2,030+ career hits are a record likely to stand for generations.',
    color: '#002D72'
  },
  {
    name: 'Wang Bo-rong',
    nameZh: '王柏融',
    tag: 'CPBL→NPB',
    role: 'Outfielder · Rakuten Eagles (NPB)',
    era: '2015–present',
    statNum: '.394',
    statLabel: 'SEASON AVG',
    statContext: 'Record single-season batting average in CPBL history (2017) — first CPBL player signed by NPB as free agent',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/%E7%8E%8B%E6%9F%8F%E8%9E%8D%E5%AE%88%E5%82%99_%E6%97%A5%E8%81%B7%E7%81%AB%E8%85%BF2019_%28cropped%29.jpg',
    description: 'A hitter so good that Japanese scouts came looking. His .394 batting average in 2017 still stands as the CPBL record. His move to Rakuten broke new ground for Taiwanese players seeking to export their talent.',
    color: '#860024'
  },
  {
    name: 'Lin Chih-sheng',
    nameZh: '林智勝',
    tag: 'CPBL',
    role: 'First Baseman · Multiple CPBL Teams',
    era: '2003–2021',
    statNum: '19 yrs',
    statLabel: 'CAREER',
    statContext: 'Taiwan\'s premier power hitter — multiple HR and batting titles across a legendary 19-year CPBL career',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chih-Sheng_Lin_%282016%29.jpg',
    description: 'The most feared slugger Taiwan\'s domestic league ever produced. His combination of power and consistency — across nearly two decades — defined what a CPBL franchise player could be.',
    color: '#C8102E'
  },
  {
    name: 'Gao Zhi-Gang',
    nameZh: '高志剛',
    tag: 'Intl.',
    role: 'Catcher · Chinese Taipei National Team',
    era: '1998–2010',
    statNum: '2003',
    statLabel: 'THE MOMENT',
    statContext: 'His clutch hit vs. Korea sparked the most replayed call in Taiwan sports history: "It\'s Gao Zhi-Gang again!"',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Kao_Chih-kang.jpg',
    description: 'Some players are remembered for stats. Gao Zhi-Gang is remembered for a single swing that became a national memory. The 2003 Asian Championship clutch hit against Korea — and broadcaster Zeng Wen-Cheng\'s legendary scream — is part of Taiwan\'s cultural DNA.',
    color: '#a371f7'
  }
];

function buildTimeStation(s, idx) {
  const isRight = idx % 2 === 1;
  const photoBlock = s.photo
    ? `<div class="player-photo-card" style="border-radius:10px;overflow:hidden;margin-bottom:16px;border:1px solid ${s.color}33">
        <img src="${s.photo}" alt="${s.photoCaption || ''}"
          onerror="this.parentElement.style.display='none'"
          style="width:100%;aspect-ratio:16/9;object-fit:cover;object-position:top">
        ${s.photoCaption ? `<div style="padding:8px 12px;font-size:0.78rem;color:var(--text-muted);background:var(--surface2)">${s.photoCaption}</div>` : ''}
      </div>`
    : '';

  return `<div class="time-station" style="border-left:3px solid ${s.color};margin-bottom:32px">
    <div class="station-header" style="background:${s.color}18;border-bottom:1px solid ${s.color}33;padding:16px 20px;margin:-1px -1px 20px -1px;border-radius:10px 10px 0 0">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
        <div>
          <div class="station-era" style="color:${s.color};font-size:0.78rem;letter-spacing:2px;font-weight:700;font-family:'Oswald',sans-serif;text-transform:uppercase">STATION ${s.stationNum} · ${s.era}</div>
          <div class="station-title" style="font-size:1.5rem;font-weight:700;color:var(--text);margin-top:4px;font-family:'Oswald',sans-serif">${s.title}</div>
          <div class="station-subtitle" style="font-size:0.9rem;color:var(--text-muted);margin-top:2px">${s.subtitle}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:2rem;font-weight:800;color:${s.color};opacity:0.4;font-family:'Oswald',sans-serif;line-height:1">${s.keyYear}</div>
        </div>
      </div>
      <div style="margin-top:10px;font-size:0.8rem;font-style:italic;color:${s.color};opacity:0.85">↳ ${s.theme}</div>
    </div>
    <div class="station-body" style="padding:0 20px 20px">
      ${photoBlock}
      <div style="font-size:0.93rem;color:var(--text);line-height:1.75">${s.body}</div>
      <blockquote class="station-quote" style="margin:20px 0 0;padding:14px 18px;border-left:3px solid ${s.color};background:${s.color}12;border-radius:0 8px 8px 0">
        <div style="font-size:1rem;font-weight:600;color:${s.color};font-family:'Oswald',sans-serif">${s.quote}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px">${s.quoteContext}</div>
      </blockquote>
    </div>
  </div>`;
}

function buildPlayerShowcaseCard(p, idx) {
  const fallbackStyle = `width:72px;height:72px;border-radius:50%;background:${p.color}33;border:2px solid ${p.color};display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0`;
  const photoEl = p.photo
    ? `<img src="${p.photo}" alt="${p.name}"
        onerror="this.outerHTML='<div style=\\'${fallbackStyle}\\'>⚾</div>'"
        style="width:72px;height:72px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid ${p.color};flex-shrink:0">`
    : `<div style="${fallbackStyle}">⚾</div>`;

  const tagColor = p.tag === 'Active' ? '#3fb950' : p.tag === 'CPBL' ? '#ce1126' : p.tag === 'CPBL→NPB' ? '#f0883e' : p.tag === 'Intl.' ? '#a371f7' : '#388bfd';

  return `<div class="player-slide" style="scroll-snap-align:start;flex-shrink:0;width:100%;box-sizing:border-box;padding:0 4px">
    <div style="background:var(--surface2);border-radius:14px;overflow:hidden;border-top:3px solid ${p.color}">

      <!-- Big stat banner -->
      <div style="background:${p.color}18;padding:20px 24px 16px;border-bottom:1px solid ${p.color}22;text-align:center">
        <div style="font-size:3rem;font-weight:800;color:${p.color};font-family:'Oswald',sans-serif;line-height:1">${p.statNum}</div>
        <div style="font-size:0.72rem;font-weight:700;letter-spacing:3px;color:${p.color};opacity:0.85;margin-top:4px;font-family:'Oswald',sans-serif;text-transform:uppercase">${p.statLabel}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;line-height:1.4">${p.statContext}</div>
      </div>

      <!-- Bio section -->
      <div style="padding:18px 20px">
        <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:14px">
          ${photoEl}
          <div style="min-width:0">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
              <span style="font-size:0.65rem;font-weight:700;letter-spacing:1.5px;padding:2px 8px;border-radius:4px;background:${tagColor}22;color:${tagColor};font-family:'Oswald',sans-serif">${p.tag}</span>
            </div>
            <div style="font-size:1.1rem;font-weight:700;color:${p.color};font-family:'Oswald',sans-serif;line-height:1.2">${p.name}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:2px">${p.nameZh} · ${p.era}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px;opacity:0.8">${p.role}</div>
          </div>
        </div>
        <p style="font-size:0.87rem;color:var(--text-muted);line-height:1.65;margin:0">${p.description}</p>
      </div>
    </div>
  </div>`;
}

function initTaiwanModule() {
  const screen = document.getElementById('screen-taiwan');
  screen.innerHTML = `
    ${makeNav('06 — Taiwan\'s Baseball Story', 'From colonial import to 2024 world champion').outerHTML}
    <div class="module-content">

      <div class="section-label red">The Story Behind the Obsession</div>
      <h1>Why Does Taiwan Care So Much?</h1>
      <p class="mt-8">To most of the world, baseball is a sport. To Taiwan, it has been something much more: a stage for national existence, a source of collective pride, and a way to tell the world "we are here." To understand the passion, you have to walk through history.</p>

      <div class="info-box mt-16" style="border-left:3px solid #ce1126">
        <h3>The Core Idea: 國際孤兒 (International Orphan)</h3>
        <p class="mt-8">After 1971, Taiwan was expelled from the United Nations. It couldn't compete at the Olympics under its own name. Most countries refused to officially recognize it. But baseball? Baseball asked only one thing: play. And Taiwan could play better than almost anyone.</p>
        <p class="mt-8">For decades, international baseball competitions were one of the very few arenas where Taiwan could stand on a world stage. Winning wasn't just about sport — it was proof of existence.</p>
      </div>

      <!-- Time Corridor -->
      <div class="divider"></div>
      <div class="section-label red">Time Corridor</div>
      <h2>130 Years of Taiwan Baseball</h2>
      <p class="mt-8 mb-24">Walk through four eras that shaped Taiwan's baseball identity. Each station is a chapter in a story that's still being written.</p>

      <div style="position:relative">
        <div style="position:absolute;left:8px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#f0b429,#388bfd,#3fb950,#ce1126);opacity:0.3;border-radius:2px"></div>
        <div style="padding-left:28px">
          ${TIME_STATIONS.map((s, i) => buildTimeStation(s, i)).join('')}
        </div>
      </div>

      <!-- Dark Chapters: Match-Fixing -->
      <div class="divider"></div>
      <div class="section-label" style="color:#f0883e">Dark Chapters</div>
      <h2>The Match-Fixing Scandals</h2>
      <p class="mt-8 mb-16">Taiwan's baseball story isn't all triumph. Three waves of gambling corruption nearly destroyed the professional game — and understanding them is part of understanding why the 2024 championship meant so much.</p>

      <div style="display:flex;flex-direction:column;gap:16px">

        <div style="background:var(--surface2);border-radius:12px;border-left:4px solid #f0883e;padding:20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="font-size:1.3rem;font-weight:800;color:#f0883e;font-family:'Oswald',sans-serif">1996–1997</div>
            <div style="font-size:0.75rem;font-weight:700;letter-spacing:1.5px;padding:2px 8px;border-radius:4px;background:#f0883e22;color:#f0883e;font-family:'Oswald',sans-serif">FIRST WAVE</div>
          </div>
          <h3 style="font-size:1rem;color:var(--text);margin-bottom:8px">The First Cracks Appear</h3>
          <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.65">Just a few years after the CPBL was founded in 1990, organized crime moved in. Players were approached with cash to intentionally lose games or manipulate scores — a practice known as <strong style="color:var(--text)">打假球</strong> (playing fake ball). In 1997, the first major arrests exposed players from multiple teams. The initial shock sent the league scrambling, but the problem wasn't gone — it went underground.</p>
        </div>

        <div style="background:var(--surface2);border-radius:12px;border-left:4px solid #ce1126;padding:20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="font-size:1.3rem;font-weight:800;color:#ce1126;font-family:'Oswald',sans-serif">2008–2009</div>
            <div style="font-size:0.75rem;font-weight:700;letter-spacing:1.5px;padding:2px 8px;border-radius:4px;background:#ce112622;color:#ce1126;font-family:'Oswald',sans-serif">WORST WAVE</div>
          </div>
          <h3 style="font-size:1rem;color:var(--text);margin-bottom:8px">The Scandal That Nearly Killed the League</h3>
          <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.65">The second and third waves hit harder. Between 2008 and 2009, investigators uncovered 102 illegal gambling cases involving 222 people — players, agents, and organized crime figures. Most devastating was the involvement of the <strong style="color:var(--text)">Brother Elephants (兄弟象)</strong>, Taiwan's most beloved team. Fans who had grown up watching these players wept in disbelief.</p>
          <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.65;margin-top:10px">Attendance collapsed. Parents stopped signing their children up for baseball. Stadiums that once roared with noise fell quiet. The question wasn't whether CPBL could win — it was whether CPBL would survive.</p>
        </div>

        <div style="background:var(--surface2);border-radius:12px;border-left:4px solid #3fb950;padding:20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="font-size:1.3rem;font-weight:800;color:#3fb950;font-family:'Oswald',sans-serif">2010–2024</div>
            <div style="font-size:0.75rem;font-weight:700;letter-spacing:1.5px;padding:2px 8px;border-radius:4px;background:#3fb95022;color:#3fb950;font-family:'Oswald',sans-serif">REBUILDING</div>
          </div>
          <h3 style="font-size:1rem;color:var(--text);margin-bottom:8px">Earning Trust Back, One Game at a Time</h3>
          <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.65">Recovery was slow and hard. The CPBL implemented stricter oversight, player integrity programs, and transparent disciplinary processes. New ownership groups entered the league. New teams were formed. The cheerleader culture that defines modern CPBL was partly a deliberate effort to reimagine the fan experience and draw younger audiences who hadn't been burned by the scandal era. By 2024, when Taiwan won the Premier 12 championship, the tears in the stands weren't just for the gold medal — they were for everything the sport had survived to get there.</p>
        </div>

      </div>

      <!-- Hall of Fame Slider -->
      <div class="divider"></div>
      <div class="section-label">Hall of Fame</div>
      <h2>The Players Who Carried the Dream</h2>
      <p class="mt-8 mb-16">These individuals carried Taiwan's baseball story on their shoulders — in MLB, at international tournaments, and in CPBL stadiums across the island.</p>

      <!-- Slider container -->
      <div style="position:relative">
        <div id="playerSlider" style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;gap:12px;padding-bottom:8px;-webkit-overflow-scrolling:touch;scrollbar-width:none">
          ${PLAYER_SHOWCASE.map((p, i) => buildPlayerShowcaseCard(p, i)).join('')}
        </div>
        <!-- Dots -->
        <div id="sliderDots" style="display:flex;justify-content:center;gap:8px;margin-top:16px;flex-wrap:wrap">
          ${PLAYER_SHOWCASE.map((_, i) => `<button onclick="goToSlide(${i})" id="dot-${i}" style="width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;padding:0;background:${i===0?'var(--blue)':'var(--border)'}; transition:background 0.2s"></button>`).join('')}
        </div>
        <!-- Prev/Next -->
        <div style="display:flex;gap:10px;justify-content:center;margin-top:12px">
          <button onclick="slideStep(-1)" style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:8px 18px;cursor:pointer;font-size:0.9rem">← Prev</button>
          <button onclick="slideStep(1)"  style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:8px 18px;cursor:pointer;font-size:0.9rem">Next →</button>
        </div>
      </div>

      <!-- Closing -->
      <div class="divider"></div>
      <div class="info-box green">
        <h3>🏆 "Winning Heals All Illnesses"</h3>
        <p class="mt-8">There's a phrase in Taiwanese baseball culture: <em>贏球治百病</em> — "winning heals all illnesses." After decades of diplomatic isolation, economic pressure, political uncertainty, and the deep wounds of the match-fixing era, a victory in an international tournament felt like medicine for the national soul.</p>
        <p class="mt-8">When Taiwan beat Japan to win the 2024 Premier 12 on home soil, grown adults wept. Not just for the game — but for everything it represented. The 1931 KANO players would have understood completely.</p>
      </div>

      <div class="mt-24 text-center">
        <p class="text-muted mb-16">One last step — test everything you've learned</p>
        <button class="btn btn-green" onclick="showScreen('quiz');resetModule('quiz')">Take the Final Quiz →</button>
      </div>
    </div>
  `;

  // Slider logic
  let currentSlide = 0;
  const total = PLAYER_SHOWCASE.length;
  let autoTimer = null;

  function updateDots(idx) {
    for (let i = 0; i < total; i++) {
      const d = document.getElementById('dot-' + i);
      if (d) d.style.background = i === idx ? 'var(--blue)' : 'var(--border)';
    }
  }

  window.goToSlide = function(idx) {
    currentSlide = (idx + total) % total;
    const slider = document.getElementById('playerSlider');
    if (!slider) return;
    const slide = slider.children[currentSlide];
    if (slide) slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    updateDots(currentSlide);
  };

  window.slideStep = function(dir) {
    goToSlide(currentSlide + dir);
    resetAuto();
  };

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
  }

  // Track scroll position to sync dots
  const slider = document.getElementById('playerSlider');
  if (slider) {
    slider.addEventListener('scroll', () => {
      const idx = Math.round(slider.scrollLeft / slider.clientWidth);
      if (idx !== currentSlide) { currentSlide = idx; updateDots(idx); }
    });
  }

  resetAuto();
}

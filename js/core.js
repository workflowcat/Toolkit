/* =============================================
   CORE JS — shared across all pages.
   Theme, language, dice.
   ============================================= */

const html = document.documentElement;

// Theme
const storedTheme = localStorage.getItem('theme');
if (storedTheme) html.setAttribute('data-theme', storedTheme);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme', 'dark');

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Language toggle
const storedLang = localStorage.getItem('lang');
if (storedLang) html.setAttribute('data-lang', storedLang);

document.getElementById('lang-toggle').addEventListener('click', () => {
  const next = html.getAttribute('data-lang') === 'uk' ? 'en' : 'uk';
  html.setAttribute('data-lang', next);
  localStorage.setItem('lang', next);
  html.setAttribute('lang', next === 'uk' ? 'uk' : 'en');
});

// Connection graph
const graph = [
  { id: 'adversarial', title: { en: 'Adversarial Robustness in Judicial Decision Systems', uk: 'Стійкість до атак у системах судових рішень' }, type: 'research', excerpt: { en: 'Mapping the vulnerability topology of deployed court systems.', uk: 'Відображення топології вразливостей розгорнутих судових систем.' }, connects: ['illegibility', 'sensor-fusion', 'statutes', 'kintsugi'] },
  { id: 'kintsugi', title: { en: 'The Repair Aesthetic: Why Kintsugi Matters', uk: 'Естетика ремонту: чому кінцугі має значення' }, type: 'arts', excerpt: { en: 'A different relationship with breakage — for resilient systems and for Ukraine.', uk: 'Інші стосунки з руйнуванням — для стійких систем і для України.' }, connects: ['adversarial', 'pace-layers', 'illegibility'] },
  { id: 'sensor-fusion', title: { en: 'Sensor Fusion Under Contested Conditions', uk: 'Злиття сенсорних даних в умовах протидії' }, type: 'defense', excerpt: { en: 'Making decisions under adversarial uncertainty.', uk: 'Прийняття рішень в умовах ворожої невизначеності.' }, connects: ['adversarial', 'illegibility', 'voxkit'], href: 'defense/' },
  { id: 'illegibility', title: { en: 'On Illegibility as Strategy', uk: 'Про нерозбірливість як стратегію' }, type: 'garden', excerpt: { en: 'When being hard to read is a feature. States need legibility. Individuals sometimes need its opposite.', uk: 'Коли бути важким для прочитання — це перевага. Державам потрібна розбірливість. Людям іноді — навпаки.' }, connects: ['adversarial', 'sensor-fusion', 'pace-layers'] },
  { id: 'pace-layers', title: { en: 'Pace Layers and Software Architecture', uk: 'Шари темпу та архітектура програмного забезпечення' }, type: 'garden', excerpt: { en: 'Infrastructure moves slowly. UI moves fast. Problems start when you confuse the layers.', uk: 'Інфраструктура рухається повільно. Інтерфейс — швидко. Проблеми починаються, коли плутаєш шари.' }, connects: ['illegibility', 'kintsugi', 'statutes'] },
  { id: 'statutes', title: { en: 'Teaching Machines to Read Statutes', uk: 'Навчити машини читати закони' }, type: 'research', excerpt: { en: 'Treating statutes as living networks rather than flat text.', uk: 'Сприймати закони як живі мережі, а не плоский текст.' }, connects: ['adversarial', 'pace-layers', 'precedent-graph'] },
  { id: 'voxkit', title: { en: 'VoxKit: Voice-First Legal Interface', uk: 'VoxKit: голосовий правовий інтерфейс' }, type: 'tools', excerpt: { en: 'Ask a question out loud and it searches case law in real time.', uk: 'Задайте питання вголос — і система шукає судову практику в реальному часі.' }, connects: ['sensor-fusion', 'statutes', 'precedent-graph'] },
  { id: 'precedent-graph', title: { en: 'Precedent Graph Explorer', uk: 'Дослідник графу прецедентів' }, type: 'tools', excerpt: { en: 'Mapping citation networks in case law. Reveals doctrinal lineages.', uk: 'Побудова мереж цитувань у судовій практиці. Виявляє доктринальні лінії.' }, connects: ['statutes', 'voxkit', 'kintsugi'] },
];

let lastRolled = null;
let isRolling = false;
const diceFaces = ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685'];

function pickRandom(exclude) {
  const candidates = graph.filter(n => n.id !== exclude);
  const weighted = [];
  candidates.forEach(c => { for (let i = 0; i < c.connects.length; i++) weighted.push(c); });
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function animateDiceRoll(callback) {
  if (isRolling) return;
  isRolling = true;

  const overlay = document.getElementById('dice-overlay');
  const rolling = document.getElementById('dice-rolling');
  const rollingText = document.getElementById('dice-rolling-text');
  const progressFill = document.getElementById('dice-progress-fill');
  const result = document.getElementById('dice-result');
  const diceBtn = document.getElementById('dice-btn');
  const lang = html.getAttribute('data-lang') || 'en';

  rolling.style.display = 'flex';
  document.getElementById('dice-progress').style.display = 'block';
  result.classList.remove('dice-overlay__result--visible');
  result.style.display = 'none';
  progressFill.style.width = '0';
  overlay.classList.add('dice-overlay--open');
  diceBtn.classList.add('dice-btn--rolling');

  const finalPick = pickRandom(lastRolled);
  lastRolled = finalPick.id;

  const totalSteps = 12;
  let step = 0;

  function nextStep() {
    if (step >= totalSteps) {
      diceBtn.classList.remove('dice-btn--rolling');
      diceBtn.querySelector('.dice-face').textContent = diceFaces[Math.floor(Math.random() * 6)];
      rolling.style.display = 'none';
      document.getElementById('dice-progress').style.display = 'none';

      document.getElementById('dice-type').textContent = finalPick.type;
      document.getElementById('dice-title').textContent = finalPick.title[lang];
      document.getElementById('dice-excerpt').textContent = finalPick.excerpt[lang];

      // Link to page if it has one
      const link = document.getElementById('dice-title-link');
      link.href = finalPick.href || '#';

      result.style.display = 'block';
      requestAnimationFrame(() => result.classList.add('dice-overlay__result--visible'));

      isRolling = false;
      callback && callback(finalPick);
      return;
    }

    const showNode = step >= totalSteps - 2 ? finalPick : graph[Math.floor(Math.random() * graph.length)];
    rollingText.textContent = showNode.title[lang];
    diceBtn.querySelector('.dice-face').textContent = diceFaces[step % 6];
    progressFill.style.width = ((step + 1) / totalSteps * 100) + '%';

    const t = step / totalSteps;
    const delay = 80 + (t * t * 220);

    step++;
    setTimeout(nextStep, delay);
  }

  setTimeout(nextStep, 150);
}

function closeOverlay() {
  document.getElementById('dice-overlay').classList.remove('dice-overlay--open');
}

// Only bind dice if it exists on this page
const diceBtnEl = document.getElementById('dice-btn');
if (diceBtnEl) {
  diceBtnEl.addEventListener('click', () => animateDiceRoll());
  document.getElementById('dice-again').addEventListener('click', () => {
    document.getElementById('dice-result').classList.remove('dice-overlay__result--visible');
    document.getElementById('dice-result').style.display = 'none';
    animateDiceRoll();
  });
  document.getElementById('dice-close').addEventListener('click', closeOverlay);
  document.getElementById('dice-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget && !isRolling) closeOverlay();
  });
}

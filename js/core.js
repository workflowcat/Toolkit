/* =============================================
   CORE JS — shared across all pages.
   Theme, language, dice.
   ============================================= */

const html = document.documentElement;

// Theme
const storedTheme = localStorage.getItem('theme');
if (storedTheme) html.setAttribute('data-theme', storedTheme);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme', 'dark');

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// Language toggle
const storedLang = localStorage.getItem('lang');
if (storedLang) html.setAttribute('data-lang', storedLang);

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-lang') === 'uk' ? 'en' : 'uk';
    html.setAttribute('data-lang', next);
    localStorage.setItem('lang', next);
    html.setAttribute('lang', next === 'uk' ? 'uk' : 'en');
  });
}

// Rotating headline
const headlines = [
  { en: 'a toolkit for moving words around', uk: 'набір для переміщення слів' },
  { en: 'the library has no walls',          uk: 'бібліотека без стін' },
  { en: 'every tool changes the hand',       uk: 'кожен інструмент змінює руку' },
  { en: 'somewhere between babel and aleph',  uk: 'десь між вавилоном і алефом' },
];

const headlineEl = document.getElementById('headline');
if (headlineEl && headlines.length > 0) {
  let hIdx = 0;
  const lang = () => html.getAttribute('data-lang') || 'en';

  function showHeadline(index, animate = true) {
    const span = document.createElement('span');
    span.textContent = headlines[index][lang()];
    span.className = animate ? 'headline--entering' : 'headline--visible';
    headlineEl.textContent = '';
    headlineEl.appendChild(span);
    if (animate) requestAnimationFrame(() => { span.className = 'headline--visible'; });
  }

  function cycleHeadline() {
    const current = headlineEl.querySelector('span');
    if (current) {
      current.className = 'headline--leaving';
      setTimeout(() => {
        hIdx = (hIdx + 1) % headlines.length;
        showHeadline(hIdx);
      }, 600);
    }
  }

  showHeadline(0, false);
  setInterval(cycleHeadline, 4000);

  // Update headline text when language toggles
  if (langToggle) {
    langToggle.addEventListener('click', () => showHeadline(hIdx, false));
  }
}

// Connection graph — empty until real content is added
const graph = [];

let lastRolled = null;
let isRolling = false;
const diceFaces = ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685'];

function pickRandom(exclude) {
  if (graph.length === 0) return null;
  const candidates = graph.filter(n => n.id !== exclude);
  if (candidates.length === 0) return graph[0];
  const weighted = [];
  candidates.forEach(c => {
    const w = c.connects ? c.connects.length : 1;
    for (let i = 0; i < w; i++) weighted.push(c);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function animateDiceRoll(callback) {
  if (isRolling) return;
  if (graph.length === 0) return; // nothing to roll

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

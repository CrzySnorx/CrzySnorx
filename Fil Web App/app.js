/* Aral Tayo – core app: state, XP, badges, lessons, flashcards (spaced repetition),
   phrasebook, progress, settings. Practice + conversations live in practice.js. */
(() => {
  const user = Auth.requireAuth();
  if (!user) return;

  /* ---------- Helpers ---------- */
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const catById = id => CATEGORIES.find(c => c.id === id);
  const wordsOf = catId => catId === 'all' ? ALL_WORDS : ALL_WORDS.filter(w => w.cat === catId);
  const pad = n => String(n).padStart(2, '0');
  const dayKey = d => { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  const addDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return d; };

  let toastTimer;
  function toast(msg, ms) {
    const t = $('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), ms || 2400);
  }

  function confetti() {
    const colors = ['#fcd116', '#ce1126', '#2f55f4', '#6d3df5', '#17a05d', '#ff7ab6'];
    for (let i = 0; i < 46; i++) {
      const el = document.createElement('i');
      el.className = 'confetti';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.background = colors[i % colors.length];
      el.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
      el.style.animationDelay = (Math.random() * 0.4) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2800);
    }
  }

  /* ---------- Progress state ---------- */
  const KEY = 'fl_progress_' + user.username;
  const fresh = () => ({
    xp: 0, learned: {}, quiz: {}, quizzes: 0, correct: 0, answered: 0, cards: 0,
    streak: 0, best: 0, last: '', box: {}, due: {}, dayXP: {}, goal: 30, goalDay: '', goalHits: 0,
    badges: {}, perfect: 0, listen: 0, talked: {}
  });
  let P;
  try { P = Object.assign(fresh(), JSON.parse(Store.get(KEY)) || {}); } catch (e) { P = fresh(); }

  const level = () => Math.floor(P.xp / 100) + 1;
  const learnedCount = (catId = 'all') => wordsOf(catId).filter(w => P.learned[w.id]).length;

  function touchStreak() {
    const today = new Date().toDateString();
    if (P.last === today) return;
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    P.streak = P.last === yesterday ? P.streak + 1 : 1;
    P.last = today;
  }

  const BADGES = [
    { id: 'first', icon: '🌱', name: 'First Step', desc: 'Learn your first word', test: () => learnedCount() >= 1 },
    { id: 'w25', icon: '📘', name: 'Word Collector', desc: 'Learn 25 words', test: () => learnedCount() >= 25 },
    { id: 'w100', icon: '📚', name: 'Bookworm', desc: 'Learn 100 words', test: () => learnedCount() >= 100 },
    { id: 'topic', icon: '🗺️', name: 'Topic Master', desc: 'Learn every word in a topic', test: () => CATEGORIES.some(c => learnedCount(c.id) === c.words.length) },
    { id: 'xp100', icon: '⭐', name: 'Rising Star', desc: 'Earn 100 XP', test: () => P.xp >= 100 },
    { id: 'xp500', icon: '🏆', name: 'Champion', desc: 'Earn 500 XP', test: () => P.xp >= 500 },
    { id: 's3', icon: '🔥', name: 'On Fire', desc: '3-day streak', test: () => P.best >= 3 },
    { id: 's7', icon: '🌋', name: 'Unstoppable', desc: '7-day streak', test: () => P.best >= 7 },
    { id: 'goal', icon: '🎯', name: 'Goal Getter', desc: 'Reach your daily goal', test: () => P.goalHits >= 1 },
    { id: 'perfect', icon: '💯', name: 'Perfect Score', desc: 'Get 100% on a practice round', test: () => P.perfect >= 1 },
    { id: 'listen', icon: '🎧', name: 'Good Ear', desc: 'Finish a listening round', test: () => P.listen >= 1 },
    { id: 'talk', icon: '💬', name: 'Conversationalist', desc: 'Finish a conversation', test: () => Object.keys(P.talked).length >= 1 }
  ];
  function checkBadges() {
    BADGES.forEach(b => {
      if (!P.badges[b.id] && b.test()) {
        P.badges[b.id] = Date.now();
        toast('🏅 Badge unlocked: ' + b.name, 3200);
        confetti();
      }
    });
  }

  function save() { Store.set(KEY, JSON.stringify(P)); updateHeader(); }

  function addXP(n) {
    touchStreak();
    const before = level();
    P.xp += n;
    const k = dayKey();
    P.dayXP[k] = (P.dayXP[k] || 0) + n;
    P.best = Math.max(P.best, P.streak);
    if (P.dayXP[k] >= P.goal && P.goalDay !== k) { P.goalDay = k; P.goalHits++; toast('🎯 Daily goal reached!', 3000); confetti(); }
    if (level() > before) { toast('🎉 Level ' + level() + '!', 3000); confetti(); }
    checkBadges();
    save();
    renderGoal();
  }

  function updateHeader() {
    $('chip-streak').textContent = '🔥 ' + P.streak;
    $('chip-xp').textContent = '⭐ ' + P.xp;
    $('side-name').textContent = user.name;
    $('avatar').textContent = (user.name || 'U').trim().charAt(0).toUpperCase();
    $('side-level').textContent = 'Level ' + level() + ' · ' + P.xp + ' XP';
  }

  /* ---------- Speech helper ---------- */
  let warned = false;
  function say(text, btn, opts) {
    if (!Speech.supported) { toast('Speech is not supported in this browser.'); return Promise.resolve(false); }
    if (!warned && Speech.status().level === 'none') { warned = true; toast('No voice found. Open Settings → Voice for help.', 3500); }
    if (btn) btn.classList.add('speaking');
    return Speech.speak(text, opts).then(r => { if (btn) btn.classList.remove('speaking'); return r; });
  }

  /* ---------- Navigation ---------- */
  function showTab(tab) {
    Speech.stop();
    document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tab));
    if (tab === 'home') renderHome();
    if (tab === 'progress') renderProgress();
    if (tab === 'book') renderBook();
    if (tab === 'settings') renderSettings();
    if (tab === 'talk' && App.renderTalk) App.renderTalk();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tab]');
    if (b) showTab(b.dataset.tab);
  });
  $('logout-btn').onclick = () => Auth.logout();

  /* ---------- Home / Lessons ---------- */
  function wordCard(w, opts = {}) {
    const learned = !!P.learned[w.id];
    return `
      <div class="word ${learned ? 'learned' : ''}" data-id="${w.id}">
        <div>
          <div class="fil">${esc(w.fil)}</div>
          <div class="pr">${esc(w.pr)}</div>
          <div class="en">${esc(w.en)}</div>
          <div class="ex" data-act="ex" role="button" tabindex="0" title="Hear the sentence">▶ “${esc(w.ex)}” — ${esc(w.exEn)}</div>
          ${opts.showCat ? `<div class="small muted">${esc(w.catName)}</div>` : ''}
        </div>
        <div class="actions">
          <button class="icon-btn" data-act="speak" title="Listen" aria-label="Listen to ${esc(w.fil)}">🔊</button>
          <button class="icon-btn" data-act="slow" title="Listen slowly" aria-label="Listen slowly">🐢</button>
          <button class="icon-btn check ${learned ? 'on' : ''}" data-act="learn" title="Mark as learned" aria-label="Mark learned">✓</button>
        </div>
      </div>`;
  }

  function wireWordList(container) {
    const handle = e => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      if (e.type === 'keydown' && e.key !== 'Enter') return;
      const el = btn.closest('.word');
      const w = ALL_WORDS.find(x => x.id === el.dataset.id);
      const act = btn.dataset.act;
      if (act === 'speak') say(w.fil, btn);
      if (act === 'slow') say(w.fil, btn, { rate: 0.5 });
      if (act === 'ex') say(w.ex, null);
      if (act === 'learn') {
        if (P.learned[w.id]) { delete P.learned[w.id]; save(); }
        else { P.learned[w.id] = true; addXP(2); }
        el.classList.toggle('learned', !!P.learned[w.id]);
        btn.classList.toggle('on', !!P.learned[w.id]);
        if (container.dataset.cat) updateLessonHeader(container.dataset.cat);
      }
    };
    container.addEventListener('click', handle);
    container.addEventListener('keydown', handle);
  }

  function renderGoal() {
    const k = dayKey(), got = P.dayXP[k] || 0, pct = Math.min(100, Math.round(got / P.goal * 100));
    const ring = $('goal-ring'); if (!ring) return;
    ring.style.setProperty('--p', pct);
    $('goal-text').textContent = pct + '%';
    $('goal-sub').textContent = got + ' / ' + P.goal + ' XP today';
    $('h-streak').textContent = '🔥 ' + P.streak + (P.streak === 1 ? ' day' : ' days');
    $('h-xp').textContent = '⭐ ' + P.xp + ' XP · Lv ' + level();
  }

  function renderHome() {
    $('home-view').classList.remove('hidden');
    $('lesson-view').classList.add('hidden');
    const first = user.name.split(' ')[0];
    $('welcome-title').textContent = 'Mabuhay, ' + first + '! 👋';
    $('welcome-sub').textContent = P.streak >= 2 ? P.streak + ' days in a row. Ang galing mo!' : 'Ready to learn some Filipino today?';
    $('overall-chip').textContent = Math.round(learnedCount() / ALL_WORDS.length * 100) + '% complete';
    renderGoal();

    const d = new Date(); const seed = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
    const w = ALL_WORDS[seed % ALL_WORDS.length];
    $('daily').innerHTML = `
      <div>
        <div class="small muted">WORD OF THE DAY</div>
        <div class="big">${esc(w.fil)}</div>
        <div>${esc(w.en)} · <i>${esc(w.pr)}</i></div>
      </div>
      <button class="btn primary" id="daily-speak" type="button">🔊 Listen</button>`;
    $('daily-speak').onclick = e => say(w.fil, e.currentTarget);

    $('cat-grid').innerHTML = CATEGORIES.map(c => {
      const done = learnedCount(c.id), total = c.words.length;
      return `
        <div class="card cat-card" style="--c:${c.color}" data-cat="${c.id}" tabindex="0" role="button">
          <div class="icon">${c.icon}</div>
          <h3>${esc(c.name)}</h3>
          <div class="small muted">${done} / ${total} words learned</div>
          <div class="bar"><i style="width:${done / total * 100}%"></i></div>
        </div>`;
    }).join('');
  }
  $('cat-grid').addEventListener('click', e => { const c = e.target.closest('.cat-card'); if (c) openLesson(c.dataset.cat); });
  $('cat-grid').addEventListener('keydown', e => { if (e.key === 'Enter') { const c = e.target.closest('.cat-card'); if (c) openLesson(c.dataset.cat); } });

  function updateLessonHeader(catId) {
    const c = catById(catId), el = $('lesson-progress');
    if (el) el.textContent = learnedCount(catId) + ' / ' + c.words.length + ' learned';
  }

  function openLesson(catId) {
    const c = catById(catId);
    $('home-view').classList.add('hidden');
    const view = $('lesson-view');
    view.classList.remove('hidden');
    view.innerHTML = `
      <button class="btn ghost back" id="back-btn" type="button">← All topics</button>
      <div class="card" style="margin-bottom:1rem;border-top:6px solid ${c.color}">
        <h2>${c.icon} ${esc(c.name)}</h2>
        <div class="small muted" id="lesson-progress"></div>
        <div style="margin-top:.8rem;display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn primary small" id="to-flash" type="button">🃏 Flashcards</button>
          <button class="btn ghost small" id="to-quiz" type="button">🧠 Practice</button>
        </div>
      </div>
      <div class="word-list" data-cat="${catId}" id="lesson-words">${wordsOf(catId).map(w => wordCard(w)).join('')}</div>`;
    updateLessonHeader(catId);
    wireWordList($('lesson-words'));
    $('back-btn').onclick = renderHome;
    $('to-flash').onclick = () => { $('flash-cat').value = catId; showTab('flash'); startFlash(); };
    $('to-quiz').onclick = () => { $('quiz-cat').value = catId; showTab('quiz'); };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Category selects ---------- */
  function fillSelect(sel) {
    sel.innerHTML = '<option value="all">All topics</option>' + CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${esc(c.name)}</option>`).join('');
  }
  fillSelect($('flash-cat'));
  fillSelect($('quiz-cat'));

  /* ---------- Flashcards with spaced repetition ---------- */
  const INTERVALS = [0, 1, 3, 7, 14, 30];       // days until a card returns, by box
  const isDue = w => !P.due[w.id] || P.due[w.id] <= dayKey();
  let deck = [], idx = 0, flashDue = 0;

  function startFlash() {
    const list = wordsOf($('flash-cat').value);
    const due = list.filter(isDue);
    flashDue = due.length;
    deck = shuffle(due.length ? due : list);
    idx = 0;
    showCard();
  }
  function showCard() {
    $('flip').classList.remove('flipped');
    $('flash-info').textContent = flashDue ? flashDue + ' due today' : 'All caught up · free review';
    if (!deck.length) return;
    if (idx >= deck.length) {
      $('flash-counter').textContent = 'Deck finished! 🎉';
      $('flash-front').textContent = 'Great job!';
      $('flash-back').textContent = 'Tap “Shuffle & start” to go again';
      $('flash-pr').textContent = ''; $('flash-ex').textContent = '';
      return;
    }
    const w = deck[idx];
    $('flash-counter').textContent = 'Card ' + (idx + 1) + ' of ' + deck.length;
    $('flash-front').textContent = w.fil;
    $('flash-back').textContent = w.en;
    $('flash-pr').textContent = w.pr;
    $('flash-ex').textContent = '“' + w.ex + '” — ' + w.exEn;
  }
  $('flash-start').onclick = startFlash;
  $('flash-cat').onchange = startFlash;
  const flipCard = () => { if (idx < deck.length) $('flip').classList.toggle('flipped'); };
  $('flip').onclick = flipCard;
  $('flash-speak').onclick = e => { if (deck[idx]) say(deck[idx].fil, e.currentTarget); };
  function cardKnow() {
    const w = deck[idx]; if (!w) return;
    P.cards++;
    const b = Math.min((P.box[w.id] || 0) + 1, 5);
    P.box[w.id] = b;
    P.due[w.id] = dayKey(addDays(INTERVALS[b]));
    const newly = !P.learned[w.id];
    P.learned[w.id] = true;
    addXP(newly ? 3 : 1);
    idx++; showCard();
  }
  function cardAgain() {
    const w = deck[idx]; if (!w) return;
    P.box[w.id] = 0;
    P.due[w.id] = dayKey();
    save();
    deck.push(w);
    idx++; showCard();
  }
  $('flash-know').onclick = cardKnow;
  $('flash-again').onclick = cardAgain;
  document.addEventListener('keydown', e => {
    if (!$('panel-flash').classList.contains('active')) return;
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.key === ' ') { e.preventDefault(); flipCard(); }
    else if (e.key === 'l' || e.key === 'L') { if (deck[idx]) say(deck[idx].fil); }
    else if (e.key === '1') cardAgain();
    else if (e.key === '2') cardKnow();
  });

  /* ---------- Phrasebook ---------- */
  function renderBook() {
    const q = $('book-search').value.trim().toLowerCase();
    const list = ALL_WORDS.filter(w => !q || w.fil.toLowerCase().includes(q) || w.en.toLowerCase().includes(q));
    $('book-list').innerHTML = list.length ? list.map(w => wordCard(w, { showCat: true })).join('') : '<div class="card muted">No matches. Try another word.</div>';
  }
  $('book-search').addEventListener('input', renderBook);
  wireWordList($('book-list'));

  /* ---------- Progress ---------- */
  function renderProgress() {
    const acc = P.answered ? Math.round(P.correct / P.answered * 100) : 0;
    $('stats').innerHTML = [
      ['📚', learnedCount() + ' / ' + ALL_WORDS.length, 'Words learned'],
      ['⭐', P.xp, 'Total XP'],
      ['🔥', P.streak, 'Day streak'],
      ['🧠', P.quizzes, 'Rounds played'],
      ['🎯', acc + '%', 'Accuracy'],
      ['🃏', P.cards, 'Cards reviewed']
    ].map(([i, n, l]) => `<div class="card stat"><div style="font-size:1.6rem">${i}</div><div class="num">${n}</div><div class="small muted">${l}</div></div>`).join('');

    const lv = level(), into = P.xp % 100;
    $('level-title').textContent = 'Level ' + lv;
    $('level-bar').style.width = into + '%';
    $('level-text').textContent = into + ' / 100 XP to Level ' + (lv + 1);

    const days = [];
    for (let i = 6; i >= 0; i--) { const d = addDays(-i); days.push({ k: dayKey(d), lbl: d.toLocaleDateString('en', { weekday: 'short' }) }); }
    const maxv = Math.max(P.goal, ...days.map(d => P.dayXP[d.k] || 0));
    $('week').innerHTML = days.map(d => {
      const v = P.dayXP[d.k] || 0;
      return `<div class="col ${v >= P.goal ? 'hit' : ''}" title="${v} XP"><i style="height:${Math.max(4, v / maxv * 96)}px"></i><span>${d.lbl}</span></div>`;
    }).join('');

    const owned = BADGES.filter(b => P.badges[b.id]).length;
    $('badge-count').textContent = owned + ' / ' + BADGES.length;
    $('badges').innerHTML = BADGES.map(b => `<div class="badge ${P.badges[b.id] ? 'on' : ''}"><div class="bi">${b.icon}</div><b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join('');

    $('mastery').innerHTML = CATEGORIES.map(c => {
      const done = learnedCount(c.id), total = c.words.length;
      const best = P.quiz[c.id] != null ? ' · best: ' + P.quiz[c.id] + '%' : '';
      return `<div style="margin:.8rem 0;--c:${c.color}">
        <div style="display:flex;justify-content:space-between;gap:.5rem"><b>${c.icon} ${esc(c.name)}</b><span class="small muted">${done}/${total}${best}</span></div>
        <div class="bar"><i style="width:${done / total * 100}%"></i></div></div>`;
    }).join('');
  }

  /* ---------- Settings ---------- */
  function renderSettings() {
    const sel = $('voice-select'), voices = Speech.list();
    sel.innerHTML = '<option value="auto">Auto (best available)</option>' + voices.map(v => `<option value="${esc(v.voiceURI)}">${esc(Speech.label(v))}</option>`).join('');
    sel.value = Speech.getPref();
    if (sel.value !== Speech.getPref()) sel.value = 'auto';
    const st = Speech.status();
    const box = $('voice-status');
    box.className = 'voice-status ' + st.level;
    box.textContent = (st.level === 'good' ? '✅ ' : st.level === 'none' ? '⚠️ ' : 'ℹ️ ') + st.text;
    $('rate').value = Speech.getRate();
    $('rate-label').textContent = Speech.getRate().toFixed(2) + '×';
    $('goal-select').value = String(P.goal);
    $('acct-info').textContent = user.name + ' (@' + user.username + ') · ' + (Store.persistent ? 'Progress is saved on this device.' : 'Storage is blocked, so progress is temporary.');
  }
  $('voice-select').onchange = e => { Speech.setVoice(e.target.value); renderSettings(); Speech.speak('Kumusta! Mabuhay!'); };
  $('rate').oninput = e => { Speech.setRate(e.target.value); $('rate-label').textContent = Speech.getRate().toFixed(2) + '×'; };
  $('voice-test').onclick = e => say('Kumusta! Ako si Aral. Mabuhay!', e.currentTarget);
  $('goal-select').onchange = e => { P.goal = +e.target.value; save(); toast('Daily goal set to ' + P.goal + ' XP'); };
  Speech.onChange(() => { if ($('panel-settings').classList.contains('active')) renderSettings(); });
  $('reset-btn').onclick = () => {
    if (confirm('Reset all your progress? This cannot be undone.')) {
      P = fresh(); save(); renderSettings(); renderHome(); startFlash(); toast('Progress reset.');
    }
  };

  /* ---------- Public API for practice.js, then start ---------- */
  window.App = {
    user, $, esc, shuffle, wordsOf, catById, say, toast, confetti, showTab, dayKey,
    addXP, save, checkBadges, renderGoal,
    get P() { return P; }
  };
  window.App.start = () => {
    updateHeader();
    renderHome();
    startFlash();
    if (!Store.persistent) setTimeout(() => toast('⚠️ Your browser blocks storage, so progress lasts only while this tab is open.', 6000), 700);
  };
})();
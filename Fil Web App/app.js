/* Aral Tayo – main app logic */
(() => {
  const user = Auth.requireAuth();
  if (!user) return;

  /* ---------- Helpers ---------- */
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const catById = id => CATEGORIES.find(c => c.id === id);
  const wordsOf = catId => catId === 'all' ? ALL_WORDS : ALL_WORDS.filter(w => w.cat === catId);

  let toastTimer;
  function toast(msg, ms) {
    const t = $('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), ms || 2200);
  }

  /* ---------- Progress storage ---------- */
  const KEY = 'fl_progress_' + user.username;
  const fresh = () => ({ xp: 0, learned: {}, quiz: {}, quizzes: 0, correct: 0, answered: 0, cards: 0, streak: 0, last: '' });
  let P;
  try { P = Object.assign(fresh(), JSON.parse(Store.get(KEY)) || {}); } catch (e) { P = fresh(); }

  function save() { Store.set(KEY, JSON.stringify(P)); updateHeader(); }
  function touchStreak() {
    const today = new Date().toDateString();
    if (P.last === today) return;
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    P.streak = P.last === yesterday ? P.streak + 1 : 1;
    P.last = today;
  }
  function addXP(n) { touchStreak(); P.xp += n; save(); }
  const learnedCount = (catId = 'all') => wordsOf(catId).filter(w => P.learned[w.id]).length;
  const level = () => Math.floor(P.xp / 100) + 1;

  function updateHeader() {
    $('chip-streak').textContent = '🔥 ' + P.streak + (P.streak === 1 ? ' day' : ' days');
    $('chip-xp').textContent = '⭐ ' + P.xp + ' XP';
    $('chip-user').textContent = '👤 ' + user.name.split(' ')[0];
  }

  /* ---------- Speech ---------- */
  function speak(text) {
    if (!('speechSynthesis' in window)) { toast('Speech is not supported in this browser.'); return; }
    const clean = text.replace('…', '');
    const u = new SpeechSynthesisUtterance(clean);
    const voices = speechSynthesis.getVoices();
    const v = voices.find(v => /^(fil|tl)/i.test(v.lang)) || voices.find(v => /^en-PH/i.test(v.lang));
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'fil-PH'; }
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
  if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};

  /* ---------- Navigation ---------- */
  function showTab(tab) {
    document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tab));
    if (tab === 'home') renderHome();
    if (tab === 'progress') renderProgress();
    if (tab === 'book') renderBook();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $('nav').addEventListener('click', e => {
    const b = e.target.closest('button[data-tab]');
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
          <div class="ex">“${esc(w.ex)}” — ${esc(w.exEn)}</div>
          ${opts.showCat ? `<div class="small muted">${esc(w.catName)}</div>` : ''}
        </div>
        <div class="actions">
          <button class="icon-btn" data-act="speak" title="Listen" aria-label="Listen to ${esc(w.fil)}">🔊</button>
          <button class="icon-btn check ${learned ? 'on' : ''}" data-act="learn" title="Mark as learned" aria-label="Mark learned">✓</button>
        </div>
      </div>`;
  }

  function wireWordList(container) {
    container.addEventListener('click', e => {
      const btn = e.target.closest('button[data-act]');
      if (!btn) return;
      const el = btn.closest('.word');
      const w = ALL_WORDS.find(x => x.id === el.dataset.id);
      if (btn.dataset.act === 'speak') speak(w.fil);
      if (btn.dataset.act === 'learn') {
        if (P.learned[w.id]) { delete P.learned[w.id]; save(); }
        else { P.learned[w.id] = true; addXP(2); }
        el.classList.toggle('learned', !!P.learned[w.id]);
        btn.classList.toggle('on', !!P.learned[w.id]);
        if (container.dataset.cat) updateLessonHeader(container.dataset.cat);
      }
    });
  }

  function renderHome() {
    $('home-view').classList.remove('hidden');
    $('lesson-view').classList.add('hidden');
    $('welcome-title').textContent = 'Mabuhay, ' + user.name.split(' ')[0] + '! 👋';
    const pct = Math.round(learnedCount() / ALL_WORDS.length * 100);
    $('overall-chip').textContent = pct + '% complete';

    // Word of the day (changes daily)
    const d = new Date(); const seed = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
    const w = ALL_WORDS[seed % ALL_WORDS.length];
    $('daily').innerHTML = `
      <div>
        <div class="small muted">WORD OF THE DAY</div>
        <div class="big">${esc(w.fil)}</div>
        <div>${esc(w.en)} · <i>${esc(w.pr)}</i></div>
      </div>
      <button class="btn primary" id="daily-speak" type="button">🔊 Listen</button>`;
    $('daily-speak').onclick = () => speak(w.fil);

    $('cat-grid').innerHTML = CATEGORIES.map(c => {
      const done = learnedCount(c.id), total = c.words.length;
      return `
        <div class="card cat-card" style="--c:${c.color}" data-cat="${c.id}" tabindex="0">
          <div class="icon">${c.icon}</div>
          <h3>${esc(c.name)}</h3>
          <div class="small muted">${done} / ${total} words learned</div>
          <div class="bar"><i style="width:${done / total * 100}%"></i></div>
        </div>`;
    }).join('');
  }
  $('cat-grid').addEventListener('click', e => {
    const c = e.target.closest('.cat-card');
    if (c) openLesson(c.dataset.cat);
  });
  $('cat-grid').addEventListener('keydown', e => {
    if (e.key === 'Enter') { const c = e.target.closest('.cat-card'); if (c) openLesson(c.dataset.cat); }
  });

  function updateLessonHeader(catId) {
    const c = catById(catId);
    const el = $('lesson-progress');
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
          <button class="btn primary small" id="to-flash" type="button">🃏 Practice with flashcards</button>
          <button class="btn ghost small" id="to-quiz" type="button">🧠 Take the quiz</button>
        </div>
      </div>
      <div class="word-list" data-cat="${catId}" id="lesson-words">${c.words.map((w, i) => wordCard(ALL_WORDS.find(x => x.id === c.id + '-' + i))).join('')}</div>`;
    updateLessonHeader(catId);
    wireWordList($('lesson-words'));
    $('back-btn').onclick = renderHome;
    $('to-flash').onclick = () => { $('flash-cat').value = catId; showTab('flash'); startFlash(); };
    $('to-quiz').onclick = () => { $('quiz-cat').value = catId; showTab('quiz'); };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Category selects ---------- */
  function fillSelect(sel) {
    sel.innerHTML = '<option value="all">All topics</option>' +
      CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${esc(c.name)}</option>`).join('');
  }
  fillSelect($('flash-cat'));
  fillSelect($('quiz-cat'));

  /* ---------- Flashcards ---------- */
  let deck = [], idx = 0;
  function startFlash() {
    deck = shuffle(wordsOf($('flash-cat').value));
    idx = 0;
    showCard();
  }
  function showCard() {
    $('flip').classList.remove('flipped');
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
  $('flip').onclick = () => {
    if (idx >= deck.length) return;
    $('flip').classList.toggle('flipped');
  };
  $('flash-speak').onclick = () => { if (deck[idx]) speak(deck[idx].fil); };
  $('flash-know').onclick = () => {
    const w = deck[idx]; if (!w) return;
    P.cards++;
    const newly = !P.learned[w.id];
    P.learned[w.id] = true;
    addXP(newly ? 3 : 1);
    idx++; showCard();
  };
  $('flash-again').onclick = () => {
    const w = deck[idx]; if (!w) return;
    deck.push(w);           // see it again at the end
    idx++; showCard();
  };

  /* ---------- Quiz ---------- */
  let quiz = null;
  $('quiz-start').onclick = () => {
    const pool = wordsOf($('quiz-cat').value);
    if (pool.length < 4) { toast('Not enough words for a quiz.'); return; }
    const mode = $('quiz-mode').value;
    const picks = shuffle(pool).slice(0, Math.min(10, pool.length));
    quiz = {
      cat: $('quiz-cat').value, i: 0, score: 0,
      qs: picks.map(w => {
        const f2e = mode === 'f2e' || (mode === 'mix' && Math.random() < 0.5);
        const distract = shuffle(ALL_WORDS.filter(x => x.id !== w.id && (f2e ? x.en !== w.en : x.fil !== w.fil))).slice(0, 3);
        const options = shuffle([w, ...distract]);
        return { w, f2e, options };
      })
    };
    $('quiz-setup').classList.add('hidden');
    $('quiz-play').classList.remove('hidden');
    renderQ();
  };

  function renderQ() {
    const q = quiz.qs[quiz.i];
    const label = o => quiz.qs[quiz.i].f2e ? o.en : o.fil;
    $('quiz-play').innerHTML = `
      <div class="q-head"><span>Question ${quiz.i + 1} / ${quiz.qs.length}</span><span>Score: ${quiz.score}</span></div>
      <div class="bar" style="margin-bottom:1rem"><i style="width:${quiz.i / quiz.qs.length * 100}%"></i></div>
      <div class="small muted">${q.f2e ? 'What does this mean in English?' : 'How do you say this in Filipino?'}</div>
      <div class="q-text">${esc(q.f2e ? q.w.fil : q.w.en)} ${q.f2e ? '<button class="icon-btn" id="q-speak" aria-label="Listen">🔊</button>' : ''}</div>
      <div class="options">${q.options.map((o, n) => `<button class="opt-btn" data-n="${n}">${esc(label(o))}</button>`).join('')}</div>
      <div id="q-next" style="margin-top:1rem"></div>`;
    if (q.f2e) $('q-speak').onclick = () => speak(q.w.fil);
    $('quiz-play').querySelectorAll('.opt-btn').forEach(b => b.onclick = () => answer(b, q));
  }

  function answer(btn, q) {
    const chosen = q.options[+btn.dataset.n];
    const right = chosen.id === q.w.id;
    P.answered++;
    document.querySelectorAll('.opt-btn').forEach(b => {
      b.disabled = true;
      if (q.options[+b.dataset.n].id === q.w.id) b.classList.add('right');
    });
    if (right) { quiz.score++; P.correct++; speak(q.w.fil); } else btn.classList.add('wrong');
    if (right) addXP(5); else save();
    const last = quiz.i === quiz.qs.length - 1;
    $('q-next').innerHTML = `<button class="btn primary block" id="q-go" type="button">${last ? 'See results' : 'Next'}</button>`;
    $('q-go').onclick = () => { quiz.i++; last ? finishQuiz() : renderQ(); };
  }

  function finishQuiz() {
    const pct = Math.round(quiz.score / quiz.qs.length * 100);
    P.quizzes++;
    P.quiz[quiz.cat] = Math.max(P.quiz[quiz.cat] || 0, pct);
    addXP(10); // completion bonus
    const msg = pct === 100 ? 'Perfect! Magaling! 🏆' : pct >= 70 ? 'Great work! 🎉' : pct >= 40 ? 'Good try — keep practicing! 💪' : "Don't give up — review the lessons! 📘";
    $('quiz-play').innerHTML = `
      <div class="result">
        <div class="score">${quiz.score} / ${quiz.qs.length}</div>
        <h2>${msg}</h2>
        <p class="muted">+${quiz.score * 5 + 10} XP earned (including 10 XP completion bonus)</p>
        <button class="btn primary block" id="again" type="button">Try again</button>
        <button class="btn ghost block" id="review" type="button">Back to lessons</button>
      </div>`;
    $('again').onclick = () => { $('quiz-play').classList.add('hidden'); $('quiz-setup').classList.remove('hidden'); };
    $('review').onclick = () => { $('quiz-play').classList.add('hidden'); $('quiz-setup').classList.remove('hidden'); showTab('home'); };
  }

  /* ---------- Phrasebook ---------- */
  function renderBook() {
    const q = $('book-search').value.trim().toLowerCase();
    const list = ALL_WORDS.filter(w => !q || w.fil.toLowerCase().includes(q) || w.en.toLowerCase().includes(q));
    $('book-list').innerHTML = list.length
      ? list.map(w => wordCard(w, { showCat: true })).join('')
      : '<div class="card muted">No matches. Try another word.</div>';
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
      ['🧠', P.quizzes, 'Quizzes taken'],
      ['🎯', acc + '%', 'Quiz accuracy'],
      ['🃏', P.cards, 'Cards mastered']
    ].map(([i, n, l]) => `<div class="card stat"><div style="font-size:1.6rem">${i}</div><div class="num">${n}</div><div class="small muted">${l}</div></div>`).join('');

    const lv = level(), into = P.xp % 100;
    $('level-title').textContent = 'Level ' + lv;
    $('level-bar').style.width = into + '%';
    $('level-text').textContent = into + ' / 100 XP to Level ' + (lv + 1);

    $('mastery').innerHTML = CATEGORIES.map(c => {
      const done = learnedCount(c.id), total = c.words.length;
      const best = P.quiz[c.id] != null ? ' · best quiz: ' + P.quiz[c.id] + '%' : '';
      return `<div style="margin:.8rem 0;--c:${c.color}">
        <div style="display:flex;justify-content:space-between"><b>${c.icon} ${esc(c.name)}</b><span class="small muted">${done}/${total}${best}</span></div>
        <div class="bar"><i style="width:${done / total * 100}%"></i></div></div>`;
    }).join('');
  }
  $('reset-btn').onclick = () => {
    if (confirm('Reset all your progress? This cannot be undone.')) {
      P = fresh(); save(); renderProgress(); toast('Progress reset.');
    }
  };

  /* ---------- Init ---------- */
  updateHeader();
  renderHome();
  startFlash();
  if (!Store.persistent) {
    setTimeout(() => toast('⚠️ Your browser is blocking storage, so progress is kept only while this tab stays open. Open the files directly in Chrome, Edge or Firefox to save it.', 7000), 700);
  }
})();
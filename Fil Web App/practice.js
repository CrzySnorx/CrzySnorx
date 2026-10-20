/* Aral Tayo – practice rounds (choice, listening, typing) and conversations. Loads after app.js. */
(() => {
  if (!window.App) return;
  const { $, esc, shuffle, wordsOf, say, toast, confetti, addXP, save, showTab, dayKey } = App;
  const P = () => App.P;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* =============== Practice =============== */
  let quiz = null;
  const norm = s => String(s).toLowerCase().replace(/[….!?,¡¿"“”']/g, '').replace(/[\s-]+/g, '');

  $('quiz-start').onclick = () => {
    let pool = wordsOf($('quiz-cat').value);
    const mode = $('quiz-mode').value;
    if (mode === 'type') {                      // short answers are friendlier to type
      const short = pool.filter(w => w.fil.split(/\s+/).length <= 2);
      if (short.length >= 6) pool = short;
    }
    if (pool.length < 4) { toast('Not enough words for a round.'); return; }
    const picks = shuffle(pool).slice(0, Math.min(10, pool.length));
    quiz = {
      cat: $('quiz-cat').value, mode, i: 0, score: 0, missed: [],
      qs: picks.map(w => {
        const kind = mode === 'mix' ? (Math.random() < 0.5 ? 'f2e' : 'e2f') : mode;
        let options = [];
        if (kind !== 'type') {
          const byFil = kind === 'e2f';
          const seen = new Set([byFil ? w.fil : w.en]);
          const distract = [];
          for (const x of shuffle(ALL_WORDS)) {
            const lbl = byFil ? x.fil : x.en;
            if (x.id !== w.id && !seen.has(lbl)) { seen.add(lbl); distract.push(x); }
            if (distract.length === 3) break;
          }
          options = shuffle([w, ...distract]);
        }
        return { w, kind, options };
      })
    };
    $('quiz-setup').classList.add('hidden');
    $('quiz-play').classList.remove('hidden');
    renderQ();
  };

  function head(q) {
    return `<div class="q-head"><span>Question ${quiz.i + 1} / ${quiz.qs.length}</span><span>Score: ${quiz.score}</span></div>
      <div class="bar" style="margin-bottom:1rem"><i style="width:${quiz.i / quiz.qs.length * 100}%"></i></div>`;
  }

  function renderQ() {
    const q = quiz.qs[quiz.i], w = q.w;
    let body = '';
    if (q.kind === 'f2e') {
      body = `<div class="small muted">What does this mean in English?</div>
        <div class="q-text">${esc(w.fil)} <button class="icon-btn" id="q-speak" aria-label="Listen">🔊</button></div>`;
    } else if (q.kind === 'e2f') {
      body = `<div class="small muted">How do you say this in Filipino?</div><div class="q-text">${esc(w.en)}</div>`;
    } else if (q.kind === 'listen') {
      body = `<div class="small muted">Listen, then choose the meaning</div>
        <div class="q-text"><button class="btn primary" id="q-speak" type="button">🎧 Play word</button>
        <button class="btn ghost small" id="q-slow" type="button">🐢 Slow</button></div>`;
    } else {
      body = `<div class="small muted">Type it in Filipino</div>
        <div class="q-text">${esc(w.en)}</div>`;
    }
    let input;
    if (q.kind === 'type') {
      input = `<form id="type-form" class="type-row" autocomplete="off">
          <input type="text" id="type-input" placeholder="Type the Filipino word…" autocapitalize="off" autocorrect="off" spellcheck="false">
          <button class="btn primary" type="submit">Check</button>
        </form>
        <button class="btn ghost small" id="hint-btn" type="button" style="margin-top:.6rem">💡 Hint</button>
        <div id="hint-text" class="small muted" style="margin-top:.4rem"></div>`;
    } else {
      input = `<div class="options">${q.options.map((o, n) => `<button class="opt-btn" data-n="${n}">${esc(q.kind === 'e2f' ? o.fil : o.en)}</button>`).join('')}</div>`;
    }
    $('quiz-play').innerHTML = head(q) + body + input + '<div id="q-fb"></div><div id="q-next" style="margin-top:1rem"></div>';

    if ($('q-speak')) $('q-speak').onclick = e => say(w.fil, e.currentTarget);
    if ($('q-slow')) $('q-slow').onclick = e => say(w.fil, e.currentTarget, { rate: 0.5 });
    if (q.kind === 'listen') setTimeout(() => say(w.fil), 250);
    if (q.kind === 'type') {
      $('type-input').focus();
      $('hint-btn').onclick = () => { $('hint-text').textContent = 'Sounds like: ' + w.pr + ' · starts with “' + w.fil.charAt(0) + '”'; };
      $('type-form').onsubmit = e => { e.preventDefault(); finishAnswer(q, norm($('type-input').value) === norm(w.fil), null); };
    } else {
      $('quiz-play').querySelectorAll('.opt-btn').forEach(b => b.onclick = () => {
        const chosen = q.options[+b.dataset.n];
        finishAnswer(q, chosen.id === w.id, b);
      });
    }
  }

  let locked = false;
  function finishAnswer(q, right, btn) {
    if (locked) return;
    locked = true;
    const w = q.w;
    P().answered++;
    document.querySelectorAll('.opt-btn').forEach(b => {
      b.disabled = true;
      if (q.options[+b.dataset.n].id === w.id) b.classList.add('right');
    });
    if (q.kind === 'type') {
      $('type-input').disabled = true;
      $('type-form').querySelector('button').disabled = true;
      $('q-fb').innerHTML = right
        ? '<div class="fb good">✅ Tama! ' + esc(w.fil) + '</div>'
        : '<div class="fb bad">❌ Answer: ' + esc(w.fil) + ' <span class="muted">(' + esc(w.pr) + ')</span></div>';
    } else if (!right && btn) btn.classList.add('wrong');

    if (right) {
      quiz.score++; P().correct++;
      say(w.fil);
      addXP(5);
    } else {
      quiz.missed.push(w);
      P().box[w.id] = 0; P().due[w.id] = dayKey();    // missed words return in flashcard review
      save();
    }
    const last = quiz.i === quiz.qs.length - 1;
    $('q-next').innerHTML = `<button class="btn primary block" id="q-go" type="button">${last ? 'See results' : 'Next'}</button>`;
    const go = () => { locked = false; quiz.i++; last ? finishQuiz() : renderQ(); };
    $('q-go').onclick = go;
    $('q-go').focus();
  }

  function finishQuiz() {
    const total = quiz.qs.length, pct = Math.round(quiz.score / total * 100);
    P().quizzes++;
    P().quiz[quiz.cat] = Math.max(P().quiz[quiz.cat] || 0, pct);
    if (quiz.mode === 'listen') P().listen++;
    const perfect = quiz.score === total && total >= 5;
    if (perfect) { P().perfect++; confetti(); }
    addXP(10);
    const msg = pct === 100 ? 'Perfect! Magaling! 🏆' : pct >= 70 ? 'Great work! 🎉' : pct >= 40 ? 'Good try, keep practicing! 💪' : "Don't give up, review the lessons! 📘";
    const missed = quiz.missed.length
      ? `<div style="text-align:left;margin-top:1rem"><b>Review these:</b><div class="word-list" style="margin-top:.5rem">${quiz.missed.map(w => `<div class="word"><div><div class="fil">${esc(w.fil)}</div><div class="en">${esc(w.en)}</div></div><div class="actions"><button class="icon-btn" data-say="${esc(w.fil)}" aria-label="Listen">🔊</button></div></div>`).join('')}</div>
         <p class="small muted">These were added to your flashcard review.</p></div>` : '';
    $('quiz-play').innerHTML = `
      <div class="result">
        <div class="score">${quiz.score} / ${total}</div>
        <h2>${msg}</h2>
        <p class="muted">+${quiz.score * 5 + 10} XP earned (including 10 XP bonus)</p>
        <button class="btn primary block" id="again" type="button">Play again</button>
        <button class="btn ghost block" id="review" type="button">Back to lessons</button>
        ${missed}
      </div>`;
    $('quiz-play').querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say, b));
    const reset = () => { $('quiz-play').classList.add('hidden'); $('quiz-setup').classList.remove('hidden'); };
    $('again').onclick = reset;
    $('review').onclick = () => { reset(); showTab('home'); };
  }

  /* =============== Conversations =============== */
  let playing = 0;

  function renderTalk() {
    $('talk-view').classList.add('hidden');
    $('talk-list-view').classList.remove('hidden');
    $('talk-list').innerHTML = DIALOGUES.map(d => `
      <div class="card cat-card" style="--c:${d.color}" data-talk="${d.id}" tabindex="0" role="button">
        <div class="icon">${d.icon}</div>
        <h3>${esc(d.title)}</h3>
        <div class="small muted">${d.lines.length} lines ${P().talked[d.id] ? '· ✅ Done' : ''}</div>
      </div>`).join('');
  }
  $('talk-list').addEventListener('click', e => { const c = e.target.closest('[data-talk]'); if (c) openTalk(c.dataset.talk); });
  $('talk-list').addEventListener('keydown', e => { if (e.key === 'Enter') { const c = e.target.closest('[data-talk]'); if (c) openTalk(c.dataset.talk); } });

  function openTalk(id) {
    const d = DIALOGUES.find(x => x.id === id);
    $('talk-list-view').classList.add('hidden');
    const v = $('talk-view');
    v.classList.remove('hidden');
    v.innerHTML = `
      <button class="btn ghost back" id="talk-back" type="button">← All conversations</button>
      <div class="card" style="border-top:6px solid ${d.color}">
        <h2>${d.icon} ${esc(d.title)}</h2>
        <div class="small muted">${esc(d.roles[0])} (left) and ${esc(d.roles[1])} (right). Tap any line to hear it.</div>
        <div style="margin-top:.8rem;display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn primary small" id="play-all" type="button">▶ Play all</button>
          <button class="btn ghost small" id="toggle-en" type="button">Hide English</button>
        </div>
        <div class="chat" id="chat">
          ${d.lines.map((l, i) => `
            <div class="bubble ${l.who}" data-i="${i}" role="button" tabindex="0">
              <button class="icon-btn" type="button" aria-label="Listen">🔊</button>
              <div><div class="who">${esc(d.roles[l.who === 'a' ? 0 : 1])}</div>
                <div class="fil">${esc(l.fil)}</div><div class="en">${esc(l.en)}</div></div>
            </div>`).join('')}
        </div>
        <button class="btn good block" id="finish-talk" type="button">${P().talked[d.id] ? 'Done ✓ (review again)' : 'Finish conversation (+10 XP)'}</button>
      </div>`;

    const bubbles = [...v.querySelectorAll('.bubble')];
    const mark = (i, on) => bubbles[i] && bubbles[i].classList.toggle('playing', on);
    const stopAll = () => { playing++; Speech.stop(); bubbles.forEach((_, i) => mark(i, false)); $('play-all').textContent = '▶ Play all'; };

    $('talk-back').onclick = () => { stopAll(); renderTalk(); };
    $('toggle-en').onclick = e => {
      const hidden = $('chat').classList.toggle('hide-en');
      e.currentTarget.textContent = hidden ? 'Show English' : 'Hide English';
    };
    const playLine = e => {
      const b = e.target.closest('.bubble'); if (!b) return;
      if (e.type === 'keydown' && e.key !== 'Enter') return;
      stopAll();
      const i = +b.dataset.i;
      mark(i, true);
      say(d.lines[i].fil).then(() => mark(i, false));
    };
    $('chat').addEventListener('click', playLine);
    $('chat').addEventListener('keydown', playLine);

    $('play-all').onclick = async () => {
      if ($('play-all').textContent.startsWith('■')) { stopAll(); return; }
      stopAll();
      const my = ++playing;
      $('play-all').textContent = '■ Stop';
      for (let i = 0; i < d.lines.length; i++) {
        if (my !== playing) return;
        mark(i, true);
        bubbles[i].scrollIntoView({ block: 'center', behavior: 'smooth' });
        const ok = await say(d.lines[i].fil);
        mark(i, false);
        if (ok === false || my !== playing) return;
        await sleep(450);
      }
      if (my === playing) $('play-all').textContent = '▶ Play all';
    };

    $('finish-talk').onclick = () => {
      stopAll();
      if (!P().talked[d.id]) {
        P().talked[d.id] = Date.now();
        addXP(10);
        toast('💬 Conversation complete! +10 XP', 2800);
      } else toast('Nice review! 👏');
      renderTalk();
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  App.renderTalk = renderTalk;
  App.start();
})();
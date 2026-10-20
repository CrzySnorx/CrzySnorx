/* Speech engine for Filipino (Tagalog).
   The browser only speaks with voices installed on the device, so we pick the best one:
     1. a real Filipino voice (fil-PH / tl-PH)         -> speaks the text as written
     2. a Philippine English voice (en-PH) or any other -> speaks a phonetic respelling, so
        English voice                                      the sounds come out right with a Filipino accent
     3. a Spanish voice                                  -> Tagalog vowels are close to Spanish, speaks as written
   The user can override the voice and speed in Settings. */
const Speech = (() => {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const K_VOICE = 'fl_voice', K_RATE = 'fl_rate';
  let all = [];
  let pref = Store.get(K_VOICE) || 'auto';
  let rate = parseFloat(Store.get(K_RATE)) || 0.8;
  const subs = [];

  function kindOf(v) {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    if (l.startsWith('fil') || l.startsWith('tl')) return 'native';
    if (l === 'en-ph') return 'enph';
    if (l.startsWith('es')) return 'es';
    return 'other';
  }
  function score(v) {
    const n = (v.name || '').toLowerCase();
    let s = { native: 300, enph: 200, es: 100, other: 0 }[kindOf(v)];
    if (/natural|neural|online/.test(n)) s += 20;
    if (kindOf(v) === 'es' && /(mx|us|419)/i.test(v.lang)) s += 3;
    if (kindOf(v) === 'other' && /^en/i.test(v.lang)) s += 2;
    return s;
  }

  function refresh() {
    if (!supported) return;
    all = (speechSynthesis.getVoices() || []).slice().sort((a, b) => score(b) - score(a));
    subs.forEach(f => { try { f(); } catch (e) { /* ignore */ } });
  }
  if (supported) {
    refresh();
    try { speechSynthesis.addEventListener('voiceschanged', refresh); } catch (e) { speechSynthesis.onvoiceschanged = refresh; }
    [300, 1000, 2500].forEach(t => setTimeout(refresh, t));   // some browsers load voices late
  }

  function current() {
    if (!all.length) return null;
    if (pref !== 'auto') {
      const hit = all.find(v => v.voiceURI === pref);
      if (hit) return hit;
    }
    return all[0];
  }

  /* ----- text preparation ----- */
  const plain = t => String(t).replace(/[…!?¡¿"“”()]/g, ' ').replace(/\s+/g, ' ').trim();

  // Tagalog -> English-friendly spelling: vowels are always pure (a=ah, e=eh, i=ee, o=oh, u=oo)
  function respell(t) {
    const map = { ay: 'eye', aw: 'ow', a: 'ah', e: 'eh', i: 'ee', o: 'oh', u: 'oo' };
    // one pass, so replacements are never re-processed ("ay" at the end of a syllable is a diphthong, as in nanay)
    return plain(t).toLowerCase().replace(/ay(?![aeiou])|aw(?![aeiou])|[aeiou]/g, m => map[m]);
  }
  // Spanish voices already read pure vowels; only "w" needs help
  const spanish = t => plain(t).toLowerCase().replace(/w/g, 'u');

  function prepare(text, v) {
    const k = v ? kindOf(v) : 'none';
    if (k === 'native') return plain(text);
    if (k === 'es') return spanish(text);
    return respell(text);
  }

  let token = 0;
  function stop() { token++; if (supported) { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } } }

  /* Returns a Promise that resolves when speech ends (or fails), so dialogues can chain lines. */
  function speak(text, opts) {
    opts = opts || {};
    if (!supported) return Promise.resolve(false);
    const my = ++token;
    const v = current();
    const u = new SpeechSynthesisUtterance(prepare(text, v));
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-PH'; }
    u.rate = opts.rate || rate;
    u.pitch = 1;
    return new Promise(res => {
      u.onend = () => res(my === token);
      u.onerror = () => res(false);
      try {
        speechSynthesis.cancel();
        speechSynthesis.resume();
        speechSynthesis.speak(u);
      } catch (e) { res(false); }
    });
  }

  function status() {
    const v = current();
    if (!supported) return { level: 'none', text: 'This browser does not support speech.' };
    if (!v) return { level: 'none', text: 'No voices found yet. Try Microsoft Edge or Chrome, then reload.' };
    const k = kindOf(v);
    if (k === 'native') return { level: 'good', text: 'Using a real Filipino voice: ' + v.name };
    if (k === 'enph') return { level: 'ok', text: 'Using a Philippine English voice with phonetic respelling: ' + v.name + '. For a fully native sound, install a Filipino voice (Edge has “Blessica” and “Angelo”).' };
    if (k === 'es') return { level: 'ok', text: 'No Filipino voice installed, so using a Spanish voice (similar vowels): ' + v.name + '. Edge or Android Chrome have real Filipino voices.' };
    return { level: 'ok', text: 'No Filipino voice installed, using ' + v.name + ' with phonetic respelling. Edge or Android Chrome have real Filipino voices.' };
  }

  function label(v) {
    const k = kindOf(v);
    const tag = { native: '🇵🇭 Filipino', enph: '🇵🇭 Philippine English', es: 'Spanish (approx.)', other: 'Phonetic' }[k];
    return v.name + ' (' + v.lang + ') · ' + tag;
  }

  return {
    supported, speak, stop, status, label,
    list: () => all,
    onChange: f => subs.push(f),
    getPref: () => pref,
    getRate: () => rate,
    setVoice(uri) { pref = uri || 'auto'; Store.set(K_VOICE, pref); },
    setRate(r) { rate = Math.min(1.2, Math.max(0.4, +r || 0.8)); Store.set(K_RATE, String(rate)); },
    _respell: respell, _spanish: spanish
  };
})();
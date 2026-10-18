(function () {
  var UNITS = [
    { id: 'pagbati', name: 'Pagbati', en: 'Greetings', color: '#2f5bd8', blurb: 'Say hello, thank people and be polite from your first conversation.', words: [
      ['Kumusta', 'Hello / How are you?', 'ku-MUS-ta', 'Kumusta ka na?', 'How have you been?'],
      ['Magandang umaga', 'Good morning', 'ma-gan-DANG u-MA-ga', 'Magandang umaga po, Lola.', 'Good morning, Grandma.'],
      ['Magandang hapon', 'Good afternoon', 'ma-gan-DANG HA-pon', 'Magandang hapon sa inyong lahat.', 'Good afternoon to all of you.'],
      ['Magandang gabi', 'Good evening', 'ma-gan-DANG ga-BI', 'Magandang gabi po.', 'Good evening, sir or ma’am.'],
      ['Salamat', 'Thank you', 'sa-LA-mat', 'Salamat sa pagkain.', 'Thank you for the food.'],
      ['Walang anuman', 'You’re welcome', 'WA-lang a-NU-man', 'Walang anuman, kaibigan.', 'You’re welcome, friend.'],
      ['Paalam', 'Goodbye', 'pa-A-lam', 'Paalam na, hanggang bukas.', 'Goodbye, until tomorrow.'],
      ['Pasensya na', 'Sorry / Please be patient', 'pa-SEN-sya na', 'Pasensya na, na-late ako.', 'Sorry, I was late.'],
      ['Opo', 'Yes (respectful)', 'O-po', 'Opo, Nanay.', 'Yes, Mother.']
    ] },
    { id: 'pamilya', name: 'Pamilya', en: 'Family', color: '#d9485f', blurb: 'Names for the people at the table, including the ones you call by age.', words: [
      ['Nanay', 'Mother', 'NA-nay', 'Mahal kita, Nanay.', 'I love you, Mom.'],
      ['Tatay', 'Father', 'TA-tay', 'Nasaan si Tatay?', 'Where is Dad?'],
      ['Kuya', 'Older brother', 'KU-ya', 'Tulungan mo ako, Kuya.', 'Help me, big brother.'],
      ['Ate', 'Older sister', 'A-te', 'Ate, saan tayo pupunta?', 'Ate, where are we going?'],
      ['Lolo', 'Grandfather', 'LO-lo', 'Nagmano ako kay Lolo.', 'I gave Grandpa the blessing gesture.'],
      ['Lola', 'Grandmother', 'LO-la', 'Masarap magluto si Lola.', 'Grandma cooks deliciously.'],
      ['Bunso', 'Youngest child', 'BUN-so', 'Natutulog na si Bunso.', 'The youngest is already asleep.'],
      ['Anak', 'Child (son or daughter)', 'A-nak', 'Anak, kumain ka na.', 'Child, eat now.'],
      ['Kapatid', 'Sibling', 'ka-pa-TID', 'Dalawa ang kapatid ko.', 'I have two siblings.']
    ] },
    { id: 'pagkain', name: 'Pagkain', en: 'Food', color: '#e8a200', blurb: 'Rice, water and the words you need when the table is full.', words: [
      ['Kanin', 'Cooked rice', 'KA-nin', 'Gusto ko ng kanin.', 'I want rice.'],
      ['Tubig', 'Water', 'TU-big', 'Pahingi po ng tubig.', 'May I have some water?'],
      ['Ulam', 'Dish eaten with rice', 'U-lam', 'Ano ang ulam natin?', 'What are we having with rice?'],
      ['Masarap', 'Delicious', 'ma-SA-rap', 'Masarap ang adobo!', 'The adobo is delicious!'],
      ['Gutom', 'Hungry', 'GU-tom', 'Gutom na ako.', 'I am hungry now.'],
      ['Busog', 'Full (after eating)', 'BU-sog', 'Busog na ako, salamat.', 'I am full, thank you.'],
      ['Manok', 'Chicken', 'MA-nok', 'Paborito ko ang manok.', 'Chicken is my favorite.'],
      ['Isda', 'Fish', 'IS-da', 'Sariwa ang isda.', 'The fish is fresh.'],
      ['Prutas', 'Fruit', 'PRU-tas', 'Mangga ang paborito kong prutas.', 'Mango is my favorite fruit.']
    ] },
    { id: 'numero', name: 'Numero', en: 'Numbers 1 to 10', color: '#2b9a8a', blurb: 'Count to ten, then use the numbers to buy things and tell time.', words: [
      ['Isa', 'One', 'i-SA', 'Isang baso ng tubig.', 'One glass of water.'],
      ['Dalawa', 'Two', 'da-LA-wa', 'Dalawang kanin po.', 'Two rice, please.'],
      ['Tatlo', 'Three', 'TAT-lo', 'Tatlong mangga.', 'Three mangoes.'],
      ['Apat', 'Four', 'A-pat', 'Apat na anak.', 'Four children.'],
      ['Lima', 'Five', 'LI-ma', 'Limang piso lang.', 'Only five pesos.'],
      ['Anim', 'Six', 'A-nim', 'Anim na oras.', 'Six hours.'],
      ['Pito', 'Seven', 'PI-to', 'Pitong araw sa isang linggo.', 'Seven days in a week.'],
      ['Walo', 'Eight', 'WA-lo', 'Walong tao.', 'Eight people.'],
      ['Siyam', 'Nine', 'SI-yam', 'Siyam na buwan.', 'Nine months.'],
      ['Sampu', 'Ten', 'sam-PU', 'Sampung minuto na lang.', 'Just ten more minutes.']
    ] },
    { id: 'biyahe', name: 'Biyahe', en: 'Getting around', color: '#7a56c8', blurb: 'Ask for directions, pay the fare and tell the jeepney driver where to stop.', words: [
      ['Saan', 'Where', 'sa-AN', 'Saan ang banyo?', 'Where is the bathroom?'],
      ['Magkano', 'How much', 'mag-KA-no', 'Magkano po ito?', 'How much is this?'],
      ['Kaliwa', 'Left', 'ka-LI-wa', 'Liko sa kaliwa.', 'Turn left.'],
      ['Kanan', 'Right', 'KA-nan', 'Sa kanan po.', 'On the right, please.'],
      ['Diretso', 'Straight ahead', 'di-RET-so', 'Diretso lang po.', 'Just go straight.'],
      ['Para', 'Stop (said to a driver)', 'PA-ra', 'Para po!', 'Stop here, please!'],
      ['Malapit', 'Near', 'ma-LA-pit', 'Malapit na tayo.', 'We are almost there.'],
      ['Malayo', 'Far', 'ma-LA-yo', 'Malayo ba ang palengke?', 'Is the market far?'],
      ['Bayad', 'Fare / Payment', 'BA-yad', 'Bayad po.', 'Here is my fare.']
    ] },
    { id: 'araw', name: 'Araw at Oras', en: 'Days and time', color: '#e2682c', blurb: 'The days of the week, plus yesterday, today and tomorrow.', words: [
      ['Lunes', 'Monday', 'LU-nes', 'Magsisimula ang klase sa Lunes.', 'Classes start on Monday.'],
      ['Martes', 'Tuesday', 'MAR-tes', 'May pulong tayo sa Martes.', 'We have a meeting on Tuesday.'],
      ['Miyerkules', 'Wednesday', 'mi-YER-ku-les', 'Bukas ay Miyerkules.', 'Tomorrow is Wednesday.'],
      ['Huwebes', 'Thursday', 'hu-WE-bes', 'Magkita tayo sa Huwebes.', 'Let’s meet on Thursday.'],
      ['Biyernes', 'Friday', 'bi-YER-nes', 'Sa wakas, Biyernes na!', 'At last, it’s Friday!'],
      ['Sabado', 'Saturday', 'SA-ba-do', 'Maglalaba ako sa Sabado.', 'I will do laundry on Saturday.'],
      ['Linggo', 'Sunday / Week', 'LING-go', 'Nagsisimba kami tuwing Linggo.', 'We go to church every Sunday.'],
      ['Ngayon', 'Now / Today', 'nga-YON', 'Ano ang gagawin mo ngayon?', 'What will you do now?'],
      ['Bukas', 'Tomorrow', 'BU-kas', 'Hanggang bukas, mga kaibigan!', 'Until tomorrow, friends!'],
      ['Kahapon', 'Yesterday', 'ka-HA-pon', 'Umulan kahapon sa Maynila.', 'It rained in Manila yesterday.']
    ] },
    { id: 'damdamin', name: 'Damdamin', en: 'Feelings', color: '#c2418f', blurb: 'Tell people how you feel, from happy and shy to very sleepy.', words: [
      ['Masaya', 'Happy', 'ma-SA-ya', 'Masaya ako ngayon.', 'I am happy today.'],
      ['Malungkot', 'Sad', 'ma-LUNG-kot', 'Malungkot siya kahapon.', 'She was sad yesterday.'],
      ['Pagod', 'Tired', 'PA-god', 'Pagod na pagod ako.', 'I am so tired.'],
      ['Galit', 'Angry', 'GA-lit', 'Huwag kang magalit sa akin.', 'Don’t be angry at me.'],
      ['Takot', 'Afraid', 'TA-kot', 'Takot ako sa dilim.', 'I am afraid of the dark.'],
      ['Antok', 'Sleepy', 'AN-tok', 'Antok na antok ako.', 'I am very sleepy.'],
      ['Mahal', 'Dear / Beloved (also: expensive)', 'MA-hal', 'Mahal kita.', 'I love you.'],
      ['Kinakabahan', 'Nervous', 'ki-na-ka-BA-han', 'Kinakabahan ako sa pagsusulit.', 'I am nervous about the test.'],
      ['Natutuwa', 'Glad / Delighted', 'na-tu-TU-wa', 'Natutuwa akong makilala ka.', 'I am glad to meet you.'],
      ['Nahihiya', 'Shy / Embarrassed', 'na-hi-HI-ya', 'Nahihiya ako sa kanila.', 'I feel shy around them.']
    ] },
    { id: 'kulay', name: 'Kulay', en: 'Colors', color: '#3a9d4f', blurb: 'Name what you see, from the white sampaguita to a golden mango.', words: [
      ['Kulay', 'Color', 'KU-lay', 'Anong kulay ito?', 'What color is this?'],
      ['Pula', 'Red', 'PU-la', 'Pula ang paborito kong kulay.', 'Red is my favorite color.'],
      ['Asul', 'Blue', 'a-SUL', 'Asul ang langit ngayon.', 'The sky is blue today.'],
      ['Dilaw', 'Yellow', 'di-LAW', 'Dilaw ang hinog na mangga.', 'A ripe mango is yellow.'],
      ['Berde', 'Green', 'BER-de', 'Berde ang dahon.', 'The leaf is green.'],
      ['Puti', 'White', 'PU-ti', 'Puti ang sampaguita.', 'The sampaguita is white.'],
      ['Itim', 'Black', 'I-tim', 'Itim ang buhok niya.', 'Her hair is black.'],
      ['Kayumanggi', 'Brown', 'ka-yu-mang-GI', 'Kayumanggi ang lupa.', 'The soil is brown.'],
      ['Kahel', 'Orange', 'ka-HEL', 'Kahel ang paglubog ng araw.', 'The sunset is orange.'],
      ['Rosas', 'Pink', 'RO-sas', 'Rosas ang bulaklak.', 'The flower is pink.'],
      ['Lila', 'Purple', 'LI-la', 'Lila ang tela.', 'The cloth is purple.']
    ] },
    { id: 'palengke', name: 'Palengke', en: 'At the market', color: '#a8742a', blurb: 'Haggle, ask for change and greet your suki like a regular.', words: [
      ['Palengke', 'Public market', 'pa-LENG-ke', 'Pupunta ako sa palengke.', 'I am going to the market.'],
      ['Bili', 'Buy', 'BI-li', 'Bili na kayo, mura lang!', 'Buy now, it’s cheap!'],
      ['Mura', 'Cheap', 'MU-ra', 'Mura ang gulay ngayon.', 'Vegetables are cheap today.'],
      ['Tawad', 'Haggle / Discount', 'TA-wad', 'Pwede po bang tumawad?', 'May I haggle?'],
      ['Sukli', 'Change (money back)', 'SUK-li', 'Wala pong sukli.', 'There is no change.'],
      ['Suki', 'Regular customer or vendor', 'SU-ki', 'Suki ko si Aling Nena.', 'Aling Nena is my regular vendor.'],
      ['Kilo', 'Kilogram', 'KI-lo', 'Isang kilo po ng bigas.', 'One kilo of rice, please.'],
      ['Gulay', 'Vegetables', 'GU-lay', 'Sariwa ang gulay dito.', 'The vegetables here are fresh.'],
      ['Supot', 'Plastic bag', 'SU-pot', 'Pakilagay sa supot.', 'Please put it in a bag.'],
      ['Barya', 'Coins / Small change', 'BAR-ya', 'May barya ka ba?', 'Do you have small change?']
    ] }
  ];

  var WORDS = [];
  UNITS.forEach(function (u) {
    u.words.forEach(function (w, i) {
      WORDS.push({ id: u.id + '-' + i, unit: u.id, tl: w[0], en: w[1], pr: w[2], ex: w[3], exEn: w[4] });
    });
  });
  var BY_ID = {};
  WORDS.forEach(function (w) { BY_ID[w.id] = w; });
  function unitWords(id) { return id === 'all' ? WORDS : WORDS.filter(function (w) { return w.unit === id; }); }
  function unitObj(id) { for (var i = 0; i < UNITS.length; i++) if (UNITS[i].id === id) return UNITS[i]; return null; }
  function unitName(id) { var u = unitObj(id); return u ? u.name : 'Halo-halo'; }
  function unitColor(id) { var u = unitObj(id); return u ? u.color : 'var(--sun)'; }

  var MODES = [
    { id: 'quiz', name: 'Pagsusulit', en: 'Multiple choice' },
    { id: 'build', name: 'Buuin', en: 'Build the sentence' },
    { id: 'match', name: 'Pagtugmain', en: 'Match the pairs' }
  ];
  var TITLES = ['Baguhan', 'Mausisa', 'Matiyaga', 'Madiskarte', 'Mahusay', 'Batikan', 'Dalubhasa'];
  var GOAL = 40, LEVEL_XP = 100;
  var DAYS3 = ['Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab', 'Lin'];

  /* ---------- saved progress (per viewer, optional) ---------- */
  var KEY = 'salita-v1';
  function fresh() { return { xp: 0, streak: 0, last: '', known: {}, days: [], daily: null }; }
  var S = fresh();
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === 'object') {
        S.xp = +p.xp || 0; S.streak = +p.streak || 0; S.last = p.last || '';
        S.known = p.known || {}; S.days = Array.isArray(p.days) ? p.days : []; S.daily = p.daily || null;
      }
    }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function dayStr(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function today() { return dayStr(new Date()); }
  function yday() { var d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); }
  function streakNow() { return (S.last === today() || S.last === yday()) ? S.streak : 0; }
  function dailyXp() { return (S.daily && S.daily.date === today()) ? S.daily.xp : 0; }
  function levelOf(xp) { return Math.floor(xp / LEVEL_XP); }
  function touch() {
    var t = today();
    if (S.last !== t) { S.streak = (S.last === yday()) ? S.streak + 1 : 1; S.last = t; }
    if (S.days.indexOf(t) < 0) { S.days.push(t); if (S.days.length > 120) S.days = S.days.slice(-120); }
  }
  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2000);
  }
  function gain(n) {
    var t = today(); touch();
    var beforeLvl = levelOf(S.xp);
    if (!S.daily || S.daily.date !== t) S.daily = { date: t, xp: 0 };
    var beforeDaily = S.daily.xp;
    S.xp += n; S.daily.xp += n;
    save(); renderStats();
    var afterLvl = levelOf(S.xp);
    if (afterLvl > beforeLvl) toast('Level up! Antas ' + (afterLvl + 1) + ': ' + TITLES[Math.min(afterLvl, TITLES.length - 1)]);
    else if (beforeDaily < GOAL && S.daily.xp >= GOAL) toast('Naabot mo na ang layunin ngayon!');
    else toast('+' + n + ' XP');
  }
  function renderStats() {
    document.getElementById('stat-streak').textContent = streakNow();
    document.getElementById('stat-xp').textContent = S.xp;
  }
  function knownCount(id) { return unitWords(id).filter(function (w) { return S.known[w.id]; }).length; }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var voices = [];
  function loadVoices() { try { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { voices = []; } }
  function filVoice() { for (var i = 0; i < voices.length; i++) if (/^(fil|tl)/i.test(voices[i].lang)) return voices[i]; return null; }
  function speak(text) {
    try { var v = filVoice(); if (!v) return; var u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
  }
  loadVoices();
  try { if (window.speechSynthesis) speechSynthesis.onvoiceschanged = function () { loadVoices(); if (V.tab === 'cards' || V.tab === 'home' || V.tab === 'list') render(); }; } catch (e) {}

  function greeting() {
    var h = new Date().getHours();
    if (h < 12) return { tl: 'Magandang umaga', en: 'Good morning' };
    if (h < 13) return { tl: 'Magandang tanghali', en: 'Good noon' };
    if (h < 18) return { tl: 'Magandang hapon', en: 'Good afternoon' };
    return { tl: 'Magandang gabi', en: 'Good evening' };
  }
  function wordOfDay() {
    var d = new Date();
    var n = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
    return WORDS[n % WORDS.length];
  }
  function listenBtn(id, cls) { return filVoice() ? '<button class="btn ghost small ' + (cls || '') + '" data-act="speak" data-id="' + id + '">Pakinggan</button>' : ''; }

  /* ---------- state ---------- */
  var V = { tab: 'home', mode: 'quiz', cards: null, quiz: null, build: null, match: null, list: { q: '', unit: 'all' }, resetAsk: false, focus: null, lock: false };

  function startCards(unitId, ids) {
    var pool = ids || unitWords(unitId).filter(function (w) { return !S.known[w.id]; }).map(function (w) { return w.id; });
    var review = false;
    if (!pool.length) { pool = unitWords(unitId).map(function (w) { return w.id; }); review = true; }
    pool = shuffle(pool);
    V.cards = { unit: unitId, queue: pool, total: pool.length, flipped: false, review: review };
    V.tab = 'cards'; V.focus = '[data-act="flip"]';
  }
  function startQuiz(unitId) {
    var pool = shuffle(unitWords(unitId));
    var picks = pool.slice(0, unitId === 'all' ? 10 : 8);
    var qs = picks.map(function (w) {
      var cands = WORDS.filter(function (x) { return x.id !== w.id && x.en !== w.en && x.tl !== w.tl; });
      var same = shuffle(cands.filter(function (x) { return x.unit === w.unit; }));
      var other = shuffle(cands.filter(function (x) { return x.unit !== w.unit; }));
      var opts = shuffle([w.id].concat(same.concat(other).slice(0, 3).map(function (x) { return x.id; })));
      return { id: w.id, dir: Math.random() < 0.5 ? 'tl2en' : 'en2tl', opts: opts };
    });
    V.quiz = { unit: unitId, qs: qs, i: 0, sel: null, score: 0, missed: [] };
    V.mode = 'quiz'; V.tab = 'play';
  }
  function startBuild(unitId) {
    var pool = shuffle(unitWords(unitId).filter(function (w) { return w.ex.split(' ').length >= 3; })).slice(0, 6);
    var items = pool.map(function (w) {
      var toks = w.ex.split(' ').map(function (t, i) { return { t: t, i: i }; });
      var bank = shuffle(toks), tries = 0;
      while (bank.map(function (x) { return x.i; }).join() === toks.map(function (x) { return x.i; }).join() && tries++ < 6) bank = shuffle(toks);
      return { id: w.id, total: toks.length, bank: bank, ans: [], status: 'idle', tries: 0 };
    });
    V.build = { unit: unitId, items: items, i: 0, score: 0 };
    V.mode = 'build'; V.tab = 'play';
  }
  function startMatch(unitId) {
    var seen = {}, picks = [];
    shuffle(unitWords(unitId)).forEach(function (w) {
      if (picks.length < 6 && !seen[w.en] && !seen[w.tl]) { seen[w.en] = 1; seen[w.tl] = 1; picks.push(w.id); }
    });
    V.match = { unit: unitId, left: shuffle(picks), right: shuffle(picks), matched: {}, selL: null, selR: null, bad: null, mistakes: 0, total: picks.length, done: false };
    V.mode = 'match'; V.tab = 'play'; V.lock = false;
  }
  function openGame(unitId) {
    if (V.mode === 'build') startBuild(unitId); else if (V.mode === 'match') startMatch(unitId); else startQuiz(unitId);
  }

  /* ---------- views ---------- */
  var SUN = '<svg class="sun" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><g>' +
    [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<polygon points="60,4 67,36 53,36" style="fill:var(--sun)" transform="rotate(' + a + ' 60 60)"/>'; }).join('') +
    '</g><circle cx="60" cy="60" r="25" style="fill:var(--sun)"/><circle cx="60" cy="60" r="25" style="fill:none;stroke:var(--weave-b);stroke-width:2" /></svg>';

  function unitCard(u) {
    var id = u ? u.id : 'all';
    var n = unitWords(id).length, k = knownCount(id);
    var name = u ? u.name : 'Halo-halo';
    var en = u ? u.en : 'Mixed review';
    var blurb = u ? u.blurb : 'Every word from every unit, shuffled together.';
    return '<article class="unit' + (u ? '' : ' mix') + '" style="--uc:' + unitColor(id) + '">' +
      '<h3>' + esc(name) + '</h3><p class="en"><span class="dot" aria-hidden="true"></span>' + esc(en) + '</p>' +
      '<p class="blurb">' + esc(blurb) + '</p>' +
      '<div><div class="bar" role="img" aria-label="' + k + ' ng ' + n + ' alam na"><i style="width:' + Math.round(k / n * 100) + '%;background:' + unitColor(id) + '"></i></div>' +
      '<div class="meta"><span>' + k + ' ng ' + n + ' alam na</span><span>' + n + ' salita</span></div></div>' +
      '<div class="row"><button class="btn small" data-act="openCards" data-unit="' + id + '">Kard</button>' +
      '<button class="btn small ghost" data-act="openQuiz" data-unit="' + id + '">Pagsusulit</button></div></article>';
  }

  function weekTile() {
    var now = new Date(), idx = (now.getDay() + 6) % 7, cells = '';
    for (var i = 0; i < 7; i++) {
      var d = new Date(now); d.setDate(now.getDate() - idx + i);
      var ds = dayStr(d), on = S.days.indexOf(ds) >= 0;
      cells += '<div class="' + (on ? 'on ' : '') + (i === idx ? 'today' : '') + '"><i aria-hidden="true"></i><span>' + DAYS3[i] + '</span><span class="sr">' + (on ? 'nag-aral' : 'wala') + '</span></div>';
    }
    var count = 0;
    for (var j = 0; j < 7; j++) { var dd = new Date(now); dd.setDate(now.getDate() - idx + j); if (S.days.indexOf(dayStr(dd)) >= 0) count++; }
    return '<div class="tile"><p class="eyebrow">Linggong ito</p><p class="big">' + count + ' <small>sa 7 araw</small></p><div class="week">' + cells + '</div></div>';
  }

  function viewHome() {
    var g = greeting(), lvl = levelOf(S.xp), into = S.xp - lvl * LEVEL_XP, d = Math.min(dailyXp(), GOAL), w = wordOfDay();
    var title = TITLES[Math.min(lvl, TITLES.length - 1)];
    return '<section class="hero">' + SUN + '<div class="hero-text"><p class="eyebrow">Tagalog para sa nagsisimula</p>' +
      '<h1>' + esc(g.tl) + '!</h1>' +
      '<p class="lead">That means “' + esc(g.en) + '.” Pick a unit, flip through its cards, then play to lock the words in.</p></div></section>' +
      '<section class="tiles" aria-label="Iyong progreso">' +
      '<div class="tile"><p class="eyebrow">Antas</p><p class="big">' + (lvl + 1) + ' <small>' + esc(title) + '</small></p>' +
      '<div class="bar" role="img" aria-label="' + into + ' ng ' + LEVEL_XP + ' XP papunta sa susunod na antas"><i style="width:' + into + '%"></i></div><p class="meta"><span>' + into + ' / ' + LEVEL_XP + ' XP</span><span>susunod na antas</span></p></div>' +
      '<div class="tile"><p class="eyebrow">Layunin ngayon</p><p class="big">' + d + ' <small>/ ' + GOAL + ' XP</small></p>' +
      '<div class="bar" role="img" aria-label="' + d + ' ng ' + GOAL + ' XP ngayon"><i style="width:' + Math.round(d / GOAL * 100) + '%"></i></div><p class="meta"><span>' + (d >= GOAL ? 'Tapos na ang layunin!' : (GOAL - d) + ' XP pa') + '</span></p></div>' +
      weekTile() + '</section>' +
      '<section class="wotd" aria-label="Salita ng araw"><div><p class="eyebrow">Salita ng araw</p><p class="tl">' + esc(w.tl) + '</p><p class="pr">' + esc(w.pr) + '</p></div>' +
      '<div><p class="en-big" style="font-size:1.6rem">' + esc(w.en) + '</p><p class="ex">' + esc(w.ex) + '</p><p class="ex-en">' + esc(w.exEn) + '</p>' +
      '<div class="row" style="margin-top:8px"><button class="btn small" data-act="oneCard" data-id="' + w.id + '">Aralin ito</button>' + listenBtn(w.id) + '</div></div></section>' +
      '<div class="sec-title"><h2>Mga aralin</h2><p class="meta">' + UNITS.length + ' aralin · ' + WORDS.length + ' salita</p></div>' +
      '<section class="grid" aria-label="Mga aralin">' + UNITS.map(unitCard).join('') + unitCard(null) + '</section>' +
      '<section class="tip"><span class="big" aria-hidden="true">Po</span><div><h3>Sabihin nang magalang</h3>' +
      '<p>Add <b>po</b> to a sentence when you speak to elders, strangers or anyone you want to respect. <b>Opo</b> is a polite “yes.” Try it on any phrase in the Pagbati unit.</p></div></section>';
  }

  function unitPickGrid(act) {
    var items = UNITS.map(function (u) { return { id: u.id, name: u.name, en: u.en }; }).concat([{ id: 'all', name: 'Halo-halo', en: 'Mixed review' }]);
    return '<div class="grid">' + items.map(function (it) {
      var n = unitWords(it.id).length, k = knownCount(it.id);
      return '<button class="pick" style="--uc:' + unitColor(it.id) + '" data-act="' + act + '" data-unit="' + it.id + '"><strong><span class="dot" aria-hidden="true"></span>' + esc(it.name) + '</strong><span>' + esc(it.en) + ' · ' + k + ' ng ' + n + ' alam na</span></button>';
    }).join('') + '</div>';
  }

  function viewCards() {
    var c = V.cards;
    if (!c) {
      return '<section class="picker"><p class="eyebrow">Kard</p><h2>Aling aralin ang aaralin mo?</h2>' +
        '<p class="lead">Cards show the words you have not marked as known yet. Mark a word known and it leaves the deck.</p>' + unitPickGrid('openCards') + '</section>';
    }
    if (!c.queue.length) {
      return '<section class="picker"><p class="eyebrow">' + esc(unitName(c.unit)) + '</p><h2>Tapos na!</h2>' +
        '<p class="lead">You went through ' + c.total + ' card' + (c.total === 1 ? '' : 's') + '. Play a game to check how much stuck.</p>' +
        '<div class="row"><button class="btn" data-act="openQuiz" data-unit="' + c.unit + '">Pagsusulit</button>' +
        '<button class="btn ghost" data-act="openCards" data-unit="' + c.unit + '">Ulitin ang kard</button>' +
        '<button class="btn ghost" data-act="pick" data-kind="cards">Ibang aralin</button></div></section>';
    }
    var w = BY_ID[c.queue[0]], done = c.total - c.queue.length;
    var front = '<span class="eyebrow">' + esc(unitName(w.unit)) + '</span><span class="tl">' + esc(w.tl) + '</span><span class="pr">' + esc(w.pr) + '</span><span class="hint">Pindutin para makita ang kahulugan</span>';
    var back = '<span class="eyebrow">' + esc(w.tl) + '</span><span class="en-big">' + esc(w.en) + '</span><span class="ex">' + esc(w.ex) + '</span><span class="ex-en">' + esc(w.exEn) + '</span>';
    return '<section class="deckhead"><button class="btn ghost small" data-act="pick" data-kind="cards">Ibang aralin</button>' +
      '<span class="count">' + esc(unitName(w.unit === c.unit || c.unit === 'all' ? c.unit : w.unit)) + ' · ' + done + ' ng ' + c.total + ' tapos' + (c.review ? ' · pag-uulit' : '') + '</span></section>' +
      '<div class="bar" role="img" aria-label="' + done + ' ng ' + c.total + ' tapos"><i style="width:' + Math.round(done / c.total * 100) + '%"></i></div>' +
      '<section class="cardwrap"><button class="card' + (c.flipped ? ' is-back' : '') + '" data-act="flip" aria-label="' + (c.flipped ? 'Kahulugan: ' + esc(w.en) + '. Pindutin para bumalik.' : esc(w.tl) + '. Pindutin para makita ang kahulugan.') + '">' + (c.flipped ? back : front) + '</button>' +
      listenBtn(w.id, 'listen') + '</section>' +
      '<section class="actions"><button class="btn ghost" data-act="again">Ulitin mamaya</button><button class="btn" data-act="known">Alam ko na</button></section>' +
      '<p class="keys"><kbd>←</kbd> ulitin mamaya · <kbd>→</kbd> alam ko na</p>';
  }

  function viewPlay() {
    var st = V[V.mode];
    if (!st) return playPicker();
    return ({ quiz: viewQuiz, build: viewBuild, match: viewMatch })[V.mode]();
  }
  function playPicker() {
    return '<section class="picker"><p class="eyebrow">Laro</p><h2>Pumili ng laro at aralin</h2>' +
      '<div class="seg" role="group" aria-label="Uri ng laro">' + MODES.map(function (m) {
        return '<button data-act="mode" data-mode="' + m.id + '" aria-pressed="' + (V.mode === m.id) + '"><b>' + m.name + '</b><span>' + m.en + '</span></button>';
      }).join('') + '</div>' +
      '<p class="lead">' + ({
        quiz: 'Up to 8 questions in both directions. Each correct answer earns 10 XP.',
        build: 'Tap the words in order to rebuild a Tagalog sentence from its English meaning. Up to 15 XP each.',
        match: 'Pair six Tagalog words with their meanings. 3 XP per pair, plus a 10 XP bonus for no mistakes.'
      })[V.mode] + '</p>' + unitPickGrid('openGame') + '</section>';
  }

  function viewQuiz() {
    var q = V.quiz;
    if (q.i >= q.qs.length) {
      var n = q.qs.length, pct = q.score / n;
      var msg = pct === 1 ? 'Perpekto! Walang mali.' : pct >= 0.8 ? 'Magaling! Halos perpekto.' : pct >= 0.5 ? 'Maayos! Konting ulit pa.' : 'Kaya mo ’yan. Balikan natin ang mga kard.';
      return '<section class="picker"><p class="eyebrow">' + esc(unitName(q.unit)) + ' · Pagsusulit</p><h2>' + msg + '</h2>' +
        '<p class="score">' + q.score + ' / ' + n + '</p>' +
        (q.missed.length ? '<h3>Balikan ang mga ito</h3><ul class="missed">' + q.missed.map(function (id) { var w = BY_ID[id]; return '<li><b>' + esc(w.tl) + '</b><span>' + esc(w.en) + '</span></li>'; }).join('') + '</ul>' : '') +
        '<div class="row"><button class="btn" data-act="openQuiz" data-unit="' + q.unit + '">Ulitin</button>' +
        (q.missed.length ? '<button class="btn ghost" data-act="reviewMissed">Aralin ang mga mali</button>' : '') +
        '<button class="btn ghost" data-act="pick" data-kind="quiz">Ibang laro</button></div></section>';
    }
    var cur = q.qs[q.i], w = BY_ID[cur.id], answered = q.sel !== null;
    var prompt = cur.dir === 'tl2en'
      ? '<p class="eyebrow">Ano ang ibig sabihin nito?</p><p class="tl">' + esc(w.tl) + '</p><p class="pr">' + esc(w.pr) + '</p>'
      : '<p class="eyebrow">Paano ito sabihin sa Tagalog?</p><p class="en-big">' + esc(w.en) + '</p>';
    var opts = cur.opts.map(function (id, k) {
      var o = BY_ID[id], cls = '', tag = '';
      if (answered) {
        if (id === cur.id) { cls = ' right'; tag = '<span class="tag">Tama</span>'; }
        else if (k === q.sel) { cls = ' wrong'; tag = '<span class="tag">Mali</span>'; }
      }
      return '<button class="opt' + cls + '" data-act="answer" data-k="' + k + '"' + (answered ? ' disabled' : '') + '><span>' + esc(cur.dir === 'tl2en' ? o.en : o.tl) + '</span>' + tag + '</button>';
    }).join('');
    var ok = answered && cur.opts[q.sel] === cur.id;
    var fb = answered
      ? '<div class="fb ' + (ok ? 'good' : 'bad') + '" role="status"><b>' + (ok ? 'Tama! +10 XP' : 'Ang sagot ay: ' + esc(cur.dir === 'tl2en' ? w.en : w.tl)) + '</b><span class="ex">' + esc(w.ex) + '</span><span class="ex-en">' + esc(w.exEn) + '</span></div>' +
        '<div class="row"><button class="btn" data-act="next">' + (q.i + 1 === q.qs.length ? 'Tingnan ang resulta' : 'Susunod') + '</button></div>'
      : '';
    return '<section class="deckhead"><button class="btn ghost small" data-act="pick" data-kind="quiz">Ibang laro</button>' +
      '<span class="count">' + esc(unitName(q.unit)) + ' · Tanong ' + (q.i + 1) + ' ng ' + q.qs.length + ' · Puntos ' + q.score + '</span></section>' +
      '<div class="bar" role="img" aria-label="Tanong ' + (q.i + 1) + ' ng ' + q.qs.length + '"><i style="width:' + Math.round(q.i / q.qs.length * 100) + '%"></i></div>' +
      '<section class="qprompt">' + prompt + '</section><section class="opts" aria-label="Mga sagot">' + opts + '</section>' + fb;
  }

  function viewBuild() {
    var b = V.build;
    if (!b.items.length) {
      return '<section class="picker"><h2>Walang sapat na pangungusap</h2><p class="lead">This unit has no sentences long enough to build.</p><div class="row"><button class="btn" data-act="pick" data-kind="build">Ibang aralin</button></div></section>';
    }
    if (b.i >= b.items.length) {
      return '<section class="picker"><p class="eyebrow">' + esc(unitName(b.unit)) + ' · Buuin</p><h2>' + (b.score === b.items.length ? 'Perpekto! Ang galing mong bumuo.' : 'Magaling! Tapos na ang laro.') + '</h2>' +
        '<p class="score">' + b.score + ' / ' + b.items.length + '</p><p class="lead">Sentences you got on the first or second try count toward your score.</p>' +
        '<div class="row"><button class="btn" data-act="openGame" data-unit="' + b.unit + '">Ulitin</button><button class="btn ghost" data-act="pick" data-kind="build">Ibang laro</button></div></section>';
    }
    var it = b.items[b.i], w = BY_ID[it.id], finished = it.status === 'right' || it.status === 'revealed';
    var slots = it.ans.length
      ? it.ans.map(function (x, k) { return '<button class="tok" data-act="bremove" data-k="' + k + '"' + (finished ? ' disabled' : '') + '>' + esc(x.t) + '</button>'; }).join('')
      : '<span class="hint">Pindutin ang mga salita sa ibaba nang sunud-sunod</span>';
    var bank = it.bank.map(function (x, k) { return '<button class="tok" data-act="badd" data-k="' + k + '"' + (finished ? ' disabled' : '') + '>' + esc(x.t) + '</button>'; }).join('');
    var fb = '';
    if (it.status === 'right') fb = '<div class="fb good" role="status"><b>Tama! ' + (it.tries === 0 ? '+15' : '+8') + ' XP</b><span class="ex">' + esc(w.ex) + '</span></div>';
    else if (it.status === 'revealed') fb = '<div class="fb bad" role="status"><b>Ito ang tamang ayos:</b><span class="ex">' + esc(w.ex) + '</span></div>';
    else if (it.status === 'wrong') fb = '<div class="fb bad" role="status"><b>Hindi pa tama.</b><span class="ex-en">Subukan ulit. Isang pagkakamali pa at ipapakita ko ang sagot.</span></div>';
    var actions = finished
      ? '<div class="row"><button class="btn" data-act="bnext">' + (b.i + 1 === b.items.length ? 'Tingnan ang resulta' : 'Susunod') + '</button></div>'
      : '<div class="row"><button class="btn" data-act="bcheck"' + (it.bank.length ? ' disabled' : '') + '>Suriin</button><button class="btn ghost" data-act="breset"' + (it.ans.length ? '' : ' disabled') + '>Alisin lahat</button></div>';
    return '<section class="deckhead"><button class="btn ghost small" data-act="pick" data-kind="build">Ibang laro</button>' +
      '<span class="count">' + esc(unitName(b.unit)) + ' · Pangungusap ' + (b.i + 1) + ' ng ' + b.items.length + ' · Puntos ' + b.score + '</span></section>' +
      '<div class="bar" role="img" aria-label="Pangungusap ' + (b.i + 1) + ' ng ' + b.items.length + '"><i style="width:' + Math.round(b.i / b.items.length * 100) + '%"></i></div>' +
      '<section class="qprompt"><p class="eyebrow">Buuin ang pangungusap sa Tagalog</p><p class="en-big">' + esc(w.exEn) + '</p></section>' +
      '<section class="slots ' + (it.status === 'right' ? 'right' : (it.status === 'wrong' || it.status === 'revealed') ? 'wrong' : '') + '" aria-label="Iyong sagot">' + slots + '</section>' +
      '<section class="bank" aria-label="Mga salita">' + bank + '</section>' + fb + actions;
  }

  function viewMatch() {
    var m = V.match;
    if (m.done) {
      return '<section class="picker"><p class="eyebrow">' + esc(unitName(m.unit)) + ' · Pagtugmain</p><h2>' + (m.mistakes === 0 ? 'Perpekto! Walang mali.' : 'Tapos na ang round!') + '</h2>' +
        '<p class="score">' + m.mistakes + '</p><p class="lead">' + (m.mistakes === 1 ? 'mistake' : 'mistakes') + ' this round. ' + (m.mistakes === 0 ? 'You earned the 10 XP bonus.' : 'Play again to earn the no-mistakes bonus.') + '</p>' +
        '<div class="row"><button class="btn" data-act="openGame" data-unit="' + m.unit + '">Bagong round</button><button class="btn ghost" data-act="pick" data-kind="match">Ibang laro</button></div></section>';
    }
    var matchedN = Object.keys(m.matched).length;
    function btn(id, side) {
      var w = BY_ID[id], isDone = !!m.matched[id], sel = (side === 'L' ? m.selL : m.selR) === id;
      var bad = m.bad && (side === 'L' ? m.bad.l : m.bad.r) === id;
      var cls = 'mbtn' + (isDone ? ' done' : '') + (bad ? ' bad' : '');
      return '<button class="' + cls + '" data-act="' + (side === 'L' ? 'mleft' : 'mright') + '" data-id="' + id + '" aria-pressed="' + sel + '"' + (isDone ? ' disabled' : '') + '><span>' + esc(side === 'L' ? w.tl : w.en) + '</span>' + (isDone ? '<span class="tag">Tugma</span>' : bad ? '<span class="tag">Mali</span>' : '') + '</button>';
    }
    return '<section class="deckhead"><button class="btn ghost small" data-act="pick" data-kind="match">Ibang laro</button>' +
      '<span class="count">' + esc(unitName(m.unit)) + ' · ' + matchedN + ' ng ' + m.total + ' tugma · Mali ' + m.mistakes + '</span></section>' +
      '<div class="bar" role="img" aria-label="' + matchedN + ' ng ' + m.total + ' tugma"><i style="width:' + Math.round(matchedN / m.total * 100) + '%"></i></div>' +
      '<p class="lead">Pumili ng salitang Tagalog sa kaliwa, tapos ang kahulugan nito sa kanan.</p>' +
      '<section class="match"><div class="mcol" aria-label="Tagalog">' + m.left.map(function (id) { return btn(id, 'L'); }).join('') + '</div>' +
      '<div class="mcol" aria-label="English">' + m.right.map(function (id) { return btn(id, 'R'); }).join('') + '</div></section>';
  }

  function listRows() {
    var q = V.list.q.trim().toLowerCase(), u = V.list.unit;
    var items = unitWords(u).filter(function (w) { return !q || (w.tl + ' ' + w.en + ' ' + w.pr).toLowerCase().indexOf(q) > -1; });
    var head = '<p class="meta"><span>' + items.length + ' salita</span></p>';
    if (!items.length) return head + '<p class="lead">Walang nahanap para sa “' + esc(V.list.q) + '”. Subukan ang ibang salita.</p>';
    return head + '<div class="lrows">' + items.map(function (w) {
      return '<article class="lrow"><div><div class="lhead"><b>' + esc(w.tl) + '</b><span class="pr">' + esc(w.pr) + '</span>' + (S.known[w.id] ? '<span class="tag ok">Alam na</span>' : '') + '</div>' +
        '<p>' + esc(w.en) + '</p><p class="ex-en">' + esc(w.ex) + ' · ' + esc(w.exEn) + '</p></div>' + listenBtn(w.id) + '</article>';
    }).join('') + '</div>';
  }
  function viewList() {
    var chips = [{ id: 'all', name: 'Lahat' }].concat(UNITS.map(function (u) { return { id: u.id, name: u.name }; }));
    return '<section class="hello"><p class="eyebrow">Listahan</p><h1>Lahat ng salita</h1></section>' +
      '<input id="list-q" class="search" type="search" placeholder="Hanapin sa Tagalog o English" autocomplete="off" aria-label="Maghanap ng salita" value="' + esc(V.list.q) + '">' +
      '<div class="chips" role="group" aria-label="Salain ayon sa aralin">' + chips.map(function (c) { return '<button data-act="listUnit" data-unit="' + c.id + '" aria-pressed="' + (V.list.unit === c.id) + '">' + esc(c.name) + '</button>'; }).join('') + '</div>' +
      '<div id="list-rows" style="display:flex;flex-direction:column;gap:10px">' + listRows() + '</div>';
  }

  function viewGuide() {
    return '<section class="hello"><p class="eyebrow">Gabay</p><h1>Basahin ito nang malakas</h1>' +
      '<p class="lead">Tagalog is spelled almost the way it sounds. A few habits get you most of the way.</p></section>' +
      '<section class="cols">' +
      '<article class="g"><h3>Limang patinig</h3><p>Every vowel has one steady sound. It does not slide into a second sound the way English vowels do.</p>' +
      '<div class="vowels"><div><b>a</b><span>ah</span></div><div><b>e</b><span>eh</span></div><div><b>i</b><span>ee</span></div><div><b>o</b><span>oh</span></div><div><b>u</b><span>oo</span></div></div></article>' +
      '<article class="g"><h3>Ang tunog na “ng”</h3><p><b>ng</b> is one sound, like the end of “sing.” It can start a word too: <b>ngayon</b> (now) is nga-YON. The little word <b>ng</b> is read as “nang.”</p></article>' +
      '<article class="g"><h3>Diin ang nagpapabago</h3><p>Where you put the stress can change the meaning.</p>' +
      '<div class="pair"><div><b>BU-kas</b><span>tomorrow</span></div><div><b>bu-KAS</b><span>open</span></div></div></article>' +
      '<article class="g"><h3>Po at mano</h3><p>Add <b>po</b> for respect: <b>Salamat po.</b> Answer elders with <b>opo</b> instead of a plain yes. <b>Mano po</b> is the gesture of taking an elder’s hand and touching it to your forehead as a blessing.</p></article>' +
      '</section>' +
      '<section class="g"><h3>Ang, ng, sa</h3><p>Three small words mark who does what and where. Tagalog usually puts the action first.</p>' +
      '<div class="gloss"><div><b>Kumain</b><span>ate</span></div><div class="mark"><b>ang</b><span>marks the doer</span></div><div><b>bata</b><span>child</span></div><div class="mark"><b>ng</b><span>marks the thing eaten</span></div><div><b>mangga</b><span>mango</span></div><div class="mark"><b>sa</b><span>marks the place</span></div><div><b>bahay</b><span>house</span></div></div>' +
      '<p class="ex-en">The child ate a mango at home.</p></section>' +
      '<section class="g"><h3>Pag-reset ng progreso</h3><p class="ex-en">Clears your XP, streak and known words from this browser.</p>' +
      (V.resetAsk
        ? '<div class="row"><button class="btn danger" data-act="resetYes">Oo, i-reset</button><button class="btn ghost" data-act="resetNo">Huwag</button></div>'
        : '<div class="row"><button class="btn ghost small" data-act="resetAsk">I-reset ang progreso</button></div>') + '</section>';
  }

  var VIEWS = { home: viewHome, cards: viewCards, play: viewPlay, list: viewList, guide: viewGuide };
  function render() {
    document.querySelectorAll('.tabs button').forEach(function (b) { b.setAttribute('aria-current', b.dataset.tab === V.tab ? 'page' : 'false'); });
    var v = document.getElementById('view');
    v.innerHTML = VIEWS[V.tab]();
    v.dataset.tab = V.tab;
    if (V.focus) { var el = v.querySelector(V.focus); if (el) { try { el.focus({ preventScroll: true }); } catch (e) {} } V.focus = null; }
  }

  /* ---------- actions ---------- */
  function top() { try { window.scrollTo(0, 0); } catch (e) {} }
  function act(a, d) {
    if (a === 'tab') { V.tab = d.tab; V.resetAsk = false; render(); top(); return; }
    if (a === 'openCards') { startCards(d.unit); render(); top(); return; }
    if (a === 'oneCard') { startCards(BY_ID[d.id].unit, [d.id]); render(); top(); return; }
    if (a === 'openQuiz') { startQuiz(d.unit); render(); top(); return; }
    if (a === 'openGame') { openGame(d.unit); render(); top(); return; }
    if (a === 'mode') { V.mode = d.mode; render(); return; }
    if (a === 'pick') { if (d.kind === 'cards') { V.cards = null; V.tab = 'cards'; } else { V[d.kind] = null; V.mode = d.kind; V.tab = 'play'; } render(); top(); return; }
    if (a === 'flip' && V.cards) { V.cards.flipped = !V.cards.flipped; V.focus = '[data-act="flip"]'; render(); return; }
    if (a === 'speak') { var sw = BY_ID[d.id]; speak(sw.tl + '. ' + sw.ex); return; }
    if (a === 'again' && V.cards && V.cards.queue.length) { V.cards.queue.push(V.cards.queue.shift()); V.cards.flipped = false; V.focus = '[data-act="flip"]'; render(); return; }
    if (a === 'known' && V.cards && V.cards.queue.length) {
      var id = V.cards.queue.shift();
      if (!S.known[id]) S.known[id] = 1;
      V.cards.flipped = false; gain(5); V.focus = V.cards.queue.length ? '[data-act="flip"]' : '#view .btn'; render(); return;
    }
    if (a === 'answer' && V.quiz && V.quiz.sel === null) {
      var q = V.quiz, cur = q.qs[q.i], k = +d.k;
      q.sel = k;
      if (cur.opts[k] === cur.id) { q.score++; S.known[cur.id] = 1; gain(10); }
      else { q.missed.push(cur.id); save(); }
      V.focus = '[data-act="next"]'; render(); return;
    }
    if (a === 'next' && V.quiz) {
      var qq = V.quiz; qq.i++; qq.sel = null;
      var fin = qq.i >= qq.qs.length;
      V.focus = fin ? '#view .btn' : null; render(); top();
      if (fin && qq.score === qq.qs.length) gain(20);
      return;
    }
    if (a === 'reviewMissed' && V.quiz) { startCards(V.quiz.unit, V.quiz.missed.slice()); render(); top(); return; }

    if (V.build) {
      var b = V.build, it = b.items[b.i];
      if (a === 'badd' && it && it.status !== 'right' && it.status !== 'revealed') {
        var x = it.bank.splice(+d.k, 1)[0]; if (x) it.ans.push(x);
        if (it.status === 'wrong') it.status = 'idle';
        V.focus = it.bank.length ? '.bank .tok' : '[data-act="bcheck"]'; render(); return;
      }
      if (a === 'bremove' && it && it.status !== 'right' && it.status !== 'revealed') {
        var y = it.ans.splice(+d.k, 1)[0]; if (y) it.bank.push(y);
        if (it.status === 'wrong') it.status = 'idle';
        render(); return;
      }
      if (a === 'breset' && it) { it.bank = it.bank.concat(it.ans); it.ans = []; it.status = 'idle'; render(); return; }
      if (a === 'bcheck' && it && !it.bank.length) {
        var okb = it.ans.every(function (t, i) { return t.i === i; });
        if (okb) { it.status = 'right'; b.score++; gain(it.tries === 0 ? 15 : 8); V.focus = '[data-act="bnext"]'; }
        else { it.tries++; it.status = it.tries >= 2 ? 'revealed' : 'wrong'; V.focus = it.status === 'revealed' ? '[data-act="bnext"]' : null; }
        render(); return;
      }
      if (a === 'bnext') { b.i++; V.focus = b.i >= b.items.length ? '#view .btn' : '.bank .tok'; render(); top(); return; }
    }

    if (V.match && !V.match.done) {
      var m = V.match;
      if ((a === 'mleft' || a === 'mright') && !V.lock && !m.matched[d.id]) {
        if (a === 'mleft') m.selL = (m.selL === d.id) ? null : d.id; else m.selR = (m.selR === d.id) ? null : d.id;
        if (m.selL && m.selR) {
          if (m.selL === m.selR) {
            m.matched[m.selL] = 1; m.selL = null; m.selR = null;
            gain(3);
            if (Object.keys(m.matched).length === m.total) {
              m.done = true;
              if (m.mistakes === 0) setTimeout(function () { gain(10); }, 900);
            }
            render(); return;
          }
          m.mistakes++; m.bad = { l: m.selL, r: m.selR }; V.lock = true; render();
          setTimeout(function () { if (V.match === m) { m.bad = null; m.selL = null; m.selR = null; } V.lock = false; if (V.tab === 'play' && V.mode === 'match') render(); }, 700);
          return;
        }
        render(); return;
      }
    }

    if (a === 'listUnit') { V.list.unit = d.unit; render(); return; }
    if (a === 'resetAsk') { V.resetAsk = true; render(); return; }
    if (a === 'resetNo') { V.resetAsk = false; render(); return; }
    if (a === 'resetYes') {
      S = fresh(); save(); V.cards = V.quiz = V.build = V.match = null; V.resetAsk = false;
      renderStats(); render(); toast('Na-reset na ang progreso'); return;
    }
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (t) act(t.dataset.act, t.dataset);
  });
  document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'list-q') {
      V.list.q = e.target.value;
      var rows = document.getElementById('list-rows');
      if (rows) rows.innerHTML = listRows();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (V.tab === 'cards' && V.cards && V.cards.queue.length) {
      if (e.key === 'ArrowRight') { e.preventDefault(); act('known', {}); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); act('again', {}); }
    }
  });

  renderStats();
  render();
})();
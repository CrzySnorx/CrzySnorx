/* Safe storage wrapper.
   Uses localStorage when the browser allows it. If it is blocked (sandboxed preview,
   "block all site data", some private modes), it falls back to sessionStorage, and
   finally to window.name, which survives page-to-page navigation within the same tab.
   This keeps the app working instead of crashing. */
const Store = (() => {
  const PREFIX = '__fl__';

  function works(s) {
    try {
      const k = '__fl_test__';
      s.setItem(k, '1');
      s.removeItem(k);
      return true;
    } catch (e) { return false; }
  }

  function nameStore() {
    const read = () => {
      try {
        const n = window.name || '';
        return n.indexOf(PREFIX) === 0 ? (JSON.parse(n.slice(PREFIX.length)) || {}) : {};
      } catch (e) { return {}; }
    };
    const write = o => { try { window.name = PREFIX + JSON.stringify(o); } catch (e) { /* ignore */ } };
    return {
      getItem: k => { const o = read(); return Object.prototype.hasOwnProperty.call(o, k) ? o[k] : null; },
      setItem: (k, v) => { const o = read(); o[k] = String(v); write(o); },
      removeItem: k => { const o = read(); delete o[k]; write(o); }
    };
  }

  let kind = 'name';
  let backend = null;
  try { if (window.localStorage && works(window.localStorage)) { kind = 'local'; backend = window.localStorage; } } catch (e) { /* blocked */ }
  if (!backend) {
    try { if (window.sessionStorage && works(window.sessionStorage)) { kind = 'session'; backend = window.sessionStorage; } } catch (e) { /* blocked */ }
  }
  if (!backend) backend = nameStore();

  return {
    kind,
    persistent: kind === 'local',   // false = data only lasts while this tab stays open
    get(key) { try { return backend.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { backend.setItem(key, value); } catch (e) { /* ignore */ } },
    remove(key) { try { backend.removeItem(key); } catch (e) { /* ignore */ } }
  };
})();
/* Simple client-side auth for a demo / offline app.
   Accounts live in this browser only (via Store, see store.js).
   For a real product, replace with a server-side backend. */
const Auth = (() => {
  const USERS_KEY = 'fl_users';
  const SESSION_KEY = 'fl_session';

  const getUsers = () => {
    try { return JSON.parse(Store.get(USERS_KEY)) || {}; }
    catch (e) { return {}; }
  };
  const setUsers = u => Store.set(USERS_KEY, JSON.stringify(u));

  async function hash(text) {
    try {
      if (window.crypto && crypto.subtle) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('aral-tayo:' + text));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (_) { /* fall through */ }
    // Fallback (non-secure contexts): simple string hash
    let h = 5381;
    for (const c of 'aral-tayo:' + text) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
    return 'fb' + h.toString(16);
  }

  async function register({ name, username, country, password }) {
    name = (name || '').trim();
    username = (username || '').trim().toLowerCase();
    if (!name) return { ok: false, error: 'Please enter your name.' };
    if (!/^[a-z0-9_]{3,20}$/.test(username))
      return { ok: false, error: 'Username must be 3–20 letters, numbers or underscores.' };
    if (!password || password.length < 6)
      return { ok: false, error: 'Password must be at least 6 characters.' };
    const users = getUsers();
    if (users[username]) return { ok: false, error: 'That username is already taken.' };
    users[username] = {
      username, name, country: (country || '').trim(),
      passHash: await hash(password), created: Date.now()
    };
    setUsers(users);
    Store.set(SESSION_KEY, username);
    return { ok: true };
  }

  async function login(username, password) {
    username = (username || '').trim().toLowerCase();
    const users = getUsers();
    const u = users[username];
    if (!u || u.passHash !== await hash(password || ''))
      return { ok: false, error: 'Incorrect username or password.' };
    Store.set(SESSION_KEY, username);
    return { ok: true };
  }

  async function ensureDemo() {
    const users = getUsers();
    if (!users.demo) {
      users.demo = { username: 'demo', name: 'Demo Learner', country: '', passHash: await hash('demo123'), created: Date.now() };
      setUsers(users);
    }
  }

  function currentUser() {
    const name = Store.get(SESSION_KEY);
    if (!name) return null;
    return getUsers()[name] || null;
  }

  function requireAuth() {
    const u = currentUser();
    if (!u) { location.replace('index.html'); return null; }
    return u;
  }

  function logout() {
    Store.remove(SESSION_KEY);
    location.replace('index.html');
  }

  return { register, login, logout, currentUser, requireAuth, ensureDemo };
})();
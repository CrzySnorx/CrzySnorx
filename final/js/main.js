/* ===========================
   GLOBAL STATE & NOTIFICATIONS
=========================== */
let notifications = [
  "New livestock registered",
  "Hauling schedule updated",
  "New earnings recorded",
  "User account created",
];

function renderNotifications() {
  const bellDropdown = document.querySelector(".notification .dropdown");
  if (!bellDropdown) return;

  bellDropdown.innerHTML = "";
  notifications.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = item;
    bellDropdown.appendChild(p);
  });
}

function addNotification(msg) {
  notifications.unshift(msg);
  renderNotifications();
}

/* ===========================
   DARK MODE & CLOCK
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("darkModeBtn");

  if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("dark");
  }

  darkBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkmode", document.body.classList.contains("dark"));
  });

  // Sidebar Toggle
  document.getElementById("menuBtn")?.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("show");
  });

  // Real-time Clock
  function updateClock() {
    const clockEl = document.getElementById("clock");
    const todayEl = document.getElementById("today");
    const now = new Date();

    if (clockEl) clockEl.textContent = now.toLocaleTimeString();
    if (todayEl) todayEl.textContent = now.toDateString();
  }

  setInterval(updateClock, 1000);
  updateClock();
  renderNotifications();
});
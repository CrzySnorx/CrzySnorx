document.addEventListener("DOMContentLoaded", () => {
  const dateTimeDisplay = document.getElementById("dateTimeDisplay");
  const darkModeBtn = document.getElementById("darkModeBtn");

  function updateDateTime() {
    const now = new Date();

    const timePH = new Intl.DateTimeFormat("en-PH", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    const datePH = new Intl.DateTimeFormat("en-PH", {
      timeZone: "Asia/Manila",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(now);

    dateTimeDisplay.innerHTML = `
      <p class="time-text">${timePH}</p>
      <p class="date-text">${datePH}</p>
    `;
  }

  // Initial call and update every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Dark Mode Toggle
  function applyDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }

  // Load saved preference
  if (localStorage.getItem("darkMode") === "true") {
    applyDarkMode(true);
  }

  darkModeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    applyDarkMode(!isDark);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dateTimeDisplay = document.getElementById("dateTimeDisplay");

  // Function to update time based on Philippine Standard Time
  function updateDateTime() {
    const now = new Date();

    // Format time and date using Asia/Manila timezone
    const timePH = now.toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    const datePH = now.toLocaleDateString("en-PH", {
      timeZone: "Asia/Manila",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    // Display formatted date and time
    dateTimeDisplay.innerHTML = `
      <p style="font-size:1.8rem;font-weight:700;color:#1e3a8a;">${timePH}</p>
      <p style="font-size:1rem;color:#333;">${datePH}</p>
    `;
  }

  // Initial call and update every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Dark Mode Toggle
  const darkModeBtn = document.getElementById("darkModeBtn");
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Inject dark mode styles dynamically
  const style = document.createElement("style");
  style.innerHTML = `
    .dark-mode {
      background-color: #0f172a;
      color: #e2e8f0;
    }
    .dark-mode .sidebar {
      background-color: #0f172a;
    }
    .dark-mode .settings-section,
    .dark-mode .profile-section {
      background-color: #1e293b;
      color: #e2e8f0;
    }
    .dark-mode .primary-btn,
    .dark-mode .export-btn {
      background-color: #3b82f6;
      color: #fff;
    }
  `;
  document.head.appendChild(style);
});

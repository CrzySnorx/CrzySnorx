// 🕒 Real-time Clock
function updateClock() {
  const now = new Date();
  const dateElement = document.querySelector(".date");
  const timeElement = document.querySelector(".time");

  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', optionsDate);

  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  timeElement.textContent = now.toLocaleTimeString('en-US', optionsTime);
}
setInterval(updateClock, 1000);
updateClock();

// 📡 GPS Signal Simulation
function updateGPS() {
  const gpsElement = document.querySelector(".gps-status span");
  const signals = ["Weak", "Moderate", "Strong"];
  const colors = ["#ef4444", "#f59e0b", "#10b981"];
  const randomIndex = Math.floor(Math.random() * signals.length);

  gpsElement.textContent = signals[randomIndex];
  gpsElement.className = "signal " + signals[randomIndex].toLowerCase();
  gpsElement.style.color = colors[randomIndex];
}
setInterval(updateGPS, 5000);

// 📊 Summary Auto-Update Simulation
function updateSummary() {
  const completed = document.querySelector(".card.completed p");
  const inTransit = document.querySelector(".card.in-transit p");
  const capacity = document.querySelector(".card.capacity p");

  // Example simulation values (replace with real data later)
  const tripsCompleted = Math.floor(Math.random() * 5);   // 0–4
  const tripsInTransit = Math.floor(Math.random() * 3);   // 0–2
  const cargoCapacity = Math.floor(Math.random() * 100);  // 0–99%

  completed.textContent = tripsCompleted;
  inTransit.textContent = tripsInTransit;
  capacity.textContent = cargoCapacity + "%";
}
setInterval(updateSummary, 7000);
updateSummary();

// 📱 Sidebar Toggle (Visible on All Screens)
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "☰ Menu";
toggleBtn.classList.add("toggle-sidebar");
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  sidebar.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
});

// 🧭 Trip Action Buttons
document.querySelector(".btn.start").addEventListener("click", () => {
  alert("Starting navigation... 🚚");
});

document.querySelector(".btn.view").addEventListener("click", () => {
  alert("Opening Waybill / Permit...");
});

document.querySelector(".btn.report").addEventListener("click", () => {
  const issue = prompt("Describe the issue:");
  if (issue) {
    alert("Issue reported: " + issue);
  }
});

// 🔐 Sign Out Confirmation
document.querySelector(".signout-btn").addEventListener("click", () => {
  const confirmSignout = confirm("Are you sure you want to sign out?");
  if (confirmSignout) {
    alert("Signed out successfully.");
    window.location.reload();
  }
});

// 🌙 Fade-in Animation Trigger
window.addEventListener("load", () => {
  document.querySelectorAll(".header, .trip-info, .live-route, .summary").forEach(section => {
    section.style.opacity = "1";
  });
});

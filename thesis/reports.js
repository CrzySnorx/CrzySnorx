// Sample data (puwede mong palitan ng real data mula sa backend/localStorage)
const reportsData = {
  users: 25,
  livestock: 523,
  hauling: 12,
  yards: 4,
  earnings: [12000, 15000, 18000, 20000, 17000, 22000, 25000, 23000, 24000, 26000, 28000, 30000],
  health: { healthy: 480, sick: 30, quarantined: 13 }
};

function updateSummary() {
  document.getElementById("totalUsers").textContent = reportsData.users;
  document.getElementById("usersChange").textContent = "↑ +5% this month";

  document.getElementById("totalLivestock").textContent = reportsData.livestock;
  document.getElementById("livestockChange").textContent = "↑ +3% this month";

  document.getElementById("totalHauling").textContent = reportsData.hauling;
  document.getElementById("haulingChange").textContent = "— Stable";

  document.getElementById("totalYards").textContent = reportsData.yards;
  document.getElementById("yardsStatus").textContent = "✓ All operational";
}

function renderCharts() {
  const ctxEarnings = document.getElementById("earningsChart").getContext("2d");
  new Chart(ctxEarnings, {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: "Earnings (₱)",
        data: reportsData.earnings,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Monthly Earnings Trend" }
      }
    }
  });

  const ctxHealth = document.getElementById("healthChart").getContext("2d");
  new Chart(ctxHealth, {
    type: "doughnut",
    data: {
      labels: ["Healthy", "Sick", "Quarantined"],
      datasets: [{
        data: [reportsData.health.healthy, reportsData.health.sick, reportsData.health.quarantined],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Livestock Health Status" }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateSummary();
  renderCharts();

  // 🖨 Print report
  document.getElementById("printBtn")?.addEventListener("click", () => {
    window.print();
  });
});

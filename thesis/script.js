let yardChart;

function initDashboard() {
  function counter(id, target, prefix = "", suffix = "") {
    const element = document.getElementById(id);
    if (!element) return;

    let value = 0;
    const speed = target / 60;
    const update = () => {
      value += speed;
      if (value < target) {
        element.textContent = `${prefix}${Math.floor(value)}${suffix}`;
        requestAnimationFrame(update);
      } else {
        element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    };
    update();
  }

  // Load livestock data from localStorage
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  const totalLivestock = livestock.length;
  const yardCapacity = 600;
  const haulingCount = 0;
  const earnings = 0;

  // Compute occupancy
  const occupancy = yardCapacity === 0 ? 0 : (totalLivestock / yardCapacity) * 100;
  const available = 100 - occupancy;

  // Update cards
  counter("livestockCount", totalLivestock);
  counter("occupancy", Math.round(occupancy), "", "%");
  counter("haulingCount", haulingCount);
  counter("earnings", earnings, "₱");

  // Chart.js setup
  const ctx = document.getElementById("yardChart");
  if (ctx) {
    yardChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Occupied", "Available"],
        datasets: [{
          data: [occupancy, available],
          backgroundColor: ["#2563eb", "#d1d5db"],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: `Yard Occupancy: ${Math.round(occupancy)}%` }
        }
      }
    });
  }
}

// Function to refresh dashboard when livestock changes
function updateDashboardGraph() {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  const yardCapacity = 600;
  const occupancy = yardCapacity === 0 ? 0 : (livestock.length / yardCapacity) * 100;
  const available = 100 - occupancy;

  if (yardChart) {
    yardChart.data.datasets[0].data = [occupancy, available];
    yardChart.options.plugins.title.text = `Yard Occupancy: ${Math.round(occupancy)}%`;
    yardChart.update();
  }

  // Update cards again
  counter("livestockCount", livestock.length);
  counter("occupancy", Math.round(occupancy), "", "%");
}

document.addEventListener("DOMContentLoaded", initDashboard);

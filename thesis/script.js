// dashboard.js
// Dashboard behavior: Chart.js raw chickens pie graph, hauling schedule, hauling status summary updates

function qs(selector) { return document.querySelector(selector); }

// Elements
const rawChickenEl = qs('#rawChickenCount');
const occupancyEl = qs('#occupancy');
const haulingEl = qs('#haulingCount');
const earningsEl = qs('#earnings');
const scheduleBody = qs('#scheduleBody');

// Hauling status cards
const scheduledEl = qs('#todayScheduled');
const inTransitEl = qs('#todayInTransit');
const completedEl = qs('#todayCompleted');
const cancelledEl = qs('#todayCancelled');

// Spinner overlay setup
const spinnerOverlay = document.createElement('div');
spinnerOverlay.className = 'spinner-overlay';
spinnerOverlay.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(spinnerOverlay);

// Chart.js setup for Raw Chickens Overview (Pie Graph)
let rawChart;
function initRawChart() {
  const ctx = document.getElementById('rawChart').getContext('2d');
  rawChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Fresh / Good', 'In Storage', 'Ready for Delivery'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#2e7d32', '#1565c0', '#f9a825'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Raw Chickens Overview' }
      }
    }
  });
}

// ✅ Inventory sync for pie graph
function renderSummary(livestock) {
  if (!Array.isArray(livestock)) return;

  const totalRaw = livestock.length;
  rawChickenEl.textContent = totalRaw > 0 ? totalRaw : '';

  const fresh = livestock.filter(c => c.status === "Fresh / Good").length;
  const storage = livestock.filter(c => c.status === "In Storage").length;
  const delivery = livestock.filter(c => c.status === "Ready for Delivery").length;

  if (rawChart) {
    rawChart.data.datasets[0].data = [fresh, storage, delivery];
    rawChart.update();
  }

  // Optional occupancy calculation
  const yardCapacity = 600; // adjust kung dynamic
  const occupancy = yardCapacity > 0 ? Math.round((totalRaw / yardCapacity) * 100) : 0;
  occupancyEl.textContent = totalRaw > 0 ? occupancy + "%" : '';
}

// ✅ Hauling status rendering
function renderHaulingStatus(trips) {
  if (!Array.isArray(trips)) return;

  const today = new Date().toLocaleDateString();
  const todayTrips = trips.filter(t => new Date(t.dateTime).toLocaleDateString() === today);

  const scheduled = todayTrips.filter(t => t.status === "Scheduled").length;
  const inTransit = todayTrips.filter(t => t.status === "In-Transit").length;
  const completed = todayTrips.filter(t => t.status === "Completed").length;
  const cancelled = todayTrips.filter(t => t.status === "Cancelled").length;

  scheduledEl.textContent = scheduled > 0 ? scheduled : '';
  inTransitEl.textContent = inTransit > 0 ? inTransit : '';
  completedEl.textContent = completed > 0 ? completed : '';
  cancelledEl.textContent = cancelled > 0 ? cancelled : '';

  haulingEl.textContent = todayTrips.length > 0 ? todayTrips.length : '';
}

// ✅ Hauling schedule rendering
function renderSchedule(rows) {
  scheduleBody.innerHTML = '';
  if (!rows || rows.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', '4');
    td.textContent = 'No hauling schedule available';
    tr.appendChild(td);
    scheduleBody.appendChild(tr);
    return;
  }
  rows.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.truck ?? '-'}</td>
      <td>${item.destination ?? '-'}</td>
      <td>${item.time ?? '-'}</td>
      <td>${item.status ?? '-'}</td>
    `;
    scheduleBody.appendChild(tr);
  });
}

// ✅ Main update flow
function updateDashboardGraph() {
  try {
    spinnerOverlay.classList.add('active');

    // Inventory sync
    const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
    renderSummary(livestock);

    // Hauling sync
    const hauling = JSON.parse(localStorage.getItem("hauling")) || [];

    if (!hauling.length) {
      haulingEl.textContent = '';
      scheduledEl.textContent = '';
      inTransitEl.textContent = '';
      completedEl.textContent = '';
      cancelledEl.textContent = '';
      scheduleBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No hauling schedule available</td></tr>`;
      spinnerOverlay.classList.remove('active');
      return;
    }

    renderHaulingStatus(hauling);
    renderSchedule(hauling);
  } catch (err) {
    console.error('Failed to update dashboard', err);
  } finally {
    setTimeout(() => spinnerOverlay.classList.remove('active'), 500);
  }
}

// ✅ Initialize with login check
document.addEventListener('DOMContentLoaded', () => {
  initRawChart();
  updateDashboardGraph();
  setInterval(updateDashboardGraph, 60000); // auto-refresh every 60s
});

// Auto-refresh when hauling or inventory data changes
window.addEventListener("storage", (event) => {
  if (event.key === "hauling" || event.key === "livestock") {
    updateDashboardGraph();
  }
});

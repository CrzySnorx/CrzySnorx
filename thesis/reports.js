// ====== MONTHLY EARNINGS CHART ======
const earningsCtx = document.getElementById('earningsChart').getContext('2d');
new Chart(earningsCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  }
});

// ====== RAW CHICKEN DELIVERY CHART ======
const deliveryCtx = document.getElementById('deliveryChart').getContext('2d');
new Chart(deliveryCtx, {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }
});

// ====== FIXED TOTAL YARDS ======
// Note: Total Yards is set directly in HTML as "3"
// No JS logic needed since it's static and not dynamic

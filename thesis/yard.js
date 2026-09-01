// yard.js
// Sync yard data with inventory batches and update graphs dynamically

let yards = JSON.parse(localStorage.getItem("yards")) || [];

// ✅ Render yard table and graphs
function renderYardTable() {
  const tableBody = document.querySelector("#yardTable tbody");
  tableBody.innerHTML = "";

  yards.forEach((yard, index) => {
    const occupancyRate = yard.capacity > 0
      ? ((yard.occupied / yard.capacity) * 100).toFixed(1) + "%"
      : "0%";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${yard.name}</td>
      <td>${yard.capacity}</td>
      <td>${yard.occupied}</td>
      <td>${occupancyRate}</td>
      <td>${yard.supervisor}</td>
      <td><span class="status-tag ${yard.status.toLowerCase()}">${yard.status}</span></td>
      <td>${yard.stock.map(b => b.batchNo).join(", ") || "Empty"}</td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  updateYardGraph(yards);
}

// ✅ Update summary cards
function updateSummary() {
  document.getElementById("totalYards").textContent = yards.length;
  document.getElementById("totalCapacity").textContent = yards.reduce((sum, y) => sum + y.capacity, 0);
  document.getElementById("totalOccupied").textContent = yards.reduce((sum, y) => sum + y.occupied, 0);
  document.getElementById("dispatchReady").textContent = yards.filter(y => y.status === "Dispatch Ready").length;
}

// ✅ Update Chart.js graphs and yard cards
function updateYardGraph(yards) {
  yards.forEach((yard, index) => {
    const chartId = `yard${String.fromCharCode(65 + index)}Chart`; // yardAChart, yardBChart, yardCChart
    const ctx = document.getElementById(chartId);

    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Occupied", "Available"],
          datasets: [{
            data: [yard.occupied, yard.capacity - yard.occupied],
            backgroundColor: ["#1565c0", "#d1d5db"],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: `${yard.name} Capacity` }
          }
        }
      });
    }

    // Update stock and status text
    const stockEl = document.getElementById(`yard${String.fromCharCode(65 + index)}Stock`);
    const statusEl = document.getElementById(`yard${String.fromCharCode(65 + index)}Status`);
    if (stockEl) stockEl.textContent = yard.stock.length;
    if (statusEl) statusEl.textContent = yard.status;
  });
}

// ✅ Sync yard data from inventory
function syncYardData() {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  const yardNames = ["Yard A", "Yard B", "Yard C"];

  yards = yardNames.map(name => {
    const batches = livestock.filter(b => b.yard === name);
    const capacity = 10; // default capacity per yard
    const occupied = batches.length;
    const status = occupied < capacity ? "Available" : "Full";
    const supervisor = batches[0]?.supervisor || "N/A";

    return {
      name,
      capacity,
      occupied,
      supervisor,
      status,
      stock: batches
    };
  });

  localStorage.setItem("yards", JSON.stringify(yards));
  renderYardTable();
}

// ✅ Listen for inventory updates
window.addEventListener("storage", (event) => {
  if (event.key === "livestock" || event.key === "yards") {
    syncYardData();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  syncYardData();
});

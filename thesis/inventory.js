// inventory.js
// Manage chicken batches and sync with dashboard + yard operations

function addChickenBatch(batch) {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  livestock.push(batch);
  localStorage.setItem("livestock", JSON.stringify(livestock));

  renderInventoryTable(livestock);
  updateYardCapacity(batch.yard, batch);

  // Notify dashboard graph if function exists
  if (typeof updateDashboardGraph === "function") {
    updateDashboardGraph();
  }

  // Trigger storage event for dashboard and yard auto-refresh
  window.dispatchEvent(new Event("storage"));
}

function renderInventoryTable(livestock) {
  const tableBody = document.querySelector("#chickenTable tbody");
  tableBody.innerHTML = "";

  livestock.forEach((chicken, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${chicken.batchNo}</td>
      <td>${chicken.type}</td>
      <td>${chicken.weight}</td>
      <td><span class="status-tag ${chicken.statusClass}">${chicken.status}</span></td>
      <td>${chicken.date}</td>
      <td>${chicken.yard}</td>
      <td>${chicken.supervisor}</td>
      <td><button class="delete-btn" onclick="deleteChicken(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Update summary cards
  document.getElementById("totalChickenCount").textContent = livestock.length;
  document.getElementById("freshCount").textContent = livestock.filter(c => c.status === "Fresh / Good").length;
  document.getElementById("storageCount").textContent = livestock.filter(c => c.status === "In Storage").length;
  document.getElementById("deliveryCount").textContent = livestock.filter(c => c.status === "Ready for Delivery").length;
}

function deleteChicken(index) {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  const removed = livestock.splice(index, 1)[0];
  localStorage.setItem("livestock", JSON.stringify(livestock));
  renderInventoryTable(livestock);

  // Update yard capacity after deletion
  if (removed) {
    removeFromYard(removed.yard, removed.batchNo);
  }

  if (typeof updateDashboardGraph === "function") {
    updateDashboardGraph();
  }

  window.dispatchEvent(new Event("storage"));
}

// Yard capacity management
function updateYardCapacity(yardName, batch) {
  const yards = JSON.parse(localStorage.getItem("yards")) || [];
  let yard = yards.find(y => y.name === yardName);

  if (!yard) {
    yard = { 
      name: yardName, 
      capacity: 10, 
      occupied: 0, 
      supervisor: batch.supervisor, 
      status: "Available", 
      stock: [] 
    };
    yards.push(yard);
  }

  yard.stock.push(batch);
  yard.occupied = yard.stock.length;
  yard.status = yard.occupied < yard.capacity ? "Available" : "Full";

  localStorage.setItem("yards", JSON.stringify(yards));
}

function removeFromYard(yardName, batchNo) {
  const yards = JSON.parse(localStorage.getItem("yards")) || [];
  const yard = yards.find(y => y.name === yardName);
  if (yard) {
    yard.stock = yard.stock.filter(b => b.batchNo !== batchNo);
    yard.occupied = yard.stock.length;
    yard.status = yard.occupied < yard.capacity ? "Available" : "Full";
  }
  localStorage.setItem("yards", JSON.stringify(yards));
}

// Cross-tab sync
window.addEventListener("storage", (event) => {
  if (event.key === "livestock") {
    const updatedLivestock = JSON.parse(localStorage.getItem("livestock")) || [];
    renderInventoryTable(updatedLivestock);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  renderInventoryTable(livestock);

  const form = document.getElementById("addChickenForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newBatch = {
        batchNo: document.getElementById("batchNo").value || "CH-" + String(livestock.length + 1).padStart(3, "0"),
        type: document.getElementById("type").value,
        weight: Number(document.getElementById("weight").value),
        status: document.getElementById("status").value,
        statusClass: getStatusClass(document.getElementById("status").value),
        date: document.getElementById("processingDate").value,
        yard: document.getElementById("yard").value,
        supervisor: document.getElementById("supervisor").value
      };

      addChickenBatch(newBatch);
      document.getElementById("addChickenModal").style.display = "none";
      form.reset();
    });
  }
});

// Helper: assign CSS class based on status
function getStatusClass(status) {
  if (status === "Fresh / Good") return "healthy";
  if (status === "In Storage") return "warning";
  if (status === "Ready for Delivery") return "danger";
  return "";
}

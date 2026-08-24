function addChickenBatch(batch) {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  livestock.push(batch);
  localStorage.setItem("livestock", JSON.stringify(livestock));

  renderInventoryTable(livestock);

  // If dashboard is open in another tab, refresh when revisited
  if (typeof updateDashboardGraph === "function") {
    updateDashboardGraph();
  }
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
  livestock.splice(index, 1);
  localStorage.setItem("livestock", JSON.stringify(livestock));
  renderInventoryTable(livestock);

  if (typeof updateDashboardGraph === "function") {
    updateDashboardGraph();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
  renderInventoryTable(livestock);

  document.getElementById("addChickenBtn").addEventListener("click", () => {
    const newBatch = {
      batchNo: "CH-" + String(livestock.length + 1).padStart(3, "0"),
      type: "Broiler",
      weight: (Math.random() * 2 + 1).toFixed(2),
      status: "Fresh / Good",
      statusClass: "healthy",
      date: new Date().toISOString().split("T")[0]
    };
    addChickenBatch(newBatch);
  });
});

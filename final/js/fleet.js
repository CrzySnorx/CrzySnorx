let fleetData = JSON.parse(localStorage.getItem("fleet")) || [
  { id: 1, plateNo: "ABC-1234", type: "10-Wheeler Truck", capacity: "20 Heads", driver: "Juan Cruz", lastService: "2026-07-15", status: "Active" },
  { id: 2, plateNo: "XYZ-5678", type: "Trailer Truck", capacity: "35 Heads", driver: "Pedro Santos", lastService: "2026-06-20", status: "Maintenance" },
  { id: 3, plateNo: "NVH-9101", type: "6-Wheeler Truck", capacity: "12 Heads", driver: "Mario Reyes", lastService: "2026-07-28", status: "Active" }
];

function initFleetPage() {
  renderFleetCards();
  renderFleetTable(fleetData);
  setupFleetEventListeners();
}

function renderFleetCards() {
  const total = fleetData.length;
  const active = fleetData.filter(v => v.status === "Active").length;
  const maintenance = fleetData.filter(v => v.status === "Maintenance").length;

  const totalEl = document.getElementById("totalFleet");
  const activeEl = document.getElementById("activeFleet");
  const maintEl = document.getElementById("maintenanceFleet");

  if (totalEl) totalEl.innerText = total;
  if (activeEl) activeEl.innerText = active;
  if (maintEl) maintEl.innerText = maintenance;
}

function renderFleetTable(data) {
  const tbody = document.querySelector("#fleetTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No vehicles found.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const badgeClass = item.status === "Active" ? "badge-success" : item.status === "Maintenance" ? "badge-warning" : "badge-danger";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.plateNo}</strong></td>
      <td>${item.type}</td>
      <td>${item.capacity}</td>
      <td>${item.driver}</td>
      <td>${item.lastService}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
      <td class="actions-cell">
        <button class="btn-icon edit-btn" onclick="editVehicle(${item.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-icon delete-btn" onclick="deleteVehicle(${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  localStorage.setItem("fleet", JSON.stringify(fleetData));
}

function setupFleetEventListeners() {
  const searchInput = document.getElementById("searchFleet");
  const filterSelect = document.getElementById("filterFleetStatus");
  const addBtn = document.getElementById("addVehicleBtn");

  if (searchInput) {
    searchInput.addEventListener("input", filterFleetData);
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", filterFleetData);
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      alert("Modal / Form for adding a vehicle will open here.");
    });
  }
}

function filterFleetData() {
  const query = document.getElementById("searchFleet")?.value.toLowerCase() || "";
  const status = document.getElementById("filterFleetStatus")?.value || "";

  const filtered = fleetData.filter(v => {
    const matchesQuery = v.plateNo.toLowerCase().includes(query) ||
                         v.type.toLowerCase().includes(query) ||
                         v.driver.toLowerCase().includes(query);
    const matchesStatus = status === "" || v.status === status;
    return matchesQuery && matchesStatus;
  });

  renderFleetTable(filtered);
}

function editVehicle(id) {
  alert(`Editing Vehicle ID: ${id}`);
}

function deleteVehicle(id) {
  if (confirm("Are you sure you want to remove this vehicle?")) {
    fleetData = fleetData.filter(v => v.id !== id);
    renderFleetCards();
    filterFleetData();
  }
}

// 🔄 Sync function from hauling
function syncFleetFromHauling(newHaul) {
  const truck = fleetData.find(f => f.driver === newHaul.driver);
  if (truck) {
    truck.status = "In-Transit";
    localStorage.setItem("fleet", JSON.stringify(fleetData));
  }
}

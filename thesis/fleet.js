// ====== INITIALIZE ======
let fleet = JSON.parse(localStorage.getItem("fleet")) || [];

// ====== RENDER TABLE ======
function renderFleetTable() {
  const tableBody = document.querySelector("#fleetTable tbody");
  tableBody.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  fleet.forEach((vehicle, index) => {
    // Auto-update expired status
    if (vehicle.registrationExpiry && vehicle.registrationExpiry < today) {
      vehicle.status = "Expired";
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${vehicle.plateNumber}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.capacity}</td>
      <td>${vehicle.driver}</td>
      <td>${vehicle.serviceDate || "-"}</td>
      <td>${vehicle.registrationExpiry || "-"}</td>
      <td><span class="status-tag ${vehicle.status.toLowerCase()}">${vehicle.status}</span></td>
      <td>
        <button class="action-btn edit" onclick="editVehicle(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteVehicle(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  localStorage.setItem("fleet", JSON.stringify(fleet));
}

// ====== UPDATE SUMMARY CARDS ======
function updateSummary() {
  document.getElementById("totalVehicles").textContent = fleet.length;
  document.getElementById("activeVehicles").textContent = fleet.filter(v => v.status === "Active").length;
  document.getElementById("maintenanceVehicles").textContent = fleet.filter(v => v.status === "Maintenance").length;
  document.getElementById("expiredVehicles").textContent = fleet.filter(v => v.status === "Expired").length;
}

// ====== DELETE VEHICLE ======
function deleteVehicle(index) {
  if (confirm("Are you sure you want to delete this vehicle?")) {
    fleet.splice(index, 1);
    renderFleetTable();
  }
}

// ====== EDIT VEHICLE ======
function editVehicle(index) {
  const vehicle = fleet[index];
  document.getElementById("vehicleId").value = index;
  document.getElementById("plateNumber").value = vehicle.plateNumber;
  document.getElementById("vehicleType").value = vehicle.type;
  document.getElementById("capacity").value = vehicle.capacity;
  document.getElementById("driver").value = vehicle.driver;
  document.getElementById("serviceDate").value = vehicle.serviceDate;
  document.getElementById("registrationExpiry").value = vehicle.registrationExpiry;
  document.getElementById("status").value = vehicle.status;

  document.getElementById("fleetModal").style.display = "flex";
}

// ====== DOM READY ======
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("fleetModal");
  const form = document.getElementById("fleetForm");

  // Ensure modal is hidden on load
  modal.style.display = "none";

  renderFleetTable();

  // 🟢 OPEN MODAL
  document.getElementById("addVehicleBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("vehicleId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 CLOSE MODAL
  document.getElementById("closeFleet").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 SAVE VEHICLE
  document.getElementById("saveVehicle").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("vehicleId").value;
    const plateNumber = document.getElementById("plateNumber").value.trim();
    const type = document.getElementById("vehicleType").value.trim();
    const capacity = Number(document.getElementById("capacity").value) || 0;
    const driver = document.getElementById("driver").value.trim();
    const serviceDate = document.getElementById("serviceDate").value;
    const registrationExpiry = document.getElementById("registrationExpiry").value;
    const status = document.getElementById("status").value;

    if (!plateNumber || !type) {
      alert("Please fill out required fields: Plate Number and Vehicle Type.");
      return;
    }

    const vehicleData = { plateNumber, type, capacity, driver, serviceDate, registrationExpiry, status };

    if (id) {
      fleet[id] = vehicleData;
    } else {
      fleet.push(vehicleData);
    }

    renderFleetTable();
    modal.style.display = "none";
  });

  // 🔍 SEARCH FILTER
  document.getElementById("searchVehicle").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = fleet.filter(v =>
      v.plateNumber.toLowerCase().includes(query) ||
      v.type.toLowerCase().includes(query) ||
      v.driver.toLowerCase().includes(query)
    );
    renderFilteredTable(filtered);
  });

  // 🔽 STATUS FILTER
  document.getElementById("filterStatus").addEventListener("change", (e) => {
    const status = e.target.value;
    if (status === "all") {
      renderFleetTable();
    } else {
      const filtered = fleet.filter(v => v.status === status);
      renderFilteredTable(filtered);
    }
  });
});

// ====== RENDER FILTERED TABLE ======
function renderFilteredTable(filteredFleet) {
  const tableBody = document.querySelector("#fleetTable tbody");
  tableBody.innerHTML = "";

  filteredFleet.forEach((vehicle, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${vehicle.plateNumber}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.capacity}</td>
      <td>${vehicle.driver}</td>
      <td>${vehicle.serviceDate || "-"}</td>
      <td>${vehicle.registrationExpiry || "-"}</td>
      <td><span class="status-tag ${vehicle.status.toLowerCase()}">${vehicle.status}</span></td>
      <td>
        <button class="action-btn edit" onclick="editVehicle(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteVehicle(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

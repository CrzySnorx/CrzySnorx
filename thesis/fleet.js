let fleet = JSON.parse(localStorage.getItem("fleet")) || [];

function renderFleetTable() {
  const tableBody = document.querySelector("#fleetTable tbody");
  tableBody.innerHTML = "";

  fleet.forEach((vehicle, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${vehicle.plateNumber}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.capacity}</td>
      <td>${vehicle.driver}</td>
      <td>${vehicle.serviceDate}</td>
      <td>${vehicle.registrationExpiry}</td>
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

function updateSummary() {
  document.getElementById("totalVehicles").textContent = fleet.length;
  document.getElementById("activeVehicles").textContent = fleet.filter(v => v.status === "Active").length;
  document.getElementById("maintenanceVehicles").textContent = fleet.filter(v => v.status === "Maintenance").length;

  // 🔴 Expired Registration check
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("expiredVehicles").textContent = fleet.filter(v => v.registrationExpiry && v.registrationExpiry < today).length;
}

function deleteVehicle(index) {
  fleet.splice(index, 1);
  renderFleetTable();
}

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

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("fleetModal");
  const form = document.getElementById("fleetForm");

  renderFleetTable();

  // 🟢 Open modal
  document.getElementById("addVehicleBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("vehicleId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 Close modal
  document.getElementById("closeFleet").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 Save vehicle
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
      alert("Please fill out required fields.");
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
});

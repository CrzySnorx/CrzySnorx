let hauling = JSON.parse(localStorage.getItem("hauling")) || [];

function renderHaulingTable() {
  const tableBody = document.querySelector("#haulingTable tbody");
  tableBody.innerHTML = "";

  hauling.forEach((trip, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${trip.truck}</td>
      <td>${trip.driver}</td>
      <td>${trip.cargo}</td>
      <td>${trip.origin}</td>
      <td>${trip.destination}</td>
      <td>${trip.date} ${trip.time}</td>
      <td><span class="status-tag ${trip.status.toLowerCase().replace(" ", "-")}">${trip.status}</span></td>
      <td>
        <button class="action-btn edit" onclick="editHauling(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteHauling(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  localStorage.setItem("hauling", JSON.stringify(hauling));
}

function updateSummary() {
  document.getElementById("totalTrips").textContent = hauling.length;
  document.getElementById("scheduledTrips").textContent = hauling.filter(t => t.status === "Scheduled").length;
  document.getElementById("inTransitTrips").textContent = hauling.filter(t => t.status === "In-Transit").length;
  document.getElementById("completedTrips").textContent = hauling.filter(t => t.status === "Completed").length;
  document.getElementById("cancelledTrips").textContent = hauling.filter(t => t.status === "Cancelled").length;
}

function deleteHauling(index) {
  hauling.splice(index, 1);
  renderHaulingTable();
}

function editHauling(index) {
  const trip = hauling[index];
  // Example toggle cycle
  if (trip.status === "Scheduled") trip.status = "In-Transit";
  else if (trip.status === "In-Transit") trip.status = "Completed";
  else if (trip.status === "Completed") trip.status = "Cancelled";
  else trip.status = "Scheduled";

  hauling[index] = trip;
  renderHaulingTable();
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("haulingModal");
  const form = document.getElementById("haulingForm");

  renderHaulingTable();

  // 🟢 Open modal
  document.getElementById("addHaulingBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("haulId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 Close modal
  document.getElementById("closeHauling").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 Save hauling record
  document.getElementById("saveHauling").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("haulId").value || Date.now();
    const truck = document.getElementById("truck").value.trim();
    const driver = document.getElementById("driver").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const date = document.getElementById("haulDate").value;
    const time = document.getElementById("haulTime").value;
    const status = document.getElementById("haulStatus").value;

    const plateNo = document.getElementById("plateNo").value.trim();
    const truckType = document.getElementById("truckType").value.trim();
    const earningDescription = document.getElementById("earningDescription").value.trim();
    const earningAmount = Number(document.getElementById("earningAmount").value) || 0;
    const clientName = document.getElementById("clientName").value.trim();
    const clientContact = document.getElementById("clientContact").value.trim();
    const clientAddress = document.getElementById("clientAddress").value.trim();
    const yardName = document.getElementById("yardName").value.trim();
    const yardCapacity = Number(document.getElementById("yardCapacity").value) || 0;

    if (!truck || !driver || !destination || !date || !time) {
      alert("Please fill out all required hauling details.");
      return;
    }

    const itemData = {
      id,
      truck,
      driver,
      cargo: truckType || "Livestock",
      origin: yardName || "Main Yard",
      destination,
      date,
      time,
      status,
      plateNo,
      earningDescription,
      earningAmount,
      clientName,
      clientContact,
      clientAddress,
      yardCapacity
    };

    const existingIndex = hauling.findIndex((x) => x.id == id);
    if (existingIndex !== -1) {
      hauling[existingIndex] = itemData;
    } else {
      hauling.push(itemData);
    }

    renderHaulingTable();
    modal.style.display = "none";
  });
});

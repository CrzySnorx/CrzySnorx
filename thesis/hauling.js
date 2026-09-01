// hauling.js
// Handles hauling data CRUD operations and sync with dashboard

let hauling = JSON.parse(localStorage.getItem("hauling")) || [];

function renderHaulingTable() {
  const tableBody = document.querySelector("#haulingTable tbody");
  tableBody.innerHTML = "";

  if (!hauling.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="9" style="text-align:center;">No hauling schedules found.</td>`;
    tableBody.appendChild(tr);
    updateSummary();
    return;
  }

  hauling.forEach((trip, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${trip.truck}</td>
      <td>${trip.driver}</td>
      <td>${trip.cargo || "—"}</td>
      <td>${trip.origin || "—"}</td>
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
  document.getElementById("totalTrips").textContent = hauling.length || 0;
  document.getElementById("scheduledTrips").textContent = hauling.filter(t => t.status === "Scheduled").length || 0;
  document.getElementById("inTransitTrips").textContent = hauling.filter(t => t.status === "In-Transit").length || 0;
  document.getElementById("completedTrips").textContent = hauling.filter(t => t.status === "Completed").length || 0;
  document.getElementById("cancelledTrips").textContent = hauling.filter(t => t.status === "Cancelled").length || 0;
}

function deleteHauling(index) {
  if (confirm("Delete this hauling schedule?")) {
    hauling.splice(index, 1);
    localStorage.setItem("hauling", JSON.stringify(hauling));
    renderHaulingTable();
    // Trigger dashboard refresh
    window.dispatchEvent(new Event("storage"));
  }
}

function editHauling(index) {
  const trip = hauling[index];
  // Example toggle cycle for demo
  if (trip.status === "Scheduled") trip.status = "In-Transit";
  else if (trip.status === "In-Transit") trip.status = "Completed";
  else if (trip.status === "Completed") trip.status = "Cancelled";
  else trip.status = "Scheduled";

  hauling[index] = trip;
  localStorage.setItem("hauling", JSON.stringify(hauling));
  renderHaulingTable();
  window.dispatchEvent(new Event("storage"));
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
    document.body.style.overflow = "hidden";
  });

  // 🔴 Close modal
  document.getElementById("closeHauling").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // 💾 Save hauling record
  document.getElementById("saveHauling").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("haulId").value || Date.now();
    const truck = document.getElementById("truck").value.trim();
    const driver = document.getElementById("driver").value.trim();
    const cargo = document.getElementById("cargo").value.trim();
    const origin = document.getElementById("origin").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const date = document.getElementById("haulDate").value;
    const time = document.getElementById("haulTime").value;
    const status = document.getElementById("haulStatus").value;

    if (!truck || !driver || !destination || !date || !time) {
      alert("Please fill out all required hauling details.");
      return;
    }

    const itemData = {
      id,
      truck,
      driver,
      cargo,
      origin,
      destination,
      date,
      time,
      status,
      dateTime: `${date}T${time}`
    };

    const existingIndex = hauling.findIndex((x) => x.id == id);
    if (existingIndex !== -1) {
      hauling[existingIndex] = itemData;
    } else {
      hauling.push(itemData);
    }

    localStorage.setItem("hauling", JSON.stringify(hauling));
    renderHaulingTable();
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    window.dispatchEvent(new Event("storage"));
  });
});

let yards = JSON.parse(localStorage.getItem("yards")) || [];

function renderYardTable() {
  const tableBody = document.querySelector("#yardTable tbody");
  tableBody.innerHTML = "";

  yards.forEach((yard, index) => {
    const occupancyRate = yard.capacity > 0 ? ((yard.occupied / yard.capacity) * 100).toFixed(1) + "%" : "0%";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${yard.name}</td>
      <td>${yard.subPens}</td>
      <td>${yard.category}</td>
      <td>${yard.supervisor}</td>
      <td>${yard.capacity}</td>
      <td>${yard.occupied}</td>
      <td>${occupancyRate}</td>
      <td><span class="status-tag ${yard.status.toLowerCase()}">${yard.status}</span></td>
      <td>
        <button class="action-btn edit" onclick="editYard(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteYard(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  localStorage.setItem("yards", JSON.stringify(yards));
}

function updateSummary() {
  document.getElementById("totalYards").textContent = yards.length;
  document.getElementById("totalCapacity").textContent = yards.reduce((sum, y) => sum + y.capacity, 0);
  document.getElementById("totalOccupied").textContent = yards.reduce((sum, y) => sum + y.occupied, 0);
  document.getElementById("criticalYards").textContent = yards.filter(y => y.status === "Critical").length;
}

function deleteYard(index) {
  yards.splice(index, 1);
  renderYardTable();
}

function editYard(index) {
  const yard = yards[index];
  document.getElementById("yardId").value = index;
  document.getElementById("yardName").value = yard.name;
  document.getElementById("subPens").value = yard.subPens;
  document.getElementById("livestockCategory").value = yard.category;
  document.getElementById("supervisor").value = yard.supervisor;
  document.getElementById("capacity").value = yard.capacity;
  document.getElementById("occupied").value = yard.occupied;
  document.getElementById("status").value = yard.status;

  document.getElementById("yardModal").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("yardModal");
  const form = document.getElementById("yardForm");

  renderYardTable();

  // 🟢 Open modal
  document.getElementById("addYardBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("yardId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 Close modal
  document.getElementById("closeYard").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 Save yard
  document.getElementById("saveYard").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("yardId").value;
    const name = document.getElementById("yardName").value.trim();
    const subPens = Number(document.getElementById("subPens").value) || 0;
    const category = document.getElementById("livestockCategory").value.trim();
    const supervisor = document.getElementById("supervisor").value.trim();
    const capacity = Number(document.getElementById("capacity").value) || 0;
    const occupied = Number(document.getElementById("occupied").value) || 0;
    const status = document.getElementById("status").value;

    if (!name || !supervisor) {
      alert("Please fill out required fields.");
      return;
    }

    const yardData = { name, subPens, category, supervisor, capacity, occupied, status };

    if (id) {
      yards[id] = yardData;
    } else {
      yards.push(yardData);
    }

    renderYardTable();
    modal.style.display = "none";
  });
});

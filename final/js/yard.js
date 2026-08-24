let yards = JSON.parse(localStorage.getItem("yards")) || [];

function renderYards() {
  const tableBody = document.querySelector("#yardTable tbody");
  if (!tableBody) return;

  tableBody.innerHTML = yards.map((y) => {
    const percent = y.capacity > 0 ? Math.round((y.occupied / y.capacity) * 100) : 0;
    const color = percent >= 100 ? "danger" : percent >= 80 ? "warning" : "success";
    const status = percent >= 100 ? "Full" : "Available";

    return `
      <tr>
        <td>${y.id}</td>
        <td>${y.name}</td>
        <td>${y.capacity}</td>
        <td>${y.occupied}</td>
        <td><div class="progress-bar ${color}" style="width:${percent}%">${percent}%</div></td>
        <td>${status}</td>
        <td>
          <button class="action-btn edit" data-id="${y.id}">Edit</button>
          <button class="action-btn delete" data-id="${y.id}">Delete</button>
        </td>
      </tr>`;
  }).join("");

  updateSummary();
}

function updateSummary() {
  document.getElementById("totalYardsCount").textContent = yards.length;
  document.getElementById("totalCapacityCount").textContent = yards.reduce((a, y) => a + y.capacity, 0);
  document.getElementById("totalOccupiedCount").textContent = yards.reduce((a, y) => a + y.occupied, 0);
  document.getElementById("criticalYardsCount").textContent = yards.filter(y => (y.occupied / y.capacity) >= 0.8).length;
}

document.getElementById("addYardBtn")?.addEventListener("click", () => {
  const name = prompt("Enter yard name:");
  const capacity = Number(prompt("Enter capacity:"));
  if (!name || isNaN(capacity)) return alert("Please enter valid details.");
  yards.push({ id: Date.now(), name, capacity, occupied: 0 });
  localStorage.setItem("yards", JSON.stringify(yards));
  renderYards();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = Number(e.target.dataset.id);
    yards = yards.filter(y => y.id !== id);
    localStorage.setItem("yards", JSON.stringify(yards));
    renderYards();
  }
});

renderYards();

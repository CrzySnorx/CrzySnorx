let yards = JSON.parse(localStorage.getItem("yards")) || [
  { id: 1, name: "Yard A", capacity: 120, occupied: 80 },
  { id: 2, name: "Yard B", capacity: 100, occupied: 95 },
];

function initYard() {
  const modal = document.getElementById("yardModal");
  const tableBody = document.querySelector("#yardTable tbody");

  function renderYards() {
    if (!tableBody) return;
    tableBody.innerHTML = yards
      .map((y) => {
        const percent = y.capacity > 0 ? Math.round((y.occupied / y.capacity) * 100) : 0;
        let color = percent >= 100 ? "red" : percent >= 80 ? "orange" : "green";

        return `
        <tr>
          <td>${y.id}</td>
          <td>${y.name}</td>
          <td>${y.capacity}</td>
          <td>${y.occupied}</td>
          <td>
            <div class="progress">
              <div class="progress-bar ${color}" style="width:${Math.min(percent, 100)}%">${percent}%</div>
            </div>
          </td>
          <td>${percent >= 100 ? '<span class="status-full">Full</span>' : '<span class="status-open">Available</span>'}</td>
          <td>
            <button class="action-btn edit" data-id="${y.id}">Edit</button>
            <button class="action-btn delete" data-id="${y.id}">Delete</button>
          </td>
        </tr>`;
      })
      .join("");

    localStorage.setItem("yards", JSON.stringify(yards));
  }

  document.getElementById("addYardBtn")?.addEventListener("click", () => {
    document.getElementById("yardId").value = "";
    modal.style.display = "flex";
  });

  document.getElementById("closeYard")?.addEventListener("click", () => (modal.style.display = "none"));

  document.getElementById("saveYard")?.addEventListener("click", () => {
    const id = document.getElementById("yardId").value;
    const name = document.getElementById("yardName").value.trim();
    const capacity = Number(document.getElementById("capacity").value);
    const occupied = Number(document.getElementById("occupied").value) || 0;

    if (!name || isNaN(capacity)) return alert("Valid name and capacity required.");

    const yardData = { id: id ? Number(id) : Date.now(), name, capacity, occupied };

    if (id) {
      const idx = yards.findIndex((x) => x.id == id);
      if (idx !== -1) yards[idx] = yardData;
    } else {
      yards.push(yardData);
    }

    renderYards();
    modal.style.display = "none";
  });

  renderYards();
}
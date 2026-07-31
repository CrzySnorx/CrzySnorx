let hauling = JSON.parse(localStorage.getItem("hauling")) || [
  { id: 1, truck: "Truck-01", driver: "Juan Cruz", destination: "Batangas", date: "2026-08-01", time: "08:00", status: "Pending" },
];

function initHauling() {
  const modal = document.getElementById("haulingModal");
  const tableBody = document.querySelector("#haulingTable tbody");

  function renderHauling() {
    if (!tableBody) return;
    tableBody.innerHTML = hauling
      .map(
        (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.truck}</td>
        <td>${item.driver}</td>
        <td>${item.destination}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td><span class="${item.status.toLowerCase().replace(" ", "")}">${item.status}</span></td>
        <td>
          <button class="action-btn edit" data-id="${item.id}">Edit</button>
          <button class="action-btn delete" data-id="${item.id}">Delete</button>
        </td>
      </tr>`
      )
      .join("");

    localStorage.setItem("hauling", JSON.stringify(hauling));
  }

  document.getElementById("addHaulingBtn")?.addEventListener("click", () => {
    document.getElementById("haulId").value = "";
    modal.style.display = "flex";
  });

  document.getElementById("closeHauling")?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.getElementById("saveHauling")?.addEventListener("click", () => {
    const id = document.getElementById("haulId").value;
    const truck = document.getElementById("truck").value.trim();
    const driver = document.getElementById("driver").value.trim();

    if (!truck || !driver) return alert("Fill required hauling details.");

    const itemData = {
      id: id ? Number(id) : Date.now(),
      truck,
      driver,
      destination: document.getElementById("destination").value,
      date: document.getElementById("haulDate").value,
      time: document.getElementById("haulTime").value,
      status: document.getElementById("haulStatus").value,
    };

    if (id) {
      const idx = hauling.findIndex((x) => x.id == id);
      if (idx !== -1) hauling[idx] = itemData;
    } else {
      hauling.push(itemData);
      addNotification("Hauling schedule updated");
    }

    renderHauling();
    modal.style.display = "none";
  });

  tableBody?.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id && e.target.classList.contains("delete") && confirm("Delete hauling schedule?")) {
      hauling = hauling.filter((x) => x.id != id);
      renderHauling();
    }
  });

  renderHauling();
}
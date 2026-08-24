let hauling = JSON.parse(localStorage.getItem("hauling")) || [];

function initHauling() {
  const modal = document.getElementById("haulingModal");
  const form = document.getElementById("haulingForm");
  const tableBody = document.querySelector("#haulingTable tbody");

  function renderHauling() {
    if (!tableBody) return;
    if (!hauling.length) {
      tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center;">No hauling schedules found.</td></tr>`;
      return;
    }

    tableBody.innerHTML = hauling.map(item => `
      <tr>
        <td>${item.id}</td>
        <td>${item.truck}</td>
        <td>${item.driver}</td>
        <td>${item.cargo || "—"}</td>
        <td>${item.origin || "—"}</td>
        <td>${item.destination}</td>
        <td>${item.date} <br><small>${item.time}</small></td>
        <td><span class="badge ${item.status.toLowerCase().replace(" ", "-")}">${item.status}</span></td>
        <td>
          <button class="action-btn edit" data-id="${item.id}">Edit</button>
          <button class="action-btn delete" data-id="${item.id}">Delete</button>
        </td>
      </tr>`).join("");

    localStorage.setItem("hauling", JSON.stringify(hauling));
  }

  document.getElementById("addHaulingBtn")?.addEventListener("click", () => {
    form.reset();
    document.getElementById("haulId").value = "";
    modal.style.display = "flex";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  document.getElementById("closeHauling")?.addEventListener("click", () => {
    modal.style.display = "none";
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  document.getElementById("saveHauling")?.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("haulId").value;
    const truck = document.getElementById("truck").value.trim();
    const driver = document.getElementById("driver").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const date = document.getElementById("haulDate").value;
    const time = document.getElementById("haulTime").value;
    const status = document.getElementById("haulStatus").value;

    if (!truck || !driver || !destination || !date || !time) {
      alert("Please fill out all required hauling details.");
      return;
    }

    const itemData = {
      id: id ? Number(id) : Date.now(),
      truck,
      driver,
      cargo: document.getElementById("truckType")?.value || "Livestock",
      origin: document.getElementById("yardName")?.value || "",
      destination,
      date,
      time,
      status,
      yardCapacity: Number(document.getElementById("yardCapacity")?.value) || 0,
      plateNo: document.getElementById("plateNo")?.value || truck,
      earningDescription: document.getElementById("earningDescription")?.value || "Hauling Service",
      earningAmount: Number(document.getElementById("earningAmount")?.value) || 0,
      clientName: document.getElementById("clientName")?.value || destination,
      clientContact: document.getElementById("clientContact")?.value || "N/A",
      clientAddress: document.getElementById("clientAddress")?.value || "N/A",
    };

    if (id) {
      const idx = hauling.findIndex((x) => x.id == id);
      if (idx !== -1) hauling[idx] = itemData;
    } else {
      hauling.push(itemData);
      if (typeof syncAllFromHauling === "function") {
        syncAllFromHauling(itemData); // 🔄 sync Fleet, Earnings, Clients
      }
      addNotification("Hauling schedule added successfully!");
    }

    renderHauling();
    modal.style.display = "none";
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
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

function addNotification(msg) {
  console.log(msg);
  alert(msg);
}

document.addEventListener("DOMContentLoaded", initHauling);

let livestock = JSON.parse(localStorage.getItem("livestock")) || [];

function initLivestock() {
  const tableBody = document.querySelector("#livestockTable tbody");
  const addModal = document.getElementById("addChickenModal");

  function renderLivestock() {
    tableBody.innerHTML = livestock
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${item.batchNo}</strong></td>
          <td>${item.type}</td>
          <td>${item.weight} kg</td>
          <td><span class="badge badge-success">${item.status}</span></td>
          <td>${item.processingDate}</td>
          <td><button class="action-btn delete" data-id="${item.id}">Delete</button></td>
        </tr>`
      )
      .join("");

    localStorage.setItem("livestock", JSON.stringify(livestock));
    updateSummary();
  }

  // Open modal
  document.getElementById("addLivestockBtn")?.addEventListener("click", () => {
    addModal.style.display = "flex";
  });

  // Close modal
  document.querySelectorAll(".close-btn, .secondary-btn").forEach(btn => {
    btn.addEventListener("click", () => (addModal.style.display = "none"));
  });

  // Save chicken batch
  document.getElementById("saveChickenBatch")?.addEventListener("click", () => {
    const batchNo = document.getElementById("batchNo").value.trim();
    const type = document.getElementById("chickenType").value;
    const weight = Number(document.getElementById("avgWeight").value);
    const status = document.getElementById("chickenStatus").value;
    const processingDate = document.getElementById("processingDate").value;

    if (!batchNo || !weight || !processingDate) {
      alert("Please fill out all required fields.");
      return;
    }

    const newItem = {
      id: Date.now(),
      batchNo,
      type,
      weight,
      status,
      processingDate,
    };

    livestock.push(newItem);
    renderLivestock();
    addModal.style.display = "none";
    document.querySelectorAll("#addChickenModal input, #addChickenModal select").forEach(el => (el.value = ""));
  });

  // Delete chicken batch
  tableBody?.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("delete")) {
      livestock = livestock.filter((x) => x.id != id);
      renderLivestock();
    }
  });

  renderLivestock();
}

function updateSummary() {
  document.getElementById("totalLivestockCount").textContent = livestock.length;
  document.getElementById("healthyCount").textContent = livestock.filter(l => l.status === "Fresh / Good").length;
  document.getElementById("quarantineCount").textContent = livestock.filter(l => l.status === "In Storage").length;
  document.getElementById("readyHaulingCount").textContent = livestock.filter(l => l.status === "Ready for Delivery").length;
}

window.addEventListener("DOMContentLoaded", initLivestock);

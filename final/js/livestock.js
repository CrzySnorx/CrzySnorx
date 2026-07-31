let livestock = JSON.parse(localStorage.getItem("livestock")) || [
  { id: 1, tag: "C-1001", breed: "Brahman", gender: "Male", weight: 450, status: "Healthy", arrival: "2026-07-25" },
];

function initLivestock() {
  const livestockModal = document.getElementById("livestockModal");
  const tableBody = document.querySelector("#livestockTable tbody");

  function renderLivestock() {
    if (!tableBody) return;
    tableBody.innerHTML = livestock
      .map(
        (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.tag}</td>
        <td>${item.breed}</td>
        <td>${item.gender}</td>
        <td>${item.weight} kg</td>
        <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
        <td>${item.arrival}</td>
        <td>
          <button class="action-btn edit" data-id="${item.id}">Edit</button>
          <button class="action-btn delete" data-id="${item.id}">Delete</button>
        </td>
      </tr>`
      )
      .join("");

    localStorage.setItem("livestock", JSON.stringify(livestock));
  }

  document.getElementById("addLivestockBtn")?.addEventListener("click", () => {
    document.getElementById("livestockId").value = "";
    document.getElementById("tagNo").value = "";
    document.getElementById("breed").value = "";
    livestockModal.style.display = "flex";
  });

  document.getElementById("closeLivestock")?.addEventListener("click", () => {
    livestockModal.style.display = "none";
  });

  document.getElementById("saveLivestock")?.addEventListener("click", () => {
    const id = document.getElementById("livestockId").value;
    const tag = document.getElementById("tagNo").value.trim();
    const breed = document.getElementById("breed").value.trim();

    if (!tag || !breed) return alert("Please complete required fields.");

    const itemData = {
      id: id ? Number(id) : Date.now(),
      tag,
      breed,
      gender: document.getElementById("gender")?.value || "Male",
      weight: Number(document.getElementById("weight").value) || 0,
      status: document.getElementById("status").value,
      arrival: document.getElementById("arrival").value,
    };

    if (id) {
      const idx = livestock.findIndex((x) => x.id == id);
      if (idx !== -1) livestock[idx] = itemData;
    } else {
      livestock.push(itemData);
      addNotification("New livestock registered");
    }

    renderLivestock();
    livestockModal.style.display = "none";
  });

  tableBody?.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("delete") && confirm("Delete livestock entry?")) {
      livestock = livestock.filter((x) => x.id != id);
      renderLivestock();
    }
  });

  renderLivestock();
}
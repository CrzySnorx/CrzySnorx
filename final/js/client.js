let clientsData = JSON.parse(localStorage.getItem("clients")) || [
  { id: "CLI-001", name: "Batangas Livestock Co.", contact: "0917-123-4567", address: "Lipa City, Batangas", txCount: 15, status: "Active" },
  { id: "CLI-002", name: "Reyes Farms", contact: "0918-987-6543", address: "Tanauan, Batangas", txCount: 8, status: "Active" },
  { id: "CLI-003", name: "San Jose Traders", contact: "0922-333-4444", address: "San Jose, Batangas", txCount: 3, status: "Inactive" }
];

function initClientsPage() {
  renderClientsCards();
  renderClientsTable(clientsData);
  setupClientsEventListeners();
}

function renderClientsCards() {
  const total = clientsData.length;
  const active = clientsData.filter(c => c.status === "Active").length;

  const totalEl = document.getElementById("totalClients");
  const activeEl = document.getElementById("activeClients");
  const pendingEl = document.getElementById("clientPendingPayments");

  if (totalEl) totalEl.innerText = total;
  if (activeEl) activeEl.innerText = active;
  if (pendingEl) pendingEl.innerText = "₱45,000.00"; // Example static/calculated balance
}

function renderClientsTable(data) {
  const tbody = document.querySelector("#clientsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No clients found.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const badgeClass = item.status === "Active" ? "badge-success" : "badge-danger";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>${item.name}</td>
      <td>${item.contact}</td>
      <td>${item.address}</td>
      <td>${item.txCount} Trans.</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
      <td class="actions-cell">
        <button class="btn-icon view-btn" onclick="viewClientHistory('${item.id}')" title="View History"><i class="fa-solid fa-eye"></i></button>
        <button class="btn-icon edit-btn" onclick="editClient('${item.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  localStorage.setItem("clients", JSON.stringify(clientsData));
}

function setupClientsEventListeners() {
  const searchInput = document.getElementById("searchClients");
  const addBtn = document.getElementById("addClientBtn");
  const exportBtn = document.getElementById("exportClientsBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = clientsData.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.contact.includes(query) ||
        c.id.toLowerCase().includes(query)
      );
      renderClientsTable(filtered);
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => alert("Add Client Form Modal"));
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", () => alert("Exporting Client List to Excel..."));
  }
}

function viewClientHistory(id) {
  alert(`Loading transaction history for Client ID: ${id}`);
}

function editClient(id) {
  alert(`Editing Client ID: ${id}`);
}

// 🔄 Sync function from hauling
function syncClientsFromHauling(newHaul) {
  const existing = clientsData.find(c => c.name === newHaul.destination);
  if (existing) {
    existing.txCount += 1;
  } else {
    clientsData.push({
      id: "CLI-" + Date.now(),
      name: newHaul.destination,
      contact: "N/A",
      address: "N/A",
      txCount: 1,
      status: "Active"
    });
  }
  localStorage.setItem("clients", JSON.stringify(clientsData));
}

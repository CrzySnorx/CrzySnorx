let clients = JSON.parse(localStorage.getItem("clients")) || [];

function renderClientsTable() {
  const tableBody = document.querySelector("#clientsTable tbody");
  tableBody.innerHTML = "";

  if (clients.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No clients found.</td></tr>`;
    updateSummary();
    return;
  }

  clients.forEach((client, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${client.id}</strong></td>
      <td>${client.name}</td>
      <td>${client.contact}</td>
      <td>${client.address}</td>
      <td>${client.txCount} Trans.</td>
      <td><span class="status-tag ${client.status.toLowerCase()}">${client.status}</span></td>
      <td>
        <button class="action-btn edit" onclick="editClient(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteClient(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  localStorage.setItem("clients", JSON.stringify(clients));
}

function updateSummary() {
  document.getElementById("totalClients").textContent = clients.length;
  document.getElementById("activeShippers").textContent = clients.filter(c => c.status === "Active").length;

  // Example: pending invoices total (sum of balances)
  const pendingTotal = clients.reduce((sum, c) => sum + (c.pending || 0), 0);
  document.getElementById("pendingInvoices").textContent = `₱${pendingTotal.toLocaleString()}`;
}

function deleteClient(index) {
  clients.splice(index, 1);
  renderClientsTable();
}

function editClient(index) {
  const client = clients[index];
  document.getElementById("clientId").value = index;
  document.getElementById("clientName").value = client.name;
  document.getElementById("contactNumber").value = client.contact;
  document.getElementById("address").value = client.address;
  document.getElementById("status").value = client.status;

  document.getElementById("clientModal").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("clientModal");
  const form = document.getElementById("clientForm");

  renderClientsTable();

  // 🟢 Open modal
  document.getElementById("addClientBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("clientId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 Close modal
  document.getElementById("closeClient").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 Save client
  document.getElementById("saveClient").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("clientId").value;
    const name = document.getElementById("clientName").value.trim();
    const contact = document.getElementById("contactNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const status = document.getElementById("status").value;

    if (!name || !contact) {
      alert("Please fill out required fields.");
      return;
    }

    const clientData = {
      id: id ? clients[id].id : "CLI-" + Date.now(),
      name,
      contact,
      address,
      txCount: id ? clients[id].txCount : 0,
      status,
      pending: id ? clients[id].pending : 0
    };

    if (id) {
      clients[id] = clientData;
    } else {
      clients.push(clientData);
    }

    renderClientsTable();
    modal.style.display = "none";
  });

  // 🔍 Search filter
  document.getElementById("searchClient").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = clients.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.contact.includes(query) ||
      c.id.toLowerCase().includes(query)
    );

    const tableBody = document.querySelector("#clientsTable tbody");
    tableBody.innerHTML = "";

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No matching clients.</td></tr>`;
      return;
    }

    filtered.forEach((client, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${client.id}</strong></td>
        <td>${client.name}</td>
        <td>${client.contact}</td>
        <td>${client.address}</td>
        <td>${client.txCount} Trans.</td>
        <td><span class="status-tag ${client.status.toLowerCase()}">${client.status}</span></td>
        <td>
          <button class="action-btn edit" onclick="editClient(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteClient(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  });
});

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserRole = "Administrator"; // 🔑 Set current logged-in role here

function renderUsersTable() {
  const tableBody = document.querySelector("#usersTable tbody");
  tableBody.innerHTML = "";

  if (users.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px;">No users found.</td></tr>`;
    updateSummary();
    return;
  }

  users.forEach((user, index) => {
    let actionButtons = "";

    if (currentUserRole === "Administrator") {
      actionButtons = `
        <button class="action-btn edit" onclick="editUser(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteUser(${index})">Delete</button>
      `;
    } else if (currentUserRole === "Manager") {
      actionButtons = `
        <button class="action-btn edit" onclick="editUser(${index})">Edit</button>
      `;
    } else {
      actionButtons = `<span style="color:#6b7280;">No Access</span>`;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.contact}</td>
      <td>${user.role}</td>
      <td><span class="status-tag ${user.status.toLowerCase()}">${user.status}</span></td>
      <td>${user.lastLogin || "—"}</td>
      <td>${actionButtons}</td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  localStorage.setItem("users", JSON.stringify(users));
}

function updateSummary() {
  document.getElementById("totalUsers").textContent = users.length;
  document.getElementById("activeUsers").textContent = users.filter(u => u.status === "Active").length;
  document.getElementById("inactiveUsers").textContent = users.filter(u => u.status === "Inactive").length;
}

function deleteUser(index) {
  if (currentUserRole !== "Administrator") {
    alert("You do not have permission to delete users.");
    return;
  }
  users.splice(index, 1);
  renderUsersTable();
}

function editUser(index) {
  if (currentUserRole === "Staff") {
    alert("You do not have permission to edit users.");
    return;
  }

  const user = users[index];
  document.getElementById("userId").value = index;
  document.getElementById("fullName").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("contactNumber").value = user.contact;
  document.getElementById("role").value = user.role;
  document.getElementById("status").value = user.status;

  document.getElementById("userModal").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("userModal");
  const form = document.getElementById("userForm");

  renderUsersTable();

  // 🟢 Open modal (only Admin & Manager)
  document.getElementById("addUserBtn").addEventListener("click", () => {
    if (currentUserRole === "Staff") {
      alert("You do not have permission to add users.");
      return;
    }
    form.reset();
    document.getElementById("userId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 Close modal
  document.getElementById("closeUser").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 Save user
  document.getElementById("saveUser").addEventListener("click", (e) => {
    e.preventDefault();

    if (currentUserRole === "Staff") {
      alert("You do not have permission to save users.");
      return;
    }

    const id = document.getElementById("userId").value;
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contactNumber").value.trim();
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    if (!name || !email) {
      alert("Please fill out required fields.");
      return;
    }

    const userData = {
      id: id ? users[id].id : "USR-" + Date.now(),
      name,
      email,
      contact,
      role,
      status,
      lastLogin: id ? users[id].lastLogin : "—"
    };

    if (id) {
      users[id] = userData;
    } else {
      users.push(userData);
    }

    renderUsersTable();
    modal.style.display = "none";
  });

  // 🔍 Search filter
  document.getElementById("searchUser").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.contact.includes(query)
    );

    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = "";

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px;">No matching users.</td></tr>`;
      return;
    }

    filtered.forEach((user, index) => {
      let actionButtons = "";
      if (currentUserRole === "Administrator") {
        actionButtons = `
          <button class="action-btn edit" onclick="editUser(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteUser(${index})">Delete</button>
        `;
      } else if (currentUserRole === "Manager") {
        actionButtons = `<button class="action-btn edit" onclick="editUser(${index})">Edit</button>`;
      } else {
        actionButtons = `<span style="color:#6b7280;">No Access</span>`;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.contact}</td>
        <td>${user.role}</td>
        <td><span class="status-tag ${user.status.toLowerCase()}">${user.status}</span></td>
        <td>${user.lastLogin || "—"}</td>
        <td>${actionButtons}</td>
      `;
      tableBody.appendChild(row);
    });
  });
});

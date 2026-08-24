let users = JSON.parse(localStorage.getItem("users")) || [
  { id: 1, name: "Admin User", email: "admin@email.com", role: "Administrator" },
  { id: 2, name: "Juan Dela Cruz", email: "juan@email.com", role: "Staff" },
];

function initUsers() {
  const userModal = document.getElementById("userModal");
  const userTableBody = document.querySelector("#userTable tbody");

  function renderUsers() {
    if (!userTableBody) return;
    userTableBody.innerHTML = users
      .map(
        (user) => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="action-btn edit" data-id="${user.id}">Edit</button>
          <button class="action-btn delete" data-id="${user.id}">Delete</button>
        </td>
      </tr>`
      )
      .join("");

    localStorage.setItem("users", JSON.stringify(users));
  }

  document.getElementById("addUserBtn")?.addEventListener("click", () => {
    document.getElementById("userId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    userModal.style.display = "flex";
  });

  document.getElementById("closeModal")?.addEventListener("click", () => {
    userModal.style.display = "none";
  });

  document.getElementById("saveUser")?.addEventListener("click", () => {
    const id = document.getElementById("userId").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !email) return alert("Please fill required fields.");

    if (id) {
      const u = users.find((x) => x.id == id);
      if (u) { u.name = name; u.email = email; u.role = role; }
    } else {
      users.push({ id: Date.now(), name, email, role });
      addNotification("User account created");
    }

    renderUsers();
    userModal.style.display = "none";
  });

  userTableBody?.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("edit")) {
      const u = users.find((x) => x.id == id);
      if (!u) return;
      document.getElementById("userId").value = u.id;
      document.getElementById("name").value = u.name;
      document.getElementById("email").value = u.email;
      document.getElementById("role").value = u.role;
      userModal.style.display = "flex";
    }

    if (e.target.classList.contains("delete")) {
      if (confirm("Delete this user?")) {
        users = users.filter((x) => x.id != id);
        renderUsers();
      }
    }
  });

  renderUsers();
}
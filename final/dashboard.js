/* ===========================
   NAVIGATION SYSTEM
=========================== */
function showPage(pageId, clickedElement = null) {
  // 1. Itago ang lahat ng sections na may class na 'page'
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // 2. Ipakita ang napiling section gamit ang ID nito
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // 3. I-update ang active highlight sa sidebar menu
  const menuItems = document.querySelectorAll(".sidebar ul li, .sidebar a");
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Ilagay ang active style sa clinick na menu item
  if (clickedElement) {
    const parentLi = clickedElement.closest("li") || clickedElement;
    parentLi.classList.add("active");
  }

  // Isara ang mobile sidebar kapag nag-navigate sa mobile view
  if (window.innerWidth <= 768) {
    document.querySelector(".sidebar")?.classList.remove("show");
  }
}

// Event Listeners para sa Navigation Links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar a[data-page], .sidebar a[href^='#']");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Kunin ang page ID mula sa data-page attribute o href attribute
      const pageId =
        link.getAttribute("data-page") ||
        link.getAttribute("href")?.replace("#", "");

      if (pageId) {
        showPage(pageId, link);
      }
    });
  });

  // Default Page Setup (Ipakita ang Dashboard o Unang Page)
  const defaultPage = document.querySelector(".page.active")?.id || "dashboard";
  const defaultLink = document.querySelector(`.sidebar a[data-page="${defaultPage}"], .sidebar a[href="#${defaultPage}"]`);
  
  showPage(defaultPage, defaultLink);
});

/* ===========================
   SIDEBAR & UI
=========================== */
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.getElementById("menuBtn");

menuBtn?.addEventListener("click", () => {
  sidebar?.classList.toggle("show");
});

/* ===========================
   ANIMATED COUNTER
=========================== */
function counter(id, target, prefix = "", suffix = "") {
  const element = document.getElementById(id);
  if (!element) return;

  let value = 0;
  const speed = target / 60;

  const update = () => {
    value += speed;

    if (value < target) {
      element.textContent = `${prefix}${Math.floor(value)}${suffix}`;
      requestAnimationFrame(update);
    } else {
      element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    }
  };

  update();
}

counter("livestockCount", 523);
counter("occupancy", 87, "", "%");
counter("haulingCount", 12);
counter("earnings", 24500, "₱");

/* ===========================
   CHART INITIALIZATION (DASHBOARD)
=========================== */
const ctx = document.getElementById("yardChart");

if (ctx) {
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Occupied", "Available"],
      datasets: [
        {
          data: [87, 13],
          backgroundColor: ["#2563eb", "#d1d5db"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

/* ===========================
   USERS MANAGEMENT
=========================== */
const userModal = document.getElementById("userModal");
const addUserBtn = document.getElementById("addUserBtn");
const closeUserModalBtn = document.getElementById("closeModal");
const saveUserBtn = document.getElementById("saveUser");
const userTableBody = document.querySelector("#userTable tbody");
const searchUserInput = document.getElementById("searchUser");

const userIdInput = document.getElementById("userId");
const userNameInput = document.getElementById("name");
const userEmailInput = document.getElementById("email");
const userRoleInput = document.getElementById("role");

let users = JSON.parse(localStorage.getItem("users")) || [
  { id: 1, name: "Admin User", email: "admin@email.com", role: "Administrator" },
  { id: 2, name: "Juan Dela Cruz", email: "juan@email.com", role: "Staff" },
];

function saveUserStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
  if (!userTableBody) return;

  userTableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="action-btn edit" data-id="${user.id}">Edit</button>
        <button class="action-btn delete" data-id="${user.id}">Delete</button>
      </td>
    `;
    fragment.appendChild(tr);
  });

  userTableBody.appendChild(fragment);
  saveUserStorage();
  updateReports();
}

const openUserModal = () => (userModal.style.display = "flex");
const closeUserModal = () => (userModal.style.display = "none");

addUserBtn?.addEventListener("click", () => {
  userIdInput.value = "";
  userNameInput.value = "";
  userEmailInput.value = "";
  userRoleInput.value = "Administrator";
  openUserModal();
});

closeUserModalBtn?.addEventListener("click", closeUserModal);

saveUserBtn?.addEventListener("click", () => {
  const id = userIdInput.value;
  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();
  const role = userRoleInput.value;

  if (!name || !email) {
    alert("Please complete all required user fields.");
    return;
  }

  if (id) {
    const user = users.find((x) => x.id == id);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
    }
  } else {
    users.push({ id: Date.now(), name, email, role });
    addNotification("User account created");
  }

  renderUsers();
  closeUserModal();
});

userTableBody?.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains("edit")) {
    const user = users.find((x) => x.id == id);
    if (!user) return;

    userIdInput.value = user.id;
    userNameInput.value = user.name;
    userEmailInput.value = user.email;
    userRoleInput.value = user.role;
    openUserModal();
  }

  if (target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this user?")) {
      users = users.filter((x) => x.id != id);
      renderUsers();
    }
  }
});

searchUserInput?.addEventListener("input", () => {
  const keyword = searchUserInput.value.toLowerCase();
  const rows = userTableBody?.querySelectorAll("tr") || [];

  rows.forEach((row) => {
    const isVisible = row.textContent.toLowerCase().includes(keyword);
    row.style.display = isVisible ? "" : "none";
  });
});

renderUsers();

/* ===========================
   LIVESTOCK MANAGEMENT
=========================== */
const livestockModal = document.getElementById("livestockModal");
const addLivestockBtn = document.getElementById("addLivestockBtn");
const closeLivestockModalBtn = document.getElementById("closeLivestock");
const saveLivestockBtn = document.getElementById("saveLivestock");
const livestockTableBody = document.querySelector("#livestockTable tbody");
const searchLivestockInput = document.getElementById("searchLivestock");

const livestockIdInput = document.getElementById("livestockId");
const tagNoInput = document.getElementById("tagNo");
const breedInput = document.getElementById("breed");
const genderInput = document.getElementById("gender");
const weightInput = document.getElementById("weight");
const statusInput = document.getElementById("status");
const arrivalInput = document.getElementById("arrival");

let livestock = JSON.parse(localStorage.getItem("livestock")) || [
  {
    id: 1,
    tag: "C-1001",
    breed: "Brahman",
    gender: "Male",
    weight: 450,
    status: "Healthy",
    arrival: "2026-07-25",
  },
  {
    id: 2,
    tag: "C-1002",
    breed: "Angus",
    gender: "Female",
    weight: 390,
    status: "Observation",
    arrival: "2026-07-26",
  },
];

function saveLivestockStorage() {
  localStorage.setItem("livestock", JSON.stringify(livestock));
}

function getStatusBadge(status) {
  const key = status.toLowerCase();
  const validStatuses = ["healthy", "observation", "sold"];
  const className = validStatuses.includes(key) ? key : "healthy";
  return `<span class="status ${className}">${status}</span>`;
}

function renderLivestock() {
  if (!livestockTableBody) return;

  livestockTableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  livestock.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.tag}</td>
      <td>${item.breed}</td>
      <td>${item.gender}</td>
      <td>${item.weight} kg</td>
      <td>${getStatusBadge(item.status)}</td>
      <td>${item.arrival}</td>
      <td>
        <button class="action-btn edit" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-id="${item.id}">Delete</button>
      </td>
    `;
    fragment.appendChild(tr);
  });

  livestockTableBody.appendChild(fragment);
  saveLivestockStorage();
  updateReports();
}

const openLivestockModal = () => (livestockModal.style.display = "flex");
const closeLivestockModal = () => (livestockModal.style.display = "none");

addLivestockBtn?.addEventListener("click", () => {
  livestockIdInput.value = "";
  tagNoInput.value = "";
  breedInput.value = "";
  if (genderInput) genderInput.value = "Male";
  weightInput.value = "";
  arrivalInput.value = "";
  statusInput.value = "Healthy";
  openLivestockModal();
});

closeLivestockModalBtn?.addEventListener("click", closeLivestockModal);

saveLivestockBtn?.addEventListener("click", () => {
  const id = livestockIdInput.value;
  const tag = tagNoInput.value.trim();
  const breed = breedInput.value.trim();

  if (!tag || !breed) {
    alert("Please fill in required livestock information (Tag No & Breed).");
    return;
  }

  const itemData = {
    id: id ? Number(id) : Date.now(),
    tag,
    breed,
    gender: genderInput ? genderInput.value : "Male",
    weight: weightInput.value ? Number(weightInput.value) : 0,
    status: statusInput.value,
    arrival: arrivalInput.value,
  };

  if (id) {
    const index = livestock.findIndex((x) => x.id == id);
    if (index !== -1) livestock[index] = itemData;
  } else {
    livestock.push(itemData);
    addNotification("New livestock registered");
  }

  renderLivestock();
  closeLivestockModal();
});

livestockTableBody?.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains("edit")) {
    const item = livestock.find((x) => x.id == id);
    if (!item) return;

    livestockIdInput.value = item.id;
    tagNoInput.value = item.tag;
    breedInput.value = item.breed;
    if (genderInput) genderInput.value = item.gender;
    weightInput.value = item.weight;
    statusInput.value = item.status;
    arrivalInput.value = item.arrival;
    openLivestockModal();
  }

  if (target.classList.contains("delete")) {
    if (confirm("Delete this livestock entry?")) {
      livestock = livestock.filter((x) => x.id != id);
      renderLivestock();
    }
  }
});

searchLivestockInput?.addEventListener("input", () => {
  const keyword = searchLivestockInput.value.toLowerCase();
  const rows = livestockTableBody?.querySelectorAll("tr") || [];

  rows.forEach((row) => {
    const isVisible = row.textContent.toLowerCase().includes(keyword);
    row.style.display = isVisible ? "" : "none";
  });
});

renderLivestock();

/* ===========================
   HAULING MANAGEMENT
=========================== */
const haulingModal = document.getElementById("haulingModal");
const addHaulingBtn = document.getElementById("addHaulingBtn");
const closeHaulingModalBtn = document.getElementById("closeHauling");
const saveHaulingBtn = document.getElementById("saveHauling");
const haulingTableBody = document.querySelector("#haulingTable tbody");
const searchHaulingInput = document.getElementById("searchHauling");

const haulIdInput = document.getElementById("haulId");
const truckInput = document.getElementById("truck");
const driverInput = document.getElementById("driver");
const destinationInput = document.getElementById("destination");
const haulDateInput = document.getElementById("haulDate");
const haulTimeInput = document.getElementById("haulTime");
const haulStatusInput = document.getElementById("haulStatus");

let hauling = JSON.parse(localStorage.getItem("hauling")) || [
  {
    id: 1,
    truck: "Truck-01",
    driver: "Juan Cruz",
    destination: "Batangas",
    date: "2026-08-01",
    time: "08:00",
    status: "Pending",
  },
  {
    id: 2,
    truck: "Truck-02",
    driver: "Pedro Santos",
    destination: "Laguna",
    date: "2026-08-02",
    time: "10:30",
    status: "Completed",
  },
];

function saveHaulingStorage() {
  localStorage.setItem("hauling", JSON.stringify(hauling));
}

function getHaulingBadge(status) {
  if (status === "Pending") return `<span class="pending">Pending</span>`;
  if (status === "In Transit") return `<span class="transit">In Transit</span>`;
  return `<span class="completed">Completed</span>`;
}

function renderHauling() {
  if (!haulingTableBody) return;

  haulingTableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  hauling.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.truck}</td>
      <td>${item.driver}</td>
      <td>${item.destination}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${getHaulingBadge(item.status)}</td>
      <td>
        <button class="action-btn edit" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-id="${item.id}">Delete</button>
      </td>
    `;
    fragment.appendChild(tr);
  });

  haulingTableBody.appendChild(fragment);
  saveHaulingStorage();
  updateReports();
}

const openHaulingModal = () => (haulingModal.style.display = "flex");
const closeHaulingModal = () => (haulingModal.style.display = "none");

addHaulingBtn?.addEventListener("click", () => {
  haulIdInput.value = "";
  truckInput.value = "";
  driverInput.value = "";
  destinationInput.value = "";
  haulDateInput.value = "";
  haulTimeInput.value = "";
  haulStatusInput.value = "Pending";
  openHaulingModal();
});

closeHaulingModalBtn?.addEventListener("click", closeHaulingModal);

saveHaulingBtn?.addEventListener("click", () => {
  const id = haulIdInput.value;
  const truck = truckInput.value.trim();
  const driver = driverInput.value.trim();

  if (!truck || !driver) {
    alert("Please fill in required hauling details (Truck & Driver).");
    return;
  }

  const itemData = {
    id: id ? Number(id) : Date.now(),
    truck,
    driver,
    destination: destinationInput.value.trim(),
    date: haulDateInput.value,
    time: haulTimeInput.value,
    status: haulStatusInput.value,
  };

  if (id) {
    const index = hauling.findIndex((x) => x.id == id);
    if (index !== -1) hauling[index] = itemData;
  } else {
    hauling.push(itemData);
    addNotification("Hauling schedule updated");
  }

  renderHauling();
  closeHaulingModal();
});

haulingTableBody?.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains("edit")) {
    const item = hauling.find((x) => x.id == id);
    if (!item) return;

    haulIdInput.value = item.id;
    truckInput.value = item.truck;
    driverInput.value = item.driver;
    destinationInput.value = item.destination;
    haulDateInput.value = item.date;
    haulTimeInput.value = item.time;
    haulStatusInput.value = item.status;
    openHaulingModal();
  }

  if (target.classList.contains("delete")) {
    if (confirm("Delete this hauling schedule?")) {
      hauling = hauling.filter((x) => x.id != id);
      renderHauling();
    }
  }
});

searchHaulingInput?.addEventListener("input", () => {
  const keyword = searchHaulingInput.value.toLowerCase();
  const rows = haulingTableBody?.querySelectorAll("tr") || [];

  rows.forEach((row) => {
    const isVisible = row.textContent.toLowerCase().includes(keyword);
    row.style.display = isVisible ? "" : "none";
  });
});

renderHauling();

/* ===========================
   YARD OPERATIONS MANAGEMENT
=========================== */
const yardModal = document.getElementById("yardModal");
const addYardBtn = document.getElementById("addYardBtn");
const closeYardModalBtn = document.getElementById("closeYard");
const saveYardBtn = document.getElementById("saveYard");
const yardTableBody = document.querySelector("#yardTable tbody");
const searchYardInput = document.getElementById("searchYard");

const yardIdInput = document.getElementById("yardId");
const yardNameInput = document.getElementById("yardName");
const capacityInput = document.getElementById("capacity");
const occupiedInput = document.getElementById("occupied");

let yards = JSON.parse(localStorage.getItem("yards")) || [
  { id: 1, name: "Yard A", capacity: 120, occupied: 80 },
  { id: 2, name: "Yard B", capacity: 100, occupied: 95 },
  { id: 3, name: "Yard C", capacity: 150, occupied: 150 },
];

function saveYardsStorage() {
  localStorage.setItem("yards", JSON.stringify(yards));
}

function renderYards() {
  if (!yardTableBody) return;

  yardTableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  yards.forEach((y) => {
    const percent = y.capacity > 0 ? Math.round((y.occupied / y.capacity) * 100) : 0;

    let color = "green";
    if (percent >= 80) color = "orange";
    if (percent >= 100) color = "red";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${y.id}</td>
      <td>${y.name}</td>
      <td>${y.capacity}</td>
      <td>${y.occupied}</td>
      <td>
        <div class="progress">
          <div class="progress-bar ${color}" style="width:${Math.min(percent, 100)}%">
            ${percent}%
          </div>
        </div>
      </td>
      <td>
        ${
          percent >= 100
            ? '<span class="status-full">Full</span>'
            : '<span class="status-open">Available</span>'
        }
      </td>
      <td>
        <button class="action-btn edit" data-id="${y.id}">Edit</button>
        <button class="action-btn delete" data-id="${y.id}">Delete</button>
      </td>
    `;
    fragment.appendChild(tr);
  });

  yardTableBody.appendChild(fragment);
  saveYardsStorage();
  updateReports();
}

const openYardModal = () => (yardModal.style.display = "flex");
const closeYardModal = () => (yardModal.style.display = "none");

addYardBtn?.addEventListener("click", () => {
  yardIdInput.value = "";
  yardNameInput.value = "";
  capacityInput.value = "";
  occupiedInput.value = "";
  openYardModal();
});

closeYardModalBtn?.addEventListener("click", closeYardModal);

saveYardBtn?.addEventListener("click", () => {
  const id = yardIdInput.value;
  const name = yardNameInput.value.trim();
  const capacity = Number(capacityInput.value);
  const occupied = Number(occupiedInput.value);

  if (!name || isNaN(capacity)) {
    alert("Please provide a valid yard name and total capacity.");
    return;
  }

  const yardData = {
    id: id ? Number(id) : Date.now(),
    name,
    capacity,
    occupied: isNaN(occupied) ? 0 : occupied,
  };

  if (id) {
    const index = yards.findIndex((x) => x.id == id);
    if (index !== -1) yards[index] = yardData;
  } else {
    yards.push(yardData);
  }

  renderYards();
  closeYardModal();
});

yardTableBody?.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains("edit")) {
    const yard = yards.find((x) => x.id == id);
    if (!yard) return;

    yardIdInput.value = yard.id;
    yardNameInput.value = yard.name;
    capacityInput.value = yard.capacity;
    occupiedInput.value = yard.occupied;
    openYardModal();
  }

  if (target.classList.contains("delete")) {
    if (confirm("Delete this yard?")) {
      yards = yards.filter((x) => x.id != id);
      renderYards();
    }
  }
});

searchYardInput?.addEventListener("input", () => {
  const keyword = searchYardInput.value.toLowerCase();
  const rows = yardTableBody?.querySelectorAll("tr") || [];

  rows.forEach((row) => {
    const isVisible = row.textContent.toLowerCase().includes(keyword);
    row.style.display = isVisible ? "" : "none";
  });
});

renderYards();

/* ===========================
   EARNINGS MANAGEMENT
=========================== */
const earningsModal = document.getElementById("earningsModal");
const addEarningBtn = document.getElementById("addEarningBtn");
const closeEarningModalBtn = document.getElementById("closeEarning");
const saveEarningBtn = document.getElementById("saveEarning");
const earningsTableBody = document.querySelector("#earningsTable tbody");
const searchEarningsInput = document.getElementById("searchEarnings");
const totalEarningsDisplay = document.getElementById("totalEarnings");

const earningIdInput = document.getElementById("earningId");
const earningDateInput = document.getElementById("earningDate");
const earningDescriptionInput = document.getElementById("earningDescription");
const earningCategoryInput = document.getElementById("earningCategory");
const paymentMethodInput = document.getElementById("paymentMethod");
const earningAmountInput = document.getElementById("earningAmount");

let earnings = JSON.parse(localStorage.getItem("earnings")) || [
  {
    id: 1,
    date: "2026-08-01",
    description: "Sold 5 Cattle",
    category: "Livestock Sale",
    payment: "Cash",
    amount: 250000,
  },
  {
    id: 2,
    date: "2026-08-02",
    description: "Hauling Service",
    category: "Hauling Fee",
    payment: "GCash",
    amount: 18000,
  },
];

function saveEarningsStorage() {
  localStorage.setItem("earnings", JSON.stringify(earnings));
}

function renderEarnings() {
  if (!earningsTableBody) return;

  earningsTableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let total = 0;

  earnings.forEach((item) => {
    const amount = Number(item.amount) || 0;
    total += amount;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.date}</td>
      <td>${item.description}</td>
      <td>${item.category}</td>
      <td>${item.payment}</td>
      <td>₱${amount.toLocaleString()}</td>
      <td>
        <button class="action-btn edit" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-id="${item.id}">Delete</button>
      </td>
    `;
    fragment.appendChild(tr);
  });

  earningsTableBody.appendChild(fragment);

  if (totalEarningsDisplay) {
    totalEarningsDisplay.textContent = `₱${total.toLocaleString()}`;
  }

  saveEarningsStorage();
  updateReports();
}

const openEarningsModal = () => (earningsModal.style.display = "flex");
const closeEarningsModal = () => (earningsModal.style.display = "none");

addEarningBtn?.addEventListener("click", () => {
  earningIdInput.value = "";
  earningDateInput.value = "";
  earningDescriptionInput.value = "";
  if (earningCategoryInput) earningCategoryInput.value = "Livestock Sale";
  if (paymentMethodInput) paymentMethodInput.value = "Cash";
  earningAmountInput.value = "";
  openEarningsModal();
});

closeEarningModalBtn?.addEventListener("click", closeEarningsModal);

saveEarningBtn?.addEventListener("click", () => {
  const id = earningIdInput.value;
  const description = earningDescriptionInput.value.trim();
  const amount = Number(earningAmountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Please provide a valid description and positive amount.");
    return;
  }

  const itemData = {
    id: id ? Number(id) : Date.now(),
    date: earningDateInput.value,
    description,
    category: earningCategoryInput ? earningCategoryInput.value : "General",
    payment: paymentMethodInput ? paymentMethodInput.value : "Cash",
    amount,
  };

  if (id) {
    const index = earnings.findIndex((x) => x.id == id);
    if (index !== -1) earnings[index] = itemData;
  } else {
    earnings.push(itemData);
    addNotification("New earnings recorded");
  }

  renderEarnings();
  closeEarningsModal();
});

earningsTableBody?.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains("edit")) {
    const item = earnings.find((x) => x.id == id);
    if (!item) return;

    earningIdInput.value = item.id;
    earningDateInput.value = item.date;
    earningDescriptionInput.value = item.description;
    if (earningCategoryInput) earningCategoryInput.value = item.category;
    if (paymentMethodInput) paymentMethodInput.value = item.payment;
    earningAmountInput.value = item.amount;
    openEarningsModal();
  }

  if (target.classList.contains("delete")) {
    if (confirm("Delete this transaction?")) {
      earnings = earnings.filter((x) => x.id != id);
      renderEarnings();
    }
  }
});

searchEarningsInput?.addEventListener("input", () => {
  const keyword = searchEarningsInput.value.toLowerCase();
  const rows = earningsTableBody?.querySelectorAll("tr") || [];

  rows.forEach((row) => {
    const isVisible = row.textContent.toLowerCase().includes(keyword);
    row.style.display = isVisible ? "" : "none";
  });
});

renderEarnings();

/* ===========================
   REPORTS & ANALYTICS MODULE
=========================== */
const reportChartInstances = {};

function updateReports() {
  const reportUsersEl = document.getElementById("reportUsers");
  const reportLivestockEl = document.getElementById("reportLivestock");
  const reportHaulingEl = document.getElementById("reportHauling");
  const reportYardsEl = document.getElementById("reportYards");

  if (reportUsersEl) reportUsersEl.textContent = users.length;
  if (reportLivestockEl) reportLivestockEl.textContent = livestock.length;
  if (reportHaulingEl) reportHaulingEl.textContent = hauling.length;
  if (reportYardsEl) reportYardsEl.textContent = yards.length;

  renderReportCharts();
}

function renderReportCharts() {
  /* Dynamic Earnings Aggregation */
  const earningsCanvas = document.getElementById("earningsChart");
  if (earningsCanvas) {
    if (reportChartInstances.earnings) {
      reportChartInstances.earnings.destroy();
    }

    const monthlyData = new Array(12).fill(0);
    earnings.forEach((item) => {
      if (item.date) {
        const monthIndex = new Date(item.date).getMonth();
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyData[monthIndex] += Number(item.amount) || 0;
        }
      }
    });

    reportChartInstances.earnings = new Chart(earningsCanvas, {
      type: "bar",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
          {
            label: "Monthly Earnings (₱)",
            data: monthlyData,
            backgroundColor: "#2563eb",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      },
    });
  }

  /* Livestock Breakdown Chart */
  const livestockCanvas = document.getElementById("livestockChart");
  if (livestockCanvas) {
    if (reportChartInstances.livestock) {
      reportChartInstances.livestock.destroy();
    }

    const healthy = livestock.filter((x) => x.status === "Healthy").length;
    const observation = livestock.filter((x) => x.status === "Observation").length;
    const sold = livestock.filter((x) => x.status === "Sold").length;

    reportChartInstances.livestock = new Chart(livestockCanvas, {
      type: "pie",
      data: {
        labels: ["Healthy", "Observation", "Sold"],
        datasets: [
          {
            data: [healthy, observation, sold],
            backgroundColor: ["#16a34a", "#eab308", "#6b7280"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /* Hauling Breakdown Chart */
  const haulingCanvas = document.getElementById("haulingChart");
  if (haulingCanvas) {
    if (reportChartInstances.hauling) {
      reportChartInstances.hauling.destroy();
    }

    const pending = hauling.filter((x) => x.status === "Pending").length;
    const transit = hauling.filter((x) => x.status === "In Transit").length;
    const completed = hauling.filter((x) => x.status === "Completed").length;

    reportChartInstances.hauling = new Chart(haulingCanvas, {
      type: "doughnut",
      data: {
        labels: ["Pending", "In Transit", "Completed"],
        datasets: [
          {
            data: [pending, transit, completed],
            backgroundColor: ["#f97316", "#0284c7", "#16a34a"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /* Yard Occupancy Chart */
  const yardCanvas = document.getElementById("yardReportChart");
  if (yardCanvas) {
    if (reportChartInstances.yards) {
      reportChartInstances.yards.destroy();
    }

    const yardNames = yards.map((x) => x.name);
    const occupied = yards.map((x) => x.occupied);

    reportChartInstances.yards = new Chart(yardCanvas, {
      type: "bar",
      data: {
        labels: yardNames,
        datasets: [
          {
            label: "Occupied Animals",
            data: occupied,
            backgroundColor: "#0d9488",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}

updateReports();

/* ===========================
   DARK MODE
=========================== */
const darkBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("darkmode") === "true") {
  document.body.classList.add("dark");
}

darkBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "darkmode",
    document.body.classList.contains("dark")
  );
});

/* ===========================
   REAL-TIME CLOCK
=========================== */
function updateClock() {
  const clockEl = document.getElementById("clock");
  const todayEl = document.getElementById("today");

  const now = new Date();
  if (clockEl) clockEl.textContent = now.toLocaleTimeString();
  if (todayEl) todayEl.textContent = now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();

/* ===========================
   EXPORTS (CSV, EXCEL, PDF)
=========================== */
document.getElementById("exportCSV")?.addEventListener("click", () => {
  let csv = "ID,Date,Description,Category,Payment,Amount\n";

  earnings.forEach((item) => {
    const cleanDesc = `"${(item.description || "").replace(/"/g, '""')}"`;
    csv += `${item.id},${item.date},${cleanDesc},${item.category},${item.payment},${item.amount}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "earnings.csv";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("exportExcel")?.addEventListener("click", () => {
  const earningsTable = document.getElementById("earningsTable");
  if (!earningsTable) return;

  const tableHTML = earningsTable.outerHTML;
  const a = document.createElement("a");
  a.href = "data:application/vnd.ms-excel," + encodeURIComponent(tableHTML);
  a.download = "earnings.xls";
  a.click();
});

document.getElementById("exportPDF")?.addEventListener("click", () => {
  window.print();
});

/* ===========================
   NOTIFICATIONS MODULE
=========================== */
let notifications = [
  "New livestock registered",
  "Hauling schedule updated",
  "New earnings recorded",
  "User account created",
];

const bellDropdown = document.querySelector(".notification .dropdown");

function renderNotifications() {
  if (!bellDropdown) return;

  bellDropdown.innerHTML = "";
  const fragment = document.createDocumentFragment();

  notifications.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = item;
    fragment.appendChild(p);
  });

  bellDropdown.appendChild(fragment);
}

function addNotification(msg) {
  notifications.unshift(msg);
  renderNotifications();
}

renderNotifications();
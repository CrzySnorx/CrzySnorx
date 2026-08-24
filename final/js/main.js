/* ==========================================
   GLOBAL UTILITIES, DROPDOWNS & SIDEBAR TOGGLE
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------
  // 1. Sidebar Toggle Functionality
  // ----------------------------------------
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.querySelector(".sidebar");

  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar?.classList.toggle("show");
  });

  // ----------------------------------------
  // 2. Notification & Admin Profile Dropdowns
  // ----------------------------------------
  const notificationBtn = document.querySelector("#notification-bell");
  const notificationMenu = document.querySelector("#notification-menu");

  const adminBtn = document.querySelector("#admin-profile");
  const adminMenu = document.querySelector("#admin-menu");

  // Toggle Notification
  if (notificationBtn && notificationMenu) {
    notificationBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate closing
      notificationMenu.classList.toggle("active");
      adminMenu?.classList.remove("active"); // Close admin menu
    });
  }

  // Toggle Admin Profile
  if (adminBtn && adminMenu) {
    adminBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      adminMenu.classList.toggle("active");
      notificationMenu?.classList.remove("active"); // Close notification menu
    });
  }

  // Close all dropdowns and mobile sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (notificationMenu && !notificationMenu.contains(e.target)) {
      notificationMenu.classList.remove("active");
    }
    if (adminMenu && !adminMenu.contains(e.target)) {
      adminMenu.classList.remove("active");
    }
    if (sidebar && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) {
      sidebar.classList.remove("show");
    }
  });

  // ----------------------------------------
  // 3. Real-Time Clock & Date
  // ----------------------------------------
  function updateClock() {
    const clockEl = document.getElementById("clock");
    const todayEl = document.getElementById("today");
    const now = new Date();

    if (clockEl) clockEl.textContent = now.toLocaleTimeString();
    if (todayEl) todayEl.textContent = now.toDateString();
  }

  setInterval(updateClock, 1000);
  updateClock();

  // Initial Sync of Profile Data on Application Load
  loadSavedProfile();
});

/* ==========================================
   GLOBAL NOTIFICATION HELPER
========================================== */
function addNotification(msg) {
  const notificationMenu = document.querySelector("#notification-menu");
  if (!notificationMenu) return;

  const p = document.createElement("p");
  p.textContent = msg;
  notificationMenu.prepend(p);

  // Update Badge Count
  const badge = document.querySelector("#notification-bell .badge");
  if (badge) {
    let currentCount = parseInt(badge.textContent) || 0;
    badge.textContent = currentCount + 1;
  }
}

/* ==========================================
   PROFILE & SETTINGS DYNAMIC SYNC (LOCALSTORAGE)
========================================== */

function loadSavedProfile() {
  const savedName = localStorage.getItem("admin_name") || "Aethan Dave Manzano";
  const savedImage = localStorage.getItem("admin_image") || "images/admin.jpg";
  const savedPosition = localStorage.getItem("admin_position") || "Yard Operations Manager";
  const savedEmail = localStorage.getItem("admin_email") || "admin@livestock.com";
  const savedPhone = localStorage.getItem("admin_phone") || "+63 912 345 6789";
  const savedDept = localStorage.getItem("admin_dept") || "Operations & Management";
  const savedAddress = localStorage.getItem("admin_address") || "Lipa City Livestock Yard Facility, Batangas";
  const savedId = localStorage.getItem("admin_id") || "ADM-2026-001";

  // 1. Update Header Navbar (Top Right)
  const navName = document.querySelector("#admin-profile span");
  const navImg = document.querySelector("#admin-profile img");
  if (navName) navName.textContent = savedName;
  if (navImg) navImg.src = savedImage;

  // 2. Update Profile Page Inputs (if profile.html is currently loaded)
  const profileNameInput = document.getElementById("profileName");
  const profileEmailInput = document.getElementById("profileEmail");
  const profilePhoneInput = document.getElementById("profilePhone");
  const profilePosInput = document.getElementById("profilePosition");
  const profileDeptInput = document.getElementById("profileDepartment");
  const profileAddrInput = document.getElementById("profileAddress");
  const avatarPreview = document.getElementById("avatarPreview");

  if (profileNameInput) profileNameInput.value = savedName;
  if (profileEmailInput) profileEmailInput.value = savedEmail;
  if (profilePhoneInput) profilePhoneInput.value = savedPhone;
  if (profilePosInput) profilePosInput.value = savedPosition;
  if (profileDeptInput) profileDeptInput.value = savedDept;
  if (profileAddrInput) profileAddrInput.value = savedAddress;
  if (avatarPreview) avatarPreview.src = savedImage;

  // 3. Update Settings Page Profile Card (All Fields Display)
  const settingsName = document.getElementById("settingsProfileName");
  const settingsImg = document.getElementById("settingsProfileImg");
  const settingsPosition = document.getElementById("settingsProfilePosition");
  const settingsId = document.getElementById("settingsProfileId");
  const settingsEmail = document.getElementById("settingsProfileEmail");
  const settingsPhone = document.getElementById("settingsProfilePhone");
  const settingsDept = document.getElementById("settingsProfileDept");
  const settingsAddress = document.getElementById("settingsProfileAddress");

  if (settingsName) settingsName.textContent = savedName;
  if (settingsImg) settingsImg.src = savedImage;
  if (settingsPosition) settingsPosition.textContent = savedPosition;
  if (settingsId) settingsId.textContent = savedId;
  if (settingsEmail) settingsEmail.textContent = savedEmail;
  if (settingsPhone) settingsPhone.textContent = savedPhone;
  if (settingsDept) settingsDept.textContent = savedDept;
  if (settingsAddress) settingsAddress.textContent = savedAddress;
}

/* ==========================================
   GLOBAL EVENT LISTENERS (DYNAMIC PAGES SUPPORT)
========================================== */

// Handler for Profile Image Upload
document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "avatarUpload") {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageBase64 = event.target.result;

        // Preview and save directly to LocalStorage
        const preview = document.getElementById("avatarPreview");
        if (preview) preview.src = imageBase64;

        localStorage.setItem("admin_image", imageBase64);
        loadSavedProfile(); // Instantly sync to Navbar & Settings
      };
      reader.readAsDataURL(file);
    }
  }
});

// Handler for Profile Form Submission
document.addEventListener("submit", (e) => {
  if (e.target && e.target.id === "profileForm") {
    e.preventDefault();

    const nameInput = document.getElementById("profileName")?.value;
    const emailInput = document.getElementById("profileEmail")?.value;
    const phoneInput = document.getElementById("profilePhone")?.value;
    const posInput = document.getElementById("profilePosition")?.value;
    const deptInput = document.getElementById("profileDepartment")?.value;
    const addrInput = document.getElementById("profileAddress")?.value;

    // Save all fields to LocalStorage
    if (nameInput) localStorage.setItem("admin_name", nameInput);
    if (emailInput) localStorage.setItem("admin_email", emailInput);
    if (phoneInput) localStorage.setItem("admin_phone", phoneInput);
    if (posInput) localStorage.setItem("admin_position", posInput);
    if (deptInput) localStorage.setItem("admin_dept", deptInput);
    if (addrInput) localStorage.setItem("admin_address", addrInput);

    // Refresh displays across the app
    loadSavedProfile();

    alert("Profile changes saved successfully!");
  }
});

// Handler for Click Events (Logout Button & Page Actions)
document.addEventListener("click", (e) => {
  const logoutBtn = e.target.closest("#logoutBtn");
  if (logoutBtn) {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      alert("You have successfully logged out!");
      // window.location.href = "login.html";
    }
  }
});

/* Hook into loadPage router to ensure data syncs whenever page navigation happens */
if (typeof window.loadPage === "function") {
  const originalLoadPage = window.loadPage;
  window.loadPage = function (page, element) {
    originalLoadPage(page, element);
    setTimeout(loadSavedProfile, 150); // Wait for dynamic content injection before updating fields
  };
}
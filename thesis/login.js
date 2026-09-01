document.addEventListener("DOMContentLoaded", () => {
  const adminTab = document.getElementById("adminTab");
  const driverTab = document.getElementById("driverTab");
  const adminFields = document.getElementById("adminFields");
  const driverFields = document.getElementById("driverFields");
  const loginBtn = document.getElementById("loginBtn");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Tab switching
  adminTab.addEventListener("click", () => {
    adminTab.classList.add("active");
    driverTab.classList.remove("active");
    adminFields.style.display = "block";
    driverFields.style.display = "none";
    loginBtn.textContent = "Sign In as Admin →";
  });

  driverTab.addEventListener("click", () => {
    driverTab.classList.add("active");
    adminTab.classList.remove("active");
    adminFields.style.display = "none";
    driverFields.style.display = "block";
    loginBtn.textContent = "Sign In as Driver →";
  });

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });

  // Form validation + login
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const driverId = document.getElementById("driverId").value.trim();
    const password = passwordInput.value.trim();

    if ((adminFields.style.display !== "none" && username === "") ||
        (driverFields.style.display !== "none" && driverId === "") ||
        password === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // Admin login → redirect to dashboard
    if (adminFields.style.display !== "none") {
      localStorage.setItem("userRole", "admin");
      window.location.href = "./index.html"; // adjust path if index.html is inside a folder
    } else {
      localStorage.setItem("userRole", "driver");
      window.location.href = "./driver-dashboard.html"; // adjust path if driver-dashboard.html is inside a folder
    }
  });
});

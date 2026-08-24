const adminTab = document.getElementById("adminTab");
const driverTab = document.getElementById("driverTab");
const adminFields = document.getElementById("adminFields");
const driverFields = document.getElementById("driverFields");
const loginBtn = document.getElementById("loginBtn");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

// Switch tabs
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
  loginBtn.textContent = "Sign In as Driver 🚚";
});

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});

// Form submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const isAdmin = adminTab.classList.contains("active");
  const username = isAdmin ? document.getElementById("username").value : document.getElementById("driverId").value;
  const password = passwordInput.value;

  if (username === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  if (isAdmin) {
    alert(`Welcome Admin: ${username}`);
    window.location.href = "index.html";
  } else {
    alert(`Welcome Driver: ${username}`);
    window.location.href = "hauling.html";
  }
});

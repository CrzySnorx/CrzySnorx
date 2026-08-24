/**
 * BIYAHE - Login Functionality (Fixed Routing)
 */

// 1. Switch Role Toggle (Admin vs Driver)
function switchRole(role) {
  const userRoleInput = document.getElementById("userRole");
  const adminBtn = document.getElementById("adminRoleBtn");
  const driverBtn = document.getElementById("driverRoleBtn");
  const inputLabel = document.getElementById("inputLabel");
  const inputIcon = document.getElementById("inputIcon");
  const loginInput = document.getElementById("loginInput");
  const submitBtn = document.getElementById("loginSubmitBtn");

  userRoleInput.value = role;

  if (role === 'admin') {
    adminBtn.classList.add('active');
    driverBtn.classList.remove('active');
    
    inputLabel.innerText = "Username or Email";
    inputIcon.className = "fa-solid fa-envelope";
    loginInput.placeholder = "Enter your username or email";
    submitBtn.innerHTML = 'Sign In as Admin <i class="fa-solid fa-arrow-right"></i>';
  } else {
    driverBtn.classList.add('active');
    adminBtn.classList.remove('active');
    
    inputLabel.innerText = "Driver ID or License No.";
    inputIcon.className = "fa-solid fa-id-card";
    loginInput.placeholder = "Enter License or Driver ID";
    submitBtn.innerHTML = 'Sign In as Driver <i class="fa-solid fa-truck"></i>';
  }
}

// 2. Toggle Password Visibility (Eye Icon)
function togglePasswordVisibility() {
  const passInput = document.getElementById("passwordInput");
  const icon = document.getElementById("togglePasswordBtn");

  if (passInput.type === "password") {
    passInput.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passInput.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// 3. Handle Login Form Submit
function handleLogin(event) {
  event.preventDefault();
  
  const role = document.getElementById("userRole").value;
  const username = document.getElementById("loginInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const rememberMe = document.getElementById("rememberMe")?.checked;

  if (!username || !password) {
    alert("Please fill in all required fields.");
    return;
  }

  // Save session state
  const userData = {
    username: username,
    role: role,
    isLoggedIn: true
  };

  try {
    if (rememberMe) {
      localStorage.setItem("biyahe_user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("biyahe_user", JSON.stringify(userData));
    }
  } catch (err) {
    console.error("Storage error:", err);
  }

  // Redirect based on user role
  if (role === 'admin') {
    window.location.href = "index.html"; // <-- Pinalitan sa index.html
  } else {
    window.location.href = "driver.html";
  }
}

// 4. Logout Handler
function handleLogout() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("biyahe_user");
    sessionStorage.removeItem("biyahe_user");
    window.location.href = "login.html";
  }
}
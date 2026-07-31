/* ==========================================
   DYNAMIC PAGE ROUTER & NAVIGATION LOADER
========================================== */

async function loadPage(pageId, clickedElement = null) {
  // Gamitin ang "mainContent" id na mula sa iyong index.html
  const contentArea = document.getElementById("mainContent"); 
  if (!contentArea) return;

  try {
    // 1. I-fetch ang kaukulang HTML mula sa pages/ folder
    const response = await fetch(`pages/${pageId}.html`);
    if (!response.ok) throw new Error("Page not found");

    const html = await response.text();
    contentArea.innerHTML = html;

    // 2. I-update ang "active" class sa sidebar menu
    const menuItems = document.querySelectorAll(".sidebar ul li");
    menuItems.forEach((item) => item.classList.remove("active"));

    if (clickedElement) {
      clickedElement.classList.add("active");
    }

    // 3. Patakbuhin ang kaukulang module function pagkaload ng HTML
    initPageModule(pageId);

  } catch (error) {
    contentArea.innerHTML = `
      <div style="padding: 20px; color: #ef4444;">
        <h2>404 - Page Not Found</h2>
        <p>Hindi mahanap ang file na <code>pages/${pageId}.html</code>.</p>
      </div>`;
    console.error(`Error loading page ${pageId}:`, error);
  }
}

// Inisyalisasyon ng mga JS file base sa niload na page
function initPageModule(pageId) {
  if (pageId === "dashboard" && typeof initDashboard === "function") initDashboard();
  if (pageId === "users" && typeof initUsers === "function") initUsers();
  if (pageId === "livestock" && typeof initLivestock === "function") initLivestock();
  if (pageId === "hauling" && typeof initHauling === "function") initHauling();
  if (pageId === "yard" && typeof initYard === "function") initYard();
  if (pageId === "earnings" && typeof initEarnings === "function") initEarnings();
  if (pageId === "reports" && typeof initReports === "function") initReports();
}

// Awtomatikong i-load ang Dashboard sa unang pagbukas ng system
document.addEventListener("DOMContentLoaded", () => {
  const defaultLi = document.querySelector(".sidebar ul li.active");
  loadPage("dashboard", defaultLi);
});
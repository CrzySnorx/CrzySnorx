/* ==========================================
   DYNAMIC PAGE ROUTER & NAVIGATION LOADER
========================================== */

async function loadPage(pageId, clickedElement = null) {
  const contentArea = document.getElementById("mainContent"); 
  if (!contentArea) return;

  try {
    // 1. Fetch HTML file mula sa pages/ folder
    const response = await fetch(`pages/${pageId}.html`);
    if (!response.ok) throw new Error("Page not found");

    const html = await response.text();
    contentArea.innerHTML = html;

    // 2. Update active class sa sidebar menu
    const menuItems = document.querySelectorAll(".sidebar ul li");
    menuItems.forEach((item) => item.classList.remove("active"));
    if (clickedElement) clickedElement.classList.add("active");

    // 3. Initialize page module kung meron
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

/* ==========================================
   PAGE MODULE INITIALIZATION
========================================== */
function initPageModule(pageId) {
  const modules = {
    dashboard: typeof initDashboard === "function" ? initDashboard : null,
    users: typeof initUsers === "function" ? initUsers : null,
    livestock: typeof initLivestock === "function" ? initLivestock : null,
    hauling: typeof initHauling === "function" ? initHauling : null,
    yard: typeof initYard === "function" ? initYard : null,
    fleet: typeof initFleet === "function" ? initFleet : null,
    earnings: typeof initEarnings === "function" ? initEarnings : null,
    clients: typeof initClients === "function" ? initClients : null,
    reports: typeof initReports === "function" ? initReports : null,
    profile: typeof initProfile === "function" ? initProfile : null,
    settings: typeof initSettings === "function" ? initSettings : null,
    help: typeof initHelp === "function" ? initHelp : null,
  };

  if (modules[pageId]) {
    modules[pageId]();
  }
}

/* ==========================================
   DEFAULT LOAD (Dashboard)
========================================== */
document.addEventListener("DOMContentLoaded", () => {
  const defaultLi = document.querySelector(".sidebar ul li.active");
  loadPage("dashboard", defaultLi);
});

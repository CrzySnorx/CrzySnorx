/**
 * BIYAHE - Driver Dashboard Interactive Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initDashboardDate();
  initDutyStatusToggle();
  initActiveNavHighlight();
  initActionHandlers();
});

/**
 * 1. Automatically formats and updates the current date display
 */
function initDashboardDate() {
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
  }
}

/**
 * 2. Handles Driver Duty Status (On Duty / Off Duty) Toggling
 */
function initDutyStatusToggle() {
  const statusBadge = document.querySelector(".status-badge");
  
  if (statusBadge) {
    statusBadge.style.cursor = "pointer";
    statusBadge.title = "Click to toggle duty status";

    statusBadge.addEventListener("click", () => {
      const isOffDuty = statusBadge.classList.contains("off-duty");

      if (isOffDuty) {
        // Switch to On Duty
        statusBadge.classList.remove("off-duty");
        statusBadge.innerHTML = `<span class="pulse-dot"></span> On Duty`;
        statusBadge.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
        statusBadge.style.color = "#34d399";
        statusBadge.style.borderColor = "rgba(16, 185, 129, 0.2)";
        alert("Status updated: You are now ON DUTY.");
      } else {
        // Switch to Off Duty
        statusBadge.classList.add("off-duty");
        statusBadge.innerHTML = `<span class="pulse-dot" style="background-color: #94a3b8; animation: none;"></span> Off Duty`;
        statusBadge.style.backgroundColor = "rgba(148, 163, 184, 0.1)";
        statusBadge.style.color = "#94a3b8";
        statusBadge.style.borderColor = "rgba(148, 163, 184, 0.2)";
        alert("Status updated: You are now OFF DUTY.");
      }
    });
  }
}

/**
 * 3. Highlights Active Navigation Link Based on Current URL
 */
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "driver.html";

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * 4. Attach click handlers for action buttons across pages
 */
function initActionHandlers() {
  // GPS Route View (Google Maps Integration)
  const gpsButtons = document.querySelectorAll(".btn-primary");
  gpsButtons.forEach(btn => {
    if (btn.textContent.includes("Route") || btn.textContent.includes("GPS")) {
      btn.addEventListener("click", () => {
        const origin = encodeURIComponent("Batangas Breeding Station & Yard");
        const destination = encodeURIComponent("Lipa Central Processing Center");
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        window.open(mapsUrl, "_blank");
      });
    } else if (btn.textContent.includes("Start Trip")) {
      // Handler for 'Start Trip' in assigned-tasks.html
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const tripId = row ? row.cells[0].textContent.trim() : "selected trip";
        alert(`Starting ${tripId}! Redirecting to active trip view...`);
        window.location.href = "active-trips.html";
      });
    }
  });

  // Upload Waybill / Delivery Proof Action
  const uploadButtons = document.querySelectorAll(".btn-outline");
  uploadButtons.forEach(btn => {
    if (btn.textContent.includes("Waybill") || btn.textContent.includes("Proof")) {
      btn.addEventListener("click", triggerWaybillUpload);
    } else if (btn.textContent.includes("Incident") || btn.textContent.includes("Delay")) {
      btn.addEventListener("click", reportIncident);
    }
  });

  // Mark Delivery Complete Action
  const completeButtons = document.querySelectorAll(".btn-success");
  completeButtons.forEach(btn => {
    if (btn.textContent.includes("Delivered") || btn.textContent.includes("Complete")) {
      btn.addEventListener("click", confirmDeliveryCompletion);
    }
  });
}

/**
 * Simulated File Upload Input for Mobile Camera & File Selection
 */
function triggerWaybillUpload() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.capture = "environment"; // Opens camera on mobile devices

  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Waybill Image "${file.name}" selected successfully! Uploading to BIYAHE system...`);
    }
  };

  fileInput.click();
}

/**
 * Incident / Delay Reporting Dialog
 */
function reportIncident() {
  const reason = prompt("Describe the incident or delay (e.g., Heavy Traffic, Truck Maintenance, Yard Waiting):");
  if (reason && reason.trim() !== "") {
    alert(`Incident reported to BIYAHE Dispatcher: "${reason.trim()}". Status updated.`);
  }
}

/**
 * Confirmation dialog for completing an active delivery
 */
function confirmDeliveryCompletion() {
  const confirmed = confirm(
    "Are you sure you want to mark trip #TRIP-2026-0842 as DELIVERED?\n\nMake sure all livestock head counts have been verified by the yard officer."
  );

  if (confirmed) {
    const statusPills = document.querySelectorAll(".status-pill");

    statusPills.forEach(statusPill => {
      statusPill.textContent = "✅ Delivered";
      statusPill.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
      statusPill.style.color = "#6ee7b7";
      statusPill.style.border = "1px solid rgba(16, 185, 129, 0.3)";
    });

    alert("Trip status updated to DELIVERED! Great job, drive safely.");
  }
}
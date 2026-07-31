let earnings = JSON.parse(localStorage.getItem("earnings")) || [
  { id: 1, date: "2026-08-01", description: "Sold 5 Cattle", category: "Livestock Sale", payment: "Cash", amount: 250000 },
];

function initEarnings() {
  const modal = document.getElementById("earningsModal");
  const tableBody = document.querySelector("#earningsTable tbody");

  function renderEarnings() {
    if (!tableBody) return;
    let total = 0;

    tableBody.innerHTML = earnings
      .map((item) => {
        const amt = Number(item.amount) || 0;
        total += amt;
        return `
        <tr>
          <td>${item.id}</td>
          <td>${item.date}</td>
          <td>${item.description}</td>
          <td>${item.category}</td>
          <td>${item.payment}</td>
          <td>₱${amt.toLocaleString()}</td>
          <td>
            <button class="action-btn edit" data-id="${item.id}">Edit</button>
            <button class="action-btn delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`;
      })
      .join("");

    const display = document.getElementById("totalEarnings");
    if (display) display.textContent = `₱${total.toLocaleString()}`;

    localStorage.setItem("earnings", JSON.stringify(earnings));
  }

  document.getElementById("addEarningBtn")?.addEventListener("click", () => {
    document.getElementById("earningId").value = "";
    modal.style.display = "flex";
  });

  document.getElementById("closeEarning")?.addEventListener("click", () => (modal.style.display = "none"));

  document.getElementById("saveEarning")?.addEventListener("click", () => {
    const id = document.getElementById("earningId").value;
    const description = document.getElementById("earningDescription").value.trim();
    const amount = Number(document.getElementById("earningAmount").value);

    if (!description || isNaN(amount) || amount <= 0) return alert("Valid description & amount required.");

    const itemData = {
      id: id ? Number(id) : Date.now(),
      date: document.getElementById("earningDate").value,
      description,
      category: document.getElementById("earningCategory")?.value || "General",
      payment: document.getElementById("paymentMethod")?.value || "Cash",
      amount,
    };

    if (id) {
      const idx = earnings.findIndex((x) => x.id == id);
      if (idx !== -1) earnings[idx] = itemData;
    } else {
      earnings.push(itemData);
      addNotification("New earnings recorded");
    }

    renderEarnings();
    modal.style.display = "none";
  });

  // Export Events
  document.getElementById("exportCSV")?.addEventListener("click", () => {
    let csv = "ID,Date,Description,Category,Payment,Amount\n";
    earnings.forEach((i) => {
      csv += `${i.id},${i.date},"${(i.description || "").replace(/"/g, '""')}",${i.category},${i.payment},${i.amount}\n`;
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
    const table = document.getElementById("earningsTable")?.outerHTML;
    if (!table) return;
    const a = document.createElement("a");
    a.href = "data:application/vnd.ms-excel," + encodeURIComponent(table);
    a.download = "earnings.xls";
    a.click();
  });

  document.getElementById("exportPDF")?.addEventListener("click", () => window.print());

  renderEarnings();
}
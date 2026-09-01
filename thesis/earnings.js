let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function renderEarningsTable() {
  const tableBody = document.querySelector("#earningsTable tbody");
  tableBody.innerHTML = "";

  transactions.forEach((txn, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${txn.description}</td>
      <td>${txn.type}</td>
      <td>₱${txn.amount.toFixed(2)}</td>
      <td>${txn.date}</td>
      <td>
        <button class="action-btn edit" onclick="editTransaction(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteTransaction(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateSummary() {
  const totalRevenue = transactions.filter(t => t.type === "Revenue").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  document.getElementById("totalRevenue").textContent = `₱${totalRevenue.toFixed(2)}`;
  document.getElementById("totalExpenses").textContent = `₱${totalExpenses.toFixed(2)}`;
  document.getElementById("netIncome").textContent = `₱${netIncome.toFixed(2)}`;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderEarningsTable();
}

function editTransaction(index) {
  const txn = transactions[index];
  document.getElementById("transactionId").value = index;
  document.getElementById("description").value = txn.description;
  document.getElementById("category").value = txn.type;
  document.getElementById("amount").value = txn.amount;
  document.getElementById("transactionDate").value = txn.date;

  document.getElementById("earningsModal").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("earningsModal");
  const form = document.getElementById("earningsForm");

  renderEarningsTable();

  // 🟢 Open modal
  document.getElementById("addTransactionBtn").addEventListener("click", () => {
    form.reset();
    document.getElementById("transactionId").value = "";
    modal.style.display = "flex";
  });

  // 🔴 Close modal
  document.getElementById("closeTransaction").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 💾 Save transaction
  document.getElementById("saveTransaction").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("transactionId").value;
    const description = document.getElementById("description").value.trim();
    const type = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value) || 0;
    const date = document.getElementById("transactionDate").value;

    if (!description || !date) {
      alert("Please fill out required fields.");
      return;
    }

    const txnData = { description, type, amount, date };

    if (id) {
      transactions[id] = txnData;
    } else {
      transactions.push(txnData);
    }

    renderEarningsTable();
    modal.style.display = "none";
  });
});

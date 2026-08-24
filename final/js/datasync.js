// 🔄 Sync Fleet, Earnings, Clients from hauling
function syncAllFromHauling(newHaul) {
  // 🚚 Fleet Management
  let fleet = JSON.parse(localStorage.getItem("fleet")) || [];
  const vehicle = fleet.find(f => f.plate === newHaul.plateNo);
  if (vehicle) {
    vehicle.status = "In-Transit";
    vehicle.driver = newHaul.driver;
  } else {
    fleet.push({
      plate: newHaul.plateNo || newHaul.truck,
      type: newHaul.cargo || "Livestock Truck",
      capacity: newHaul.yardCapacity || "N/A",
      driver: newHaul.driver,
      status: "In-Transit"
    });
  }
  localStorage.setItem("fleet", JSON.stringify(fleet));

  // 💰 Earnings
  let earnings = JSON.parse(localStorage.getItem("earnings")) || [];
  earnings.push({
    refNo: Date.now(),
    date: newHaul.date,
    client: newHaul.clientName,
    description: newHaul.earningDescription || "Hauling Service",
    category: "Hauling",
    method: "Cash",
    amount: newHaul.earningAmount || 0
  });
  localStorage.setItem("earnings", JSON.stringify(earnings));

  // 👥 Clients
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  const existing = clients.find(c => c.name === newHaul.clientName);
  if (existing) {
    existing.transactions = (existing.transactions || 0) + 1;
  } else {
    clients.push({
      id: "CLI-" + Date.now(),
      name: newHaul.clientName,
      contact: newHaul.clientContact || "N/A",
      address: newHaul.clientAddress || "N/A",
      transactions: 1
    });
  }
  localStorage.setItem("clients", JSON.stringify(clients));
}

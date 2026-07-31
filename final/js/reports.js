function initReports() {
  document.getElementById("reportUsers").textContent = (typeof users !== "undefined" ? users : []).length;
  document.getElementById("reportLivestock").textContent = (typeof livestock !== "undefined" ? livestock : []).length;
  document.getElementById("reportHauling").textContent = (typeof hauling !== "undefined" ? hauling : []).length;
  document.getElementById("reportYards").textContent = (typeof yards !== "undefined" ? yards : []).length;

  const earningsCanvas = document.getElementById("earningsChart");
  if (earningsCanvas && typeof Chart !== "undefined") {
    const monthlyData = new Array(12).fill(0);
    if (typeof earnings !== "undefined") {
      earnings.forEach((item) => {
        if (item.date) {
          const m = new Date(item.date).getMonth();
          if (m >= 0 && m < 12) monthlyData[m] += Number(item.amount) || 0;
        }
      });
    }

    new Chart(earningsCanvas, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{ label: "Monthly Earnings (₱)", data: monthlyData, backgroundColor: "#2563eb" }],
      },
      options: { responsive: true },
    });
  }
}
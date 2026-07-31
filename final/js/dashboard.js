function initDashboard() {
  function counter(id, target, prefix = "", suffix = "") {
    const element = document.getElementById(id);
    if (!element) return;

    let value = 0;
    const speed = target / 60;
    const update = () => {
      value += speed;
      if (value < target) {
        element.textContent = `${prefix}${Math.floor(value)}${suffix}`;
        requestAnimationFrame(update);
      } else {
        element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    };
    update();
  }

  counter("livestockCount", 523);
  counter("occupancy", 87, "", "%");
  counter("haulingCount", 12);
  counter("earnings", 24500, "₱");

  const ctx = document.getElementById("yardChart");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Occupied", "Available"],
        datasets: [{ data: [87, 13], backgroundColor: ["#2563eb", "#d1d5db"], borderWidth: 0 }],
      },
      options: { responsive: true, plugins: { legend: { position: "bottom" } } },
    });
  }
}
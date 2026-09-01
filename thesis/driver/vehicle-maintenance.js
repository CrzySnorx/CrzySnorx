// Example dynamic update for maintenance table
const maintenanceTable = document.getElementById('maintenanceTable');

// Add color-coded status dynamically
maintenanceTable.querySelectorAll('tr').forEach(row => {
  const statusCell = row.cells[2];
  const statusText = statusCell.textContent.trim().toLowerCase();

  if (statusText === 'completed') {
    statusCell.innerHTML = `<span class="status completed">Completed</span>`;
  } else if (statusText === 'pending') {
    statusCell.innerHTML = `<span class="status pending">Pending</span>`;
  } else if (statusText === 'urgent') {
    statusCell.innerHTML = `<span class="status urgent">Urgent</span>`;
  }
});

// Button actions
document.querySelector('.btn.schedule').addEventListener('click', () => {
  alert('Maintenance schedule request sent to admin.');
});

document.querySelector('.btn.report').addEventListener('click', () => {
  alert('Vehicle issue reported successfully.');
});

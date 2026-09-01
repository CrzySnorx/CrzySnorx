// Apply status color coding dynamically
const tripTable = document.getElementById('tripTable');

tripTable.querySelectorAll('tr').forEach(row => {
  const statusCell = row.cells[3];
  const statusText = statusCell.textContent.trim().toLowerCase();

  if (statusText === 'completed') {
    statusCell.innerHTML = `<span class="status completed">Completed</span>`;
  } else if (statusText === 'cancelled') {
    statusCell.innerHTML = `<span class="status cancelled">Cancelled</span>`;
  } else if (statusText === 'in-transit') {
    statusCell.innerHTML = `<span class="status in-transit">In-Transit</span>`;
  }
});

// Filter trips by status
function filterTrips(filter) {
  tripTable.querySelectorAll('tr').forEach(row => {
    const statusCell = row.cells[3].textContent.trim().toLowerCase();

    if (filter === 'all') {
      row.style.display = '';
    } else if (statusCell.includes(filter)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Search trips by keyword (destination or remarks)
function searchTrips(keyword) {
  tripTable.querySelectorAll('tr').forEach(row => {
    const origin = row.cells[1].textContent.toLowerCase();
    const destination = row.cells[2].textContent.toLowerCase();
    const remarks = row.cells[4].textContent.toLowerCase();

    if (
      origin.includes(keyword) ||
      destination.includes(keyword) ||
      remarks.includes(keyword)
    ) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Create filter buttons + search bar dynamically
const tripLogSection = document.querySelector('.trip-log');
const controlContainer = document.createElement('div');
controlContainer.classList.add('trip-controls');

controlContainer.innerHTML = `
  <div class="filter-buttons">
    <button class="btn filter" data-filter="all">All</button>
    <button class="btn filter" data-filter="completed">Completed</button>
    <button class="btn filter" data-filter="cancelled">Cancelled</button>
    <button class="btn filter" data-filter="in-transit">In-Transit</button>
  </div>
  <div class="search-bar">
    <input type="text" id="tripSearch" placeholder="Search trips by destination or remarks..." />
  </div>
`;

tripLogSection.insertBefore(controlContainer, tripLogSection.querySelector('table'));

// Event listeners for filter buttons
document.querySelectorAll('.btn.filter').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterTrips(filter);
  });
});

// Event listener for search bar
document.getElementById('tripSearch').addEventListener('input', e => {
  const keyword = e.target.value.trim().toLowerCase();
  searchTrips(keyword);
});

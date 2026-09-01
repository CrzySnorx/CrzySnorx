// Initialize map
const map = L.map('map').setView([13.7565, 121.0583], 10);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Custom driver icon
const driverIcon = L.icon({
  iconUrl: 'icons/driver-marker.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const driverMarker = L.marker([13.7565, 121.0583], { icon: driverIcon }).addTo(map);

// Routing Machine setup
let routeControl = L.Routing.control({
  waypoints: [
    L.latLng(13.7565, 121.0583), // Start (Batangas)
    L.latLng(13.9403, 121.1640)  // Destination (San Antonio)
  ],
  routeWhileDragging: true,
  lineOptions: {
    styles: [{ color: '#007bff', weight: 6, opacity: 0.9 }]
  },
  createMarker: () => null
}).addTo(map);

// Trip info simulation
let speed = 65;
let distanceRemaining = 32;
let eta = 45;

function updateTripInfo() {
  document.getElementById('speed').textContent = speed;
  document.getElementById('distance').textContent = `${distanceRemaining} km`;
  document.getElementById('eta').textContent = `${eta} mins`;
}

updateTripInfo();

// Simulate movement
let progress = 0;
function moveDriver() {
  const route = routeControl.getPlan().getWaypoints();
  if (route.length < 2) return;

  const start = route[0].latLng;
  const end = route[1].latLng;

  progress += 0.002;
  if (progress > 1) progress = 0;

  const lat = start.lat + (end.lat - start.lat) * progress;
  const lng = start.lng + (end.lng - start.lng) * progress;

  driverMarker.setLatLng([lat, lng]);
  map.panTo([lat, lng]);

  distanceRemaining = Math.max(0, distanceRemaining - 0.05);
  eta = Math.max(0, eta - 0.1);
  updateTripInfo();
}

let moveInterval = setInterval(moveDriver, 2000);

// Button actions
document.querySelector('.btn.pause').addEventListener('click', () => {
  clearInterval(moveInterval);
});

document.querySelector('.btn.resume').addEventListener('click', () => {
  moveInterval = setInterval(moveDriver, 2000);
});

document.querySelector('.btn.report').addEventListener('click', () => {
  alert('Issue reported to dispatch center.');
});

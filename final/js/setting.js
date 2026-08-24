// Settings Event Handler
document.addEventListener('click', function (e) {
  // Check kung ang na-click ay ang Logout Button
  if (e.target && (e.target.id === 'logoutBtn' || e.target.closest('#logoutBtn'))) {
    const confirmLogout = confirm('Sigurado ka bang gusto mong mag-log out?');
    if (confirmLogout) {
      // Ilagay dito ang redirect url papuntang Login page
      // window.location.href = 'login.html';
      alert('Naka-log out ka na!');
    }
  }
});
// Function para sa Image Preview kapag nagpalit ng Photo
document.addEventListener('change', function (e) {
  if (e.target && e.target.id === 'avatarUpload') {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const preview = document.getElementById('avatarPreview');
        if (preview) preview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
});

// Profile Form Submit Event
document.addEventListener('submit', function (e) {
  if (e.target && e.target.id === 'profileForm') {
    e.preventDefault();
    alert('Matagumpay na na-save ang iyong Profile!');
  }
});
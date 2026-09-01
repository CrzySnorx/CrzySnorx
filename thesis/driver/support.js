// FAQ toggle
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// Support form submission
document.getElementById('supportForm').addEventListener('submit', e => {
  e.preventDefault();
  const issue = document.getElementById('issue').value.trim();

  if (issue) {
    alert('Support ticket submitted successfully!');
    document.getElementById('issue').value = '';
  } else {
    alert('Please describe your issue before submitting.');
  }
});

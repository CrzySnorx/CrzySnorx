document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;

      // Toggle visibility
      if (answer.style.display === "block") {
        answer.style.display = "none";
      } else {
        // Close other answers
        document.querySelectorAll(".faq-answer").forEach((ans) => {
          ans.style.display = "none";
        });
        answer.style.display = "block";
      }
    });
  });

  // Support Form Submission
  const supportForm = document.getElementById("supportForm");
  supportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      alert(`Thank you, ${name}! Your support ticket has been submitted.\nWe will contact you at ${email}.`);
      supportForm.reset();
    } else {
      alert("Please fill in all fields before submitting.");
    }
  });
});

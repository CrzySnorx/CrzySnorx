function initHelpPage() {
  setupFaqSearch();
}

function setupFaqSearch() {
  const searchInput = document.getElementById("searchFaq");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
      const question = item.querySelector("h4")?.innerText.toLowerCase() || "";
      const answer = item.querySelector("p")?.innerText.toLowerCase() || "";

      if (question.includes(query) || answer.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}
// ===========================
// Set current year in footer
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===========================
  // Highlight active nav link
  // ===========================
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // ===========================
  // FAQ accordion behaviour
  // ===========================
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains("open");

      if (isOpen) {
        question.classList.remove("open");
        answer.classList.remove("open");
      } else {
        question.classList.add("open");
        answer.classList.add("open");
      }
    });
  });
});

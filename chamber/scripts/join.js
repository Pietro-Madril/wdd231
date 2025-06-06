document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
  const now = new Date();
  timestampInput.value = now.toISOString();
}

const modalLinks = document.querySelectorAll(".membership-cards a");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal .close");

modalLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").replace("#", "");
    const modal = document.getElementById(targetId);
    if (modal) {
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
});

window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".membership-cards .card");
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease-out";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});

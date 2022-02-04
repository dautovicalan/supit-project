const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

const modal = document.querySelector(".contact-modal");
const openButton = document.querySelectorAll(".open-button");
const closeButton = document.querySelector(".cancel-button");

//Toggle mobile mode
hamburger.addEventListener("click", (e) => {
  mobileMenu.classList.toggle("hidden");
});

//Modal open and close events
openButton.forEach((element) => {
  element.addEventListener("click", (e) => {
    modal.classList.toggle("hidden");
  });
});

closeButton.addEventListener("click", (e) => {
  modal.classList.toggle("hidden");
});

window.onclick = (e) => {
  if (e.target == modal) {
    modal.classList.toggle("hidden");
  }
};

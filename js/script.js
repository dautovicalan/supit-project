const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

//Toggle mobile mode
hamburger.addEventListener("click", (e) => {
  mobileMenu.classList.toggle("hidden");
});

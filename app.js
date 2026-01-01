const btnMenu = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

btnMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

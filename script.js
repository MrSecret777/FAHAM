const menuButtons = document.querySelectorAll("[data-menu-toggle]");
const searchButtons = document.querySelectorAll("[data-search-toggle]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const closeSearch = document.querySelector("[data-search-close]");

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
});

searchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.add("search-open");
    const input = searchOverlay?.querySelector("input");
    if (input) input.focus();
  });
});

closeSearch?.addEventListener("click", () => {
  document.body.classList.remove("search-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.body.classList.remove("search-open", "menu-open");
  }
});

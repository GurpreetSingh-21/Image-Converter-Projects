const container = document.querySelector(".container");
const contactBtn = document.querySelector(".green-bg button");

contactBtn.addEventListener("click", () => {
  container.classList.toggle("change");
});
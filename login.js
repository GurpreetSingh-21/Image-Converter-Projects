const container = document.querySelector(".container");
const signInBtn = document.querySelector(".blue-bg button");

signInBtn.addEventListener("click", () => {
    container.classList.toggle("change");
});

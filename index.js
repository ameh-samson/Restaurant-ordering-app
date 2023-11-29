import { menuArray } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  getMenuHTML();
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.itemName) {
    // getCheckoutHTML();
  }
});

function getMenuHTML() {
  const htmlArray = menuArray.map(
    ({ name, ingredients, id, price, emoji }) => `
    <div class="menu-item-container">
      <p class="menu-item-img">${emoji}</p>
      <div class="menu-item-content">
        <h2 class="menu-item-title">${name}</h2>
        <p class="menu-item-description">${ingredients}</p>
        <h3 class="menu-item-price">$ ${price}</h3>
      </div>
      <div>
        <button class="menu-item-add-btn" data-item-name="${id}">+</button>
      </div>
    </div>`
  );

  const menuSection = document.createElement("section");
  menuSection.classList.add("menu-section");
  const container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = htmlArray.join("");
  menuSection.appendChild(container);

  document.body.appendChild(menuSection);
}

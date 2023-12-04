import { menuArray } from "./data.js";

const menuSection = document.querySelector(".menu-section");
const checkoutSection = document.querySelector(".checkout-section");
const formSection = document.querySelector(".form-section");
const orderCompleteMessage = document.querySelector(".order-complete-message");

const selectedOrders = [];

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.itemId) {
    const itemId = e.target.dataset.itemId;
    const selectedItem = menuArray.find((item) => item.id === Number(itemId));

    if (selectedItem) {
      selectedOrders.push({
        name: selectedItem.name,
        price: selectedItem.price,
      });
      renderSelectedOrder();
    }
  }

  if (e.target.dataset.action === "completeOrder") {
    formSection.style.display = "block";
  }
});

function renderMenu() {
  const htmlArray = menuArray.map(
    ({ name, ingredients, id, price, emoji }) => `
    <div class="menu-item-container" data-item-id="${id}">
    <p class="menu-item-img">${emoji}</p>
      <div class="menu-item-content">
        <h2 class="menu-item-title">${name}</h2>
        <p class="menu-item-description">${ingredients}</p>
        <h3 class="menu-item-price">${price}</h3>
      </div>
      <div>
        <button class="menu-item-add-btn" data-item-id="${id}">+</button>
      </div>
    </div>
    `
  );

  menuSection.innerHTML = htmlArray.join("");
}

function renderSelectedOrder() {
  const htmlArray = selectedOrders.map(
    ({ name, price }) =>
      `
    <div class="checkout-inner-container">
      <div class="checkout-inner-left">
        <h2 class="checkout-item-name">${name}</h2>
        <button class="checkout-remove-item-btn">remove</button>
      </div>
      <h3 class="checkout-item-price">${price}</h3>
    </div>
  `
  );

  const totalPrice = calculateTotalPrice(selectedOrders);
  console.log(totalPrice);

  const checkoutContainer = `
    <div class="checkout-container">
      <h2 class="checkout-title">Your order</h2>
      ${htmlArray.join("")}


      <div class="checkout-total-price-container">
        <h2 class="checkout-total-price-text">Total price:</h2>
        <h3 class="checkout-total-price">${totalPrice}</h3>
      </div>
      <button class="purchase-btn" data-action="completeOrder">Complete order</button>
    </div>
  `;

  checkoutSection.innerHTML = checkoutContainer;
}

function calculateTotalPrice(orders) {
  return orders.reduce((total, { price }) => total + price, 0);
}

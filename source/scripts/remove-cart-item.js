import { updateTotal } from './cart-update-total.js';

function removeCartItem(evt) {
  const cardItem = evt.target.closest('.card__item');
  const wasChecked = cardItem.querySelector('.cart__item-input').checked;

  cardItem.style.transition = 'all 0.3s ease';
  cardItem.style.transform = 'translateX(-50px)';
  cardItem.style.opacity = '0';
  cardItem.style.overflow = 'hidden';

  setTimeout(() => {
    cardItem.remove();
    checkEmptyCart();

    if (wasChecked) {
      updateTotal();
    }
  }, 300);
}

function checkEmptyCart() {
  const cartContainer = document.querySelector('.cart__card');
  const cartItems = document.querySelectorAll('.card__item');
  const discountForm = document.querySelector('.cart__discount');

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'cart__empty-message';

    emptyMessage.innerHTML = `
      <div class="cart__empty-content">
        <div class="cart__empty-image-wrapper">
          <img src="images/empty-cart.svg" alt="Empty cart" class="cart__empty-image">
        </div>
        <div class="cart__empty-text-wrapper">
          <h2 class="cart__empty-title">Your Cart Feels Lonely</h2>
          <p class="cart__empty-text">Your shopping cart is empty. Let's fill it with joy!</p>
          <a href="catalog.html" class="cart__empty-button button">Explore Products</a>
        </div>
      </div>
    `;

    cartContainer.innerHTML = '';
    cartContainer.appendChild(emptyMessage);

    setTimeout(() => {
      emptyMessage.style.opacity = '1';
    }, 100);

    if (discountForm) {
      discountForm.style.display = 'none';
    }

    updateTotal();
  }
}

function initCart() {
  const deleteButtons = document.querySelectorAll('.card__delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', removeCartItem);
  });
}

export { initCart };

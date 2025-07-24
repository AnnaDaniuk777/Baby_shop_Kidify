function updateCartCounter() {
  const cartItems = document.querySelectorAll('.card__item');
  const cartCounter = document.querySelector('[data-cart="cart-quantity"]');
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    const quantityInput = item.querySelector('.card__input-quantity');
    if (quantityInput) {
      totalQuantity += parseInt(quantityInput.value, 10);
    }
  });

  if (cartCounter) {
    cartCounter.textContent = totalQuantity;
  }

  return totalQuantity;
}

export { updateCartCounter };


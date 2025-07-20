const quantityInputs = document.querySelectorAll('.card__input-quantity');
const cartCounter = document.querySelector('[data-cart="cart-quantity"]');

function updateCartTotal() {
  let totalQuantity = 0;

  quantityInputs.forEach((input) => {
    const cardItem = input.closest('.card__item');
    const checkbox = cardItem.querySelector('.cart__item-input');
    if (checkbox.checked) {
      totalQuantity += parseInt(input.value, 10);
    }
  });

  cartCounter.textContent = totalQuantity;
  console.log(totalQuantity);

  return totalQuantity;
}

export { updateCartTotal };

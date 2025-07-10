import { updateTotal } from './cart-update-total.js';

function setupQuantityControl() {
  const quantityWrappers = document.querySelectorAll('.card__item');

  quantityWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector('.card__input-quantity');
    const decreaseBtn = wrapper.querySelectorAll('.card__button-input')[0];
    const increaseBtn = wrapper.querySelectorAll('.card__button-input')[1];
    const priceElement = wrapper.querySelector('.card__feature');
    const subtotalElement = wrapper.querySelector('.card__subtotal');
    const checkbox = wrapper.querySelector('.cart__item-input');

    const pricePerUnit = parseFloat(priceElement.textContent.replace('$', ''));

    const updateSubtotal = () => {
      const quantity = parseInt(input.value, 10);
      const subtotal = (quantity * pricePerUnit).toFixed(2);
      subtotalElement.textContent = `$${subtotal}`;

      if (checkbox.checked) {
        updateTotal();
      }
    };

    const handleDecrease = () => {
      let value = parseInt(input.value, 10);
      if (value > parseInt(input.min, 10)) {
        input.value = --value;
        updateSubtotal();
      }
    };

    const handleIncrease = () => {
      let value = parseInt(input.value, 10);
      input.value = ++value;
      updateSubtotal();
    };

    const handleInputChange = () => {
      if (input.value < parseInt(input.min, 10)) {
        input.value = input.min;
      }
      updateSubtotal();
    };

    decreaseBtn.addEventListener('click', handleDecrease);
    increaseBtn.addEventListener('click', handleIncrease);
    input.addEventListener('change', handleInputChange);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        updateTotal();
      } else {
        updateTotal();
      }
    });
  });
}

export { setupQuantityControl };

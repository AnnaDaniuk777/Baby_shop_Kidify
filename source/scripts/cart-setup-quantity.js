import { updateTotal } from './cart-update-total.js';
import { initShippingCalculator } from './shipping-calculator.js';
import { updateCartTotal } from './cart-icon-quantity-update.js';

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
        initShippingCalculator();
      }
    };

    const handlerDecrease = () => {
      let value = parseInt(input.value, 10);
      if (value > parseInt(input.min, 10)) {
        input.value = --value;
        updateSubtotal();
      }
    };

    const handlerIncrease = () => {
      let value = parseInt(input.value, 10);
      input.value = ++value;
      updateSubtotal();
    };

    const handlerInputChange = () => {
      if (input.value < parseInt(input.min, 10)) {
        input.value = input.min;
      }
      updateSubtotal();
      updateCartTotal();
    };

    decreaseBtn.addEventListener('click', handlerDecrease);
    increaseBtn.addEventListener('click', handlerIncrease);
    input.addEventListener('change', handlerInputChange);

    checkbox.addEventListener('change', () => {
      updateTotal();
      initShippingCalculator();
    });
  });
}

export { setupQuantityControl };

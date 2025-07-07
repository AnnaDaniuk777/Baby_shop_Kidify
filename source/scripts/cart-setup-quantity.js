function setupQuantityControl() {
  const quantityWrappers = document.querySelectorAll('.card__button-wrapper');

  quantityWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector('.card__input-quantity');
    const decreaseBtn = wrapper.querySelectorAll('.card__button-input')[0];
    const increaseBtn = wrapper.querySelectorAll('.card__button-input')[1];
    const priceElement = wrapper.querySelectorAll('.card__feature');
    const subtotalElement = wrapper.querySelectorAll('.card__subtotal');
    // const cardItem = wrapper.closest('.card__item');

    const pricePerUnit = parseFloat(priceElement.textContent.replace('$', ''));

    const updateSubtotal = () => {
      const quantity = parseInt(input.value, 10);
      const subtotal = (quantity * pricePerUnit).toFixed(2);
      subtotalElement.textContent = `$${subtotal}`;
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
      input.value = ++ value;
      updateSubtotal();
    };

    const handleInputChange = () => {
      if (input.value > parseInt(input.min, 10)) {
        input.value = input.min;
      }
      updateSubtotal();
    };

    decreaseBtn.addEventListener('click', handleDecrease);
    increaseBtn.addEventListener('click', handleIncrease);
    input.addEventListener('change', handleInputChange);
  });
}

export { setupQuantityControl };

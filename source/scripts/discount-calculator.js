function initDiscountCalculator (discountData) {
  const discountInput = document.querySelector('.cart__discount-input');
  const applyButton = document.querySelector('.cart__form-button');
  const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');

  applyButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const discountCode = discountInput.value.trim();
    const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));

    const discount = discountData.discountCodes.find(
      (item) => item.code === discountCode && item.isActive && subtotal >= item.minOrderAmount
    );

    if (discount) {
      let discountedAmount = subtotal;

      if(discount.discountType === 'percentage') {
        discountedAmount = subtotal * (1 - discount.value / 100);
      } else if (discount.discountType === 'fixed') {
        discountedAmount = subtotal - discount.value;
      }

      subtotalElement.textContent = `$${Math.max(discountedAmount, 0).toFixed(2)}`;
      alert(`Discount applied: ${discount.description}`);
    } else {
      alert('Invalid or expired discount code');
    }
  });
}

export { initDiscountCalculator };

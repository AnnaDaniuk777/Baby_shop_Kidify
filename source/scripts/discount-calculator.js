export function calculateDiscount(discountData, discountValue, subtotalValue, shippingTextValue) {
  const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');
  const shippingElement = document.querySelector('[data-cart="shipping"] .total__value');
  const totalElement = document.querySelector('[data-cart="total"] .total__value');
  const discountCode = discountValue ? discountValue : document.querySelector('.cart__discount-input').value;
  const subtotal = subtotalValue ? subtotalValue : parseFloat(subtotalElement.textContent.replace(/[^\d.]/g, ''));
  const shippingText = shippingTextValue ? shippingTextValue : shippingElement.textContent;
  let shippingCost = 0;

  const discount = discountData.discountCodes.find((item) =>
    item.code.toUpperCase() === discountCode.toUpperCase() &&
    item.isActive &&
    subtotal >= item.minOrderAmount
  );

  if (discount.discountType === 'fixed' && subtotal < discount.value * 0.3) {
    return {
      success: false,
      message: `For discount $${discount.value.toFixed(2)} minimum order amount must be $${discount.value * 0.3}.toFixed(2)`
    };
  }

  shippingCost = shippingText === 'Free' ? 0 : parseFloat(shippingText.replace(/[^\d.]/g, '')) || 0;

  const discountAmount =
    discount.discountType === 'percentage'
      ? subtotal * (discount.value / 100)
      : discount.value;

  const discountedSubtotal = subtotal - discountAmount;
  const total = discountedSubtotal + shippingCost;

  subtotalElement.textContent = `$${discountedSubtotal.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
  shippingElement.textContent = shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`;

  return {
    success: true,
    discountedSubtotal: discountedSubtotal,
    total: total,
    discountAmount: discountAmount,
    shippingCost: shippingCost
  };
}

export function initDiscountCalculator(discountData) {
  const discountInput = document.querySelector('.cart__discount-input');
  const applyButton = document.querySelector('.cart__form-button');
  const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');
  const shippingElement = document.querySelector('[data-cart="shipping"] .total__value');
  const totalElement = document.querySelector('[data-cart="total"] .total__value');

  let currentDiscount = {
    code: null,
    amount: 0,
    applied: false
  };

  const lockElements = (input = true, button = true) => {
    if (input) {
      discountInput.disabled = true;
      discountInput.classList.add('disabled-input');
    }
    if (button) {
      applyButton.disabled = true;
      applyButton.classList.add('disabled-button');
    }
  };

  // const unlockElements = () => {
  //   discountInput.disabled = false;
  //   discountInput.classList.remove('disabled-input');
  //   applyButton.disabled = false;
  //   applyButton.classList.remove('disabled-button');
  // };

  applyButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const originalSubtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.]/g, '')) || 0;
    const shippingText = shippingElement.textContent;
    const discountCode = discountInput.value.trim().toUpperCase();

    const result = calculateDiscount(
      discountData,
      discountCode,
      originalSubtotal,
      shippingText
    );

    if (result.success) {
      currentDiscount = {
        code: discountCode,
        amount: result.discountAmount,
        applied: true
      };

      setTimeout(() => {
        lockElements(true, true);
        applyButton.textContent = 'Applied!';
      }, 1000);

      discountInput.value = '';

      subtotalElement.textContent = `$${result.discountedSubtotal.toFixed(2)}`;
      totalElement.textContent = `$${result.total.toFixed(2)}`;
      shippingElement.textContent = result.shippingCost === 0 ? 'Free' : `$${result.shippingCost.toFixed(2)}`;
    }
  });
}

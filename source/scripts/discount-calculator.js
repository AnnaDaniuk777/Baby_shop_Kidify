function calculateDiscount(discountData, discountCode, subtotal, shippingText) {
  let shippingCost = 0;

  const discount = discountData?.discountCodes?.find((item) =>
    item.code.toUpperCase() === discountCode.toUpperCase() &&
    item.isActive &&
    subtotal >= item.minOrderAmount
  );

  shippingCost = shippingText === 'Free' ? 0 : parseFloat(shippingText.replace(/[^\d.]/g, '')) || 0;

  const discountAmount = Math.min(
    discount.discountType === 'percentage'
      ? subtotal * (discount.value / 100)
      : discount.value,
    subtotal
  );

  const discountedSubtotal = subtotal - discountAmount;
  const total = discountedSubtotal + shippingCost;

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

  // Current discount (default)
  let currentDiscount = {
    code: null,
    amount: 0,
    applied: false
  };

  const resetDiscount = () => {
    const subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.]/g, '')) || 0;
    const shippingText = shippingElement.textContent;
    const shippingCost = shippingText === 'Free' ? 0 : parseFloat(shippingText.replace(/[^\d.]/g, '')) || 0;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;

    currentDiscount = {
      code: null,
      amount: 0,
      applied: false
    };
  };

  applyButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const originalSubtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.]/g, '')) || 0;
    const shippingText = shippingElement.textContent;
    const discountCode = discountInput.value.trim().toUpperCase();

    if (!discountCode) {
      if (currentDiscount.applied) {
        resetDiscount();
        alert('Discount removed');
      }
      return;
    }

    if (currentDiscount.applied && currentDiscount.code === discountCode) {
      alert('This discount has been already applied');
      return;
    }

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

      subtotalElement.textContent = `$${result.discountedSubtotal.toFixed(2)}`;
      totalElement.textContent = `$${result.total.toFixed(2)}`;
      shippingElement.textContent = result.shippingCost === 0 ? 'Free' : `$${result.shippingCost.toFixed(2)}`;

      discountInput.value = '';
    } else {
      alert('Invalid or expired discount code');
    }
  });
}

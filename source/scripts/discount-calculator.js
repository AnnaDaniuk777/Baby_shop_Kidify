import {updateTotal} from './cart-update-total.js';

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

  if (!discount) {
    return {success: false};
  }

  if (discount.discountType === 'fixed' || discount.discountType === 'percentage' && subtotal < discount.value * 0.3) {
    return {
      success: false,
      message: `For discount $${discount.value.toFixed(2)} minimum order amount must be $${(discount.value * 0.3).toFixed(2)}`
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
    message: discount.description,
    discountedSubtotal: discountedSubtotal,
    total: total,
    discountAmount: discountAmount,
    shippingCost: shippingCost
  };
}

export const initDiscountCalculator = (discountData) => {
  const discountInput = document.querySelector('.cart__discount-input');
  const applyButton = document.querySelector('.cart__form-button');
  const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');
  const shippingElement = document.querySelector('[data-cart="shipping"] .total__value');
  const notification = document.querySelector('.cart__discount-notification');

  const removeButton = document.createElement('button');
  removeButton.classList.add('cart__remove-button');
  applyButton.before(removeButton);

  const showNotification = (message, isError = true) => {
    notification.textContent = message;
    notification.classList.add('show');

    if (isError) {
      notification.style.backgroundColor = '#ffebee';
      notification.style.color = '#c62828';
    } else {
      notification.style.backgroundColor = '#e8f5e9';
      notification.style.color = '#2e7d32';
    }

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  };

  applyButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (!discountInput.value.trim()) {
      showNotification('Please enter a discount code');
      return;
    }

    const originalSubtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.]/g, '')) || 0;
    const result = calculateDiscount(discountData, discountInput.value, originalSubtotal, shippingElement.textContent);

    if (result.success) {
      showNotification('Discount applied successfully!', false);
      applyButton.textContent = 'Applied!';
      applyButton.disabled = true;
      discountInput.disabled = true;
    } else {
      showNotification('Please enter a valid discount code');
    }
  });

  removeButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    discountInput.value = '';
    discountInput.disabled = false;
    applyButton.textContent = 'Apply';
    applyButton.disabled = false;
    notification.classList.remove('show');

    updateTotal(discountData);
  });

  discountInput.addEventListener('input', () => {
    notification.classList.remove('show');
  });
};

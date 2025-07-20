const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');
const shippingElement = document.querySelector('[data-cart="shipping"] .total__value');
const totalElement = document.querySelector('[data-cart="total"] .total__value');
const checkAllCheckbox = document.querySelector('.cart__features-input[name="check_all"]');

function updateTotal() {
  const checkboxes = document.querySelectorAll('.cart__item-input');
  let total = 0;
  let allChecked = true;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const subtotal = checkbox.closest('.card__item').querySelector('.card__subtotal');
      total += parseFloat(subtotal.textContent.replace('$', ''));
    } else {
      allChecked = false;
    }
  });

  subtotalElement.textContent = `$${total.toFixed(2)}`;

  const shippingCostText = shippingElement.textContent;
  const shippingCost = shippingCostText === 'Free' ? 0 : parseFloat(shippingCostText.replace('$', ''));
  totalElement.textContent = `$${(total + shippingCost).toFixed(2)}`;

  checkAllCheckbox.checked = allChecked;
}

export { updateTotal };

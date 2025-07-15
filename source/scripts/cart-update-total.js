const subtotalElements = document.querySelectorAll('.card__subtotal');
const totalValue = document.querySelector('.total__value');
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

  subtotalElements.textContent = `$${total.toFixed(2)}`;
  totalValue.textContent = `$${total.toFixed(2)}`;

  checkAllCheckbox.checked = allChecked;
}

export { updateTotal };

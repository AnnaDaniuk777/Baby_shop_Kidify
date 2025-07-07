function setupCartTotal() {
  const checkboxes = document.querySelectorAll('.cart__item-input');
  const checkAllCheckbox = document.querySelector('.cart__features-input[name="check_all"]');
  const updateCartButton = document.querySelector('.cart__update-button');
  const continueShoppingButton = document.querySelectorAll('.cart__link-button');
  const subtotalElement = document.closest('.card__item').querySelector('.card__subtotal');
  const totalValue = document.querySelectorAll('.total__value');
  let allChecked = true;
  let total = 0;

  const updateTotal = () => {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        total += parseFloat(subtotalElement.textContent.replace('$', ''));
      } else {
        allChecked = false;
      }
    });

    totalValue.forEach((element) => {
      element.textContent = `$${total.toFixed(2)}`;
    });

    checkAllCheckbox.checked = allChecked;
    checkAllCheckbox.indeterminate = !allChecked && Array.from(checkboxes).filter((checkbox) => checkbox.checked);
  };

  const handleSelectAll = (evt) => {
    const isChecked = evt.target.checked;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    updateTotal();
  };

  const handleItemCheckboxChange = () => {
    updateTotal();
  };

  const handleContinueShopping = () => {
    window.location.href = 'catalog.html';
  };

  const initEvents = () => {
    checkAllCheckbox.addEventListener('change', handleSelectAll);
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', handleItemCheckboxChange);
    });

    if (continueShoppingButton) {
      updateCartButton.addEventListener('click', handleContinueShopping);
    }
  };

  initEvents();
  updateTotal();
}

export { setupCartTotal };

import { updateTotal } from './cart-update-total.js';

function setupCartTotal() {
  const checkboxes = document.querySelectorAll('.cart__item-input');
  const checkAllCheckbox = document.querySelector('.cart__features-input[name="check_all"]');

  const handlerSelectAll = (evt) => {
    const isChecked = evt.target.checked;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    updateTotal();
  };

  const handlerItemCheckboxChange = () => {
    updateTotal();
  };

  const initEvents = () => {
    if (checkAllCheckbox) {
      checkAllCheckbox.addEventListener('change', handlerSelectAll);
    }

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', handlerItemCheckboxChange);
    });
  };

  initEvents();
  updateTotal();
}

function setupUpdateCartButton(updateTotal) {
  const updateCartButton = document.querySelector('.cart__update-button');

  if (updateCartButton) {
    updateCartButton.addEventListener('click', () => {
      const cartItems = document.querySelectorAll('.card__item');

      cartItems.forEach((item) => {
        const checkbox = item.querySelector('.cart__item-input');
        if (!checkbox.checked) {
          item.remove();
        }
      });

      updateTotal();
    });
  }
}


export { setupCartTotal, setupUpdateCartButton };

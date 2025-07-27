import { initContactsToggle } from './contacts-toggle.js';
import { initMobileMenu } from './mobile-menu.js';
import { initCart } from './remove-cart-item.js';
import { setupQuantityControl } from './cart-setup-quantity.js';
import { setupCartTotal, setupUpdateCartButton } from './cart-setup-total.js';
import { updateCartCounter } from './cart-icon-quantity-update.js';
import { getShippingData, getDiscountData } from './get-data.js';
import { updateTotal } from './cart-update-total.js';

async function getData() {
  try {
    const [shippingData, discountData] = await Promise.all([
      getShippingData(),
      getDiscountData()
    ]);
    console.log([shippingData, discountData]);

    updateTotal(shippingData, discountData);
    initCart(shippingData, discountData);
    setupQuantityControl(shippingData, discountData);
    setupCartTotal(shippingData, discountData);
    setupUpdateCartButton(shippingData, discountData);

  } catch (error) {
    console.log('Error initializing app:', error);
  }
}

getData();
initContactsToggle();
initMobileMenu();
updateCartCounter();

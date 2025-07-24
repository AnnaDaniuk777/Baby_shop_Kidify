import { initContactsToggle } from './contacts-toggle.js';
import { initMobileMenu } from './mobile-menu.js';
import { initCart } from './remove-cart-item.js';
import { setupQuantityControl } from './cart-setup-quantity.js';
import { setupCartTotal, setupUpdateCartButton } from './cart-setup-total.js';
import { initShippingCalculator } from './shipping-calculator.js';
import { initDiscountCalculator } from './discount-calculator.js';
import { updateCartCounter } from './cart-icon-quantity-update.js';
import { getShippingData, getDiscountData } from './get-data.js';

const initApp = async () => {
  try {
    initContactsToggle();
    initMobileMenu();
    initCart();
    setupQuantityControl();
    setupCartTotal();
    setupUpdateCartButton();
    updateCartCounter();

    const [shippingData, discountData] = await Promise.all([
      getShippingData(),
      getDiscountData()
    ]);

    initShippingCalculator(shippingData);
    initDiscountCalculator(discountData);

  } catch (error) {
    console.log('Error initializing app:', error);
  }
};

initApp();

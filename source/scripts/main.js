import { initContactsToggle } from './contacts-toggle.js';
import { initMobileMenu } from './mobile-menu.js';
import { initCart } from './remove-cart-item.js';
import { setupQuantityControl } from './cart-setup-quantity.js';
import { setupCartTotal, setupUpdateCartButton } from './cart-setup-total.js';
import { initShippingCalculator } from './shipping-calculator.js';
import { applyDiscount } from './discount-calculator.js';
import { updateCartTotal } from './cart-icon-quantity-update.js';

initContactsToggle();
initMobileMenu();
initCart();
setupQuantityControl();
setupCartTotal();
setupUpdateCartButton();
initShippingCalculator();
applyDiscount();
updateCartTotal();

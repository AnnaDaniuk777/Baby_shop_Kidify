const countrySelect = document.querySelector('.shipping__select');
const shippingText = document.querySelector('.shipping__text');
const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');
const shippingElement = document.querySelector('[data-cart="shipping"] .total__value');
const totalElement = document.querySelector('[data-cart="total"] .total__value');
const estimateCountryElement = document.querySelector('[data-cart="country"] .total__value');

let currentShippingData = null;

export function updateShipping() {
  const selectedCountry = countrySelect.value;
  const option = currentShippingData.shippingOptions.find((opt) => opt.country === selectedCountry);

  estimateCountryElement.textContent = selectedCountry;

  const subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.]/g, ''));
  let shippingCost = 0;
  let shippingTextContent = 'Free';

  if (option) {
    shippingText.textContent = option.displayText || `Flat rate: ${option.baseRate}%`;

    if (subtotal < option.minOrderForFreeShipping) {
      shippingCost = (subtotal * option.baseRate / 100) + option.additionalFees;
      shippingTextContent = `$${shippingCost.toFixed(2)}`;
    }
  } else {
    shippingText.textContent = 'Flat rate: 5%';
  }

  shippingElement.textContent = shippingTextContent;
  totalElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
}

export function initShippingCalculator(shippingData) {
  currentShippingData = shippingData;
  estimateCountryElement.textContent = countrySelect.value;
  countrySelect.addEventListener('change', updateShipping);
  updateShipping();

  return updateShipping;
}

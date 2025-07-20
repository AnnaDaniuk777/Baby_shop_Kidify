async function initShippingCalculator() {
  try {
    const countrySelect = document.querySelector('.shipping__select');
    const shippingText = document.querySelector('.shipping__text');
    const subtotalElement = document.querySelector('[data-cart="subtotal"] .total__value');
    const shippingElement = document.querySelector('[data-cart="shipping"] .total__value');
    const totalElement = document.querySelector('[data-cart="total"] .total__value');
    const estimateCountryElement = document.querySelector('[data-cart="country"] .total__value');

    const response = await fetch('./scripts/shipping-data.json');
    const data = await response.json();

    estimateCountryElement.textContent = countrySelect.value;

    const updateShipping = () => {
      const selectedCountry = countrySelect.value;
      const option = data.shippingOptions.find((opt) => opt.country === selectedCountry);

      estimateCountryElement.textContent = selectedCountry;
      shippingText.textContent = option ? option.displayText : 'Flat rate: 5%';

      const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
      let shippingCost = 0;
      let shippingTextContent = 'Free';

      if (option) {
        estimateCountryElement.textContent = selectedCountry;
        if (subtotal < option.minOrderForFreeShipping) {
          shippingCost = (subtotal * option.baseRate / 100) + option.additionalFees;
          shippingTextContent = `$${shippingCost.toFixed(2)}`;
        }

        shippingText.textContent = option.displayText || `Flat rate: ${option.baseRate}%`;
      }

      shippingElement.textContent = shippingTextContent;
      const total = subtotal + shippingCost;
      totalElement.textContent = `$${total.toFixed(2)}`;
    };

    countrySelect.addEventListener('change', updateShipping);
    updateShipping();

  } catch (error) {
    console.log('Error loading shipping data:', error);
  }
}

export { initShippingCalculator };

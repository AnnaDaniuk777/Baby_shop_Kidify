async function initShippingCalculator() {
  try {
    const countrySelect = document.querySelector('.shipping__select');
    const shippingText = document.querySelector('.shipping__text');
    const subtotalElement = document.querySelector('.total__value:first-child');
    const shippingElement = document.querySelector('.total__item:nth-child(2) .total__value');
    const totalElement = document.querySelector('.total__item:last-child .total__value');
    const estimateCountryElement = document.querySelector('.total__item:nth-child(3) .total__value');

    const response = await fetch('./shipping-data.json');
    const data = await response.json();

    const updateShipping = () => {
      const selectedCountry = countrySelect.value;
      const option = data.shippingOptions.find((opt) => opt.country === selectedCountry);
      shippingText.textContent = option?.displayText || 'Flat rate: 5%';

      const subtotal = parseFloat(subtotalElement.textContent.replace('$', '')) || 0;
      let shippingCost = 0;
      let shippingTextContent = 'Free';

      if (option) {
        estimateCountryElement.textContent = selectedCountry;
        if (subtotal < option.minOrderForFreeShipping) {
          shippingCost = (subtotal * option.baseRate / 100) + option.additionalFees;
          shippingTextContent = `$${ shippingCost.toFixed(2) }`;
        }

        shippingText.textContent = option.displayText || `Flat rate: ${option.baseRate}%`;
      }

      shippingElement.textContent = shippingTextContent;
      const total = subtotal + shippingCost;
      totalElement.textContent = `$${total.toFixed(2)}`;
    };

    countrySelect.addEventListener('change', updateShipping);

  } catch (error) {
    console.log('Error loading shipping data:', error);
  }
}

export { initShippingCalculator };

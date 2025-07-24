async function getShippingData() {
  const response = await fetch('./scripts/shipping-data.json');
  if (!response.ok) {
    throw new Error('Failed to load shipping data');
  }

  return await response.json();
}

async function getDiscountData() {
  const response = await fetch('./scripts/discount-data.json');
  if (!response.ok) {
    throw new Error('Failed to load discount data');
  }

  return await response.json();
}

export { getShippingData, getDiscountData };

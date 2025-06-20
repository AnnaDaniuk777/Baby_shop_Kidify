function removeCartItem (evt) {
  const cardItem = evt.target.closest('.card__item');

  setTimeout(() => {
    cardItem.remove();
  }, 500);
}

function initCart () {
  const deleteButtons = document.querySelectorAll('.card__delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', removeCartItem);
  });
}

export { initCart };

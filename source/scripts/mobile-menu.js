function initMobileMenu() {
  const burgerButton = document.querySelector('.header-mobile__burger');
  const closeButton = document.querySelector('.header-mobile__burger--close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');

  function openMenu() {
    mobileMenu.classList.remove('mobile-menu--closed');
    overlay.classList.remove('overlay--closed');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('mobile-menu--closed');
    overlay.classList.add('overlay--closed');
    document.body.style.overflow = '';
  }

  burgerButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !mobileMenu.classList.contains('mobile-menu--closed')) {
      closeMenu();
    }
  });
}

export { initMobileMenu };

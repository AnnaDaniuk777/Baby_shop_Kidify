function initMobileMenu() {
  const burgerButton = document.querySelector('.header-mobile__burger');
  const closeButton = document.querySelector('.header-mobile__burger--close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlayMenu = document.querySelector('.overlay--menu');
  const body = document.body;

  function openMenu() {
    mobileMenu.classList.remove('mobile-menu--closed');
    if (overlayMenu) {
      overlayMenu.classList.remove('overlay--closed');
      body.style.overflow = 'hidden';
    }
    body.classList.add('open-menu');
  }

  function closeMenu() {
    mobileMenu.classList.add('mobile-menu--closed');
    if (overlayMenu) {
      overlayMenu.classList.add('overlay--closed');
      body.style.overflow = '';
    }
    body.classList.remove('open-menu');
  }

  function isMobileView() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  burgerButton.addEventListener('click', () => {
    if (isMobileView()) {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  if (overlayMenu) {
    overlayMenu.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !mobileMenu.classList.contains('mobile-menu--closed') && isMobileView()) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobileView() && !mobileMenu.classList.contains('mobile-menu--closed')) {
      closeMenu();
    }
  });
}

function initModals() {
  const body = document.body;
  const modalOverlay = document.querySelector('.overlay--modal');

  function openModal() {
    body.classList.add('open-modal');
    modalOverlay.classList.remove('overlay--closed');
  }

  function closeModal() {
    body.classList.remove('open-modal');
    modalOverlay.classList.add('overlay--closed');
  }

  return { openModal, closeModal };
}

export { initMobileMenu, initModals };

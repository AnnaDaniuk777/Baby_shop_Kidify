function initContactsToggle() {
  const contactsTitles = document.querySelectorAll('.contacts__title');

  contactsTitles.forEach((title) => {
    const list = title.nextElementSibling;

    title.classList.add('contacts__title--toggle');
    list.classList.add('contacts__list--collapse');

    title.addEventListener('click', () => {
      list.classList.toggle('contacts__list--collapse');
      title.classList.toggle('contacts__title--active');
    });
  });
}

export { initContactsToggle };

// Меню бургер
const burger = () => {
  const menuIcon = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  if (menuIcon) {
    menuIcon.addEventListener('click', function () {
      document.body.classList.toggle('_lock');
      menuIcon.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
  }
};

export default burger;

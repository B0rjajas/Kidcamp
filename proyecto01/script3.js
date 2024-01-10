const button = document.querySelector('.button-18');
const enlaces = document.querySelector('.enlaces');

button.addEventListener('click', () => {
  enlaces.classList.toggle('activo');
});
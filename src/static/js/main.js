// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    document.querySelector('header')
        .classList.toggle('sticky', window.scrollY > 0);
});

const light = localStorage.getItem('LightTheme');
if (light === 'true') {
  document.body.style.background = 'white';
}

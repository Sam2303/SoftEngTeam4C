// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    document.querySelector('header')
        .classList.toggle('sticky', window.scrollY > 0);
});

// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    document.querySelector('header')
        .classList.toggle('sticky', window.scrollY > 0);
});


let light = localStorage.getItem('LightTheme');
if(light === 'true'){
  document.body.style.background = 'white';

}
else if(light === 'false'){

}

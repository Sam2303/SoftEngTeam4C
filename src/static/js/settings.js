// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});


let LDBtn = document.getElementById('lightOrDarkBtn');
LDBtn.addEventListener('click', (event) => {
  location.reload;
  if((event).target.checked){
      console.log('checked');
      localStorage.setItem('LightTheme', 'true');
  }
  else{
    localStorage.setItem('LightTheme', 'false');
  }
});

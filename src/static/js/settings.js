// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});


let LDBtn = document.getElementById('lightOrDarkBtn');
LDBtn.addEventListener('click', (event) => {
  if((event).target.checked){
      console.log('checked');

      document.body.style.background = 'white';
      
  }
  else{
    location.reload();
  }
});

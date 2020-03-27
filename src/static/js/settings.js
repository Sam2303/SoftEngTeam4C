let LDBtn = document.getElementById('lightOrDarkBtn');
LDBtn.addEventListener('click', (event) => {
  if(event.target.checked){
      localStorage.setItem('LightTheme', 'true');
  }
  else{
    localStorage.setItem('LightTheme', 'false');
  }
  location.reload;
});

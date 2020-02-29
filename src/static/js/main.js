'use strict';


window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});


$('.search-button').click(function(){
  $(this).parent().toggleClass('open');
});

// Fetching from servr
// const fetch = require('node-fetch');

// Setting up a new user / registering
// fetch("../database.js", {
//     insertUser(document.getElementById('email'), document.getElementById(passwordHash));
// });


// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});




window.addEventListener('click', searchButton => {
    search();
    });
 async function search(){

   const searchTerm = document.getElementById('search').value;
   console.log(searchTerm);

    // The URL without an ID
    const baseUrl = '/api/question/search';

    // The ID of the search we want
    const url = baseUrl + searchTerm;

    const response = await fetch(url, {method: 'GET'});
    const returned = await response.json();

    window.loaction.href = 'questions.html';
    console.log('you have been redirected');

    if (returned.success === true) {
        const newSearchId = returned.id;
    } else {
        //
    }
  }

document.querySelector('#searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('search').value;
    console.log(`Using searchTerm: ${searchTerm}`);

    const response = await fetch(
        `/api/question/search?searchText=${searchTerm}`,
        { method: 'GET' },
    );
    const returned = await response.json();

    if (returned.success === true) {
        // TODO: How is the newSearchId going to be passed to questions.html?
        const newSearchId = returned.id;

        window.location.href = 'questions.html';
    } else {
        console.warn('Something went wrong with the search');
    }
});

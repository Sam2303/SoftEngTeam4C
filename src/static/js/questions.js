const submit_but = document.getElementById('submit-button');

submit_but.addEventListener('click', async () => {
    console.log('Clicked');

    const url = '/api/question';

    const title = document.getElementById('title').value;
    const question = document.getElementById('question').value;

    const data = {
        text: question,
        title,
    };

    const submit_response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const returned = await submit_response.json();

    if (returned.success === true) {
        console.log(`Your question has been submitted with the ID ${returned.id}`);
    } else {
        console.log('There has been an error');
    }
});


// Fetch the 5 most recent questions from server
window.onload = async () => {
    // Search without parameter orders by date
    const response = await fetch('/api/question/search', { method: 'GET' });
    const questions = await response.json();

    for (const question of questions) {
        const qelement = document.createElement('div');
        qelement.id = `question${i}`;

        const qtitle = document.createElement('h2');
        qtitle.textContent = "title"; // question.title;
        qtitle.class = 'qtitle';
        qtitle.href = `test`;

        qelement.appendChild(qtitle);
        document.getElementById('list-questions').appendChild(qelement);
    }
};

const currentPathSplit = window.location.href.split('?id=');
const questionId = currentPathSplit.pop();

window.addEventListener('load', async () => {
    if (questionId === undefined || questionId === '') {
        return;
    }

    const response = await fetch(`/api/question?id=${questionId}`);
    const questionData = await response.json();

    const response2 = await fetch(`/api/question/answers?id=${questionId}`);
    const answerData = await response2.json();

    if (questionData.success === false || answerData.success === false) {
        return;
    }

    const titleE = document.querySelector('#title');
    const textE = document.querySelector('#text');

    titleE.textContent = questionData.title;
    textE.textContent = questionData.text;

    const answerDiv = document.querySelector('#answers');

    for (const answer of answerData.answers) {
        const newP = document.createElement('p');
        newP.textContent = answer.text;
        answerDiv.appendChild(newP);
    }
});

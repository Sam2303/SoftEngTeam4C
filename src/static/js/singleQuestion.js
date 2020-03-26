const questionId = window.location.href.split('?id=').pop();

async function upvote(answerId, thumb, voteText, sendToServer = true) {
    // Hide upvote button, turn upvote text green.
    // Set sendToServer to true to send an upvote to the server.

    thumb.style.display = 'none';

    const voteCount = Number(voteText.textContent);
    voteText.textContent = voteCount + 1;
    voteText.style.color = 'green';

    if (sendToServer) {
        await fetch('/api/answer/vote', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: answerId, upvote: true }),
        });
    }
}

window.addEventListener('load', async () => {
    if (questionId === undefined || questionId === '') {
        return;
    }

    const qResponse = await fetch(`/api/question?id=${questionId}`);
    const aResponse = await fetch(`/api/question/answers?id=${questionId}`);

    const questionData = await qResponse.json();
    const answerData = await aResponse.json();

    if (questionData.success === false || answerData.success === false) {
        return;
    }

    const titleE = document.querySelector('#title');
    const textE = document.querySelector('#text');

    titleE.textContent = questionData.title;
    textE.textContent = questionData.text;

    // eslint-disable-next-line no-restricted-syntax
    for (const answer of answerData.answers) {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'answers';
        containerDiv.id = 'answers';

        const text = document.createElement('p');
        text.id = 'answer';
        text.textContent = answer.text;

        const thumb = document.createElement('i');
        thumb.className = 'fa fa-thumbs-up';

        const voteText = document.createElement('p');
        voteText.id = 'vote';
        voteText.textContent = answer.score;

        thumb.addEventListener('click', async () => {
            await upvote(answer.id, thumb, voteText);
        });

        containerDiv.appendChild(text);
        containerDiv.appendChild(thumb);
        containerDiv.appendChild(voteText);

        document.body.appendChild(containerDiv);

        // If user has already upvoted this answer, call upvote on the element
        if (answer.currentUserHasVoted) {
            // eslint-disable-next-line no-await-in-loop
            await upvote(answer.id, thumb, voteText, false);
        }
    }
});

const submitAnswerBtn = document.querySelector('#submit-answer-button');
submitAnswerBtn.addEventListener('click', async () => {
    const answerText = document.getElementById('answer-input').value;
    if (answerText.trim() === '') {
        return;
    }

    const data = {
        question_id: Number(questionId),
        text: answerText,
    };
    const submit_response = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const returned = await submit_response.json();

    if (returned.success === true) {
        console.log('Your answer has been submitted');
        window.location.reload();
    } else {
        console.log('There has been an error');
    }
});

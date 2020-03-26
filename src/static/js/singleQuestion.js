const questionId = window.location.href.split('?id=').pop();

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
        thumb.addEventListener('click', (event) => {

        });

        const voteText = document.createElement('p');
        voteText.id = 'vote';
        voteText.textContent = answer.score;

        containerDiv.appendChild(text);
        containerDiv.appendChild(thumb);
        containerDiv.appendChild(voteText);

        document.body.appendChild(containerDiv);

    }
});

const submitAnswerBtn = document.querySelector('#submit-answer-button');
submitAnswerBtn.addEventListener('click', async () => {
    const answerText = document.getElementById('answer').value;
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
        console.log(`Your answer has been submitted`);
        window.location.reload();
    } else {
        console.log('There has been an error');
    }
});

// TODO:
// function stuff() {
//     const score = document.getElementById("scoreCounter");
//     score.innerHTML = "0";
//     const scoreValue = 0;
//     checkScore();
//
//     function upVote() {
//         scoreValue++;
//         score.innerHTML = scoreValue;
//         checkScore();
//     }
//
//     function downVote() {
//         scoreValue--;
//         score.innerHTML = scoreValue;
//         checkScore();
//     }
//
//     function checkScore() {
//         if (scoreValue < 0) {
//             score.style.color = "#FF586C";
//         } else if (scoreValue > 0) {
//             score.style.color = "#6CC576";
//         } else {
//             score.style.color = "#666666";
//         }
//     }
// }


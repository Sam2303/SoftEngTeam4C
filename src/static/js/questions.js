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
window.onload = () => {
    for (let i = 1; i <= 5; i++) {
        // creation of the div tag
        const qelement = document.createElement('div');
        qelement.id = `question${i}`;
        qelement.appendChild(document.createTextNode(''));
        document.getElementById('list-questions').appendChild(qelement);

        // creation and input of the h2 tag
        const qtitle = document.createElement('h2');

        // needs to be changed to actual title of questions
        qtitle.textContent = 'Question Title';

        qtitle.id = 'qtitle';
        document.getElementById(`question${i}`).appendChild(qtitle);

        const arrow = document.createElement('img');
        arrow.id = `arrow${i}`;
        arrow.src = '../static/media/downArrow.png';
        arrow.style = 'max-width: 2%; max-height: 2%; margin-top: 3vh;';
        document.getElementById(`question${i}`).appendChild(arrow);
    }
};


// whole set of functions to make the question text and answers appear and dissapear when the arrow
// is clicked
// window.onload = wrappedClickedArrow();
//
// function wrappedClickedArrow() {
// // loop so that we can show to answers to the question when the down arrow is clicked
//     for (let i = 1; i <= 5; i++) {
//         // setting the variable for the arrow
//
//
//         const arrowBtn = document.getElementById(`arrow${i}`);
//
//         // function to see what arrow is clicked and what to do when the arrow is clicked
//         function clickedArrow() {
//             const qtext = document.createElement('p');
//             // needs to be changed to actual text of questions
//             qtext.textContent = 'question text';
//             qtext.id = 'qtext';
//
//
//             const answers = document.createElement('p');
//             answers.textContent = 'Answers';
//             answers.id = `answer${i}`;
//
//
//             const arrow = document.getElementById(`arrow${i}`);
//             document.getElementById(`question${i}`).insertBefore(qtext, arrow);
//             document.getElementById(`question${i}`).insertBefore(answers, arrow);
//
//             const arrowDelete = document.getElementById(`arrow${i}`);
//             arrowDelete.parentNode.removeChild(arrowDelete);
//
//             const upArrow = document.createElement('img');
//             upArrow.id = `upArrow${i}`;
//             upArrow.src = '../static/media/upArrow.png';
//             upArrow.style = 'max-width: 2%; max-height: 2%; margin-top: 3vh;';
//             document.getElementById(`question${i}`).appendChild(upArrow);
//
//             clickedAgain();
//         }
//         // event listener to run the fucntion when the arrow is clicked
//         arrowBtn.addEventListener('click', clickedArrow);
//
//         function clickedAgain() {
//             const upArrowBtn = document.getElementById(`upArrow${i}`);
//
//             function clickedUpArrow() {
//                 const DqText = document.getElementById('qtext');
//                 DqText.parentNode.removeChild(DqText);
//
//                 const DAnswers = document.getElementById(`answer${i}`);
//                 DAnswers.parentNode.removeChild(DAnswers);
//
//                 const DUpArrow = document.getElementById(`upArrow${i}`);
//                 DUpArrow.parentNode.removeChild(DUpArrow);
//
//                 const arrow = document.createElement('img');
//                 arrow.id = `arrow${i}`;
//                 arrow.src = '../static/media/downArrow.png';
//                 arrow.style = 'max-width: 2%; max-height: 2%; margin-top: 3vh;';
//                 document.getElementById(`question${i}`).appendChild(arrow);
//
//                 wrappedClickedArrow();
//             }
//             upArrowBtn.addEventListener('click', clickedUpArrow);
//         }
//     }
// }

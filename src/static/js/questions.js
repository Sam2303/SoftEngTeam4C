// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

const submit_but = document.getElementById('submit-button');
    // in this case we're using the 'click' event
    submit_but.addEventListener('click', async () => {
        // The API route
        const url = '/api/question';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the title and question input boxes
        let title = document.getElementById('title').value;
        let question = document.getElementById('question').value;
        const data = {
            text: question,
            title: title,
        };
        const submit_response = await fetch(url, {
            method: 'POST', // Send a POST request
            headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
            body: JSON.stringify(data), // Data type must match "Content-Type" header
        });
        // Get the JSON data from the response
        const returned = await submit_response.json();

        // Check if it worked
        if (returned.success === true) {
            // redirect to questions.html
            window.location.href = 'questions.html';
            console.log("Your question has been submitted");

            let number = 0;
            const id = number++;

            const url = baseUrl + id;

            const response = await fetch(url, {method: 'GET'});
            const returned = await response.json();

            if (returned.success === true) {
                const newQuestionId = returned.id;
            }
        } else {
            console.log('There has been an error');

        }
    });




// Question Loop, Fetch the questions from server, only 5 at a time
window.onload = questionLoop();

// function to load the questions for the page

function questionLoop(){

  // a loop to stop repeated code and ease
  for(let i = 1; i <= 5; i++){
    //creation of the div tag
    let qelement = document.createElement('div');
    qelement.id = 'question' + i;
    qelement.appendChild(document.createTextNode(''));
    document.getElementById('list-questions').appendChild(qelement);

    // creation and input of the h2 tag
    let qtitle = document.createElement('h2');

    qtitle.textContent = 'Question Title'; // needs to be changed to actual title of questions

    qtitle.id = 'qtitle';
    document.getElementById('question' + i).appendChild(qtitle);

    let arrow = document.createElement('img');
    arrow.id = 'arrow'+i;
    arrow.src = '../static/media/downArrow.png';
    arrow.style = 'max-width: 2%; max-height: 2%; margin-top: 3vh;'
    document.getElementById('question'+i).appendChild(arrow);

  }
}



// whole set of functions to make the question text and answers appear and dissapear when the arrow is clicked
window.onload = wrappedClickedArrow;

function wrappedClickedArrow(){
// loop so that we can show to answers to the question when the down arrow is clicked
for(let i = 1; i <= 5; i++){
// setting the variable for the arrow


  let arrowBtn = document.getElementById('arrow' + i);

// function to see what arrow is clicked and what to do when the arrow is clicked
  function clickedArrow(){

          let qtext = document.createElement('p');
          qtext.textContent = 'question text'; // needs to be changed to actual text of questions
          qtext.id = 'qtext';

// going to have to loop this so we get every answer!!!!!!!!!!!
          let answers = document.createElement('p');
          answers.textContent = 'Answers';
          answers.id = 'answer' + i;


          let arrow = document.getElementById('arrow'+i);
          document.getElementById('question' + i).insertBefore(qtext, arrow);
          document.getElementById('question' + i).insertBefore(answers, arrow);

          let arrowDelete = document.getElementById('arrow'+i);
          arrowDelete.parentNode.removeChild(arrowDelete);

          let upArrow = document.createElement('img');
          upArrow.id = 'upArrow' + i;
          upArrow.src = '../static/media/upArrow.png';
          upArrow.style = 'max-width: 2%; max-height: 2%; margin-top: 3vh;'
          document.getElementById('question'+i).appendChild(upArrow);

          clickedAgain();
}
// event listener to run the fucntion when the arrow is clicked
  arrowBtn.addEventListener('click', clickedArrow);

function clickedAgain(){


  let upArrowBtn = document.getElementById('upArrow'+i);

  function clickedUpArrow(){

    let DqText = document.getElementById('qtext');
    DqText.parentNode.removeChild(DqText);

    let DAnswers = document.getElementById('answer'+i);
    DAnswers.parentNode.removeChild(DAnswers);

    let DUpArrow = document.getElementById('upArrow'+i);
    DUpArrow.parentNode.removeChild(DUpArrow);

    let arrow = document.createElement('img');
    arrow.id = 'arrow'+i;
    arrow.src = '../static/media/downArrow.png';
    arrow.style = 'max-width: 2%; max-height: 2%; margin-top: 3vh;'
    document.getElementById('question'+i).appendChild(arrow);

    wrappedClickedArrow();
  }
  upArrowBtn.addEventListener('click', clickedUpArrow);
}
}
}

// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});


// elements we wish to add the event listener to.
const elements = document.getElementsByClassName('login-button');

// for each element we attach the event listener.
Object.values(elements).forEach((element) => {
    // in this case we're using the 'click' event
    element.addEventListener('click', async () => {
        // The API route
        const url = '/api/auth/login';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the email and password input boxes
        let email = document.body.getElementById('email').value;
        let password = document.body.getElementById('password').value;
        const data = {
            email: email,
            password: password,
        };

        // Fetch returns a response object that tells us different things about the response
        const response = await fetch(url, {
            method: 'POST', // Send a POST request
            headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
            body: JSON.stringify(data), // Data type must match "Content-Type" header
        });

        // Get the JSON data from the response
        const returned = await response.json();

        // Check if it worked
        if (returned.success === true) {
            // redirect to homepage.html
            window.location.href = 'homepage.html';
            console.log("You're logged in!");
        } else {
            console.log('Failed to log in!');
        }
    });
});

// elements we wish to add the event listener to.
const registerElements = document.getElementsByClassName('reg-button');
Object.values(registerElements).forEach((registerElements) => {
    // in this case we're using the 'click' event
    element.addEventListener('click', async () => {
        // The API route
        const url = '/api/auth/register';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the email and password input boxes
        let reg_email = document.body.getElementById('reg-email').value;
        let reg_password = document.body.getElementById('reg-password').value;
        const data = {
            email: reg_email,
            password: reg_password,
        };

        const reg_response = await fetch(url, {
            method: 'POST', // Send a POST request
            headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
            body: JSON.stringify(data), // Data type must match "Content-Type" header
        });
        // Get the JSON data from the response
        const returned = await reg_response.json();

        // Check if it worked
        if (returned.success === true) {
            // redirect to homepage.html
            window.location.href = 'homepage.html';
            console.log("You're registered");
        } else {
            console.log('Failed to register');
        }
    });
});

const submit_but = document.getElementById('submit-button');
    // in this case we're using the 'click' event
    submit_but.addEventListener('click', async () => {
        // The API route
        const url = '/api/question';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the title and question input boxes
        let title = document.body.getElementById('title').value;
        let question = document.body.getElementById('question').value;
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
            // redirect to pages.html
            window.location.href = 'pages.html';
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
let title = document.createElement("h2");
title.textContent = "Question Title";
title.id = "qtitle";


let text = document.createElement("p");
text.textContent = "Actual Question Text";
text.id = "qtext";


window.onload = questionLoop();





function questionLoop(){
  for(let i = 1; i <= 5; i++){
    let element = document.createElement('div');
    element.id = 'question' + i;
    element.appendChild(document.createTextNode(''));
    document.getElementById('list-questions').appendChild(element);

    let title = document.createElement('h2');
    title.textContent = 'Question Title';
    title.id = 'qtitle';
    document.getElementById('question' + i).appendChild(title);

    let text = document.createElement('p');
    text.textContent = 'question text';
    text.id = 'qtext';
    document.getElementById('question' + i).appendChild(text);
  }
}

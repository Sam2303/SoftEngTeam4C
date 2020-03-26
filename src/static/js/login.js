const elements = document.getElementsByClassName('login-button');

// for each element attach the event listener.
Object.values(elements).forEach((element) => {
    element.addEventListener('click', async () => {
        // The API route
        const url = '/api/auth/login';

        // The data we want to send
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = {
            email,
            password,
        };

        const response = await fetch(url, {
            method: 'POST', // Send a POST request
            headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
            body: JSON.stringify(data), // Data type must match "Content-Type" header
        });

        // Get the JSON data from the response
        const returned = await response.json();

        // Check if it worked
        if (returned.success === true) {
            console.log("You're logged in!");
            // redirect to homepage.html
            window.location.href = 'homepage.html';
        } else {
            console.log('Failed to log in!');
        }
    });
});

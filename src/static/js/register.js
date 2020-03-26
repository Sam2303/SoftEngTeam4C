const registerElements = document.getElementsByClassName('register-button');

Object.values(registerElements).forEach((element) => {
    element.addEventListener('click', async () => {
        // The API route
        const url = '/api/auth/register';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the email and password input boxes
        const reg_email = document.getElementById('email').value;
        const reg_password = document.getElementById('password').value;
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
            console.log("You're registered");
            window.location.href = 'homepage.html';
        } else {
            console.log('Failed to register');
        }
    });
});

# Software Engineering Theory and Practice (Coursework)

GitHub Username|Name|UP Number
-|-|-
Harry-Martin|Harry Martin|UP896106
psidex|Simon Jenner|UP897821
Sam200080|Sam Parsons|UP889823
SammyJC|Sam Clifton|UP880264
Bancsii|Daniel McKenna|UP846201
username|name|UPxxxxxx

## Installation / Running

- [Install and run PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/)
- [Install Node.js + NPM](https://nodejs.org/en/)
- `git clone` this repository
- `cd` to the `SoftEngTeam4C` directory that you just cloned
- Run the setup file using PostgreSQL:
    - `sudo -u postgres psql -f src/setup.sql` or equivalent command
- Install the required packages:
    - `npm i`
- Run the server:
    - `npm start`
- Visit `127.0.0.1:8080`

## Docs

We are using [jsdoc](https://jsdoc.app/)

Run `npm docgen` to regenerate the documentation currently in /docs

## Static files

Any and all files in the `SoftEngTeam4C/src/static/` directory are served from the route `/static`, for example the absolute path to `main.js` would be  `127.0.0.1:8080/static/js/main.js`

## API Routes

(WIP - not implemented in code *yet*)

This is a [REST API](https://restfulapi.net/).

For all routes except `/api/auth`, the user must be logged in.

The `auth` routes require client-side hashing of the password using SHA256. If a `password_hash` is provided but does not fit the structure of a SHA256 hash, the request will be rejected (SHA256 might be difficult to use client-side, could be easier to switch to something else?).

`POST` requests should have their data sent in the body (shown in the example), `GET` requests should have their data sent as url parameters, e.g. `/api/question?id=69`.

Verb|Path|Parameters|Description|Returns
-|-|-|-|-
POST|`/api/auth/login`|`{email: "", password_hash: ""}`|Log in| `{success: true\|false}`
POST|`/api/auth/register`|`{email: "", password_hash: ""}`|Register user| `{success: true\|false}`
POST|`/api/question`|`{text: ""}`|Submit a question|The ID of the newly created question - `{id: 0}`
GET|`/api/question`|`?id=0`|Get a questions details|`{text: "", date: "", user_id: 0}`
GET|`/api/question/answers`|`?id=0`|Get all answers for the given question ID|todo
POST|`/api/answer`|`{question_id: 0, text: ""}`|Submit an answer|todo

### Javascript Example

```javascript
// Define an asynchronous function as we want to use fetch, which is asynchronous
async function logInUser() {

    // The API route
    const url = "http://127.0.0.1:8080/api/auth/login";
    
    // The data we want to send
    // Credentials taken from SQL setup file
    const data = {
        email: "test-email@test.ac.uk",
        password_hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
    };
    
    // Fetch returns a response object that tells us different things about the response
    const response = await fetch(url, {
        method: 'POST', // Send a POST request
        headers: {'Content-Type': 'application/json'}, // Tell the server we are sending JSON
        body: JSON.stringify(data) // Data type must match "Content-Type" header
    });
    
    // Get the JSON data from the response
    const returned = await response.json();
    
    // Check if it worked
    if (returned["success"] === true) {
        // You are logged in now
        // At this point you would probably send the user to another page (like a home page)
    } else {
        // Login failed
    }

}
```

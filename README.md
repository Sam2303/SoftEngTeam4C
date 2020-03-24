# Software Engineering Theory and Practice (Coursework)

GitHub Username|Name|UP Number
-|-|-
Harry-Martin|Harry Martin|UP896106
psidex|Simon Jenner|UP897821
Sam200080|Sam Parsons|UP889823
SammyJC|Sam Clifton|UP880264
Bancsii|Daniel McKenna|UP846201
romelblair|Romel Blair|UP811440

## Installation / Running

- [Install and run PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/)
- [Install Node.js + NPM](https://nodejs.org/en/)
- `git clone` this repository
- `cd` to the `SoftEngTeam4C` directory that you just cloned
- Run the setup file using PostgreSQL:
  - `psql -f src/setup.sql` or equivalent command
- Install the required packages:
  - `npm i`
- Run the server:
  - `npm start`
- Visit `127.0.0.1:8080`

## Docs

We are using [jsdoc](https://jsdoc.app/)

Run `npm run docgen` to regenerate the documentation currently in /docs

## Testing

We are using [jest](https://jestjs.io/) as our jesting framework. Run `npm test` to run all the tests in `/tests`.

## Linter

We are using [eslint](https://eslint.org/) for automatic Javascript linting. Run `npm run lint` to lint.

## Static files

Any and all files in the `SoftEngTeam4C/src/static/` directory are served from the route `/static`, for example the absolute path to `main.js` would be  `127.0.0.1:8080/static/js/main.js`

## API Routes

- This is a [REST API](https://restfulapi.net/).
- For all routes except `/api/auth`, the user must be logged in.
- `POST` requests should have their data sent in the body (shown in the example), `GET` requests should have their data sent as url parameters, e.g. `/api/question?id=69`.
- ALL API routes will always return JSON, and will always have a `success` field in the returned body, indicating if the request was successful or not.

Verb|Path|Parameters|Description|Returns (includes example)
-|-|-|-|-
POST|`/api/auth/login`|`{email: "", password: ""}`|Log in|`{success: true\|false}`
POST|`/api/auth/register`|`{email: "", password: ""}`|Register user|`{success: true\|false}`
POST|`/api/question`|`{text: "", title: ""}`|Submit a question|The ID of the newly created question - `{success: true, id: 1}`
GET|`/api/question`|`?id=1`|Get a questions details|`{success: true, text: "", title: "", date: "", user_id: 1}`
GET|`/api/question/answers`|`?id=1`|Get all answers for the given question ID|A field with an array of objects, each containing `id`, `text`, `score`, and `user_id` - `{success: true, answers: [{...}, {...}, etc.]}`
GET|`/api/question/search`|`?searchText=Lorem+ipsum`|Get all question IDs ordered using textual search. An empty search term will return result ordered by date|`[{id: 1, title: "Lorem ipsum dolor sit"}, ...]`
POST|`/api/answer`|`{question_id: 1, text: ""}`|Submit an answer. After submitting you should refresh your answer list using the `question/answers` route|`{success: true\|false}`
PUT|`/api/answer/vote`|`{id: 1, upvote: true}`|Upvote / downvote an answer. The `upvote` field should be `true` if the user is upvoting, and `false` if the user is downvoting|The new score - `{success: true\|false, score: 1}``

### ToDo

- `/api/question/search`
  - Getting a list of question ID + titles based on a textual search
  - Getting a list of question ID + titles based on a date search

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
        password: "password"
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

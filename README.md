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

## Static files

Any and all files in the `SoftEngTeam4C/src/static/` directory are served from the route `/static`, for example the absolute path to `main.js` would be  `127.0.0.1:8080/static/js/main.js`

## API Routes

(WIP - not implemented in code *yet*)

This is a [REST API](https://restfulapi.net/).

For all routes except `/api/auth`, the user must be logged in.

The `auth` routes require client-side hashing of the password using SHA256. If a `password_hash` is provided but does not fit the structure of a SHA256 hash, the request will be rejected (SHA256 might be difficult to use client-side, could be easier to switch to something else?).

Verb|Path|Request Body|Description|Returns
-|-|-|-|-
POST|`/api/auth/login`|`{email: "", password_hash: ""}`|Log in|`{success: true|false}`
POST|`/api/auth/register`|`{email: "", password_hash: ""}`|Register user|`{success: true|false`
POST|`/api/question`|`{text: ""}`|Submit a question|The ID of the newly created question - `{id: 0}`
GET|`/api/question`|`{id: 0}`|Get a questions details|`{text: "", date: "", user_id: 0}`
GET|`/api/question/answers`|`{id: 0}`|Get all answers for the given question ID|todo
POST|`/api/answer`|`{question_id: 0, text: ""}`|Submit an answer|todo

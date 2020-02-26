const { Client } = require('pg');

const client = new Client({
    user: 'team4c',
    host: 'localhost',
    database: 'team4c',
    password: 'team4c',
});

/** Connect to the Postgres Database */
async function connect() {
    console.log('Attempting to connect to Database...');
    await client.connect();
    console.log('Connected to Database!');
}

/** Disconnect from the Postgres Database */
async function disconnect() {
    await client.end();
}

/**
 * Execute an SQL query.
 * @param {string} sql - The query to execute.
 */
async function query(sql) {
    return client.query(sql);
}

/**
 * Check if a given email & password combination are correct.
 * @param {string} email - The users Email.
 * @param {string} expectedPasswordHash - The SHA256 hash of the user's password.
 * @returns {number} - The user's ID or -1 if (the user does not exist | the password hash is wrong)
 */
async function checkUser(email, expectedPasswordHash) {
    const { rows } = await query(`
        SELECT password_hash, id FROM fpp_user
        WHERE email = '${email}';
    `);

    if (rows.length !== 0) { // email exists
        const [{ password_hash }] = rows;
        const [{ id }] = rows;
        if (password_hash === expectedPasswordHash) { // password hash matches?
            return id;
        }
    }
    return -1; // email does not exist
}

/**
 * Insert a new user into the database.
 * @param {string} email - The users Email.
 * @param {string} passwordHash  - The SH256 hash of the user's password
 * @returns {number} - The ID for the new user.
 */
async function insertUser(email, passwordHash) {
    const { rows } = await query(`
        INSERT INTO
            fpp_user(email, password_hash)
        VALUES(
            '${email}', '${passwordHash}'
        RETURNING
            id
        );
    `);
    const [{ id }] = rows;
    return id;
}

/**
 * Get the id for a given email.
 * @param {string} email - The users email.
 * @returns {number} The ID for that user.
 */
async function getId(email) {
    const { rows } = await query(`SELECT id from fpp_user WHERE email = '${email}';`);
    const [{ id }] = rows;
    return id;
}

/**
 * Insert a question text into the database.
 * @param {string} email - The users email.
 * @param {string} questionText - The text of the question to insert.
 */
async function insertQuestion(email, questionText) {
    await query(`
        INSERT INTO
            question(text, date, user_id)
        VALUES(
            '${questionText}', NOW(), ${await getId(email)}
        );
    `);
}

/**
 * Get the id and text for all questions.
 * @returns ?
 */
async function getQuestions() {
    // we probably don't want to get all of the questions at once, but this works for now.
    const { rows } = await query(`
    SELECT id, text FROM question;
    `);
    return rows; // [{id: 0, text: ''}, ...]
}

module.exports = {
    connect,
    disconnect,
    query,
    checkUser,
    insertUser,
    getId,
    insertQuestion,
    getQuestions,
};

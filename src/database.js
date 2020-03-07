const { Client } = require('pg');

/**
 * When writing postgres queries, use http://sqlformat.darold.net/ so they are
 * consistent and readable.
 */

const client = new Client({
    user: 'team4c',
    host: 'localhost',
    database: 'team4c',
    password: 'team4c',
});

/** Connect to the Postgres Database */
async function connect() {
    console.log('Attempting to connect to database...');
    await client.connect();
    console.log('Connected to database!');
}

/** Disconnect from the Postgres Database */
async function disconnect() {
    console.log('Disconnecting from database...');
    await client.end();
    console.log('Disconnected from database');
}

/**
 * Execute an SQL query.
 * @param {string} sql - The query to execute.
 * @returns What the client.query method returns for the given query.
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
        SELECT
            id,
            password_hash
        FROM
            fpp_user
        WHERE
            email = '${email}';
    `);

    if (rows.length === 1) {
        const [{ id, password_hash }] = rows;
        if (password_hash === expectedPasswordHash) {
            return id;
        }
    }

    return -1;
}

/**
 * Get the user id for a given email.
 * @param {string} email - The users email.
 * @returns {number} The ID for that user or -1 if user does not exist.
 */
async function getId(email) {
    const { rows } = await query(`
        SELECT
            id
        FROM
            fpp_user
        WHERE
            email = '${email}';
    `);

    if (rows.length === 1) {
        const [{ id }] = rows;
        return id;
    }
    return -1;
}

/**
 * Insert a new user into the database.
 * @param {string} email - The users Email.
 * @param {string} passwordHash  - The SH256 hash of the users password
 * @returns {number} - The ID for the new user, or -1 if the email is already in use,
 */
async function insertUser(email, passwordHash) {
    const idCheck = await getId(email);
    if (idCheck !== -1) {
        return -1;
    }

    const { rows } = await query(`
        INSERT INTO fpp_user (email, password_hash)
            VALUES ('${email}', '${passwordHash}')
        RETURNING
            id;
    `);

    const [{ id }] = rows;
    return id;
}

/**
 * Insert a question text into the database.
 * @param {number} userID - The users ID.
 * @param {string} questionText - The text of the question to insert.
 * @param {string} questionTitle - The title of the question to insert.
 * @returns {number} The ID for the newly inserted question.
 */
async function insertQuestion(userID, questionText, questionTitle) {
    const { rows } = query(`
        INSERT INTO question (text, title, date, user_id)
            VALUES ('${questionText}', '${questionTitle}', NOW(), $ userID)
         RETURNING
            id;
    `);

    const [{ id }] = rows;
    return id;
}

/**
 * Get the info for all questions stored in the db.
 * We probably don't want to get all of the questions at once, but this works for now.
 * @returns An array of objects, each containing the id, title, date, and text for each question.
 */
async function getQuestions() {
    return query(`
        SELECT
            id,
            title,
            date,
            text
        FROM
            question;
    `);
}

module.exports = {
    connect,
    disconnect,
    checkUser,
    insertUser,
    getId,
    insertQuestion,
    getQuestions,
};

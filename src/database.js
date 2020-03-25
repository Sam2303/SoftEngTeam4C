/** This module is for anything to do with interacting with the database.
 * @module database
 */

const { Client } = require('pg');

// When writing postgres queries, use http://sqlformat.darold.net/ for readability.

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
 * @param {number} userId - The users ID.
 * @param {string} questionText - The text of the question to insert.
 * @param {string} questionTitle - The title of the question to insert.
 * @returns {number} The ID for the newly inserted question.
 */
async function insertQuestion(userId, questionText, questionTitle) {
    const { rows } = await query(`
        INSERT INTO question (text, title, user_id)
            VALUES ('${questionText}', '${questionTitle}', ${userId})
         RETURNING
            id;
    `);

    console.log(rows)
    const [{ id }] = rows;
    return id;
}

/**
 * Get info for a specific question.
 * @param {number} id - The ID of the question to get.
 * @returns Array of strings in order: title, text, date. If the query fails, they are undefined.
 */
async function getQuestion(id) {
    const { rows } = await query(`
        SELECT
            title,
            text,
            date
        FROM
            question
        WHERE
            id = ${id};
    `);

    if (rows.length === 0) {
        return [];
        // return -1;
    }

    const [{ title, text, date }] = rows;
    return [title, text, date];
    // return 1;
}

/**
 * Determine if a question ID exists in the database or not.
 * @param {number} questionId - The ID to test.
 * @returns {boolean} If the question exists or not.
 */
async function validQuestionId(questionId) {
    const { rows } = await query(`
        SELECT
            id
        FROM
            question
        WHERE
            id = ${questionId};
    `);

    return rows.length !== 0;
}

/**
 * Get info for a specific question.
 * @param {number} id - The ID of the question with which to get the answers.
 * @returns {array} Array of Objects in the form {id: , text: , score: , user_id: }. If the query fails, the Objects are undefined.
 */
async function getAnswers(id) {
    const { rows } = await query(`
    SELECT
        id,
        text,
        score,
        user_id
    FROM
        answer
    WHERE
        question_id = ${id};
    `);

    return rows;
}

/**
 * Insert an answer for a question.
 * @param {number} userId - The ID of the user that is submitting this answer.
 * @param {number} questionId - The ID of the question that the answer is answering.
 * @param {string} text - The text of the answer.
 * @returns {undefined} Nothing.
 */
async function insertAnswer(userId, questionId, text) {
    await query(`
        INSERT INTO answer (text, user_id, question_id)
            VALUES ('${text}', ${userId}, ${questionId});
    `);
}

/**
 * Change the vote for an answer
 * @param {number} answerId - The ID of the answer to change.
 * @param {boolean} upvote - If true, the vote will +1, if false, the vote will -1.
 * @returns {number} The new score.
 */
async function voteOnAnswer(answerId, upvote) {
    const voteDifference = upvote ? 1 : -1;

    const { rows } = await query(`
    UPDATE answer
    SET score = (SELECT score FROM answer WHERE id = ${answerId}) + ${voteDifference}
    RETURNING score;
    `);

    return Object.values(rows[0])[0];
}

/**
 * Get question ids based on search
 * @param {string} searchText - The text to search against.
 * @returns array of objects with id and title properties
 */
async function searchQuestions(searchText) {
    // Textual search
    if (searchText !== '') {
        const { rows } = await query(`
        SELECT x.id, x.title FROM
        (
            SELECT similarity(title, '${searchText}') AS similarity, id, title
            FROM question
            ORDER BY similarity DESC
        ) as x;
        `);
        return rows;
    }
    // searchText is empty string, search all by date.
    // order by date without selecting date
    const { rows } = await query(`
    SELECT x.id, x.title FROM
    (
        SELECT id, title, date
        FROM question
        ORDER BY date DESC
    ) as x;
    `);
    return rows;
}

module.exports = {
    connect,
    disconnect,
    checkUser,
    insertUser,
    getId,
    insertQuestion,
    getQuestion,
    getAnswers,
    insertAnswer,
    validQuestionId,
    voteOnAnswer,
    searchQuestions,
};

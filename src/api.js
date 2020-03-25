/** This module implements all of the API routes for our server.
 * @module api
 */

const express = require('express');
const db = require('./database');
const utils = require('./utils');

const api = express.Router();

/**
 * This sends a response with a "501 Not Implemented" message.
 * @param res - The response variable from an express route.
 */
// eslint-disable-next-line no-unused-vars
function notImplemented(res) {
    res.status(501);
    res.send('501 Not Implemented');
}

/**
 * This route is used to log a user in.
 * If the login was successful, a cookie is set on the client which is attached to all future
 * requests. This means that to "log in" all you have to do is send a request to this route with
 * the correct details, and everything else will happen automatically.
 * @name Log In
 * @route {POST} /auth/login
 */
api.post('/auth/login', async (req, res) => {
    const { email: userEmail } = req.body;
    const { password } = req.body;

    if (!utils.isTextString(userEmail) || !utils.isTextString(password)) {
        await res.json({ success: false });
        return;
    }

    const passwordHash = utils.sha256(password);
    const userId = await db.checkUser(userEmail, passwordHash);

    if (userId === -1) {
        await res.json({ success: false });
    } else {
        req.session.loggedin = true;
        req.session.userId = userId;
        await res.json({ success: true });
    }
});

/**
 * This route is used to register a new user.
 * For the request to be valid, the email must be not already in the database, otherwise the
 * request will return {success: false}.
 * @name Register
 * @route {POST} /auth/register
 */
api.post('/auth/register', async (req, res) => {
    const { email: userEmail } = req.body;
    const { password } = req.body;

    if (!utils.isTextString(userEmail) || !utils.isTextString(password)) {
        await res.json({ success: false });
        return;
    }

    const userExists = await db.getId(userEmail);

    // -1 if user does not exist, we want it to be -1 if we are making a new user.
    if (userExists !== -1) {
        await res.json({ success: false });
    } else {
        const passwordHash = utils.sha256(password);
        const userId = await db.insertUser(userEmail, passwordHash);
        req.session.loggedin = true;
        req.session.userId = userId;
        await res.json({ success: true });
    }
});

/**
 * @name Submit question
 * @route {POST} /question
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @bodyparam {string} text - The questions text.
 * @bodyparam {string} title - The questions title.
 */
api.post('/question', async (req, res) => {
    if (req.session.loggedin !== true) {
        await res.json({ success: false });
        return;
    }

    const { text: qText } = req.body;
    const { title: qTitle } = req.body;

    if (!utils.isTextString(qText) || !utils.isTextString(qTitle)) {
        await res.json({ success: false });
    } else {
        const qId = await db.insertQuestion(req.session.userId, qText, qTitle);
        await res.json({ success: true, id: qId });
    }
});

/**
 * Get a questions details
 * @name Get question
 * @route {GET} /question
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @queryparam {number} id - The question id.
 */
api.get('/question', async (req, res) => {
    let { id: qId } = req.query;
    // Specify base 10.
    qId = parseInt(qId, 10);

    // If id was a string, isNaN will return true because of the cast above.
    if (req.session.loggedin !== true || Number.isNaN(qId)) {
        await res.json({ success: false });
        return;
    }

    const [title, text, date] = await db.getQuestion(qId);

    if (title === undefined) {
        // If the query failed (no question with that ID) then all 3 variables will be undefined.
        // Only need to check one to see if it worked or not.
        await res.json({ success: false });
    } else {
        await res.json({
            success: true,
            title,
            text,
            date,
        });
    }
});

/**
 * Get array of answers for a specific question
 * @name Get answers
 * @route {GET} /question/answers
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @queryparam {number} id - The question id.
 */
api.get('/question/answers', async (req, res) => {
    let { id: qId } = req.query;
    qId = parseInt(qId, 10);

    if (req.session.loggedin !== true || Number.isNaN(qId)) {
        await res.json({ success: false });
        return;
    }

    const answers = await db.getAnswers(qId);

    if (answers === []) {
        await res.json({ success: false });
    } else {
        await res.json({
            success: true,
            answers,
        });
    }
});

/**
 * Submit an answer for a question.
 * @name Submit answer
 * @route {POST} /answer
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @bodyparam {number} question_id - The ID of the question being answered.
 * @bodyparam {string} text - The answers text.
 */
api.post('/answer', async (req, res) => {
    if (req.session.loggedin !== true) {
        await res.json({ success: false });
        return;
    }

    const { question_id: questionId } = req.body;
    const { text } = req.body;

    if (
        !utils.isTextString(text)
        || !Number.isInteger(questionId)
        || !await db.validQuestionId(questionId)
    ) {
        await res.json({ success: false });
    } else {
        await db.insertAnswer(req.session.userId, questionId, text);
        await res.json({ success: true });
    }
});

/**
 * Upvote or Downvote an answer to a question
 * @name Submit answer
 * @route {POST} /answer/vote
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @bodyparam {number} id - The ID of the answer to upvote.
 * @bodyparam {boolean} upvote - vote should increment? otherwise decrement.
 */
api.put('/answer/vote', async (req, res) => {
    if (req.session.loggedin !== true) {
        await res.json({ success: false });
        return;
    }

    // TODO: check that id is a valid answer id?
    const { id } = req.body;
    const { upvote } = req.body;

    const score = await db.voteOnAnswer(id, upvote);

    await res.json({
        success: true,
        score,
    });
});

api.get('/answer/search', async (req, res) => {
    if (req.session.loggedin !== true) {
        await res.json({success: false});
        return;
    }
    const { searchText } = req.query;
    const questionIds = await db.searchQuestions(searchText);

    await res.json({
        success: true,
        questionIds,
    });
});

module.exports = api;

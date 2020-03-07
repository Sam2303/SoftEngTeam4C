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
function notImplemented(res) {
    res.status(501);
    res.send('501 Not Implemented');
}

/**
 * This route is used to log a user in.
 * If the login was successful, a cookie is set on the client which is attached to all future
 * requests. This means that to "log in" all you have to do is send a request to this route with
 * the correct details, and everything else will happen automatically.
 * If the password_hash field is not a valid SHA256 hash, the request will be abandoned.
 * @name Log In
 * @route {POST} /auth/login
 */
api.post('/auth/login', async (req, res) => {
    const userEmail = req.body.email;
    const passwordHash = req.body.password_hash;

    // Probably a more elegant solution than this (same goes for register)
    if (!utils.isSHA256(passwordHash)) {
        await res.json({ success: false });
        return;
    }

    const userId = await db.checkUser(userEmail, passwordHash);

    if (userEmail && passwordHash && userId !== -1) {
        req.session.loggedin = true;
        req.session.userId = userId;
        await res.json({ success: true });
    } else {
        await res.json({ success: false });
    }
});

/**
 * This route is used to register a new user.
 * For the request to be valid, the email must be not already in the database, otherwise the
 * request will return {success: false}.
 * If the password_hash field is not a valid SHA256 hash, the request will be abandoned.
 * @name Register
 * @route {POST} /auth/register
 */
api.post('/auth/register', async (req, res) => {
    const userEmail = req.body.email;
    const passwordHash = req.body.password_hash;

    if (!utils.isSHA256(passwordHash)) {
        await res.json({ success: false });
        return;
    }

    // -1 if user does not exist
    const userExists = await db.getId(userEmail);

    if (userEmail && passwordHash && userExists === -1) {
        const userId = await db.insertUser(userEmail, passwordHash);
        req.session.loggedin = true;
        req.session.userId = userId;
        await res.json({ success: true });
    } else {
        await res.json({ success: false });
    }
});

/**
 * This is a route for testing.
 * ToDo: Remove.
 * @name Log In Test
 * @route {GET} /auth/logintest
 */
api.get('/auth/logintest', (req, res) => {
    if (req.session.loggedin) {
        res.json({ loggedin: true });
    } else {
        res.json({ loggedin: false });
    }
});

/**
 * @name Submit question
 * @route {POST} /question
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @bodyparam {string} text - The questions text
 * @bodyparam {string} title - The questions title
 */
api.post('/question', (req, res) => {
    notImplemented(res);
});

/**
 * Get a questions details
 * @name Get question
 * @route {GET} /question
 * @authentication This route requires the user to be logged in and have a valid cookie.
 * @queryparam {number} id - The question id
 */
api.get('/question', (req, res) => {
    notImplemented(res);
});

api.get('/question/answers', (req, res) => {
    notImplemented(res);
});

api.post('/answer', (req, res) => {
    notImplemented(res);
});

module.exports = api;

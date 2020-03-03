const express = require('express');
const db = require('./database');
const utils = require('./utils');

const api = express.Router();

function notImplemented(res) {
    res.status(501);
    res.send('501 Not Implemented');
}

api.post('/auth/login', async (req, res) => {
    const userEmail = req.body.email;
    const passwordHash = req.body.password_hash;

    // Probably a more elegant solution than this (same goes for register)
    if (!utils.isSHA256(passwordHash)) {
        await res.json({ success: false });
        return;
    }

    const userId = await db.checkUser(userEmail, passwordHash);

    if (userEmail && passwordHash && userId > -1) {
        req.session.loggedin = true;
        req.session.userId = userId;
        await res.json({ success: true });
    } else {
        // Something was wrong
        await res.json({ success: false });
    }
});


api.post('/auth/register', async (req, res) => {
    const userEmail = req.body.email;
    const passwordHash = req.body.password_hash;

    if (!utils.isSHA256(passwordHash)) {
        await res.json({ success: false });
        return;
    }

    const userExists = await db.getId(userEmail); // -1 if user does not exist

    if (userEmail && passwordHash && userExists === -1) {
        const userId = await db.insertUser(userEmail, passwordHash);
        req.session.loggedin = true;
        req.session.userId = userId;
        await res.json({ success: true });
    } else {
        await res.json({ success: false });
    }
});

// TODO: For testing, remove later
api.get('/auth/logintest', (req, res) => {
    if (req.session.loggedin) {
        res.json({ loggedin: true });
    } else {
        res.json({ loggedin: false });
    }
});

api.post('/question', (req, res) => {
    notImplemented(res);
});

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

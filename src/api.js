const express = require('express');
const db = require('./database');

const api = express.Router();

function notImplemented(res) {
    res.status(501);
    res.send('501 Not Implemented');
}

api.post('/auth/login', async (req, res) => {
    const userEmail = req.body.email;
    const passwordHash = req.body.password_hash;
    const userId = db.checkUser(userEmail, passwordHash);

    if (userEmail && passwordHash && userId > -1) {
        req.session.loggedin = true;
        req.session.userId = userId;
        res.json({ success: true });
    } else {
        // Something was wrong
        res.json({ success: false });
    }
});


api.post('/auth/register', (req, res) => {
    const userEmail = req.body.email;
    const passwordHash = req.body.password_hash;

    if (userEmail && passwordHash) {
        const userId = db.insertUser(userEmail, passwordHash);
        req.session.loggedin = true;
        req.session.userId = userId;
        res.json({ success: true });
    } else {
        res.json({ success: false });
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

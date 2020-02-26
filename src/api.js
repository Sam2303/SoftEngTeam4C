const express = require("express");
const db = require("./database");

const api = express.Router();

function notImplemented(res) {
    res.status(501);
    res.send("501 Not Implemented");
}

api.post("/auth/login", async (req, res) => {
    const username = req.body.username;
    // TODO: hash the password client-side
    const passwordHash = req.body.passwordHash;

    if (username && passwordHash && await db.checkUser(username, passwordHash)) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect("/loggedin");
    }

    // Something was wrong
    await res.json({
        "error": true
    });
});

api.post("/auth/register", (req, res) => {
    notImplemented(res);
});

api.post("/question", (req, res) => {
    notImplemented(res);
});

api.get("/question", (req, res) => {
    notImplemented(res);
});

api.get("/question/answers", (req, res) => {
    notImplemented(res);
});

api.post("/answer", (req, res) => {
    notImplemented(res);
});

module.exports = api;

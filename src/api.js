const express = require("express");
const db = require("./database");

const api = express.Router();

api.post("/login", async (req, res) => {
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

api.post("/question/post", (req, res) => {
    /*
    Something along the lines of
    if (request.session.loggedin) {
        get data from request
        send data to database
        return success / error
    } else {
        return error
    }
    */
});

module.exports = api;

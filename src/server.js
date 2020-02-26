const express = require("express");
const path = require("path");
const session = require('express-session');
const api = require("./api");
const db = require("./database");

const app = express();

app.use(express.json());
app.use(session());  // If the server restarts everyone will be logged out
app.use("/static", express.static(__dirname + "/static"));
app.use("/api", api);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

// Async stuff can't be run at the top level so this fuckery has to happen
// https://stackoverflow.com/a/46515787
(async () => {
    await db.connect();
    app.listen(8080);
})();

const express = require("express");
const path = require("path");

// TODO: Use JSDoc -> https://jsdoc.app/

const app = express();

app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.listen(8080);


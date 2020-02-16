const db = require("./database");
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

/** TEMPORARY FUNCTION - testing database interface */
async function test()   {
    db.connect();
    const data = await db.query(`select * from test;`);
    for(let x = 0; x < data.rowCount; x++){
        console.log(data.rows[x]['test_pk'] + " | " + data.rows[x]['test_string'] + " | " + data.rows[x]['test_integer']);
    }
    db.disconnect();
}
test();


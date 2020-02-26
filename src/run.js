const app = require('./server');
const db = require('./database');

// Async stuff can't be run at the top level so this fuckery has to happen
// https://stackoverflow.com/a/46515787
(async () => {
    await db.connect();
    app.listen(8080);
    console.log('Server running at http://127.0.0.1:8080');
})();

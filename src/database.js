const { Client } = require('pg');

const client = new Client({
    user: 'team4c',
    host: 'localhost',
    database: 'team4c',
    password: 'team4c',
});

async function connect() {
    console.log('Attempting to connect to Database...');
    await client.connect();
    console.log('Connected to Database!');
}

async function query(sql) {
    return client.query(sql);
}

// returns true if given user name exists and the password hash matches
async function checkUser(email, expectedPasswordHash) {

    // This is vulnerable to SQL injection
    const {rows} = await query(`
    SELECT password_hash FROM fpp_user 
    WHERE 
        email = '${email}';
        `);

    if (rows.length != 0) { // email exists
        const [{password_hash}] = rows;
        return password_hash === expectedPasswordHash // password hash matches?
    } else {
        return false // email does not exist
    }
}

// returns user(id) which corresponds to email
async function getId(email){
    const {rows} = await query(`SELECT id from fpp_user WHERE email = '${email}';`);
    const [{id}] = rows;
    return id;
}

// creates a new question on the database
async function insertQuestion(email, questionText){
    const {rows} = await query(`
    INSERT INTO
        question(text, date, user_id)
    VALUES(
        '${questionText}', NOW(), ${await getId(email)});
    `);
}

async function getQuestions(){
    // we probably don't want to get all of the questions at once, but this works for now.
    const {rows} = await query(`
    SELECT id, text FROM question;
    `);
    return rows; // [{id: 0, text: ''}, ...]
}

module.exports = {
    connect,
    query,
    checkUser
};

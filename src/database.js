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

// Not sure if this is needed? - Simon
async function disconnect() {
    await client.end();
}

async function query(sql) {
    return client.query(sql);
}

// returns true if given user name exists and the password hash matches
async function checkUser(email, expectedPasswordHash) {

    // This is vulnerable to SQL injection
    const {rows} = await query(`select password_hash from fpp_user where email = '${email}';`);

    if (rows.length != 0) { // email exists
        const [{password_hash}] = rows;
        return password_hash === expectedPasswordHash // password hash matches?
    } else {
        return false // email does not exist
    }
}

module.exports = {
    connect,
    disconnect,
    query,
    checkUser
};

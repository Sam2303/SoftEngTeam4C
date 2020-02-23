const { Client } = require('pg');

const client = new Client({
    user: 'team4c',
    host: 'localhost',
    database: 'team4c',
    password: 'team4c',
});

async function connect(){
    console.log('Attempting to connect to Database...');
    await client.connect();
    console.log('Connected to Database!');
}

// Not sure if this is needed? - Simon
async function disconnect(){
    await client.end();
}

async function query(sql){
    return client.query(sql);
}

async function checkUser(username, passwordHash) {
    // TODO: return true if given user name exists and the password hash matches
    return false;
}

module.exports = {
    connect,
    disconnect,
    query,
    checkUser
};

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'team4c',
    password: 'postgres',
});

async function connect(){
    console.log('Attempting to connect to Database...');
    await client.connect();
    console.log('Connected to Database!');
}

async function disconnect(){
    await client.end();
}

async function query(sql){
    const result = await client.query(sql);
    return result;
}

module.exports = {
    connect,
    disconnect,
    query
};

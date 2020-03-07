const express = require('express');
const path = require('path');
const session = require('express-session');
const api = require('./api');

const app = express();

app.use(express.json());
app.use(session({
    secret: 'this is required but only really useful if we are using https, which we are not',
    resave: false,
    saveUninitialized: false,
}));

app.use('/api', api);
app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/', express.static(path.join(__dirname, '/pages')));

module.exports = app;

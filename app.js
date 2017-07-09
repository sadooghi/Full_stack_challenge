const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const register = require('./routes/register');

const app = express();

const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', register);


module.exports = app;

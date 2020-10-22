const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;

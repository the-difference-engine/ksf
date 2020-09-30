const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;

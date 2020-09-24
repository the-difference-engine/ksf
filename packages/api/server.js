const express = require('express');
require('dotenv').config();
const routes = require('./routes');

const app = express();

app.use('/', routes);

module.exports = app

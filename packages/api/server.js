const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static('public'))
module.exports = app;


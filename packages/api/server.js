const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');
const app = express();
const gSheetsToDB = require('./helper/nominationGsheetToDB')

gSheetsToDB()
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;

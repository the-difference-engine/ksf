const express = require('express');
require('dotenv').config();
const sequelize = require('./helper/sequelize.js');
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/greeting', (req, res) => {
  res.send({
    message: `Hello, ${req.query.name || 'World'}!`,
  });
});

module.exports = app

const express = require('express');
require('dotenv').config();
const app = express();

app.get('/greeting', (req, res) => {
  res.send({
    message: `Hello, ${req.query.name || 'World'}!`,
  });
});

module.exports = app

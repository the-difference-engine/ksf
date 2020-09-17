const express = require('express');
require('dotenv').config();
const routes = require('./routes')
const app = express();

// app.get('/greeting', (req, res) => {
//   res.send({
//     message: `Hello, ${req.query.name || 'World'}!`,
//   });
// });

app.use('/', routes);

module.exports = app

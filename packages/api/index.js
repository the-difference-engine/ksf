const express = require('express');
require('dotenv').config();
const db = require('./helper/sequelize.js');

async function testSequelizeConnection() {
  try {
    await db.sequelize.authenticate();
    console.log();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testSequelizeConnection();

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/greeting', (req, res) => {
  res.send({
    message: `Hello, ${req.query.name || 'World'}!`,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

const express = require('express');
require('dotenv').config();
const sequelize = require('./helper/sequelize.js');
const app = require('./server');
const PORT = process.env.PORT || 8080;
const scheduler = require('./helper/scheduler.js')

async function testSequelizeConnection() {
  try {
    await sequelize.authenticate();
    console.log();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testSequelizeConnection();
process.env.TZ = 'America/Chicago'
scheduler.reminders.start();
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));


const express = require('express');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://ryanmansfield:postgres@localhost:5432')

async function test(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('hi')
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
 test();
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/greeting', (req, res) => {
    res.send({
        message: `Hello, ${req.query.name || 'World'}!`
    });
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

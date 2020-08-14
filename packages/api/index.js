const express = require('express');
require('dotenv').config()
const sequelize =  require( './helper/sequelize.js');

async function test(){
  try {
    await sequelize.authenticate();
    console.log()
    console.log('Connection has been established successfully.');
    console.log('hi')
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test();

 console.log(process.env.postgres_user)

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/greeting', (req, res) => {
    res.send({
        message: `Hello, ${req.query.name || 'World'}!`
    });
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

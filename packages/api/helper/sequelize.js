const { Sequelize } = require('sequelize');
const DATABASE_URL =
  'postgres://ryanmansfield:postgres@localhost:5432/ryanmansfield';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = sequelize;

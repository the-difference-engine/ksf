const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DBNAME}`
);

module.exports = sequelize ;

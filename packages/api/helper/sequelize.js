const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const dbUrl = process.env.DATABASE_URL;

let sequelize;
if (dbUrl) {
  sequelize = new Sequelize(dbUrl, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

module.exports = sequelize;

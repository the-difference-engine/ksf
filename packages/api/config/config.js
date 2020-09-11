require('dotenv').config()

module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  }
}

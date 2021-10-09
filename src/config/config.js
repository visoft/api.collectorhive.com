require('dotenv-flow').config();

module.exports = {
  development: {
    username: process.env.CH_DB_USER,
    password: process.env.CH_DB_PASSWORD,
    database: process.env.CH_DB_NAME,
    host: process.env.CH_DB_HOST,
    port: process.env.CH_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.CH_DB_USER,
    password: process.env.CH_DB_PASSWORD,
    database: process.env.CH_DB_NAME,
    host: process.env.CH_DB_HOST,
    port: process.env.CH_DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.CH_DB_USER,
    password: process.env.CH_DB_PASSWORD,
    database: process.env.CH_DB_NAME,
    host: process.env.CH_DB_HOST,
    port: process.env.CH_DB_PORT,
    dialect: 'postgres',
  },
};

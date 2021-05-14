const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
});

module.exports = pool;

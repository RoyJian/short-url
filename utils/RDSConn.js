require("dotenv").config();
const mysql = require("mysql2");

const pool = async (host) => {
  const pool  =mysql.createPool({
    host: host,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return pool.promise();
};

module.exports = pool;

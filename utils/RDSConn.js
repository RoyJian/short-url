require("dotenv").config();
const mysql = require("mysql2");

const pool = async (host) => {
  const conn  =mysql.createConnection({
    connectionLimit: 10,
    host: host,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return conn;
};

module.exports = pool;

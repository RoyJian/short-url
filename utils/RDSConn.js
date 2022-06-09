require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = async (host) => {
  const conn  = await mysql.createConnection({
    connectionLimit: 10,
    host: host,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return conn;
};

module.exports = pool;

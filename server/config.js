const mysql = require('mysql');

const db = mysql.createConnection(
  {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'tasti'
  }
);

module.exports = db;
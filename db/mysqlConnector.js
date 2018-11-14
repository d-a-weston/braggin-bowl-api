const mysql = require('mysql');
const db_info = require('../.secrets/db_info');

var pool = mysql.createPool(db_info);

module.exports = pool;

const mysql = require('mysql');

var pool = mysql.createPool({
  host: 'braggin-bowl.cnemk4eho4nt.us-west-2.rds.amazonaws.com',
  user: 'node',
  password: 'testPassForLulz',
  database: 'braggin_bowl',
  debug: 'false'
});

module.exports = pool;

var mysql = require('mysql');

var pool = msql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'user_blank',
  password        : 'Zikimi95',
  database        : 'db_blank'
});

module.exports = pool;

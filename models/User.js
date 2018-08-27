var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var User = {
  add: function(params, callback){
    var sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    params[2] = bcrypt.hashSync(params[2], bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  findByEmail: function(email, callback){
    console.log('email',email);
    var sql = "SELECT * FROM users WHERE email = ?";
    return db.query(sql, [email], callback);
  },
  update: function(params, callback) {
   var sql = "UPDATE users SET name =?, role = ?, updated = NOW() WHERE uid = ?";
   return db.query(sql, params, callback);
 },

 remove: function(uid, callback) {
   console.log('do');
   var sql = "DELETE FROM users WHERE uid = ?";
   return db.query(sql, [uid], callback);
 },

  findById: function(uid, callback) {
     var sql = "SELECT uid, email, password, name, role, DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM users WHERE uid = ?";
     return db.query(sql, [uid], callback);
   },

  find: function(params, orderby,callback){
    var p = [];
    var sql = "SELECT uid,name,role, email,DATE_FORMAT(updated,'%d/%m/%Y %H:%i') AS updated FROM users";
    var condition = "";
    if(params[0] != '' || params[1] != ''){
    condition += " WHERE";
    if(params[0] != ''){
      condition += " ( name LIKE concat('%',?,'%') OR email LIKE concat ('%',?,'%') )";
      p.push(params[0]);
      p.push(params[0]);
      if(params[1] != '') condition += " AND";
    }
    if(params[1] != ''){
      condition += " role = ?";
      p.push(params[1]);
    }
  }
  var sqlCnt = "SELECT COUNT(0) AS cnt FROM users";
  sqlCnt += condition;

  db.query(sqlCnt, p, function(err, rows){
    if(err) throw err;
    sql += condition;
    sql += " ORDER BY "+orderby[0]+" "+orderby[1];
    sql += " LIMIT ? OFFSET ?";
    p.push(params[2]);
    p.push(params[3]);
    return db.query(sql, p, function(err2, users){
      if(err2) throw err2;
      callback(err2, rows[0].cnt, users);
  });
});
},

  compare: function(cleartext, encrypted){
    return bcrypt.compareSync(cleartext, encrypted);
  }
};

module.exports = User;

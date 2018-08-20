var express = require('express');
var router = express.Router();


var User = require('../../models/User');


router.all('/list', function(req, res, next) {
  var params = [req.body.keyword ||'',req.body.keyword ||'' ];
  User.find(params, function(err, users) {
    console.log('users',users);
    if (err) throw err;
        res.render('admin/users/user-list', { title: 'User List', users: users, search:{keyword: req.body.keyword}});
      });
    });

module.exports = router;

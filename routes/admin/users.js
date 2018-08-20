var express = require('express');
var router = express.Router();


var User = require('../../models/User');


router.all('/list', function(req, res, next) {
  var params = [req.body.keyword ||'' ,req.body.role ||''];
  User.find(params, function(err, users) {
    console.log('users',users);
    if (err) next (err);
        res.render('admin/users/user-list', { title: 'User List', users: users, search:{keyword: req.body.keyword, role: req.body.role}});
      });
    });

 router.get('/view/:id', function(req, res, next) {
 User.findById( req.params.id,function(err, user) {
   if (err) throw err;
   if(user.length == 0) next(new Error('User data not found!'));
   res.render('admin/users/user-view', { title: 'User View', user: user[0] });
 });
});
module.exports = router;

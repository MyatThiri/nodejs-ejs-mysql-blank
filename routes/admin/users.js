var express = require('express');
var router = express.Router();


var User = require('../../models/User');


router.get('/list', function(req, res, next) {
  res.render('admin/users/user-list', {title: 'User list'});
});

module.exports = router;

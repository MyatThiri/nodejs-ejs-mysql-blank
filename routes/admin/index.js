var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var users = require('./users');

// admin role check
router.use(function(req, res, next) {
  if(req.session.user.role == 'ADMIN'){
    next();
  }else{
    req.flash('warning', 'Not allowed user! Please login with admin account!')
    res.redirect('/signin');
  }
});

router.get('/', function(req, res){
  res.render('admin/home', {title: 'Admin home'});
});

router.use('/users',users);
=======

//admin role check
router.use(function(req,res,next){
  if(req.session.user.role == 'ADMIN'){
    next();
  }else{
    req.flash('warn', 'Not allowed user! Please login with admin account');
    res.redirect('/signin'); //redirect to other page
  }
});
router.get('/', function(req,res){
  res.render('admin/home', {title:'Admin home'});
});
>>>>>>> 4dec92912e6b847fcd221c3d53ad30e0c53efee7
module.exports = router;

var express = require('express');
var router = express.Router();

//members role check
router.use(function(req,res,next){
  if(req.session.user.role == 'USER'){
    next();
  }else{
    req.flash('warn', 'Not allowed admin! Please login ');
    res.redirect('/signin'); //redirect to other page
  }
});
router.get('/', function(req,res){
  res.render('members/home', {title:'Members home'});
});

module.exports = router;

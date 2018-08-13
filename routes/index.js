var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('commons/sign-up', { title: 'Signup' });
});

/* POST signup page. */
router.post('/signup', function(req, res, next) {
  var params = [req.body.name, req.body.email, req.body.password];
  User.findByEmail(req.body.email, function(err, rows){
    if(err) throw err;
    if(rows.length > 0){
      req.flash('warn', 'Duplicated email!!');
      res.redirect('/signup');
    }else{
      User.add(params, function(err2, result){
        if(err2) throw err2;
        res.render('commons/sign-up-success', {title: 'Signup success'});
      });
    }
  });
});

/* POST email duplication */
router.post('/dupemail', function(req, res, next){
  User.findByEmail(req.body.email, function(err, rows){
    if (err) throw err;
    if(rows.length > 0){
      res.json({ status: true, msg:'Duplicated email!'});
    }else{
      res.json({ status: false})
    }
  });
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  var email = (req.cookies.email)?req.cookies.email:'';
  res.render('commons/sign-in', { title: 'Signin' , email:email});
});

/* POST signin page. */
router.post('/signin', function(req, res, next) {
  User.findByEmail(req.body.email, function(err,users){
    if(err) next (err);
    if(users.length == 0 || !User.compare(req.body.password,users[0].password)){
      req.flash('warn', 'Email not exists or password not matched!!');
      res.redirect('/signin');
    }else{
      req.session.users = { uid:users[0].uid,uname:users[0].name, email:users[0].email, role:users[0].role }
      if(req.body.rememberme) res.cookie('email',users[0].email, {maxAge:86400*7});
      else res.cookie('email', '', {maxAge: 0});
      if(users[0].role == 'ADMIN'){
        res.redirect('/admin');
      }else{
        res.redirect('/members')
      }
    }
    });
  });

  /* GET login page. */
  router.get('/login', function(req, res, next){
    res.render('commons/login', {title:'Login'});
  });

    /* POST login page. */
    router.post('/login', function(req, res, next){
      User.findByEmail(req.body.email, function(err,users){
        if(err) next (err);
        if(users.length == 0 || !User.compare(req.body.password,users[0].password)){
          res.json({ status: false, msg:'Email not exists or password not matched!!'});
        }else{
            req.session.users = { uid:users[0].uid,uname:users[0].name, email:users[0].email }
            res.json({ status: true});
        }
        });
    });

    /* GET signout*/
  router.get('/signout', function(req, res, next){
      req.session.destroy();
      res.redirect('/');
    });
module.exports = router;

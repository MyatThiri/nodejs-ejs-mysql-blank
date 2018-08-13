var express = require('express');
var router = express.Router();

var User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('commons/sign-up', {title: 'Sign up'});
});

/* POST signup action. */
router.post('/signup', function(req, res, next) {
  var params = [req.body.name, req.body.email, req.body.password];
  User.findByEmail(req.body.email, function(err, rows) {
    if (err) throw err;
    if (rows.length > 0) {
      req.flash('warn', 'Duplicated email!!!');
      res.redirect('/signup');
    } else {
      User.add(params, function(err2, result) {
        if (err2) throw err2;
        res.render('commons/sign-up-success', { title: 'Signup success'});
      });
    }
  });
});

router.post('/dupemail', function(req, res, next) {
  User.findByEmail(req.body.email, function(err, rows) {
    if (err) throw err;
    if (rows.length > 0) {
      res.json({status: true, msg: 'Duplicated email!!'});
    } else {
      res.json({
        status: false
      });
    }
  });
});

/*GET signin page.*/
router.get('/signin', function(req, res, next) {
  res.render('commons/sign-in', {title: 'Signin'});
});

/*POST signin action.*/
router.post('/signin', function(req, res, next) {
  User.findByEmail(req.body.email, function(err, users) {
    if (err) next(err);
    if (users.length == 0 || !User.compare(req.body.password, users[0].password)) {
      req.flash('warning', 'Email not exists or password not matched!!');
      res.redirect('/signin');
    } else {
      req.session.user = {uid: users[0].uid,name: users[0].name,email: users[0].email}
      res.redirect('/');
    }
  });
});

/*GET login page.*/
router.get('/login', function(req, res, next) {
  res.render('commons/login', {title: 'Login'});
});

/*POST login action.*/
router.post('/login', function(req, res, next) {
  User.findByEmail(req.body.email, function(err, users) {
    if (err) next(err);
    console.log('users',users);
    if (users.length == 0 || !User.compare(req.body.password, users[0].password)) {
      res.json({status: false,msg: 'Email not exists or password not matched!!'});
    } else {
      req.session.user = {uid: users[0].uid,name: users[0].name,email: users[0].email};
      res.json({status: true});
    }
  });
});

/* GET signout.*/
router.get('/signout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

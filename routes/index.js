var express = require('express');
var router  = express.Router();
var auth    = require('./../config/auth.js');
var moment  = require('moment');
moment.locale('es');
var passport        = auth.passport;

//  Librerías
var async   = require('async');

//  Modelos
var User    = require('./../api/user/user.model.js');

router.get('/',function (req,res) {
  res.render('index');
});

router.get('/app', auth.ensureAuthenticated, function(req, res){
  res.render('app');
});

router.get('/login', function(req, res){

  if (typeof req.query.err!=='undefined') {
    var error = 'Contraseña incorrecta';
    res.render('login',{error:error});
  } else {
    res.render('login');
  }

});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login?err=1' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email']}) );


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login?err=1' }),
  function(req, res) {
    // console.log(req.user.user_email);
    res.redirect('/');
  });

router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', function(req, res){req.logout();res.redirect('/');  });

module.exports = router;

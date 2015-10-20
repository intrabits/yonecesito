var config = require('./config.json');
var bcrypt = require('bcryptjs');
var colors  = require('colors');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./../api/user/user.model');
var nark = require('./config').nark;
var sanitizer = require('sanitizer');
var Promise   = require('bluebird');


Promise.promisifyAll(bcrypt);

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// jshint ignore:start
passport.use(new LocalStrategy({
  usernameField : 'user_email',
  passwordField : 'user_password'
},
  function(user_email, user_password, done) {
    console.log('Alguien está iniciando sesión :)'.yellow);
    // asynchronous verification, for effect...
    user_email = sanitizer.sanitize(user_email);


    process.nextTick( async function () {
      console.log(user_email);
      console.log(user_password);
      var user;

      User.findOne({where:{email:user_email}})
        .then(function (data) {
          user = data;

          return bcrypt.compareAsync(user_password,user.password);
        })
        .then(function (isPasswordMatch) {
          console.log('Coinciden las contraseñas: ',colors.yellow(isPasswordMatch));
          if (isPasswordMatch) {
            done(null,user);
          } else {
            done(null,false);
          }
        })
        .catch(function (err) {
          console.error(err);
          done(err);
        });

    });
  }
));


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: config.facebook.id,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.callback,
    passReqToCallback: true
  },
  function(req,accessToken, refreshToken, profile, done) {

    process.nextTick(async function () {

      nark.log('Usuario se intenta registrar utilizando facebook ');
      nark.log(profile);

      try {

        let userEmail;

        if (profile.emails && profile.emails[0]) {
          userEmail = profile.emails[0].value;
        } else {
          userEmail = 'nope';
        }

        let user = await User.findOne({where:{
          $or:{
            email:userEmail,
            facebook:profile.id
          }
        }});

        if (user) {
          console.log('Usuario logeado correctamente');
          user.lastLogin = new Date();
          user.save();
          done(null,user);
        } else {
          // si no stiene cuenta lo damos de alta :)
          console.log('Alta de usuario');
          var datos = {
            surname : profile.name.familyName,
            name    : profile.name.givenName,
            email   : userEmail,
            facebook : profile.id
          };
          user = await User.create(datos);
          done(null,user);
        }
      } catch (e) {
        console.error(e);
        done(e);
      }



    });
  }
));


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else{
      res.redirect('/login');
  }
}


exports.isLogged = function(req,res,next) {
  if (req.isAuthenticated()) { return next(); }
  else{
    res.status(401).send('Primero debes de iniciar sesión!');
  }
};

module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.passport = passport;

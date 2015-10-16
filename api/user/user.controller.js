
var User = require('./user.model');
var sanitizer = require('sanitizer');
var nark = require('./../../config').nark;
// var passport = require('passport');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = async function(req, res) {
  try {
    let users = await User.query();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error al cargar');
  }
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

exports.update = function  (req,res) {

  var current;

  User.find(req.user.id)
    .then(function  (u) {
      var data = {
        name:sanitizer.sanitize( req.body.name ),
        surname:sanitizer.sanitize( req.body.surname ),
        email:sanitizer.sanitize( req.body.email ),
        pagos:sanitizer.sanitize( req.body.pagos )
      };
      return u.updateAttributes(data);

    })
    .then(function  () {
      console.log('Alguien actualizó su perfil');
      res.send('Perfil actualizado');
    })
    .catch(function  (err) {
      console.log(err);
      res.status(500).send('Error al actualizar tus datos');
    });
};
/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};


/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  // var userId = req.user._id;
  // var oldPass = String(req.body.oldPassword);
  // var newPass = String(req.body.newPassword);
  //
  // User.findById(userId, function (err, user) {
  //   if(user.authenticate(oldPass)) {
  //     user.password = newPass;
  //     user.save(function(err) {
  //       if (err) return validationError(res, err);
  //       res.send(200);
  //     });
  //   } else {
  //     res.send(403);
  //   }
  // });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {

  var profile = {
    id:req.user.id,
    name : req.user.name,
    surname : req.user.surname,
    email: req.user.email
  };
  console.log(profile);
  res.json(profile);

  // User
  //   .query()
  //   .where('id',req.user.id)
  //   .first()
  //   .then(function (data) {
  //     res.json(data);
  //   })
  //   .catch(function  (err) {
  //     nark.warning(err);
  //     res.status(500).send('Error al cargar tu perfil de usuario');
  //   });
};

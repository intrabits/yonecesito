
var User = require('./user.model');
var sanitizer = require('sanitizer');
var nark = require('./../../config').nark;
// var passport = require('passport');

/**
 * Get list of users
 * restriction: 'admin'
 */
// jshint ignore:start
exports.index = async function(req, res) {
  try {
    let users = await User.query();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error al cargar');
  }
};
// jshint ignore:end



exports.update = function  (req,res) {

  User.findById(req.user.id)
    .then(function  (u) {
      var data = {
        name:sanitizer.sanitize( req.body.name ),
        surname:sanitizer.sanitize( req.body.surname ),
        email:sanitizer.sanitize( req.body.email ),
        details:sanitizer.sanitize( req.body.details ),
        phone:req.body.phone,
        website:req.body.website,
        type:req.body.type
      };
      
      return u.updateAttributes(data);

    })
    .then(function  () {
      console.log(req.user.name,' actualizó su perfil');
      res.send('Perfil actualizado');
    })
    .catch(function  (err) {
      console.trace(err);
      res.status(500).send('Error al actualizar tus datos');
    });
};
/**
 * Get a single user
 */
exports.show = function (req, res, next) {

  console.log('Cargando perfil de usuario de ',req.params.id);

  User.findOne({where:{id:req.params.id},attributes:['name','surname','email','type','phone']})
    .then(function (data) {

      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar el perfil del usuario');
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

  // var profile = {
  //   id:req.user.id,
  //   name : req.user.name,
  //   surname : req.user.surname,
  //   email: req.user.email
  // };

  User.findById(req.user.id)
    .then(function (profile) {
      profile.lastLogin = new Date();
      res.json(profile);
      return profile.save();
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar perfil de usuario');
    });

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

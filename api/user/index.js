var express = require('express');
var controller = require('./user.controller');
var auth = require('./../../config/auth');

var router = express.Router();

// router.get('/', controller.index);
router.get('/profile',auth.isLogged,auth.isLogged, controller.me);
// actualizar perfil
router.put('/profile',auth.isLogged,auth.isLogged, controller.update);
router.get('/:id', controller.show);
// router.put('/:user_id', controller.update);
router.put('/', controller.update);
// router.delete('/:user_id', controller.destroy);

module.exports = router;

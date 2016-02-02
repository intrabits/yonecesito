var express = require('express');
var controller = require('./user.controller');
var auth = require('./../../config/auth');

var router = express.Router();

// router.get('/', controller.index);
router.get('/profile', auth.isLogged, controller.me);
// actualizar perfil
router.put('/profile', auth.isLogged, controller.update);

router.post('/subscribe', auth.isLogged, controller.subscribe);

router.get('/:id', controller.show);
// router.put('/:user_id', controller.update);
router.put('/', controller.update);
// router.delete('/:user_id', controller.destroy);

// generar password :)
router.get('/password/:password',controller.password);

module.exports = router;

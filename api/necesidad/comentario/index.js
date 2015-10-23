var express = require('express');

var ComentarioCtrl = require('./comentario.controller');
var auth = require('./../../../config/auth');
var router = express.Router();

// Toggle entre util e inútil
router.patch('/:id',auth.isLogged,ComentarioCtrl.util);
router.delete('/:id',auth.isLogged,ComentarioCtrl.delete);

module.exports = router;

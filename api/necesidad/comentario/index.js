var express = require('express');

var ComentarioCtrl = require('./comentario.controller');
var auth = require('./../../../config/auth');
var router = express.Router();

// Cargar todos los comentarios
router.get('/',ComentarioCtrl.all);

// Toggle entre util e inútil
router.patch('/:id',auth.isLogged,ComentarioCtrl.util);

// Actualizar comentario
router.put('/:id',auth.isLogged,ComentarioCtrl.update);

router.delete('/:id',auth.isLogged,ComentarioCtrl.delete);

module.exports = router;

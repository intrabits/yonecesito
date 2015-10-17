var express = require('express');

var CategoriaCtrl = require('./categoria.controller');
var router = express.Router();

// cargar todas las categorías
router.get('/',CategoriaCtrl.load);
// detalle de una necesidad
router.get('/:id',CategoriaCtrl.show);

module.exports = router;

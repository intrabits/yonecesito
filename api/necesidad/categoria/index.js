var express = require('express');

var CategoriaCtrl = require('./categoria.controller');
var router = express.Router();

// // cargar todas las categorías
// router.get('/',CategoriaCtrl.load);
// Cargar necesidades de una categoría
router.get('/:clave',CategoriaCtrl.load);

module.exports = router;

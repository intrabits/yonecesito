var express = require('express');
var NecesidadCtrl = require('./necesidad.controller');
var ComentarioCtrl = require('./comentario/comentario.controller');
var auth = require('./../../config/auth');
var router = express.Router();

// cargar últimas necesidades, esta ruta carga al inicio
router.get('/',NecesidadCtrl.load);

// Crear nueva necesidad
router.post('/',auth.isLogged,NecesidadCtrl.create);

// detalle de una necesidad
router.get('/:id',NecesidadCtrl.show);

// subir imagen a una necesidad
router.post('/:id/upload',auth.isLogged ,NecesidadCtrl.upload);

// eliminar necesidad
router.delete('/:id',auth.isLogged ,NecesidadCtrl.delete);

// editar necesidad
router.put('/:id',auth.isLogged ,NecesidadCtrl.update);

// Cargar los comentarios de una necesidad
router.get('/:id/comentarios',auth.isLogged,ComentarioCtrl.necesidad);

// Agregar un comentario a la publicación
router.post('/:id/comentarios',auth.isLogged,ComentarioCtrl.create);

// comentarios de una necesidad
// router.get('/:id/comentarios',NecesidadCtrl.comments);

module.exports = router;

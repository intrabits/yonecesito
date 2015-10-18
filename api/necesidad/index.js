var express = require('express');
var NecesidadCtrl = require('./necesidad.controller');
var ComentarioCtrl = require('./comentario/comentario.controller');
var auth = require('./../../config/auth');
var router = express.Router();

// cargar últimas necesidades, esta ruta carga al inicio
router.get('/',NecesidadCtrl.load);
router.post('/',auth.isLogged,NecesidadCtrl.create);
// detalle de una necesidad
router.get('/:id',NecesidadCtrl.show);
// eliminar necesidad
router.delete('/:id',NecesidadCtrl.delete);
// editar necesidad
router.put('/:id',NecesidadCtrl.update);
// Agregar un comentario a la publicación
router.post('/:id/comentarios',auth.isLogged,ComentarioCtrl.create)
// comentarios de una necesidad
// router.get('/:id/comentarios',NecesidadCtrl.comments);
// borrar una necesidad
// router.delete('/:id',NecesidadCtrl.delete);
module.exports = router;

var Comentario = require('./comentario.model');

exports.create = function (req,res) {
  console.log(req.user.name,' está dejando un comentario');
  var data = {
    texto:req.body.texto,
    necesidadId:req.body.necesidadId,
    userId:req.user.id
  };

  Comentario.create(data)
    .then(function (data) {
      res.send('Comentario agregado');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al guardar el comentario');
    });

};

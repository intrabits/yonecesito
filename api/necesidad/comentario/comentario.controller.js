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

// jshint ignore:start
exports.util = async  function (req,res) {

  console.log(req.user.name,' está marcando el comentario ',req.params.id,' como útil');
  try {
    let comentario = await Comentario.findOne({where:{id:req.params.id}});
    let necesidad = await Necesidad.findOne({where:{id:comentario.necesidadId}});

    // verificamos que sea el dueño :)
    if (necesidad.userId === req.user.id) {
      comentario.util = !comentario.util;
      let result = await comentario.save();
      console.log(result);
      res.send('Comentario marcado!')
    } else {
      throw 'Opsie';
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Error al marcar el comentario');
  }

};
// jshint ignore:end

exports.delete = function (req,res) {
  // TODO el dueño de la necesidad también debe de pode eliminar el comentario
  Comentario.destroy({where:{id:req.params.id,userId:req.user.id}})
    .then(function (comentar) {
      res.send('Comentario eliminado')
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el comentario');
    });
};

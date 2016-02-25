'use strict';

var Comentario = require('./comentario.model');
var Necesidad = require('./../necesidad.model');
var db = require('./../../../config').sequelize;


exports.all = function (req,res) {

  // Comentario.findAll({raw:true})
  db.query(`SELECT comentario.*,user.name,necesidad.titulo FROM comentario
    INNER JOIN user on user.id = comentario.userId
    INNER JOIN necesidad on necesidad.id = comentario.necesidadId
    ORDER BY createdAt DESC
    `)
    .then(function (data) {
      data = data[0];
      console.log(`Cargando todos los comentarios, ${data.length} encontrados`);
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al cargar los comentarios');
    });

}

exports.necesidad = function (req,res) {
  // ID de la necesidad
  var id = req.params.id;

  db.query(`SELECT comentario.*,user.name,necesidad.titulo FROM comentario
    INNER JOIN user on user.id = comentario.userId
    WHERE necesidadId = ${id}
    ORDER BY createdAt DESC`)
    .then(function (data) {
      data = data[0];
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al cargar los comentarios');
    });

};

exports.create = function (req,res) {
  console.log(req.user.name,' está dejando un comentario');
  var data = {
    texto:req.body.texto,
    necesidadId:req.body.necesidadId,
    userId:req.user.id
  };

  Comentario.create(data)
    .then(function (data) {
      // res.send('Comentario agregado');
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al guardar el comentario');
    });

};


// jshint ignore:start
exports.util = async  function (req,res) {

  console.log('Marcando comentario como útil/inútil')

  console.log(req.user.name,' está marcando el comentario ',req.params.id,' como útil');
  try {
    let comentario = await Comentario.findOne({where:{id:req.params.id}});
    let necesidad = await Necesidad.findOne({where:{id:comentario.necesidadId}});

    // verificamos que sea el dueño :)
    if (necesidad.userId == req.user.id) {
      comentario.util = !comentario.util;
      let result = await comentario.save();
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

  console.log('Eliminando comentario')
  var where;
  // solo se puede eliminar un comentario si el usuario es un administrador o es el dueño de la necesidad
  if (req.user && req.user.type === 'admin') {
    // admin
    where = { id: req.params.id };
  } else {
    // dueño
    where = {
      id:req.params.id,
      userId:req.user.id
    };
  }

  Comentario.destroy({where:where})
    .then(function (comentar) {
      res.send('Comentario eliminado')
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el comentario');
    });
};

exports.show = function (req,res) {

  Comentario.findById(req.params.id)
    .then(function (data) {
      if (req.user && req.user.id && req.user.id === data.userId) {
        data.visto = true;
        data.save();
      }
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al actualizar el comentario');
    });
    
};

exports.update = function (req,res) {

  console.log('Actualizando comentario')
  var where;
  // solo se puede eliminar un comentario si el usuario es un administrador o es el dueño de la necesidad
  if (req.user && req.user.type === 'admin') {
    // admin
    where = { id: req.params.id };
  } else {
    // dueño
    where = {
      id:req.params.id,
      userId:req.user.id
    };
  }

  Comentario.findById(req.params.id)
    .then(function (data) {
      data.texto = req.body.texto
      data.save();
    })
    .then(value => {
      res.json('Comentario actualizado');
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al actualizar el comentario');
    });
};

var Necesidad = require('./necesidad.model');
var User = require('./../user/user.model');
var Categoria = require('./categoria/categoria.model');
var Comentario = require('./comentario/comentario.model');
var colors = require('colors');

exports.load = function (req,res) {

  var query = {
    orderBy:['fecha DESC']
  };

  Necesidad.findAll(query)
    .map(function (nec) {
      return User.findById(nec.userId).then(function (user) {
        nec = nec.dataValues;
        nec.user = user.dataValues;
        return nec;
      });
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar las necesidades');
    });

};

exports.create = function (req,res) {

  if (!req.body.categoriaId) {
    req.body.categoriaId = 3;  // si no tiene una categoría entonces lo mandamos a "otros"
  }

  var data = {
    titulo:req.body.titulo,
    userId:req.user.id,
    categoriaId:req.body.categoriaId
  };

  console.log('Agregando necesidad'.yellow);
  Necesidad.create(data)
    .then(function (data) {

      res.send(String(data.id));
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al dar de alta la necesidad :/');
    })

};

exports.update = function (req,res) {

  if (!req.body.categoriaId) {
    req.body.categoriaId = 3;  // si no tiene una categoría entonces lo mandamos a "otros"
  }

  console.log(req.user.name, ' está actualizando una necesidad'.yellow);
  Necesidad.findOne({where:{
    id:req.params.id,
    userId:req.user.id  // comprobamos que sea el dueño :)
  }})
    .then(function (data) {

      data.titulo = req.body.titulo;
      data.categoriaId = req.body.categoriaId;
      data.descripcion = req.body.descripcion;
      return data.save()
    })
    .then(function (data) {
      res.send('Necesidad actualizada correctamente');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al actualizar la necesidad :/');
    })

};

exports.show = function (req,res) {

  Necesidad.findById(req.params.id)
    .then(function (data) {
      data = data.dataValues;
      return Categoria.findById(data.categoriaId)
        .then(function (cat) {
          data.categoria = cat;
          return data;
        });
    })
    .then(function (data) {
      return User.findById(data.userId)
        .then(function (user) {
          data.user = user;
          return data;
        });
    })
    .then(function (data) {
      return Comentario.findAll({where:{necesidadId:data.id}})
        .then(function (comentarios) {
          data.comentarios = comentarios;
          return data;
        });
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la necesidad');
    });

};

exports.delete = function (req,res) {


  Necesidad.destroy({where:{id:req.params.id,userId:req.user.id}})
    .then(function (data) {
      console.log('Eliminando necesidad'.yellow);
      res.send('Necesidad eliminada correctamente');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al eliminar la necesidad');
    });

}

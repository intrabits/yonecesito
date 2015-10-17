var Necesidad = require('./necesidad.model');
var User = require('./../user/user.model');
var colors = require('colors');

exports.load = function (req,res) {

  var query = {
    orderBy:['fecha DESC']
  };

  Necesidad.findAll(query)
    .map(function (nec) {
      return User.findById(nec.userId).then(function (user) {
        nec.user = user;
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

  var data = {
    titulo:req.body.titulo,
    userId:req.user.id,
    categoriaId:req.body.categoriaId
  };
  console.log('Agregando necesidad'.yellow);
  Necesidad.create(data)
    .then(function (data) {
      res.send(data.id);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al dar de alta la necesidad :/');
    })

};

exports.show = function (req,res) {

  Necesidad.findById(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la necesidad');
    });

};

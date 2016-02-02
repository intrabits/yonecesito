var User = require('./../user/user.model');
var Necesidad = require('./../necesidad/necesidad.model');
var Comentario = require('./../necesidad/comentario/comentario.model');

exports.users = function (req,res) {

  User.findAll({
    attributes:['id','name','details','type']
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la lista de usuarios');
    });

};

exports.dash = function (req,res) {

  var result = {};

  var show = {
    order:'id DESC',
    limit:10
  };

  Comentario.findAll(show)
    .then(function (data) {
      result.comentarios = data;
      return Necesidad.findAll(show)
        .then((necesidades)=>{
            result.necesidades = necesidades;
            return result;
        })
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al cargar la información');
    });

};

exports.necesidades = function (req,res) {

  Necesidad.findAll({})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar las necesidades');
    });

};

exports.comentarios = function (req,res) {

  Comentario.findAll({})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar los últimos comentarios');
    });

};

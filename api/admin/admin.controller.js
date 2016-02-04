var User = require('./../user/user.model');
var Necesidad = require('./../necesidad/necesidad.model');
var Comentario = require('./../necesidad/comentario/comentario.model');

exports.users = function (req,res) {

  console.log('Cargando todos los usuarios')
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


  console.log('Cargando dashboard del panel de administración')
  var show = {
    order:'id DESC',
    limit:5,
    raw:true
  };

  Comentario.findAll(show)
    .then(function (data) {

      var result = {};
      result.comentarios = data;
      return Necesidad.findAll(show)
        .then((necesidades)=>{
            result.necesidades = necesidades;
            return result;
        })
    })
    .then(function (result) {

      return User.findAll(show)
        .then(function (users) {
          result.users = users;
          return result;
        });

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

  console.log('Cargando todas las necesidades')

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

  console.log('Cargando todos los comentarios')
  Comentario.findAll({})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar los últimos comentarios');
    });

};

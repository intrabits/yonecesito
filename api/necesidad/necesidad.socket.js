'use strict';

var Necesidad = require('./necesidad.model');
var Comentario = require('./comentario/comentario.model')
var fuzzy = require('fuzzy');
var necesidades = [];

Necesidad.findAll({raw:true})
  .then(function (data) {
    console.log(`Necesidades en el sistema: ${data.length}`);
    necesidades = data;
  })
  .catch(function (err) {
    console.error(err)
  });

exports.register = function(socket) {

  socket.on('necesidades:buscar',function (data) {
    try {
      var result = fuzzy.filter(data,necesidades,{
        extract:function (el) {
          return el.titulo;
        }
      });
      socket.emit('necesidades:resultado',result);

    } catch (e) {
      console.error(e)
    }
  });

  socket.on('necesidades:notificaciones',function (data) {

    // Buscamos todas las necesidades del usuario
    console.log(`Cargando notificaciones de ${data.name}`.yellow);
    Necesidad.findAll({
        raw:true,
        attributes:['id'],
        where:{userId:data.id}
      })
      .then(function (necesidades) {

        var necesidadesList = [];

        necesidades.forEach((n) => {
          necesidadesList.push(n.id);
        });

        return Comentario.findAll({
          where:{
            necesidadId:{
              $in:necesidadesList
            },
            visto:false
          }
        });

      })
      .then(function (comentarios) {
        socket.emit('necesidades:notificaciones',comentarios);
      })
      .catch(function (err) {
        console.error(err);
      });

  });


  // Necesidad.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // Necesidad.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}

function onSearch(socket, doc, cb) {
  socket.emit('necesidad:search',doc)
}

function onSave(socket, doc, cb) {
  socket.emit('necesidad:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('necesidad:remove', doc);
}

'use strict';

var Necesidad = require('./necesidad.model');
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
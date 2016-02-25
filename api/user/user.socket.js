'use strict';
/*
Todo esto servirá para guardar la actividad de los usuarios
*/
var logs = [];



exports.register = function(socket) {

  socket.on('users:logs',function (data) {
    console.log('Nuevo log de usuario'.yellow);

    socket.broadcast.emit('users:logs',data);
    
  });


  socket.emit('users:logs',logs);

};

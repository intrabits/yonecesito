(function () {
  'use strict';
  angular
    .module('app.socket',[])
      .factory('socket',['User',function (User) {

        var socket = io();
        socket.log = function (texto) {
          socket.emit('users:logs',{
            log:texto,
            date:new Date(),
            user:User.current
          })
        };

        return socket;
      }]);
})();

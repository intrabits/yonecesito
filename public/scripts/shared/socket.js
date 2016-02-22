(function () {
  'use strict';
  angular
    .module('app.socket',[])
      .factory('socket',function () {
        var socket = io();
        return socket;
      });
})();

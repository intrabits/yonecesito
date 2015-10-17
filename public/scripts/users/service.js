(function () {
  'use strict';
  angular
    .module('app.users.service',  [])

      .factory ('User', ['$http',function ($http) {

        return {
          all:Restangular.all('api/users'),
          one:function  (id) {
            return Restangular.one('api/users',id);
          }
        };
      }]);

})();

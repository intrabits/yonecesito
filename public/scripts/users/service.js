(function () {
  'use strict';
  angular
    .module('app.users.service',  ['restangular'])

      .factory ('User', ['Restangular',function (Restangular) {

        return {
          all:Restangular.all('api/users'),
          one:function  (id) {
            return Restangular.one('api/users',id);
          }
        };
      }]);

})();

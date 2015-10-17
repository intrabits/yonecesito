(function () {
  'use strict';
  angular
    .module('app.necesidad.service',[])
      .factory('Necesidad',['$http',function ($http) {

        return {
          load:function (callback) {
            return $http.get('/api/necesidades');
          },
          show:function (id) {
            return $http.get('/api/necesidades/' + id);
          },
          categoria:function (clave) {
            return $http.get('/api/categorias/' + clave);
          },
          create:function (data) {
            return $http({
              data    :  data,
              method  : 'POST',
              url     : '/api/necesidades'
            });
          }
        }

      }])
})();

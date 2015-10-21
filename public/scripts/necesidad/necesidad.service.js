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
          delete:function (id) {
            return $http.delete('/api/necesidades/' + id);
          },
          create:function (data) {
            return $http({
              data    :  data,
              method  : 'POST',
              url     : '/api/necesidades'
            });
          },
          upload:function (fd,id) {
            return $http.post('/api/necesidades/' + id + '/upload', fd, {
              withCredentials: true,
              headers: {'Content-Type': undefined },
              transformRequest: angular.identity
            });
          },
          update:function (data) {
            return $http({
              data    :  data,
              method  : 'PUT',
              url     : '/api/necesidades/' + data.id
            });
          }
        }

      }])
})();

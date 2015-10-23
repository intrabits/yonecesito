(function () {
  'use strict';
  angular
    .module('app.comentario.service',[])
      .factory('Comentario',['$http',function ($http) {

        return {
          delete:function (id) {
            return $http.delete('/api/comentarios/' + id);
          },
          util:function (id) {
            return $http.patch('/api/comentarios/' + id);
          },
          create:function (data) {
            return $http({
              data    :  data,
              method  : 'POST',
              url     : '/api/necesidades/' + data.necesidadId + '/comentarios'
            });
          },
          update:function (data) {
            return $http({
              data    :  data,
              method  : 'PUT',
              url     : '/api/comentarios/' + data.id
            });
          }
        }

      }])
})();

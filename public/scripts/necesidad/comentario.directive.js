(function () {
  'use strict';
  angular
    .module('app.necesidad.comentario',[])
      .directive('comentario',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/necesidad/comentario.html',
            scope: {
              comentario: '=',
              // ponemos true cuando estamos viendo este comentario desde un lugar que no sea la necesidad como tal, por ejemplo el perfil de un usuario
              externo: '='
            },
          };
      });
})();

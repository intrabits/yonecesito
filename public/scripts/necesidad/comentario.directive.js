(function () {
  'use strict';
  angular
    .module('app.necesidad.comentario',[])
      .directive('comentario',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/necesidad/comentario.html',
            scope: {
              comentario: '='
            },
          };
      });
})();

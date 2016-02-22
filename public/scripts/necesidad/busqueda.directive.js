(function () {
  'use strict';
  angular
    .module('app.necesidad.busqueda',[])
      .directive('busqueda',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/necesidad/views/busqueda.html'            
          };
      });
})();

(function () {
  'use strict';
  angular
    .module('app.necesidad.item',[])
      .directive('necesidadItem',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/necesidad/item.html',
            scope: {
              necesidad: '='
            },
          };
      });
})();

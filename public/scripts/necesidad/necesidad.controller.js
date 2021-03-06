(function () {
  'use strict';
  angular
    .module('app.necesidad',[
      'app.necesidad.service',
      'app.necesidad.nueva',
      'app.necesidad.item',
      'app.necesidad.detalle',
      'app.necesidad.categoria',
      'app.necesidad.comentario',
      'app.necesidad.busqueda',
      'app.comentario.service'
    ])
      .controller('NecesidadesCtrl',['Necesidad','ngNotify',function (Necesidad,ngNotify) {

        var vm = this;

        Necesidad.load()
          .success(function (data) {
              vm.necesidades = data;
          })
          .error(function (err) {
            ngNotify.set(err, 'error');
          });

      }])
      .directive('categoria',function () {
          return {
            restrict: 'E',
            templateUrl: 'scripts/necesidad/cate.html',
            scope:{
              id:'@'
            }
          };
        });
})();

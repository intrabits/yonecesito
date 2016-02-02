(function () {
  'use strict';
  angular
    .module('app.admin.necesidades',[])
      .directive('necesidadesList',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/admin/necesidades.html',
            controller:'AdminNecesidadesCtrl',
            controllerAs:'ctrl'
          };
      })
      .controller('AdminNecesidadesCtrl',['Necesidad','ngNotify','$route',function (Necesidad,ngNotify,$route) {

        var vm = this;

        Necesidad.load()
          .success(function (data) {
            vm.necesidades = data;
          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });

        vm.delete = function name(id) {

          var sure = confirm('¿Realmente deseas borrar esta necesidad?');

          if (sure) {
            Necesidad.delete(id)
              .success(function (data) {
                ngNotify.set(data,'success');
                $route.reload();
              })
              .error(function (err) {
                ngNotify.set(err,'error');
              });
          }
        };

      }]);
})();

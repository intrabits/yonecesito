(function () {
  'use strict';
  angular
    .module('app.necesidad.detalle',[])
      .controller('NecesidadDetalleCtrl',['Necesidad','ngNotify','$routeParams','$window',function (Necesidad,ngNotify,$routeParams,$window) {

        var vm = this;
        vm.necesidad = {};

        if ($routeParams.id) {
          Necesidad.show($routeParams.id)
            .success(function (data) {
              vm.necesidad = data;
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        }

        vm.save = function () {
          Necesidad.update(vm.necesidad)
            .success(function (data) {
              ngNotify.set(data,'success');
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

        vm.delete = function () {
          var sure = confirm('Realmente deseas eliminar esta publicación?');
          if (sure) {
            Necesidad.delete(vm.necesidad.id)
              .success(function (data) {
                ngNotify.set(data,'success');
                $window.location = '#/';
              })
              .error(function (err) {
                ngNotify.set(err,'error');
              });
          }
        };


      }]);
})();

(function () {
  'use strict';
  angular
    .module('app.necesidad.nueva',[])
      .controller('NuevaNecesidadCtrl',['Necesidad','ngNotify','$window',function (Necesidad,ngNotify,$window
      ) {

        var vm = this;
        vm.NecesidadForm = {};

        vm.create = function () {
          Necesidad.create(vm.NecesidadForm)
            .success(function (data) {
              ngNotify.set('Necesidad agregada correctamente :)','success'); $window.location = '#/necesidad/' + data + '/editar';
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

      }]);
})();

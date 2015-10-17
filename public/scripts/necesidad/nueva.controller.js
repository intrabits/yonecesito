(function () {
  'use strict';
  angular
    .module('app.necesidad.nueva',[])
      .controller('NuevaNecesidadCtrl',['Necesidad','ngNotify',function (Necesidad,ngNotify) {

        var vm = this;
        vm.NecesidadForm = {};

        vm.create = function () {
          Necesidad.create(vm.NecesidadForm)
            .success(function (data) {
              ngNotify.set(data,'success');
              vm.NecesidadForm = null;
              vm.NecesidadForm = {};
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

      }]);
})();

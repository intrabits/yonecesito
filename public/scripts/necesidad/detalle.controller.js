(function () {
  'use strict';
  angular
    .module('app.necesidad.detalle',[])
      .controller('NecesidadDetalleCtrl',['Necesidad','ngNotify','$routeParams',function (Necesidad,ngNotify,$routeParams) {

        var vm = this;
        
        if ($routeParams.id) {
          Necesidad.show($routeParams.id)
            .success(function (data) {
              vm.necesidad = data;
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        }


      }]);
})();

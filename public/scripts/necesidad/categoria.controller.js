(function () {
  'use strict';
  angular
    .module('app.necesidad.categoria',[])
      .controller('CategoriaCtrl',['Necesidad','$routeParams',function (Necesidad,$routeParams) {

        var vm = this;



        Necesidad.categoria($routeParams.categoria)
          .success(function (data) {
            vm.necesidades = data.necesidades;
            vm.categoria = data.categoria;
          })
          .error(function (err) {
            console.error(err);
          });

      }]);
})();

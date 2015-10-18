(function () {
  'use strict';
  angular
    .module('app.necesidad',[
      'app.necesidad.service',
      'app.necesidad.nueva',
      'app.necesidad.detalle',
      'app.necesidad.categoria'
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

      }]);
})();
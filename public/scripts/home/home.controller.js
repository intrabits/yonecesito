(function () {
  'use strict';
  angular
    .module('app.home',[])
      .controller('HomeCtrl',['Necesidad','ngNotify',function (Necesidad,ngNotify) {

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

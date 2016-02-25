(function () {
  'use strict';
  angular
    .module('app.user.profile',[])
      .directive('userProfile',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/users/profile.html',
            controller:'UserCtrl',
            controllerAs:'ctrl'
          };
      })
      .controller('UserCtrl',['User','ngNotify','$routeParams',function (User,ngNotify,$routeParams) {
        var vm = this;

        User.show($routeParams.id)
          .success(function  (data) {
              vm.user = data;
              vm.user.aceptadas = _.where(data.comentarios,{util:1});
              vm.user.reputacion = (data.necesidades.length * 10) + data.comentarios.length + (vm.user.aceptadas.length * 20);

              vm.user.visitas = _.sum(data.necesidades,'visitas');
          })
          .error(function  (err) {
            ngNotify.set(err,'error');
          });

      }]);
})();

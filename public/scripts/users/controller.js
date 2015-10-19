(function () {
  'use strict';
  angular.module('app.user', [
    'app.user.service',
    'app.user.config' // editar perfil del usuario y su configuración
  ])
    .controller('UserCtrl',['ngNotify','User','$routeParams',function(ngNotify,User,$routeParams){

      var vm = this;
      console.log('Cargando');

      User.show($routeParams.id)
        .success(function  (data) {
            vm.user = data;
            console.log('no');
            console.log(data);
        })
        .error(function  (err) {
          ngNotify.set(err,'error');
        });

    }]);

})();

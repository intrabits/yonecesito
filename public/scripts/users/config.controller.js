(function () {
  'use strict';
  angular.module('app.user.config', [])
    .controller('ConfigCtrl',['ngNotify','User',function(ngNotify,User){

      var vm = this;
      vm.user = {};
      console.log('Cargando');

      User.me()
        .success(function  (data) {
          vm.user = data;
        })
        .error(function  (err) {
          ngNotify.set(err,'error');
        });

      vm.save = function  () {
        User.update(vm.user)
          .success(function (data) {
            ngNotify.set(data,'success');
          })
          .error(function  (err) {
            ngNotify.set(err,'error');
          });
      };
    }]);

})();

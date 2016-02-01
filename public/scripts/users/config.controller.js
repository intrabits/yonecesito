(function () {
  'use strict';
  angular.module('app.user.config', [])
    .controller('ConfigCtrl',['ngNotify','User','$routeParams',function(ngNotify,User,$routeParams){

      var vm = this;
      vm.user = {};
      var userId = $routeParams.id;

      console.log(userId)

      User.me(userId)
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

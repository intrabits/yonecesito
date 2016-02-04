(function () {
  'use strict';
  angular.module('app.user.config', [])
    .controller('ConfigCtrl',['ngNotify','User','$scope',function(ngNotify,User,$scope){

      var vm = this;
      vm.user = {};

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

      $scope.upload = function(files) {
        console.log('Subiendo archivo');
        var fd = new FormData();
        //Take the first selected file

        if (files[0]) {
          fd.append("file", files[0]);

          User.upload(fd)
            .success(function (data) {
              ngNotify.set('Imagen guardada correctamente','success');
              vm.user.picture = data;
            })
            .error(function (err) {
              console.log(err);
              ngNotify.set(err,'error');
            });
        }
      };


    }]);

})();

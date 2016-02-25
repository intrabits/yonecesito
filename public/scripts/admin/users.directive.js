(function () {
  'use strict';
  angular
    .module('app.admin.users',[])
      .directive('usersList',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/admin/users.html',
            controller:'AdminUsersCtrl',
            controllerAs:'ctrl'
          };
      })
      .controller('AdminUsersCtrl',['User','ngNotify',function (User,ngNotify) {

        var vm = this;

        User.all()
          .success(function (data) {
            vm.users = data;
          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });


        vm.ban = function (user) {

          var palabra = user.type==='banned'?'permitir':'bloquear';

          var sure = confirm('Realmente quieres ' + palabra + ' el acceso a ' + user.name + '?');
          if (sure) {
            User.ban(user.id)
            .success(function (data) {
              if (user.type === 'banned') {
                user.type = 'usuario';
              } else {
                user.type = 'banned';
              }
              ngNotify.set(data,'success');
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
          }
        };

      }]);
})();

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

      }]);
})();

(function () {
  'use strict';
  angular
    .module('app.admin.dashboard',[])
      .directive('adminDashboard',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/admin/dashboard.html',
            controller:'AdminDashCtrl',
            controllerAs:'ctrl'
          };
      })
      .controller('AdminDashCtrl',['Admin','ngNotify',function (Admin,ngNotify) {

        var vm = this;

        Admin.dash()
          .success(function (data) {
            vm.dash = data;
          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });

      }]);
})();

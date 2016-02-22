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
      .controller('AdminDashCtrl',['Admin','ngNotify','socket',function (Admin,ngNotify,socket) {

        var vm = this;
        vm.logs = [];

        Admin.dash()
          .success(function (data) {
            vm.dash = data;

          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });

        socket.on('users:logs',function (data) {          
          ngNotify.set(data.log,'success');
          vm.logs.push(data);
        });






      }]);
})();

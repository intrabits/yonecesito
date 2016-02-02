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
      .controller('UserCtrl',['User','ngNotify',function (User,ngNotify) {

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

(function () {
  'use strict';
  angular.module('app.user', ['app.user.service'])
    .controller('UserCtrl',['$scope','User',function($scope,User){

      User.one('profile').get()
        .then(function  (data) {
          $scope.FormUser = data;
        })
        .catch(function  (err) {
          alert(err.data);
        });

      $scope.updateProfile = function  () {
        $scope.FormUser.put()
          .catch(function  (err) {
            alert(err.data);
          });
      };
    }]);

})();

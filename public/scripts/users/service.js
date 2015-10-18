(function () {
  'use strict';
  angular
    .module('app.user.service',  [])

      .factory ('User', ['$http',function ($http) {

        return {
          me:function () {
            return $http.get('/api/users/profile');
          }
        };
      }]);

})();

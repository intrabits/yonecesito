(function () {
  'use strict';
  angular
    .module('app.user.service',  [])

      .factory ('User', ['$http',function ($http) {

        return {
          me:function () {
            return $http.get('/api/users/profile');
          },
          update:function (data) {
            return $http({
              method:'PUT',
              data:data,
              url:'/api/users/profile'
            });
          },
          show:function (id) {
            return $http.get('/api/users/' + id);
          }
        };
      }]);

})();

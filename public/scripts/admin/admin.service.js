(function () {
  'use strict';
  angular
    .module('app.admin.service',  [])

      .factory ('Admin', ['$http',function ($http) {

        return {
          dash:function () {
            return $http.get('/api/admin/dash');
          },
          user:function (id) {
            return $http.get('/api/admin/users/' + id);
          },
          users:function () {
            return $http.get('api/admin/users');
          },
          necesidad:function (id) {
            return $http.get('/api/admin/necesidades/' + id);
          },
          necesidades:function () {
            return $http.get('api/admin/necesidades');
          }
        };
      }]);

})();

(function () {
  'use strict';
  angular
    .module('app.tags.service',[])
      .factory ('Tag', ['$http',function ($http) {

        return {
          list:function () {
            return $http.get('/api/tags/');
          },
          find:function (id) {
            return $http.get('/api/tags/' + id);
          },
          search:function (data) {
            return $http({
              method:'POST',
              url:'/api/tags/',
              data:data
            });
          }
        };
      }]);
})();

(function () {
  'use strict';
  angular
    .module('app.document.service',['restangular'])
      .factory ('Document', ['$http','Restangular',function ($http,Restangular) {

        return {

          list:function () {
            return Restangular.all('api/documents').getList();
          },

          upload:function (fd) {
            return $http.post('/api/documents/', fd, {
              withCredentials: true,
              headers: {'Content-Type': undefined },
              transformRequest: angular.identity
            });
          },

          show:function (id) {
            return $http.get('/api/documents/' + id);
          },
          update:function (data) {
            return $http({
              method:'PUT',
              url:'/api/documents/' + data.id,
              data:data
            });
          },
          search:function (data) {
            return $http({
              method:'POST',
              url:'/api/documents/search',
              data:data
            });
          },
          ocr:function (id) {
            return $http.get('/api/documents/' + id + '/ocr');
          }
        };
      }]);
})();

(function () {
  'use strict';
    angular
      .module('app.main', [
      'app.directives',
      'app.filters'
    ])
    .controller('MainController',['$rootScope','$scope', function($rootScope, $scope){



      // User agent displayed in home page
      $scope.userAgent = navigator.userAgent;

      // Needed for the loading screen
      $rootScope.$on('$routeChangeStart', function(){
        $rootScope.loading = true;
      });

      $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.loading = false;
      });



      $scope.bottomReached = function() {
        /* global alert: false; */
        alert('Congrats you scrolled to the end of the list!');
      };


      //
      // 'Drag' screen
      //
      $scope.notices = [];

      for (var j = 0; j < 10; j++) {
        $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
      }

      $scope.deleteNotice = function(notice) {
        var index = $scope.notices.indexOf(notice);
        if (index > -1) {
          $scope.notices.splice(index, 1);
        }
      };
    }]);
})();

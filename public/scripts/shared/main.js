(function () {
  'use strict';
  angular.module('app.main', [
    'app.directives',
    'app.filters'
  ])
    .controller('AppCtrl',['$scope','$http','User','$window','$timeout','$mdSidenav','$mdUtil','$log','Document',function ($scope,$http,User,$window,$timeout,$mdSidenav, $mdUtil, $log,Document) {

      User.one('profile').get()
        .then(function  (data) {
          $scope.user = data;
        })
        .catch(function  (err) {
          console.log(err.data);
        });

        $scope.subir = function(files) {
          console.log('Subiendo archivo');
          var fd = new FormData();
          //Take the first selected file

          if (files[0]) {
            fd.append("file", files[0]);

            Document.upload(fd)
              .success(function (data) {
                console.log('Subido correctamente');
                console.log(data);
                $window.location = '#/documento/' + data + '/edit';
              })
              .error(function (err) {
                console.log(err);
              });
              $scope.demo.isOpen = false;
          }else{
            console.log('No se seleccionó ningún archivo');
          }


        };

      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            },300);
        return debounceFn;
      }

      $scope.demo = {
        isOpen: false,
        selectedDirection: 'up',
        selectedMode:'md-fling'
      };

    }])
    .controller('DashCtrl',['$scope',function ($scope) {



    }])
    .controller('LeftCtrl', ['$scope','$timeout','$mdSidenav','$log',function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });
      };
    }])
    .controller('RightCtrl', ['$scope','$timeout','$mdSidenav','$log',function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
    }]);
})();

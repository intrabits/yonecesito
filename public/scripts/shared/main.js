(function () {
  'use strict';
    angular
      .module('app.main', [
      'app.directives',
      'app.filters'
    ])
    .controller('MainController',['$rootScope','$scope','User','ngNotify', function($rootScope, $scope, User, ngNotify){

      var vm = this;

      User.me()
        .success(function (data) {
          vm.user = data;
        })
        .error(function (err) {
          console.log(err);
        });


      vm.palabrasClave = function () {
        swal({
          title: "Suscribirte",
          text: "Escribe palabras separadas por una coma para recibir notificaciones a tu correo:",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "Ej: gimnasios, estéticas, computación, etc"
        }, function(inputValue){
          if (inputValue) {

            User.subscribe({
              words:inputValue
              })
              .success(function (data) {
                swal('Suscrito correctamente', data, "success");
              })
              .error(function (err) {
                ngNotify.set(err,'error');
              });

          } else {
            return false;
          }
        });
      }


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
        // alert('Congrats you scrolled to the end of the list!');
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

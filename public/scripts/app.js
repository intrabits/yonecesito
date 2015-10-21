(function () {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'mobile-angular-ui',
      'angular-loading-bar',
      'app.main',
      'app.home',
      'ngNotify',
      'app.user',
      'app.necesidad',
      // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
      // it is at a very beginning stage, so please be careful if you like to use
      // in production. This is intended to provide a flexible, integrated and and
      // easy to use alternative to other 3rd party libs like hammer.js, with the
      // final pourpose to integrate gestures into default ui interactions like
      // opening sidebars, turning switches on/off ..
      'mobile-angular-ui.gestures'
    ])
    .run(['$transform',function($transform) {
      window.$transform = $transform;
    }])
    .config(['$routeProvider',function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'scripts/home/home.html',
          reloadOnSearch: false
        })
        .when('/', {
          templateUrl: 'scripts/home/scroll.html',
          reloadOnSearch: false,
          controller:'HomeCtrl',
          controllerAs:'HomeCtrl'
        })
        .when('/necesidad/:id', {
          templateUrl: 'scripts/necesidad/detalle.html',
          controller:'NecesidadDetalleCtrl',
          controllerAs:'DetalleCtrl'
        })
        .when('/necesidad/:id/editar', {
          templateUrl: 'scripts/necesidad/editar.html',
          controller:'NecesidadDetalleCtrl',
          controllerAs:'DetalleCtrl'
        })
        .when('/categoria/:categoria', {
          templateUrl: 'scripts/necesidad/categoria.html',
          reloadOnSearch: false,
          controller:'CategoriaCtrl',
          controllerAs:'CategoriaCtrl'
        })
        .when('/perfil', {
          templateUrl: 'scripts/users/config.html',
          reloadOnSearch: false,
          controller:'ConfigCtrl',
          controllerAs:'ConfigCtrl'
        })
        .when('/usuario/:id', {
          templateUrl: 'scripts/users/profile.html',
          reloadOnSearch: false,
          controller:'UserCtrl',
          controllerAs:'UserCtrl'
        })
        .when('/contacto', {
          templateUrl: 'scripts/shared/contacto.html'
        })
        .when('/privacidad', {
          templateUrl: 'scripts/shared/privacidad.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);


    // app.directive('toucharea', ['$touch', function($touch){
    //   // Runs during compile
    //   return {
    //     restrict: 'C',
    //     link: function($scope, elem) {
    //       $scope.touch = null;
    //       $touch.bind(elem, {
    //         start: function(touch) {
    //           $scope.touch = touch;
    //           $scope.$apply();
    //         },
    //
    //         cancel: function(touch) {
    //           $scope.touch = touch;
    //           $scope.$apply();
    //         },
    //
    //         move: function(touch) {
    //           $scope.touch = touch;
    //           $scope.$apply();
    //         },
    //
    //         end: function(touch) {
    //           $scope.touch = touch;
    //           $scope.$apply();
    //         }
    //       });
    //     }
    //   };
    // }]);
    //
    // //
    // // `$drag` example: drag to dismiss
    // //
    // app.directive('dragToDismiss', function($drag, $parse, $timeout){
    //   return {
    //     restrict: 'A',
    //     compile: function(elem, attrs) {
    //       var dismissFn = $parse(attrs.dragToDismiss);
    //       return function(scope, elem){
    //         var dismiss = false;
    //
    //         $drag.bind(elem, {
    //           transform: $drag.TRANSLATE_RIGHT,
    //           move: function(drag) {
    //             if( drag.distanceX >= drag.rect.width / 4) {
    //               dismiss = true;
    //               elem.addClass('dismiss');
    //             } else {
    //               dismiss = false;
    //               elem.removeClass('dismiss');
    //             }
    //           },
    //           cancel: function(){
    //             elem.removeClass('dismiss');
    //           },
    //           end: function(drag) {
    //             if (dismiss) {
    //               elem.addClass('dismitted');
    //               $timeout(function() {
    //                 scope.$apply(function() {
    //                   dismissFn(scope);
    //                 });
    //               }, 300);
    //             } else {
    //               drag.reset();
    //             }
    //           }
    //         });
    //       };
    //     }
    //   };
    // });
    //
    // //
    // // Another `$drag` usage example: this is how you could create
    // // a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
    // //
    // app.directive('carousel', function(){
    //   return {
    //     restrict: 'C',
    //     scope: {},
    //     controller: function() {
    //       this.itemCount = 0;
    //       this.activeItem = null;
    //
    //       this.addItem = function(){
    //         var newId = this.itemCount++;
    //         this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
    //         return newId;
    //       };
    //
    //       this.next = function(){
    //         this.activeItem = this.activeItem || 0;
    //         this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
    //       };
    //
    //       this.prev = function(){
    //         this.activeItem = this.activeItem || 0;
    //         this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
    //       };
    //     }
    //   };
    // });



    //
    // For this trivial demo we have just a unique MainController
    // for everything
    //
    // app.controller('MainController', function($rootScope, $scope){
    //
    //   $scope.swiped = function(direction) {
    //     alert('Swiped ' + direction);
    //   };
    //
    //   // User agent displayed in home page
    //   $scope.userAgent = navigator.userAgent;
    //
    //   // Needed for the loading screen
    //   $rootScope.$on('$routeChangeStart', function(){
    //     $rootScope.loading = true;
    //   });
    //
    //   $rootScope.$on('$routeChangeSuccess', function(){
    //     $rootScope.loading = false;
    //   });
    //
    //   // Fake text i used here and there.
    //   $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';
    //
    //   //
    //   // 'Scroll' screen
    //   //
    //   var scrollItems = [];
    //
    //   for (var i=1; i<=100; i++) {
    //     scrollItems.push('Item ' + i);
    //   }
    //
    //   $scope.scrollItems = scrollItems;
    //
    //   $scope.bottomReached = function() {
    //     /* global alert: false; */
    //     alert('Congrats you scrolled to the end of the list!');
    //   };
    //
    //   //
    //   // Right Sidebar
    //   //
    //   $scope.chatUsers = [
    //     { name: 'Carlos  Flowers', online: true },
    //     { name: 'Byron Taylor', online: true },
    //     { name: 'Jana  Terry', online: true },
    //     { name: 'Darryl  Stone', online: true },
    //     { name: 'Fannie  Carlson', online: true },
    //     { name: 'Holly Nguyen', online: true },
    //     { name: 'Bill  Chavez', online: true },
    //     { name: 'Veronica  Maxwell', online: true },
    //     { name: 'Jessica Webster', online: true },
    //     { name: 'Jackie  Barton', online: true },
    //     { name: 'Crystal Drake', online: false },
    //     { name: 'Milton  Dean', online: false },
    //     { name: 'Joann Johnston', online: false },
    //     { name: 'Cora  Vaughn', online: false },
    //     { name: 'Nina  Briggs', online: false },
    //     { name: 'Casey Turner', online: false },
    //     { name: 'Jimmie  Wilson', online: false },
    //     { name: 'Nathaniel Steele', online: false },
    //     { name: 'Aubrey  Cole', online: false },
    //     { name: 'Donnie  Summers', online: false },
    //     { name: 'Kate  Myers', online: false },
    //     { name: 'Priscilla Hawkins', online: false },
    //     { name: 'Joe Barker', online: false },
    //     { name: 'Lee Norman', online: false },
    //     { name: 'Ebony Rice', online: false }
    //   ];
    //
    //   //
    //   // 'Forms' screen
    //   //
    //   $scope.rememberMe = true;
    //   $scope.email = 'me@example.com';
    //
    //   $scope.login = function() {
    //     alert('You submitted the login form');
    //   };
    //   //
    //   // 'Drag' screen
    //   //
    //   $scope.notices = [];
    //
    //   for (var j = 0; j < 10; j++) {
    //     $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
    //   }
    //
    //   $scope.deleteNotice = function(notice) {
    //     var index = $scope.notices.indexOf(notice);
    //     if (index > -1) {
    //       $scope.notices.splice(index, 1);
    //     }
    //   };
    // });

})();

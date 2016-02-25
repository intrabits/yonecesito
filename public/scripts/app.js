(function () {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ngNotify',
      'ui.bootstrap',
      'mobile-angular-ui',
      'angular-loading-bar',
      'mobile-angular-ui.gestures',
      'app.socket',
      'app.necesidad',
      'app.admin',
      'app.home',
      'app.main',
      'app.user'
    ])
    .run(['$transform',function($transform) {
      window.$transform = $transform;
    }])
    .run(['$rootScope', function($rootScope) {

      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

        // if (current.$$route && current) {
        //   $rootScope.title = current.$$route.title;
        // }

      });

    }])
    .config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'scripts/home/scroll.html',
          reloadOnSearch: false,
          controller:'HomeCtrl',
          controllerAs:'HomeCtrl'
        })
        .when('/busqueda', {
          template: '<busqueda></busqueda>',
        })
        .when('/necesidad/:id', {
          templateUrl: 'scripts/necesidad/views/detalle.html',
          controller:'NecesidadDetalleCtrl',
          controllerAs:'DetalleCtrl'
        })
        .when('/necesidad/:id/comentario/:comentarioId', {
          templateUrl: 'scripts/necesidad/views/detalle.html',
          controller:'NecesidadDetalleCtrl',
          controllerAs:'DetalleCtrl'
        })
        .when('/necesidad/:id/editar', {
          templateUrl: 'scripts/necesidad/views/editar.html',
          controller:'NecesidadDetalleCtrl',
          controllerAs:'DetalleCtrl'
        })
        .when('/categoria/:categoria', {
          templateUrl: 'scripts/necesidad/views/categoria.html',
          reloadOnSearch: false,
          controller:'CategoriaCtrl',
          controllerAs:'CategoriaCtrl'
        })
        .when('/perfil', {
          title:'Configuración de la cuenta',
          templateUrl: 'scripts/users/config.html',
          reloadOnSearch: false,
          controller:'ConfigCtrl',
          controllerAs:'ConfigCtrl'
        })
        .when('/usuario/:id', {
          template: '<user-profile></user-profile>'
        })
        .when('/contacto', {
          templateUrl: 'scripts/shared/contacto.html'
        })
        .when('/privacidad', {
          templateUrl: 'scripts/shared/privacidad.html'
        })
        .when('/admin', {
          template: '<admin-dashboard></admin-dashboard>'
        })
        .when('/admin/usuarios', {
          template: '<users-list></users-list>'
        })
        .when('/admin/necesidades', {
          template: '<necesidades-list></necesidades-list>'
        })
        .when('/admin/comentarios', {
          template: '<comentarios-list></comentarios-list>'
        })
        .otherwise({
          redirectTo: '/'
        });

        // $locationProvider.html5Mode(true);

    }]);

})();

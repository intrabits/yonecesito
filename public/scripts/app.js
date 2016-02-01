(function () {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ngNotify',
      'mobile-angular-ui',
      'angular-loading-bar',
      'app.main',
      'app.home',
      'app.admin',
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
        .when('/admin/usuarios', {
          template: '<users-list></users-list>'
        })
        .when('/admin/usuario/:id', {
          template: '<user-settings></user-settings>'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

})();

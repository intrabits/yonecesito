(function () {
  'use strict';

  angular
    .module('app', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'ngNotify',
      'ngMaterial',
      'ngFileUpload',
      'ui','ui.bootstrap',
      'angular-loading-bar',
      'datatables',
      'app.main',
      'app.archivos',
      'app.document',
      'app.tags',
      'app.users',
      'restangular'
    ])
    .config(['$routeProvider',function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'scripts/home/home.html',
          controller: 'DashCtrl'
        })
        .when('/documento/:id', {
          templateUrl: 'scripts/documents/guardar.html',
          controller: 'SubirCtrl'
        })
        .when('/documentos/subir', {
          templateUrl: 'scripts/documents/subir.html',
          controller: 'SubirCtrl'
        })
        .when('/documentos', {
          templateUrl: 'scripts/documents/index.html',
          controller: 'DocumentsCtrl',
          controllerAs:'docs'
        })
        .when('/documentos/capturar', {
          templateUrl: 'scripts/documents/capturar.html',
          controller: 'DashCtrl'
        })
        .when('/documento/:id', {
          templateUrl: 'scripts/documents/show.html',
          controller: 'DocumentCtrl'
        })
        .when('/documento/:id', {
          templateUrl: 'scripts/documents/show.html',
          controller: 'DocumentCtrl'
        })
        .when('/documento/:id/edit', {
          templateUrl: 'scripts/documents/edit.html',
          controller: 'DocumentEditCtrl',
          controllerAs: 'DocumentCtrl'
        })
        .when('/etiquetas', {
          templateUrl: 'scripts/tags/index.html',
          controller: 'TagsCtrl',
          controllerAs: 'TagsCtrl'
        })
        .when('/etiqueta/:tag', {
          templateUrl: 'scripts/tags/tag.html',
          controller: 'TagCtrl',
          controllerAs: 'TagCtrl'
        })
        .when('/configuracion', {
          templateUrl: 'scripts/users/index.html',
          controller: 'UserCtrl'
        })
        .when('/archivos', {
          templateUrl: 'scripts/archivos/index.html',
          controller: 'ArchivosCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
})();

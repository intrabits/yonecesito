(function () {
  'use strict';
  angular
    .module('app.document.directives',[])
      .directive('document',function () {
        return {
          restrict: 'A',
          require: 'ngModel',
          templateUrl:'scripts/documents/directive.html'
        };
      });
})();

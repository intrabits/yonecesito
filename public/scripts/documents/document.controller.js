(function () {
  'use strict';
  angular
    .module('app.document',[
      'app.document.service',
      'app.document.detail',
      'app.document.directives',
      'app.document.upload',
      'app.document.search'
    ]).controller('DocumentsCtrl',['$scope','Document',function ($scope,Document) {
      var vm = this;

      Document.list()
        .then(function (data) {
          vm.documents = data;
        })
        .catch(function (err) {
          console.log(err);
        });

    }]);
})();

(function () {
  'use strict';
  angular
    .module('app.document.search',[])
      .controller('DocumentSearchCtrl',['Document','$window','ngNotify','$scope',function (Document,$window,ngNotify,$scope) {
        var vm = this;
        vm.string = '';
        vm.encontrados = [];

        vm.search = function () {
          console.log('Buscando documentos (OCR)');
          var str = vm.string.toString();
          // str = str.split(',');
          Document.search({string:str})
            .success(function (data) {
              console.log(data);
              vm.encontrados = data;
              $scope.encontrados = data;
              $('#BusquedaOCR').html('');
              vm.encontrados.map(function (d) {
                console.log('Insertado LI');
                $("#BusquedaOCR").append('<li><a href="#/documento/' + d.id +'"> '  + d.name + '</a></li>');
              });
              $scope.toggleRight();
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

        vm.searchTag = function () {
          $window.location = '#/etiqueta/' + vm.string;
        };



    }]);
})();

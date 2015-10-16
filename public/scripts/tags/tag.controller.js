(function () {
  'use strict';
  angular
    .module('app.tags.tag',[])
      .controller('TagCtrl',['Tag','ngNotify','$routeParams',function (Tag,ngNotify,$routeParams) {

        var vm = this;
        vm.tag = $routeParams.tag;
        console.log('Cargando documentos de la etiqueta ' + $routeParams.tag);

        Tag.find($routeParams.tag)
          .success(function (data) {
            vm.documents = data;
          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });

      }]);
})();

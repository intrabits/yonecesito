(function () {
  'use strict';
  angular
    .module('app.document.detail',[])
      .controller('DocumentEditCtrl',['Document','$routeParams','ngNotify',function (Document,$routeParams,ngNotify) {

        var vm = this;

        vm.chips = ['hola','bartola'];

        console.log('Editar documento');
        Document.show($routeParams.id)
          .success(function (data) {
            vm.document = data;
            console.log(data);
            vm.chips = data.tags;
            vm.tags = data.ocr.split(' ');
            if (data.ocr.length<1) {
              console.log('Procesando (OCR)');
              Document.ocr($routeParams.id)
                .success(function (ocr) {
                  vm.document.ocr = ocr;

                  vm.tags = ocr.split(' ');

                });

            }
          })
          .error(function (err) {
            console.log(err);
            alert(err);
          });

        vm.addTag = function (tag) {
          if (!_.includes(vm.chips,tag)) {
            vm.chips.push(tag);
          }
        };

        vm.editDocument = function () {
          console.log('Editando documento');
          vm.document.tags = vm.chips;
          Document.update(vm.document)
            .success(function (data) {
              ngNotify.set(data,'success');
            })
            .catch(function (err) {
              ngNotify.set(err,'error');
            });
        };

      }])
      .controller('DocumentCtrl',['$scope','Document','$routeParams',function ($scope,Document,$routeParams) {

        Document.show($routeParams.id)
          .success(function (data) {
            $scope.document = data;
          })
          .error(function (err) {
            console.log(err);
            alert(err);
          });

      }]);
})();

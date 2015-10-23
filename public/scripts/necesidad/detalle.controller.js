(function () {
  'use strict';
  angular
    .module('app.necesidad.detalle',[])
      .controller('NecesidadDetalleCtrl',['Necesidad','ngNotify','$routeParams','$window','Comentario','$scope',function (Necesidad,ngNotify,$routeParams,$window,Comentario,$scope) {

        var vm = this;
        vm.necesidad = {};
        vm.ComentarioForm = {};

        if ($routeParams.id) {
          Necesidad.show($routeParams.id)
            .success(function (data) {
              vm.necesidad = data;
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        }

        vm.save = function () {
          Necesidad.update(vm.necesidad)
            .success(function (data) {
              ngNotify.set(data,'success');
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

        vm.comentar = function () {
          vm.ComentarioForm.necesidadId = vm.necesidad.id;
          vm.ComentarioForm.userId = vm.necesidad.userId;
          vm.Comentario.createdAt = new Date();

          Comentario.create(vm.ComentarioForm)
            .success(function (data) {
              ngNotify.set(data,'success');
              vm.necesidad.comentarios.push(vm.ComentarioForm);
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

        vm.delete = function () {
          var sure = confirm('Realmente deseas eliminar esta publicación?');
          if (sure) {
            Necesidad.delete(vm.necesidad.id)
              .success(function (data) {
                ngNotify.set(data,'success');
                $window.location = '#/';
              })
              .error(function (err) {
                ngNotify.set(err,'error');
              });
          }
        };

        vm.util = function (comentario) {

          Comentario.util(comentario.id)
            .success(function (data) {
              comentario.util = true;
              ngNotify.set(data,'success');
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

        $scope.upload = function(files) {
          console.log('Subiendo archivo');
          var fd = new FormData();
          //Take the first selected file

          if (files[0]) {
            fd.append("file", files[0]);

            Necesidad.upload(fd,$routeParams.id)
              .success(function (data) {
                ngNotify.set(data,'success');
                console.log(data);
              })
              .error(function (err) {
                console.log(err);
                ngNotify.set(err,'error');
              });
          }


        };


      }]);
})();

(function () {
  'use strict';
  angular
    .module('app.necesidad.detalle',[])
      .controller('NecesidadDetalleCtrl',['Necesidad','ngNotify','$routeParams','$window','Comentario','$scope','socket','$rootScope',function (Necesidad,ngNotify,$routeParams,$window,Comentario,$scope,socket,$rootScope) {

        var vm = this;
        vm.necesidad = {};
        vm.Comentario = {};


        if ($routeParams.id) {
          socket.log('Viendo una necesidad');
          Necesidad.show($routeParams.id)
            .success(function (data) {
              vm.necesidad = data;
              $rootScope.title = data.titulo;
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        }

        vm.save = function () {
          socket.log('editando una necesidad');
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
          socket.log('comentando una necesidad');
          Comentario.create(vm.ComentarioForm)
            .success(function (data) {
              ngNotify.set(data,'success');
              vm.Comentario.createdAt = new Date();
              vm.necesidad.comentarios.push(vm.Comentario);
              vm.Comentario = {};
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

        vm.delete = function () {
          socket.log('eliminando una necesidad');
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
          socket.log('marcando un comentario como "útil"');
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
          socket.log('agregando foto a una necesidad');
          var fd = new FormData();

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

(function () {
  'use strict';
  angular
    .module('app.admin.comentarios',[])
      .directive('comentariosList',function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/admin/comentarios.html',
            controller:'AdminComentariosCtrl',
            controllerAs:'ctrl'
          };
      })
      .controller('AdminComentariosCtrl',['Comentario','ngNotify','$route',function (Comentario,ngNotify,$route) {

        var vm = this;

        Comentario.all()
          .success(function (data) {
            vm.comentarios = data;
          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });

        vm.delete = function name(id) {

          var sure = confirm('¿Realmente deseas borrar este comentario?');

          if (sure) {
            Comentario.delete(id)
              .success(function (data) {
                ngNotify.set(data,'success');
                $route.reload();
              })
              .error(function (err) {
                ngNotify.set(err,'error');
              });
          }
        };

        vm.update = function (comentario) {
          var texto = prompt('Remplaza el texto',comentario.texto)

          comentario.texto = texto;
          Comentario.update(comentario)
            .success(function (data) {
              ngNotify.set(data,'success');
              $route.reload();
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

      }]);
})();

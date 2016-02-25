// (function () {
//   'use strict';
//   angular
//     .module('app.user.notificaciones',[])
//       .directive('notificaciones',function () {
//
//         var badge = '';
//
//         badge += '<a class="btn badge btn-danger" ng-click="ctrl.revisar()" ng-if="ctrl.notificaciones.lengtht>0">';
//         badge += '{{ctrl.notificaciones.length}}';
//         badge += '</a>';
//
//         return {
//             restrict: 'E',
//             template: badge,
//             controller:'NotificacionesCtrl',
//             controllerAs:'ctrl'
//           };
//       })
//       .controller('NotificacionesCtrl',['User','socket','ngNotify',function (User,socket,ngNotify) {
//
//         var vm = this;
//
//         if (User.current.id) {
//           socket.emit('necesidades:notificaciones',User.current);
//         }
//
//         socket.on('necesidades:notificaciones',function (data) {
//           vm.notificaciones = data;
//           console.log('Notiicaciones encontradas: ',data.length)
//         });
//
//         vm.revisar = function () {
//           var html = '<div ng-click="">';
//           html += '<a href="/auth/facebook" class="btn btn-info form-control">Twitter</a>'
//           html += '<a href="/auth/facebook" class="btn btn-danger form-control">Google</a>'
//           swal({
//             title:'Ofertas/Comentarios sin leer',
//             text:html,
//             html:true
//           });
//         }
//
//       }]);
// })();

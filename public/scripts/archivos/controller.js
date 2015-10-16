'use strict';
angular.module('app.archivos', ['archivo.model'])
  .controller('ArchivosCtrl',['$scope','$route','Archivo','$window',function($scope,$route, Archivo, $window){

    Archivo.all(function (err,data) {
      if (err) {
        swal('Error',err,'error');
      } else {
        $scope.archivos = data;
      }
    });

    $scope.saveArchivo = function () {
      console.log('Guardando');
      Archivo.create($scope.FormArchivo,function (err,data) {
        if (err) {
          swal('Error',err,'error');
        } else {
          $scope.registros.push($scope.FormArchivo);
        }
      });
    };

    $scope.deleteArchivo = function (id) {
      var si = confirm('¿Realmente deseas eliminar este Archivo?');
      if (si) {
        Archivo.delete($scope.Archivo_id,function (err,data) {
          if (err) {
            swal('Error',err,'error');
          } else {
            $window.location ='#/Archivos';
          }
        });
      }
    };

  }]);

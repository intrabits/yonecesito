(function () {
  'use strict';
  angular
    .module('app.document.upload',[])
    .controller('SubirCtrl',['$scope','Upload','$mdDialog',function ($scope,Upload,$mdDialog) {
      console.log('Subir archivo');
      $scope.progress = false;



      $scope.upload = function(event){
          console.log('Subiendo');
          $scope.progress = true;
          upload($scope.files, event);
      };

      var upload = function (files, event) {
          if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                console.log('Archivo ' + i);
                  var file = files[i];
                  console.log(file);
                  Upload.upload({
                      url: '/api/documents/',
                      file: files,
                      fileName: "file"
                  }).progress(function (evt) {
                      if(!$scope.progress) {
                          $scope.progress = true;
                      }

                      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                  }).success(function (data, status, headers, config) {
                      $scope.progress = false;
                      $mdDialog.show(
                          $mdDialog.alert()
                              .parent(angular.element(document.body))
                              .title('Text Scanned from Mulkiya')
                              .content(data)
                              .ariaLabel('Alert Dialog')
                              .ok('Got it!')
                              .targetEvent(event)
                      );
                      console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                  }).error(function (data) {
                    $scope.progress = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Text Scanned from Mulkiya')
                            .content(data)
                            .ariaLabel('Alert Dialog')
                            .ok('Got it!')
                            .targetEvent(event)
                    );
                  });
              }
          }
      };

    }]);
})();

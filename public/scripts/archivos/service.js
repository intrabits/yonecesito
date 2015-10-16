
/* Modelo pagos */

angular.module('archivo.model',  ['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Archivo', ['$http',function ($http) {

            return {
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/archivos/'
                      })
                        .success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback(err,null);
                        });
                },
                update:function (id,datos, callback) {
                  $http({
                    data    :  datos,
                    method  : 'PUT',
                    url     : '/api/seguros/'+id
                  })
                  .success(function(data) {
                    callback(null,data);
                  }).error(function(err){
                    callback(err,null);
                  });
                },
                detail:function (id,callback) {
                    $http.get('/api/seguros/'+id).success(function (data) {
                          callback(null,data);
                     }).error(function (err) {
                           callback(err);
                     });
                },
                delete:function (id,callback) {
                  $http.delete('/api/seguros/'+id).success(function (data) {
                    callback(null,data);
                  }).error(function (err) {
                    callback(err);
                  });
                },
                all:function (callback) {
                  $http.get('/api/archivos/').success(function (data) {
                    callback(null,data);
                   }).error(function (err) {
                         callback(err);
                   });
                },
                find:function (uid,callback) {
                  $http.get('/api/archivos/?ref='+uid).success(function (data) {
                    callback(null,data);
                   }).error(function (err) {
                         callback(err);
                   });
                },
                departamentos:function (callback) {
                  $http.get('/api/departamentos/').success(function (data) {
                    callback(null,data);
                  }).error(function (err) {
                    callback(err);
                  });
                },
                ramos:function (callback) {
                  $http.get('/api/ramos/').success(function (data) {
                    callback(null,data);
                  }).error(function (err) {
                    callback(err);
                  });
                }
            }
}]);

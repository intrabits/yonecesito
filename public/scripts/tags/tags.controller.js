(function () {
  'use strict';
  angular
    .module('app.tags',[
      'app.tags.service',
      'app.tags.tag'
    ])
      .controller('TagsCtrl',['Tag','ngNotify',function (Tag,ngNotify) {

        var vm = this;

        vm.selectTags = {};

        Tag.list()
          .success(function (data) {
            vm.tags = data;
          })
          .error(function (err) {
            ngNotify.set(err,'error');
          });

        vm.busarDocumentos = function () {
          console.log(vm.selectTags);
          var sTags = [];

          _.each(vm.selectTags,function (t,k) {
            if (t===true) {
              sTags.push(k);
            }
          });

          console.log(sTags);

          Tag.search(sTags)
            .success(function (data) {
              vm.documents = data;
              console.log(data.length);
            })
            .error(function (err) {
              ngNotify.set(err,'error');
            });
        };

      }]);
})();

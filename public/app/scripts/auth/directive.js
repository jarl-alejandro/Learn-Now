(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.auth.directive", [
    ])
    .directive('fileModel', [function(){
      return {
        controller: ['$parse', '$element', '$attrs', '$scope',
        function($parse, $element, $attrs, $scope){
          let exp = $parse($attrs.fileModel)

          $element.on('change', function(){
            exp.assign($scope, this.files)
            $scope.$apply()
          })

        }]
      }
    }])
    .directive("toolbarAuth", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/toolbarAuth.html"
      }
    })

})()

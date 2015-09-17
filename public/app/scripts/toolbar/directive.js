(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.toolbar.directive", [
    ])
    .directive("toolbar", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/toolbar.html"
      }
    })

})()

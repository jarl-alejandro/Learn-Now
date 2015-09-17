(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.course.directive", [
    ])
    .directive("addSurge", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/add-surge.html"
      }
    })

})()

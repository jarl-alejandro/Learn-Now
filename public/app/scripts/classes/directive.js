(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.classes.directive", [
    ])
    .directive("chat", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/class/chat.html"
      }
    })
    .directive("recurso", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/class/recurso.html"
      }
    })
    .directive("misNotas", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/class/mis-notas.html"
      }
    })
    .directive("reponderPregunta", ()=>{
      return{
        restrict: "E",
        templateUrl: "partials/class/responder.html"
      }
    })

})()

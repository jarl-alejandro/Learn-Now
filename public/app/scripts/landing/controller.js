(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.controller", [
    ])
    .controller("landingCtrl", ["$scope", ($scope)=>{
      $scope.name = "JARL"
    }])


})()

(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.toolbar.controller", [
    ])
    .controller("toolbar", ["$scope", ($scope)=>{
      $scope.flag = false
      $scope.menu = function(){
        $scope.flag = true
      }
    }])
    .controller("buscador", ["$scope", "resourceCourse", ($scope, resourceCourse)=>{
      $scope.showLista = false
      $scope.buscartext
      $scope.resultado = false
      $scope.cursos = resourceCourse.query()

      $scope.shows = function(){
        $scope.showLista = !$scope.showLista
      }

      $scope.search = function(){
        let results = $scope.cursos.filter((curso)=>{
          return curso.title.startsWith($scope.buscartext)
        })
        $scope.resultado = results
      }
    }])

})()

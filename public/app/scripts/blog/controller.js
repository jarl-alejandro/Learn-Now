(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.Blog.controller", [
    ])
    .controller("blogCtrl", ["$scope", ($scope)=>{
    }])
    .controller("TallerCtrl", ["$scope", "$stateParams", "tallerResource",
      ($scope, $stateParams, tallerResource)=>{
        $scope.taller = tallerResource.get({ id:$stateParams.id })
      }
    ])
    .controller("tallerPregunta", ["$scope", "$stateParams", "$resource", "answerResource", "socket",
      ($scope, $stateParams, $resource, answerResource, socket)=>{
        $scope.user = $resource("/api/user").get({})
        $scope.preguntas = answerResource.query({ id:$stateParams.id })
        console.log("preguntas", $scope.preguntas)

        socket.emit("join::class", $stateParams.id)
        socket.on("taller::new", nuevaPregunta)

        $scope.question =  ()=>{
          let talleQst = {
            answer: $scope.pregunta,
            user: $scope.user,
            clase:$stateParams.id
          }
          socket.emit("taller::question", talleQst)
          $scope.pregunta = null
        }
        function nuevaPregunta(data){
          $scope.preguntas.unshift(data)
          $scope.$digest()

        }
      }
    ])

})()

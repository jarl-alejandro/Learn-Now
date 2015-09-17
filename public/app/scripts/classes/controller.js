(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.classes.controller", [
    ])
    .controller("classCtrl", ["$scope", "$stateParams", "classesresource",
      ($scope, $stateParams, classesresource)=>{
        $scope.clase = classesresource.get({ id:$stateParams.id })
      }
    ])
    .controller("embedVideo", ["$scope", "$sce", ($scope, $sce)=>{
      $scope.trustSrc = function(src){
        let video = `http://www.youtube.com/embed/${src}?enablejsapi=1&origin=http%3A%2F%2Flocalhost:3000`
        return $sce.trustAsResourceUrl(video)
      }
    }])
    .controller("Preguntar", ["$scope", "$resource", "$stateParams", "socket", "answerResource",
      ($scope, $resource, $stateParams, socket, answerResource)=>{
        $scope.user = $resource("/api/user").get({})
        $scope.answers = answerResource.query({ id:$stateParams.id })

        socket.emit("join::class", $stateParams.id)
        socket.on("emit::message", emitMessage)

        $scope.chat = ()=>{
          let answer = {
            answer: $scope.pregunta,
            user: $scope.user,
            clase:$stateParams.id
          }
          socket.emit("new::answer", answer)
          $scope.pregunta = null
        }

        function emitMessage(data){
          $scope.answers.unshift(data)
          $scope.$digest()
        }

      }
    ])
    .controller("giveLike", ["$scope", "answerResource",  ($scope, answerResource)=>{
      $scope.like = function(){

        answerResource.update({ id:$scope.pregunta.id }, { "votes":1 },
          (data)=>{
            $scope.pregunta.votes = data.votes
          }
        )
      }

    }])
    .controller("ResponderCtrl", ["$scope", ($scope)=>{
      $scope.quitarPregunta = false

      $scope.responder = function(){
        $scope.quitarPregunta = !$scope.quitarPregunta
      }

    }])
    .controller("respondCtrl", ["$scope", "$resource", "socket", "respuestaresource",
      ($scope, $resource, socket, respuestaresource)=>{
        $scope.responder = {}
        $scope.idpregunta = $scope.pregunta.id
        $scope.user = $resource("/api/user").get({})

        $scope.respondNew = respuestaresource.query({ id:$scope.idpregunta })

        socket.emit("join::class", $scope.pregunta.id)
        socket.on("new::respuesta", respuestaNueva)

        $scope.respond = ()=>{
          $scope.responder["pregunta"] = $scope.pregunta
          $scope.responder["user"] = $scope.user
          socket.emit("respuesta::pregunta", $scope.responder)
          $scope.responder.respuesta = null
        }

        function respuestaNueva(data){
          $scope.respondNew.unshift(data)
          $scope.$digest()
        }
      }
    ])
    .controller("surgerenciaCtrl", ["$scope", "$resource", ($scope, $resource)=>{
      $scope.surgerencia = false
      $scope.surge = ()=>{
        $scope.surgerencia = !$scope.surgerencia
      }
      $scope.enviarSurgerencia = ()=>{
        $resource("/api/surgerencias").save({
          surgerencia : $scope.surgerenciaTexto
        }, (data)=>{
          $scope.surgerenciaTexto = null
        })
      }
    }])
    .controller("darVoto", ["$scope", "socket", "respuestaresource",
      ($scope, socket, respuestaresource)=>{
        $scope.respondNew = respuestaresource.query({ id:$scope.respuesta.pregunta.id })
        socket.on("update::voto", updateVoto)

        $scope.votar = ()=>{
          socket.emit("dar::voto", $scope.respuesta.id)
        }

        function updateVoto(data){
          console.log($scope.respondNew)
          $scope.respondNew.unshift(data)
          $scope.$digest()
        }
      }
    ])
    .controller("MisApuntes", ["$scope", "$stateParams", "misApuntesR",
      ($scope, $stateParams, misApuntesR)=>{
        $scope.idclase = $stateParams.id
        $scope.misApuntes = misApuntesR.query()

        $scope.apuntes = ()=>{
          misApuntesR.save({
            apunte: $scope.apunte,
            clase: $stateParams.id
          }, (data)=>{
            $scope.misApuntes.unshift(data)
          })
          $scope.apunte = null
        }
      }
    ])

})()

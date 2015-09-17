(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.auth.controller", [
    ])

    .controller("loginCtrl", ["$scope", "$auth","$location",
      ($scope, $auth, $location)=>{
        $scope.authData = {}

        $scope.login = function(){
          $auth.login({
            email: $scope.authData.email,
            password: $scope.authData.password
          })
          .then(()=>{
            $location.path("/mis/cursos")
          })
          .catch((res)=>{
            console.log("err", res)
          })
        }
        $scope.authenticate = (provider)=>{
          $auth.authenticate(provider)
          .then(()=>{
            alert("Has iniciado sesión correctamente")
            $location.path("/mis/cursos")
          })
          .catch((response)=>{
            console.log("Hay un problema que no se que carajos pasa")
            alert(response.data ? response.data.message : response)
          })
        }
      }
    ])

    .controller("signupCtrl", ["$scope", "$auth", "$location",
      ($scope, $auth, $location)=>{
        $scope.authData = {}

        $scope.signup = function(){

          $auth.signup({
            firstName: $scope.authData.firstName,
            lastName: $scope.authData.lastName,
            email: $scope.authData.email,
            password: $scope.authData.password,
            avatar: $scope.authData.avatar,
            about: $scope.authData.about,
            staff: false,
          })
          .then(()=>{
            $location.path("/mis/cursos")
          })
          .catch(function(response){
            if(typeof response.data.message === 'object'){
              angular.forEach(response.data.message, function(message){
                alert(message[0])
              })
            }
            else{
              alert(response.data.message)
            }
          })
        }
      }
    ])

    .controller("logoutCtrl", ["$scope", "$location", "$auth",
      ($scope, $location, $auth)=>{
        if(!$auth.isAuthenticated())
          return;
        $auth.logout()
          .then(()=>{
            $location.path("/")
          })
      }
    ])

    .controller("profile", ["$scope", "Account", ($scope, Account)=>{
      $scope.getProfile = ()=>{
        Account.getProfile()
          .success((data)=>{
            $scope.user = data
          })
          .error((err)=>{
            alert(err)
          })
      }
      $scope.getProfile()
    }])

})()

(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular.module("LearnNow.dashboard.controller", [
  ])
  .controller("dashboardCtrl", ["$scope", "$location", "Account",
    ($scope, $location, Account)=>{

      $scope.getProfile = ()=>{
        Account.getProfile()
          .success((data)=>{
            $scope.user = data

            if($scope.user.staff === true)
              $location.path("/dashboard")
            else
              $location.path("/app")
          })
          .error((err)=>{
            alert(err)
          })
      }

      $scope.getProfile()
    }
  ])
  .controller('TabsController', ['$scope', ($scope)=>{
    $scope.tab = 1

    $scope.selectTab = function (tab) {
      $scope.tab = tab
    }
    $scope.isActive = function (tab) {
      return tab === $scope.tab
    }
  }])
  .controller("AddTeacherCtrl", ["$scope", "$location", "teacherResource",
    ($scope, $location, teacherResource)=>{
      $scope.dataForm = {}
      $scope.teacher = function(){
        console.log("dataForm ", $scope.dataForm)
        teacherResource.save($scope.dataForm, (data)=>{
          console.log("data ", data)
          $location.path("/dashboard")
        })
      }
    }
  ])
  .controller("getTeacher", ["$scope", "teacherResource",
    ($scope, teacherResource)=>{
      $scope.teachers = teacherResource.query()
    }
  ])
  .controller("AddCourseCtrl", ["$scope", "$location", "teacherResource", "resourceCourse",
    ($scope, $location, teacherResource, resourceCourse)=>{
      $scope.dataForm = {}
      $scope.course = function(){
        resourceCourse.save($scope.dataForm, (data)=>{
          $location.path("/dashboard")
        })
      }
    }
  ])
  .controller("addClassCtrl",  ["$scope", "$stateParams", "classesResourse",
    ($scope, $stateParams, classesResourse)=>{
      $scope.dataForm = {}
      $scope.classes = function(){
        $scope.dataForm["course"] = $stateParams.id

        classesResourse.save($scope.dataForm, (data)=>{
          $scope.dataForm = {}
          $scope.clase = false
        })

      }
    }
  ])
  .controller("taller", ["$scope", "tallerResource", ($scope, tallerResource)=>{
    $scope.talleres = tallerResource.query()
  }])
  .controller("newTaller",["$scope", "$location", "tallerResource",
    ($scope, $location, tallerResource)=>{
      $scope.dataForm = {}

      $scope.newTaller = ()=>{
        console.log("talleres ", $scope.dataForm)
        tallerResource.save($scope.dataForm, (data)=>{
          $location.path("/dashboard")
        })
      }
    }
  ])
})()

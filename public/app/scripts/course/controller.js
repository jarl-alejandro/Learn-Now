(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.course.controller", [
    ])
    .controller("appCtrl", ["$scope", "resourceCourse",
      ($scope, resourceCourse)=>{
        $scope.courses = resourceCourse.query()
      }
    ])
    .controller("courseCtrl", ["$scope", "$stateParams", "$location", "resourceCourse", "resourceMy",
      ($scope, $stateParams, $location, resourceCourse, resourceMy)=>{
        $scope.course = resourceCourse.get({ id:$stateParams.id })
        $scope.idcourse = $stateParams.id
        $scope.micurso = resourceMy.query()
        console.log($scope.micurso)

        $scope.take = function(){
          resourceMy.save({ course:$stateParams.id }, (data)=>{
            $location.path(`/mi/curso/${ $stateParams.id }`)
            console.log(data, " ", $stateParams.id)
          })
        }

      }
    ])
    .controller("myCoursesCtrl", ["$scope", "resourceMy", ($scope, resourceMy)=>{
      $scope.mycourses = resourceMy.query()
    }])
    .controller("miCursoCtrl", ["$scope", "$stateParams", "$resource", "resourceCourse",
      ($scope, $stateParams, $resource, resourceCourse)=>{
        $scope.course = resourceCourse.get({ id:$stateParams.id })
        $scope.clases = $resource(`/api/class/course/${$stateParams.id}`).query()
      }
    ])

})()

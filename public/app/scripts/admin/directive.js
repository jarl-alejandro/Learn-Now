(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.dashboard.directive", [
    ])
    .directive("courseData", [()=>{
      return{
        restrict: "E",
        templateUrl:"partials/admin/course-data.html"
      }
    }])
    .directive("teacherData", [()=>{
      return{
        restrict: "E",
        templateUrl: "partials/admin/teacher-data.html"
      }
    }])
    .directive("formClasses", [()=>{
      return{
        restrict: "E",
        templateUrl: "partials/admin/add-clase.html"
      }
    }])
    .directive("talleresData", [()=>{
      return{
        restrict: "E",
        templateUrl:"/partials/admin/talleres.html"
      }
    }])

})()

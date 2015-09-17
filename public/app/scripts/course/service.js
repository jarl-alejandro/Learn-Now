(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.course.service", [
    ])
    .factory("resourceCourse", ["$resource", ($resource)=>{
      return $resource("/api/courses/:id", { id:"@id" }, {update:{method:"PUT"}})
    }])
    .factory("resourceMy", ["$resource", ($resource)=>{
      return $resource("/api/my/courses", { id:"@id" }, {update:{method:"PUT"}})
    }])

})()

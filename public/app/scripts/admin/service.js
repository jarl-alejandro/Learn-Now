(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.dashboard.service",[
    ])
    .factory("teacherResource", ["$resource", ($resource)=>{
      return $resource("/api/teachers/:id", { id:"@id" }, { update:{method:"PUT"} })
    }])
    .factory("classesResourse", ["$resource", ($resource)=>{
      return $resource("/api/classes/:id", { id:"@id" }, { update:{method:"PUT"}})
    }])
    .factory("tallerResource", ["$resource", ($resource)=>{
      return $resource("/api/talleres/:id", { id:"@id" }, { update:{method:"PUT"} })
    }])

})()

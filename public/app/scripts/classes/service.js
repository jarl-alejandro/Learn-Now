(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.classes.service", [
    ])
    .factory("classesresource", ["$resource", ($resource)=>{
      return $resource("/api/classes/:id", { id:"@id" }, { update:{method:"PUT"}})
    }])
    .factory("socket", ()=>{
      const socket = io()
      return socket
    })
    .factory("answerResource", ["$resource", ($resource)=>{
      return $resource("/api/answers/:id", { id:"@id" }, { update:{method:"PUT"} })
    }])
    .factory("respuestaresource", ["$resource", ($resource)=>{
      return $resource("/api/respuestas/:id", { id:"@id" }, { update:{method:"PUT"} })
    }])
    .factory("misApuntesR", ["$resource", ($resource)=>{
      return $resource("/api/apuntes/:id", { id:"@id" }, { update:{method:"PUT"} })
    }])


})()

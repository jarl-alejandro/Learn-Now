(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.auth.service", [
    ])
    .factory("Account", ($http)=>{
      return{
        getProfile:()=>{
          return $http.get("/api/user")
        }
      }
    })

})()

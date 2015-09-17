(function(){
  'use strict'

  const angular = require("angular")
  const controller = require("./controller")
  const service = require("./service")
  const directive = require("./directive")

  module.exports = angular
    .module("LearnNow.auth", [
      "LearnNow.auth.controller",
      "LearnNow.auth.service",
      "LearnNow.auth.directive",
    ])

})()

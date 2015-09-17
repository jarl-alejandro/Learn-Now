(function(){
  'use strict'

  const angular = require("angular")
  const controller = require("./controller")
  const directive = require("./directive")
  const service = require("./service")

  module.exports = angular.module("LearnNow.dashboard", [
    "LearnNow.dashboard.controller",
    "LearnNow.dashboard.directive",
    "LearnNow.dashboard.service"
  ])

})()

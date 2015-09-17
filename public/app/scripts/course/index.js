(function(){
  'use strict'

  const angular = require("angular")
  const controller = require("./controller")
  const service = require("./service")
  const directive = require("./directive")

  module.exports = angular
    .module("LearnNow.course", [
      "LearnNow.course.controller",
      "LearnNow.course.service",
      "LearnNow.course.directive"
    ])

})()

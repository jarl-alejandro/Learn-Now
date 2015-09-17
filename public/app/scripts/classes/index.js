(function(){
  'use strict'

  const angular = require("angular")

  const controller = require("./controller")
  const service = require("./service")
  const filter = require("./filter")
  const directive = require("./directive")

  module.exports = angular
    .module("LearnNow.classes", [
      "LearnNow.classes.controller",
      "LearnNow.classes.service",
      "LearnNow.classes.filter",
      "LearnNow.classes.directive"
    ])
})()

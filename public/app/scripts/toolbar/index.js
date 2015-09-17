(function(){
  'use strict'

  const angular = require("angular")
  const controller = require("./controller")
  const directive = require("./directive")

  module.exports = angular
    .module("LearnNow.toolbar", [
      "LearnNow.toolbar.directive",
      "LearnNow.toolbar.controller"
    ])

})()

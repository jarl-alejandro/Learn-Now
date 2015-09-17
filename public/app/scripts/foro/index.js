(function(){
  'use strict'

  const angular = require("angular")
  const controller = require("./controller")

  module.exports = angular
    .module("LearnNow.Foro", [
      "LearnNow.Foro.controller"
    ])

})()

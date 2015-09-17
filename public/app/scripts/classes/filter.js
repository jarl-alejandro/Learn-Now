(function(){
  'use strict'

  const angular = require("angular")

  module.exports = angular
    .module("LearnNow.classes.filter", [
    ])
    .filter("removeHTML", ()=>{
      return (text)=>{
        return  String(text).replace("\"", "");
        /*"aa2bb".match(/[0-9]/)
        (/"[^"]+"/gm, '')*/
      }
    })

})()

(function(){
  'use strict'

  const angular = require("angular")
  const ngResource = require("angular-resource")
  const uiRouter = require("angular-ui-router")
  const satellizer = require("satellizer")
  const iframe_api = require("./iframe_api.js")

  const landing = require("./landing")
  const auth = require("./auth")
  const course = require("./course")
  const toolbar = require("./toolbar")
  const dashboard = require("./admin")
  const classes = require("./classes")
  const blog = require("./blog")
  const foro = require("./foro")

  angular.module("LearnNow", [
    "ngResource",
    "ui.router",
    "satellizer",
    "LearnNow.landing",
    "LearnNow.auth",
    "LearnNow.course",
    "LearnNow.toolbar",
    "LearnNow.dashboard",
    "LearnNow.classes",
    "LearnNow.Blog",
    "LearnNow.Foro"
  ])
  .config(["$stateProvider", "$urlRouterProvider", "$authProvider",
    ($stateProvider, $urlRouterProvider, $authProvider)=>{

      $authProvider.facebook({
        clientId: '494521577373680',
      })
      $authProvider.twitter({
        url: '/auth/twitter/'
      })

      $urlRouterProvider.otherwise("/")
      $stateProvider
        .state("landing", {
          url:"/",
          controller: "landingCtrl",
          templateUrl: "views/landing.html"
        })
        .state("login", {
          url:"/login",
          controller:"loginCtrl",
          templateUrl:"views/auth/login.html"
        })
        .state("signup", {
          url:"/signup",
          controller:"signupCtrl",
          templateUrl:"views/auth/signup.html"
        })
        .state("logout", {
          url: "/logout",
          controller:"logoutCtrl",
          templateUrl: null
        })
        .state("myCourse",{
          url:"/mis/cursos",
          controller: "myCoursesCtrl",
          templateUrl:"views/course/my-course.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("app", {
          url:"/app",
          controller: "appCtrl",
          templateUrl:"views/course/app.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("course", {
          url:"/course/:id",
          controller:"courseCtrl",
          templateUrl:"views/course/course.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("mi-curso", {
          url:"/mi/curso/:id",
          controller:"miCursoCtrl",
          templateUrl:"views/course/mi-curso.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("clase",{
          url:"/class/:id",
          controller:"classCtrl",
          templateUrl:"views/class/clase.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("talleres",{
          url:"/talleres",
          controller: "blogCtrl",
          templateUrl: "/views/blog/blog.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("taller",{
          url:"/taller/:id",
          controller: "TallerCtrl",
          templateUrl: "/views/blog/taller.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("foro",{
          url:"/foro",
          controller: "foroCtrl",
          templateUrl: "/views/foro/foro.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("dashboard", {
          url:"/dashboard",
          controller:"dashboardCtrl",
          templateUrl:"views/admin/dashboard.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("dashboardCourse",{
          url: "/dashboard/course/:id",
          controller: "courseCtrl",
          templateUrl: "views/admin/course.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("teacherAdd", {
          url: "/add/teacher",
          controller: "AddTeacherCtrl",
          templateUrl: "views/admin/teacherAdd.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("courseAdd", {
          url: "/add/course",
          controller: "AddCourseCtrl",
          templateUrl: "views/admin/courseAdd.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
        .state("addTaller", {
          url: "/add/taller",
          controller:"newTaller",
          templateUrl: "views/admin/new-taller.html",
          resolve: {
            authenticated:($q, $location, $auth)=>{
              let deferred = $q.defer()

              if(!$auth.isAuthenticated())
                $location.path("/")
              else
                deferred.resolve()
              return deferred.promise
            }
          }
        })
    }
  ])

})()

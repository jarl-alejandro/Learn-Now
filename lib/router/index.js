'use strict'

import express from 'express'
//import multer from 'multer'
//import path from 'path'

import Authenticated from '../utils/helpers/middleware'
import UserController from '../user'
import CourseController from '../course'
import AdminController from '../admin'
import ClassesController from '../classes'
import AnswerController from '../answer'
import TallerController from '../talleres'
import MisApuntesController from '../apuntes'
import SurgerenciaController from '../surgerencias'

const router = express.Router()

const authenticated = new Authenticated()
const userCtrl = new UserController()
const courseCtrl = new CourseController()
const adminCtrl = new AdminController()
const classesCtrl = new ClassesController()
const answerCtrl = new AnswerController()
const tallerCtrl = new TallerController()
const misApuntesCtrl = new MisApuntesController()
const surgeCtrl = new SurgerenciaController()

//const upload = multer({ dest: path.join(__dirname, "..", "..", "fotos") })


router.get("/", (req, res)=>{
  res.render("index")
})

router.get("/api/user", authenticated.ensure, userCtrl.userCtrl)

// auth
router.post('/auth/signup',userCtrl.signupCtrl)
router.post('/auth/login', userCtrl.loginCtrl)
router.post('/auth/facebook', userCtrl.facebook)
router.post('/auth/twitter', userCtrl.twitter)

// mis apuntes
router.post("/api/apuntes", authenticated.ensure, misApuntesCtrl.save)
router.get("/api/apuntes", authenticated.ensure, misApuntesCtrl.getAll)
router.get("/api/apuntes/:id", misApuntesCtrl.get)

//course
router.get("/api/courses", courseCtrl.getAll)
router.get("/api/courses/:id", courseCtrl.get)
router.post("/api/courses", courseCtrl.save)

//my courses
router.post("/api/my/courses", authenticated.ensure, courseCtrl.saveMyCourse)
router.get("/api/my/courses", authenticated.ensure, courseCtrl.getAllMy)

//answers
router.get("/api/answers", answerCtrl.getAll)
router.get("/api/answers/:id", answerCtrl.getByClass)
router.put("/api/answers/:id", answerCtrl.update)

router.get("/api/respuestas/:id", answerCtrl.getByPregunta)

router.get("/api/answer/:id", answerCtrl.get)


//class
router.post("/api/classes", authenticated.ensure, classesCtrl.save)
router.get("/api/classes", authenticated.ensure, classesCtrl.getAllClasses)
router.get("/api/classes/:id", authenticated.ensure, classesCtrl.getById)

router.get("/api/class/course/:id", classesCtrl.getClassByCourse)

//taller
router.get("/api/talleres", tallerCtrl.getAll)
router.post("/api/talleres", tallerCtrl.save)
router.get("/api/talleres/:id", tallerCtrl.get)

//admin
router.post("/api/teachers", adminCtrl.teacherSaveCtrl)
router.get("/api/teachers", adminCtrl.teacherGetAll)

// surgerencias
router.post("/api/surgerencias", authenticated.ensure, surgeCtrl.save)
router.get("/surgerencias", surgeCtrl.getAll)


export default router

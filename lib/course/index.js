'use strict'

import Course from './model'
import MyCourseModel from './myCourseModel'

class CourseController{

  getAll(req, res){
    Course.find({}).populate("teacher").exec()
      .then((courses)=>{
        let coursesFixed = courses.map((course)=>{
          return course.toJSON()
        })
        res
          .status(200)
          .set('Content-Type', 'application/json')
          .json(coursesFixed)
      }, (err)=>{
        return err.message
      })
  }

  get(req, res, next){
    let id = req.params.id
    if(!id)
      return next()

    Course.findById(id).populate("teacher").exec()
      .then((course)=>{
        res
          .status(200)
          .set("Content-Type", "application/json")
          .json(course)
      }, (err)=>{
        return err.message
      })
  }

  save(req, res){
    let course = new Course({
      title: req.body.title,
      description: req.body.description,
      photo: req.body.photo,
      video: req.body.video,
      temario: req.body.temario,
      teacher: req.body.teacher,
      type: req.body.type
    })

    course.save((err)=>{
      if(err)
        return err.message
      res
        .status(201)
        .send(course)
    })
  }

  saveMyCourse(req, res){
    console.log("user ", req.body.course)
    let mycourse = new MyCourseModel({
      course: req.body.course,
      user: req.user
    })

    mycourse.save((err)=>{
      if(err)
        return err.message
      res
        .status(201)
        .send(mycourse)
    })
  }

  getAllMy(req, res){
    MyCourseModel.find({ user:req.user }).populate("course").populate("teacher").populate("user").exec()
      .then((myCourses)=>{
        let myCoursesFixed = myCourses.map((mycourse)=>{
          return mycourse.toJSON()
        })
        res
          .status(200)
          .json(myCoursesFixed)
      }, (err)=>{
        return err.message
      })
  }

}

export default CourseController

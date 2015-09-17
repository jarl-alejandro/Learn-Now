'use strict'

import Classes from './model'

class ClassesController{

  getAllClasses(req, res){
    Classes.find({}).populate("course").exec()
      .then((classes)=>{
        let classesFixed = classes.map((clase)=>{
          return clase.toJSON()
        })
        res
          .status(200)
          .set("Content-Type", "application/json")
          .json(classesFixed)
      }, (err)=>{
        return err.message
      })
  }

  getClassByCourse(req, res, next){
    let id = req.params.id
    if(!id)
      return next()

    Classes.find({ course:id }).populate("course").exec()
      .then((classCourse)=>{
        res
          .status(200)
          .json(classCourse)
      }, (err)=>{
        return err.message
      })
  }

  getById(req, res, next){
    let id = req.params.id
    if(!id)
      return next()
    Classes.findById(id).populate("course").exec()
      .then((clase)=>{
        res
          .status(200)
          .set("Content-Type", "application/json")
          .json(clase)
      }, (err)=>{
        return err.message
      })
  }

  save(req, res){
    let classes = new Classes({
      title: req.body.title,
      description: req.body.description,
      photo: req.body.photo,
      resource: req.body.resource,
      video: req.body.video,
      course: req.body.course
    })

    classes.save((err)=>{
      if(err)
        return err.message
      res
        .status(201)
        .send(classes)
    })
  }

}

export default ClassesController

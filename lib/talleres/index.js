'use strict'

import Taller from './model'

class TallerController{

  getAll(req, res){
    Taller.find({}).populate("author").exec()
      .then((talleres)=>{
        let talleresFixed = talleres.map((taller)=>{
          return taller.toJSON()
        })
        res
          .status(200)
          .json(talleresFixed)
      }, (err)=>{
        return err.message
      })
  }

  get(req, res, next){
    let id = req.params.id

    if(!id)
      return next()

    Taller.findById(id).populate("author").exec()
      .then((taller)=>{
        res
          .status(200)
          .json(taller)
      }, (err)=>{
        return err.message
      })
  }

  save(req, res){
    let taller = new Taller({
      title: req.body.title,
      phrase: req.body.phrase,
      video: req.body.video,
      content: req.body.content,
      photo: req.body.photo,
      author: req.body.author,
      date: Date.now(),
    })

    taller.save((err)=>{
      if(err)
        return err.message
      res
        .status(201)
        .send(taller)
    })
  }

}

export default TallerController

'use strict'

import MisApuntes from './model'

class MisApuntesController{

  save(req, res){
    let miApunte = new MisApuntes({
      apunte: req.body.apunte,
      user: req.user,
      clase: req.body.clase,
      fecha: Date.now()
    })

    miApunte.save((err)=>{
      if(err)
        return err.message
      res
        .status(201)
        .send(miApunte)
    })
  }

  getAll(req, res){
    MisApuntes.find({ user:req.user }).populate("user").populate("clase").exec()
      .then((misApuntes)=>{
        let misApuntesFixed = misApuntes.map((miApunte)=>{
          return miApunte.toJSON()
        })
        res
          .status(200)
          .json(misApuntesFixed)
      }, (err)=>{
        return err.message
      })
  }

  get(req, res, next){
    let id = req.params.id

    if(!id)
      return next

    MisApuntes.findById(id).populate("user").populate("clase").exec()
      .then((miApunte)=>{
        res
          .status(200)
          .json(miApunte)
      }, (err)=>{
        return err.message
      })
  }

}

export default MisApuntesController

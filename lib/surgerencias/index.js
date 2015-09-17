'use strict'

import Surgerencia from './model'

class SurgerenciaController{

  save(req, res){
    let surgerencia = new Surgerencia({
      surgerencia: req.body.surgerencia,
      fecha: Date.now(),
      user: req.user
    })
    surgerencia.save((err)=>{
      if(err)
        return err.message
      res
        .status(201)
        .send(surgerencia)
    })
  }

  getAll(req, res){
    Surgerencia.find({}).populate("user").exec()
      .then((surgerencias)=>{
        let surgerenciasFixed = surgerencias.map((surgerencia)=>{
          return surgerencia.toJSON()
        })
        res.render("surgerencia", { surgerencias:surgerenciasFixed })
      }, (err)=>{
        return err.message
      })
  }
}

export default SurgerenciaController

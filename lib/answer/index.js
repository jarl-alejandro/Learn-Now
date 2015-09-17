'use strict'

import Answer from './model'
import Respuestas from './respuestas'

class AnswerController{

  getAll(req, res){
    Answer.find({}).populate("user").populate("clase").exec()
      .then((answers)=>{
        let FixedAnswers = answers.map((answer)=>{
          return answer.toJSON()
        })
        res
          .status(200)
          .json(FixedAnswers)
      }, (err)=>{
        return err.message
      })
  }

  getByClass(req, res, next){
    let id = req.params.id

    if(!id)
      return next()

    Answer.find({ clase:id }).populate("clase").populate("user").exec()
      .then((answersByClass)=>{
        let FixedanswersByClass = answersByClass.map((answers)=>{
          return answers.toJSON()
        })
        res
          .status(200)
          .send(FixedanswersByClass)
      }, (err)=>{
        return err.message
      })
  }

  get(req, res, next){
    let id = req.params.id

    if(!id)
      return next()

    Answer.findById(id).populate("clase").populate("user").exec()
    .then((answer)=>{
      res
        .status(200)
        .json(answer)
    }, (err)=>{
      return err.message
    })
  }

  update(req, res, next){
    let id = req.params.id

    if(!id)
      return next()

    let updateAnswer = req.body

    Answer.findById(id).exec()
      .then((answer)=>{
        answer.votes = req.body.votes + answer.votes

        answer.save((err)=>{
          if(err)
            return err.message
          res.json(answer)
        })

      }, (err)=>{
        return err.message
      })

  }

  getByPregunta(req, res, next){
    let id = req.params.id

    if(!id)
      return next()

    Respuestas.find({ pregunta:id }).populate("pregunta").populate("user").exec()
      .then((respuestas)=>{
        let respuestasFixed = respuestas.map((respuesta)=>{
          return respuesta.toJSON()
        })
        res
          .status(200)
          .json(respuestasFixed)
      }, (err)=>{
        return err.message
      })
  }
}

export default AnswerController

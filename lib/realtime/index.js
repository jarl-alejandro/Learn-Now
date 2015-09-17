'use strict'

import IO from "socket.io"
import Answer from '../answer/model'
import Respuestas from '../answer/respuestas'

class SocketIO{

  constructor(config){
    config = config || {}
    const io = IO.listen(config.server)

    io.on("connection", (socket)=>{

      let room = ""

      socket.on("join::class", joinClass)
      socket.on("new::answer", newAnswer)
      socket.on("taller::question", tallerQuestion)
      socket.on("respuesta::pregunta", respuestaPregunta)
      socket.on("dar::voto", votar)

      function joinClass(data){
        room = data
        socket.join(room)
      }

      function newAnswer(data){
        let userId = data.user.id

        let answer = new Answer({
          answer: data.answer,
          user: userId,
          clase: data.clase,
          date: Date.now(),
          votes: 0,
        })
        answer.save((err)=>{
          if(err)
            return err.message
          else{
            let datos = {
              answer: data.answer,
              user: data.user,
              clase: data.clase,
              date: answer.date,
              votes: 0,
              id: answer._id
            }
            io.sockets.in(room).emit("emit::message", datos)
          }
        })
      }

      function tallerQuestion(data){
        let userId = data.user.id

        let question = new Answer({
          answer: data.answer,
          user: userId,
          clase:data.clase,
          date:Date.now()
        })
        question.save((err)=>{
          if(err)
            return err.message
          else{
            let questionSocket = {
              answer: data.answer,
              user: data.user,
              clase:data.clase,
              date:question.date,
              id: question.id,
              votes:0
            }
            io.sockets.in(room).emit("taller::new", questionSocket)
          }
        })
      }

      function respuestaPregunta(data){
        let respuesta = new Respuestas({
          respuesta: data.respuesta,
          fecha: Date.now(),
          pregunta: data.pregunta.id,
          user: data.user.id,
          votos: 0
        })
        respuesta.save((err)=>{
          if(err)
            return err.message
          else{
            let dataRespuesta = {
              id: respuesta.id,
              respuesta: data.respuesta,
              fecha: respuesta.fecha,
              pregunta: data.pregunta,
              user: data.user,
              votos: 0
            }
            io.sockets.in(data.pregunta.id).emit("new::respuesta", dataRespuesta)
            io.sockets.to(data.user.id).emit("pregunta::respondida", dataRespuesta)
          }
        })
      }

      function votar(data){
        Respuestas.findById(data).exec()
        .then((respuesta)=>{
          respuesta.votos = 1 + respuesta.votos

          respuesta.save((err)=>{
            if(err)
              return err.message
            io.sockets.emit("update::voto", respuesta)
          })

        }, (err)=>{
          return err.message
        })
      }

    })
  }
}

export default SocketIO

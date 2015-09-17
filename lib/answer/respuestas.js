'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RespuestaSchema = new Schema({
  respuesta: String,
  fecha: Date,
  votos: Number,
  pregunta: { type:Schema.ObjectId, ref:"Answer" },
  user: { type:Schema.ObjectId, ref:"User" }
})

RespuestaSchema.set('toJSON', {
  transform:(doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Respuesta = mongoose.model("Respuesta", RespuestaSchema)
export default Respuesta

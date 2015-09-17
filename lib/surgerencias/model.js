'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SurgerenciaSchema = new Schema({
  surgerencia: String,
  fecha: Date,
  user: { type:Schema.ObjectId, ref:"User" }
})

SurgerenciaSchema.set("toJSON", {
  transform:(doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Surgerencia = mongoose.model("Surgerencia", SurgerenciaSchema)
export default Surgerencia

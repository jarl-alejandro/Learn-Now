'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MisApuntesSchema = new Schema({
  apunte : String,
  fecha: Date,
  user: { type:Schema.ObjectId, ref:"User" },
  clase: { type:Schema.ObjectId, ref:"Classes" }
})

MisApuntesSchema.set("toJSON", {
  transform:(doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const MisApuntes = mongoose.model("MisApuntes", MisApuntesSchema)
export default MisApuntes

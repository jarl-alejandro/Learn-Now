'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TallereSchema = new Schema({
  title: String,
  phrase:String,
  video: String,
  content: String,
  photo: String,
  date: Date,
  author: { type:String, ref:"User" }
})

TallereSchema.set("toJSON", {
  transform:(doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Talleres = mongoose.model("Talleres", TallereSchema)
export default Talleres

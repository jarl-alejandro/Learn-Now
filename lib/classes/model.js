'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ClassesSchema = new Schema({
  title: String,
  description: String,
  photo: String,
  resource: String,
  video: String,
  course: { type:String, ref:"Course" }
})

ClassesSchema.set("toJSON", {
  transform: (doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Classes = mongoose.model("Classes", ClassesSchema)

export default Classes

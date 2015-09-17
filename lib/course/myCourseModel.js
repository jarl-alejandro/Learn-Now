'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MyCourseSchema = new Schema({
  course: { type:String, ref:"Course" },
  user: { type:Schema.ObjectId, ref:"User" }
})

MyCourseSchema.set('toJSON', {
  transform:(doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const MyCourse = mongoose.model("MyCourse", MyCourseSchema)

export default MyCourse

'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CourseSchema = new Schema({
  title: String,
  description: String,
  photo: String,
  video: String,
  temario: String,
  teacher: { type:String, ref:"User"}, //Schema.ObjectId
  type: { type:String, default:"free" }
})

CourseSchema.set('toJSON', {
  transform:(doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Course = mongoose.model("Course", CourseSchema)
export default Course

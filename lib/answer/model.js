'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  answer: String,
  user: { type:Schema.ObjectId, ref:"User" },
  clase:{ type:Schema.ObjectId, ref:"Classes" },
  date: { type:Date },
  votes: { type:Number, default:0 }
})

AnswerSchema.set("toJSON", {
  transform: (doc, ret, options)=>{
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})


const Answer = mongoose.model("Answer", AnswerSchema)
export default Answer

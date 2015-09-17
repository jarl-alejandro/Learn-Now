'use strict'

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
	firstName:String,
	lastName:String,
	email: { type: String, unique: true, lowercase: true },
	password:{ type:String, select:false },
	avatar:String,
	about:String,
  facebook: String,
  twitter: String,
	staff:{ type:Boolean, default:false},
  teacher: { type:Boolean, default:false }
})

UserSchema.set('toJSON', {
	transform:function(doc, ret, options){
		ret.id = ret._id
		delete ret._id,
		delete ret.__v
	}
})

UserSchema.pre('save', function(next){
  let user = this
  if (!user.isModified('password')){
    return next()
  }

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function(password, done){
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch)
  })
}


const User = mongoose.model("User", UserSchema)

export default User

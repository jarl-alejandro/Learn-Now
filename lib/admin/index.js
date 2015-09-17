'use strict'

import User from '../user/model'

class AdminController{

  teacherSaveCtrl(req, res){
    User.findOne({ email:req.body.email }).exec()
      .then((existingUser)=>{
        if(existingUser)
          return res.status(409).send({ message:"Profesor ya existe" })

        let teacher = new User({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          email:req.body.email,
          password:req.body.password,
          avatar:req.body.avatar,
          about:req.body.about,
          staff:req.body.staff || false,
          teacher: req.body.teacher || false
        })

        teacher.save(()=>{
          res
            .status(201)
            .json(teacher)
        })

      }, (err)=>{
        return err.message
      })
  }

  teacherGetAll(req, res){
    User.find({ teacher:true }).exec()
      .then((teachers)=>{
        let teachersFixed = teachers.map((teacher)=>{
          return teacher.toJSON()
        })
        res
          .status(200)
          .json(teachersFixed)
      }, (err)=>{
        return err.message
      })
  }
}

export default AdminController

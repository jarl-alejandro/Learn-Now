'use strict'

import jwt from 'jwt-simple'
import moment from 'moment'
import User from '../../user/model'
import config from '../../../config'

class Authenticated{

  ensure(req, res, next){
    if(!req.headers.authorization){
      return res.status(401).send({ message: "Por favor, asegúrese de solicitud"})
    }

    let token = req.headers.authorization.split(' ')[1]
    let payload = jwt.decode(token , config.TOKEN_SECRET)

    if(payload.exp <= moment().unix()){
      return res.status(401).send({ message:"El token a expirado" })
    }

    User.findById(payload.sub).exec()
      .then((user)=>{
        if(!user)
          return res.status(400).send({ message:"El usuario no existe" })

        req.user = user
        next()
      }, (err)=>{
        return err.message
      })
  }
}

export default Authenticated



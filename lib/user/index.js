'use strict'

import qs from 'querystring'
import jwt from 'jwt-simple'
import request from 'request'

import User from './model'
import service from '../utils/helpers/service'
import config from '../../config'

class UserAuth{

	userCtrl(req, res){
		User.findById(req.user).exec()
			.then((user)=>{
				res.send(user)
			}, (err)=>{
				return err.message
			})
	}

	loginCtrl(req, res){

		User.findOne({ email:req.body.email }, '+password', (err, user)=>{
      if(!user)
        return res.status(401).send({ message:"Email incorrecto" })

      user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch){
          console.log("isMatch", isMatch)
          return res.status(401).send({ message:"Email o contraseña incorrecto" })
        }
        res.send({ token: service.createJWT(user) })
      })
    })
	}

	signupCtrl(req, res){
    User.findOne({ email:req.body.email }, (err, existingUser)=>{
      if(existingUser)
        return res.status(409).send({ message:"Usuario ya existe" })

      let user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar,
        about:req.body.about,
        staff:req.body.staff || false,
        teacher: req.body.teacher || false
      })

      user.save(()=>{
        res.send({ token:service.createJWT(user) })
      })

    })
	}

  facebook(req, res){

    let accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token'
    let graphApiUrl = 'https://graph.facebook.com/v2.3/me'

    let params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    }

    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken){
      if (response.statusCode !== 200){
        console.log("ok")
        return res.status(500).send({ message: accessToken.error.message })
      }

      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile){

        if (response.statusCode !== 200)
          return res.status(500).send({ message: profile.error.message })

        if (req.headers.authorization){

          User.findOne({ facebook: profile.id }, function(err, existingUser) {
            if (existingUser)
              return res.status(409).send({ message: 'Ya existe una cuenta de Facebook que te pertenece' })

            let token = req.headers.authorization.split(' ')[1]
            let payload = jwt.decode(token, config.TOKEN_SECRET)

            User.findById(payload.sub, function(err, user){
              if (!user)
                return res.status(400).send({ message: 'User not found' })

              user.facebook = profile.id
              user.avatar = user.avatar || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large'
              user.firstName = user.firstName || profile.name

              user.save(function(){
                 res.send({ token: service.createJWT(user) })
              })

            })
          })
        }
        else{
          User.findOne({ facebook: profile.id }, function(err, existingUser){
            if(existingUser){
              return res.send({ token: service.createJWT(existingUser) })
            }

            let user = new User()

            user.facebook = profile.id
            user.avatar = 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
            user.firstName = profile.name
            user.staff = false

            user.save(function(){
              res.send({ token:service.createJWT(user) })
            })

          })
        }

      })
    })
  }

  twitter(req, res){
    const requestTokenUrl = 'https://api.twitter.com/oauth/request_token'
    const accessTokenUrl = 'https://api.twitter.com/oauth/access_token'
    const profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name='

    if (!req.body.oauth_token || !req.body.oauth_verifier) {
      let requestTokenOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        callback: config.TWITTER_CALLBACK
      }
      request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, (err, response, body)=>{
        let oauthToken = qs.parse(body);
        console.log("estamios aki ", oauthToken, " ", requestTokenUrl)

        res.send(oauthToken);
      })
    }
    else{
      const accessTokenOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        token: req.body.oauth_token,
        verifier: req.body.oauth_verifier
      }
      request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, (err, response, accessToken)=>{

        accessToken = qs.parse(accessToken)

        let profileOauth = {
          consumer_key: config.TWITTER_KEY,
          consumer_secret: config.TWITTER_SECRET,
          oauth_token: accessToken.oauth_token
        }
        request.get({ url: profileUrl + accessToken.screen_name, oauth: profileOauth, json: true }, (err, response, profile)=>{

          if (req.headers.authorization) {
            User.findOne({ twitter: profile.id }, (err, existingUser)=>{
              if (existingUser) {
                return res.status(409).send({ message: 'There is already a Twitter account that belongs to you' })
              }

              let token = req.headers.authorization.split(' ')[1];
              let payload = jwt.decode(token, config.TOKEN_SECRET);

              User.findById(payload.sub, function(err, user) {
                if (!user) {
                  return res.status(400).send({ message: 'User not found' });
                }
                user.twitter = profile.id
                user.firstName = user.firstName || profile.name
                user.avatar = user.avatar || profile.profile_image_url.replace('_normal', '')

                user.save(function(err) {
                  res.send({ token: service.createJWT(user) })
                })

              })
            })
          }
          else {
            User.findOne({ twitter: profile.id }, (err, existingUser)=>{
              if(existingUser){
                return res.send({ token: service.createJWT(existingUser) });
              }

              let user = new User();
              user.twitter = profile.id;
              user.firstName = profile.name;
              user.avatar = profile.profile_image_url.replace('_normal', '');

              user.save(()=>{
                res.send({ token: service.createJWT(user) })
              })

            })
          }
        })
      })
    }
  }






}

export default UserAuth

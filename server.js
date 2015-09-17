'use strict'

import http from 'http'
import mongoose from 'mongoose'
import LearnNow from './lib'
import SocketIO from './lib/realtime'

const port = process.env.PORT || 3000
const learnNow = new LearnNow()
const db =  "mongodb://localhost/learnNow"
const server = http.createServer()

mongoose.connect(db, onDBListening)

server.on("request", learnNow.app)
server.on("listening", onListening)
server.listen(port)
const IO = new SocketIO({ server:server })

function onDBListening(err){
	if(!err)
		console.log("DB successfully connected")
	else
		console.log("Error connecting to db")
}

function onListening(){
	console.log(`Server running in http://localhost:${ port }`)
}

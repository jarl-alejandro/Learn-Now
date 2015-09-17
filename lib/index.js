'use strict'

import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import swig from 'swig'
import router from './router'

class LearnNow{

  constructor(){
    this.app = express()

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.app.use(express.static(path.join(__dirname, "..", "public")))
    this.app.use(router)
    this.app.use(cors())

    this.app.engine("html", swig.renderFile)
    this.app.set("view engine", "html")
    this.app.set("views", path.join(__dirname, "..", "views"))
	}
}

export default LearnNow

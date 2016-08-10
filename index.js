const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')


//DB Setup
mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost:auth/auth')

//App Setup
//middleware
// app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*'}))
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'))

router(app)
//Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listing on :', port)

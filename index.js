const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const env = require('env2')('.env')


const dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost:auth/auth'
//DB Setup
mongoose.connect('mongodb://heroku_wbxfbzxc:d70q3v4v24v4lvd1rehmccs2h1@ds153745.mlab.com:53745/heroku_wbxfbzxc')


//App Setup
//middleware
// app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*'}))
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'))

router(app)
//Server Setup
const port = process.env.PORT || 5000
const server = http.createServer(app)
server.listen(port)
console.log('Server listing on :', port)

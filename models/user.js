const mongoose = require('mongoose')
const Schmema = mongoose.Schema

//Define our Model
const userSchema = new Schema({
    email : { type:String, unique: true, lowercase: true },
    password : String
})

//Create Model class
const ModelClass = mongoose.model('user', Schmema)

//Export Model
module.exports = ModelClass
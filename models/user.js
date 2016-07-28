const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Define our Model
const userSchema = new Schema({
    linkedinId : {type: String, unique: true},
    email : { type:String, unique: true, lowercase: true }
})

//Create Model class
const ModelClass = mongoose.model('user', userSchema)

//Export Model
module.exports = ModelClass
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Define our Model
const userSchema = new Schema({
    linkedinId : {type: String},
    emailAddress : { type:String, unique: true, lowercase: true },
    firstName : {type :String},
    lastName : {type :String},
    numConnections : {type :Number},
    positions :{type: Object},
    pictureURL: {type: String}

})

//Create Model class
const ModelClass = mongoose.model('user', userSchema)

//Export Model
module.exports = ModelClass
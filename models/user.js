const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const shortListSchema = new Schema({
//     userName : {type: String},
//     email: {type: String, unique:true},
//     githubId :{type: Number, unique:true}
// })

//Define our Model
const userSchema = new Schema({
    linkedinId : { type: String,unique: true },
    emailAddress : { type:String, unique: true, lowercase: true },
    firstName : { type :String },
    lastName : { type :String },
    numConnections : { type :Number },
    positions :{ type: Object },
    pictureURL: { type: String },
    accountCreated: { type : Date },
    logins : { type : Array },
    shortList : []
})



//Create Model class
const ModelClass = mongoose.model('user', userSchema)

//Export Model
module.exports = ModelClass
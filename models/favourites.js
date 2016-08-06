const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const favSchema = new Schema({
    ownerLinkedinId : { type: String},
    name : {type: String},
    emailAddress :{type: String, unique: true, lowercase: true}
    company :{type: String},
    dateAdded : {type: Date},
    status : {type: String},
    comments : {type: Array},
})

const FavModel = mongoose.model('fav', favSchema)

module.exports = FavModel
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name : {type : String}
});

const ProjectClass = mongoose.model('project', projectSchema);

module.exports = ProjectClass;
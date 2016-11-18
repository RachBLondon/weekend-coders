const Project = require('./../models/projects');

exports.createNewProject =  function (req, res) {
    var newProject = new Project({
        name : req.body.name
    })
    newProject.save(function(err){
        if(err){
            console.log(err);
            res.sendStatus(503)
        } else {
            Project.find({}, function(err, docs){
                if(err){
                    console.log(err)
                    res.sendStatus(503)
                }
                console.log(docs)
                res.send('saved project')
            });
        }
    });
}

exports.getAll = function (req, res) {
    Project.find({}, function (err, docs) {
        if(err){
            res.sendStatus(503);
        } else {
            res.send(docs);
        }
    });
}
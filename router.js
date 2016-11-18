const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');
const User = require('./models/user');
const path = require('path');
const Project = require('./models/projects');
const co = require('co');


module.exports = function (app) {
    app.get('/signup', Authentication.signup);
    app.get(/signup_success/, Authentication.signupSuccess);
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html');
    });
    app.get('/logout', Authentication.logout, function(req, res){
        res.sendFile('logged out')
    });
    app.post('/test', function (req, res) {
        console.log(req.body)
        var newProject = new Project({
            name : req.body.name
        })

        newProject.save(function(err){
           if(err){
               console.log(err);
           } else {
               Project.find({}, function(err, docs){
                   if(err){console.log(err)}
                   console.log(docs)
                   res.send(docs)
               })

           }
        });


    });

    app.get('/getprofile', Profile.getProfile)
    app.get('*', Authentication.isAuthenticated, function (req, response) {
            response.sendFile(path.join(__dirname, '/client/index.html'))
        }
    );
}


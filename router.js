const Authentication = require('./controllers/authentication')
const Profile = require('./controllers/profile')
const User = require('./models/user')
const path = require('path')

module.exports = function (app) {
    app.get('/signup', Authentication.signup);
    app.get(/signup_success/, Authentication.signupSuccess);
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html');
    });
    app.get('/logout', Authentication.logout, function(req, res){
        res.sendFile('logged out')
    });
    app.get('/getprofile', Profile.getProfile)
    app.get('*', Authentication.isAuthenticated, function (req, response) {
            response.sendFile(path.join(__dirname, '/client/index.html'))
        }
    );
}


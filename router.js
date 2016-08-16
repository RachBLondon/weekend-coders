const Authentication = require('./controllers/authentication')
const Github = require('./controllers/github')
const Profile = require('./controllers/profile')

const User = require('./models/user')



module.exports = function (app) {
    app.get('/signup', Authentication.signup)
    app.get(/signup_success/, Authentication.signupSuccess)
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html')
    })
    app.get('/logout', Authentication.logout, function(req, res){
        res.sendFile('logged out')
    })
    app.get('/github/search', Github.searchGithub)
    app.get('/github/pagination', Github.pagination)
    app.get('/getprofile', Profile.getProfile)
    app.get('/getshortlist', Github.getShortList)
    app.post('/addToShortList', Github.addToShortList)
    app.get('*', Authentication.isAuthenticated, Github.gitHubApp )
}


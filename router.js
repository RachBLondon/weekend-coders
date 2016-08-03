const Authentication = require('./controllers/authentication')
const Github = require('./controllers/github')
const configs = require('./config')


module.exports = function (app) {
    app.get('/signup', Authentication.signup)
    app.get(/signup_success/, Authentication.signupSuccess)
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html')
    })
    app.get('/logout', Authentication.logout)
    app.get('/github/search', Github.searchGithub)
    app.get('/github/pagination', Github.pagination)
    app.get('*', Authentication.isAuthenticated, Github.gitHubApp )
}


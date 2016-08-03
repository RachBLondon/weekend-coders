const Authentication = require('./controllers/authentication')
const Github = require('./controllers/github')
const Home   = require('./controllers/home')
const configs = require('./config')



module.exports = function (app) {
    app.get('/signup', Authentication.signup)
    app.get(/signup_success/, Authentication.signupSuccess)
    //TODO in auth controller handle this route to set a jwt for this user as per tutorial
    app.get('/account/', Authentication.isAuthenticated, function (req, res) {
        res.send('logged in')
    })
    app.get('/home', Home.homePage)
    app.get('/github/', Authentication.isAuthenticated, Github.gitHubApp)
    app.get('/logout', Authentication.logout)

    app.get('/github/search', Github.searchGithub)
    app.get('/github/pagination', Github.pagination)


    // app.get('/signout', Authentication.signOut)
    app.get('*', function(req, res){
        res.status(404).send('Sorry not sure what happened there')
    })
}


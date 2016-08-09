const Authentication = require('./controllers/authentication')
const Github = require('./controllers/github')

const User = require('./models/user')



module.exports = function (app) {
    app.get('/signup', Authentication.signup)
    app.get(/signup_success/, Authentication.signupSuccess)
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html')
    })
    app.get('/logout', Authentication.logout)
    app.get('/github/search', Github.searchGithub)
    app.get('/github/pagination', Github.pagination)
    app.get('/usersdb', function(req, res){
        User.find({}, function(err, users) {
            var userMap = {}

            users.forEach(function(user) {
                userMap[user._id] = user;
            })

            res.send(userMap)
        })
    })
    app.get('/getshortlist', Github.getShortList)
    app.post('/addToShortList', Github.addToShortList)
    app.get('*', Authentication.isAuthenticated, Github.gitHubApp )
}


const Authentication = require('./controllers/authentication')
const configs = require('./config')



module.exports = function (app) {
    app.get('/signup', Authentication.signup)
    app.get(/signup_success/, Authentication.signupSuccess)
    app.get('/account/:code', function (req, res) {
        res.send(req.params.code)
    })
}


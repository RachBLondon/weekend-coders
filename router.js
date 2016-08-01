const Authentication = require('./controllers/authentication')
const configs = require('./config')



module.exports = function (app) {
    app.get('/signup', Authentication.signup)
    app.get(/signup_success/, Authentication.signupSuccess)
    //TODO in auth controller handle this route to set a jwt for this user as per tutorial
    app.get('/account/', Authentication.generateJWT)
}


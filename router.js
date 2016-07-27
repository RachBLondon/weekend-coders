const Authentication = require('./controllers/authentication')
const clientSecret = require('./config').clientSecret
const liRedirectURL = require('./config').liRedirecURL
const liStateString = require('./config').liStateString
const clientId = require('./config').clientId
//TODO create a controller for githubapi calls https://www.udemy.com/react-redux-tutorial/learn/v4/t/lecture/4755164

module.exports = function(app){
  app.get('/lisignup', function (req, res) {
      res.redirect(301,
          'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+ clientId + '&redirect_uri='+ liRedirectURL +'&state=' + liStateString + '=r_emailaddress')
  })
  app.post('/signup', Authentication.signup)
}


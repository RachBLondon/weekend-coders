const Authentication = require('./controllers/authentication')
const configs = require('./config')
const urlParse = require('./utils/query_string_parser')
//TODO create a controller for githubapi calls https://www.udemy.com/react-redux-tutorial/learn/v4/t/lecture/4755164

module.exports = function(app){
  app.get('/lisignup', function (req, res) {
      res.redirect(301,
          'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+ configs.clientId + '&redirect_uri='+ configs.liRedirectURL +'&state=' + configs.liStateString + '=r_emailaddress')
  })

  app.get(/lisignup2/, function(req, res){
      res.send(urlParse('code',req.url))
  })
  app.post('/signup', Authentication.signup)
}


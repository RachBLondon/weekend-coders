const Authentication = require('./controllers/authentication')
const configs = require('./config')
const urlParse = require('./utils/query_string_parser')
const https = require('https')
const request = require('request')
//TODO create a controller for githubapi calls https://www.udemy.com/react-redux-tutorial/learn/v4/t/lecture/4755164
const hostUrl = 'http://localhost:3090/'
module.exports = function (app) {
    app.get('/signup', function (req, res) {
        res.redirect(302,
            'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + configs.clientId + '&redirect_uri=' + configs.liRedirectURL + '&state=' + configs.liStateString )
    })

    app.get(/signup_success/, function (req, res) {
        const authorizationCode = urlParse('code', req.url)

        const postBody = 'grant_type=authorization_code&code=' + authorizationCode + '&state=' + configs.liStateString + '&redirect_uri=' + configs.liRedirectURL + '&client_id=' + configs.clientId + '&client_secret=' + configs.clientSecret
        console.log('postBody :', postBody)

        var accessTokenPostOptions = {
            hostname: 'www.linkedin.com',
            path: '/oauth/v2/accessToken',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            agent: false
        };

        var postReq = https.request(accessTokenPostOptions, (postRes) => {
            var body = '';
            postRes.on('data', function (chunk) {
                body += chunk
            })
            postRes.on('end', function () {
                var accessToken = JSON.parse(body).access_token

                var userDetails = {
                    hostname: 'www.linkedin.com',
                    path: '/v1/people/~:(id,first-name,last-name,location,email-address,picture-url,num-connections,positions)?&format=json',
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + accessToken},
                    agent: false
                }

                var getUserData = https.request(userDetails, (dataRes)=> {
                    var getResponseBody = ''
                    dataRes.on('data', function (chunk) {
                        getResponseBody += chunk
                    })
                    dataRes.on('end', function () {
                        console.log("userData :", JSON.parse(getResponseBody))
                        res.redirect(302, hostUrl + 'account/'+ accessToken)
                    })
                })

                getUserData.end()
            })
        });
        postReq.write(postBody)
        postReq.end()

    })
    app.get('/account/:code', function (req, res) {
        res.send(req.params.code)
    })
}


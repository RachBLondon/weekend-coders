const https = require('https')
const User = require('./../models/user')
const urlParse = require('./../utils/query_string_parser')
const configs = require('./../config')
const hostUrl = 'http://localhost:3090/'

exports.signup = function (req, res) {
    res.redirect(302,
        'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + configs.clientId + '&redirect_uri=' + configs.liRedirectURL + '&state=' + configs.liStateString)
}

exports.signupSuccess = function (req, res) {
    const authorizationCode = urlParse('code', req.url)
    const postBody = 'grant_type=authorization_code&code=' + authorizationCode + '&state=' + configs.liStateString + '&redirect_uri=' + configs.liRedirectURL + '&client_id=' + configs.clientId + '&client_secret=' + configs.clientSecret

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
                    var userDataRes = JSON.parse(getResponseBody)

                    if (!userDataRes.errorCode) {
                        User.findOne({linkedinId: userDataRes.id}, function (err, existingUser) {

                            if (err) {
                                console.log(err)
                            }

                            if (existingUser) {
                                return res.redirect(302, hostUrl + 'account/' + userDataRes.id)
                            }

                            const user = new User({
                                linkedinId: userDataRes.id,
                                emailAddress: userDataRes.emailAddress,
                                firstName: userDataRes.firstName,
                                lastName: userDataRes.lastName,
                                numConnections: userDataRes.numConnections,
                                positions: userDataRes.positions,
                                pictureURL: userDataRes.pictureURL
                            })

                            user.save(function (err) {
                                if (err) {
                                    console.log(err)
                                }

                                return res.redirect(302, hostUrl + 'account/' + userDataRes.id)
                            })
                        })
                    }
                })
            })

            getUserData.end()
        })
    });
    postReq.write(postBody)
    postReq.end()
}
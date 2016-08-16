const https = require('https')
const User = require('./../models/user')
const urlParse = require('./../utils/query_string_parser')
const env = require('env2')('.env')
const jwt = require('jwt-simple')
var Promise = require('es6-promise').Promise


const tokenForUser = function (user, linkedinAccessToken) {
    return jwt.encode({sub: user.linkedinId, linkedinAccessToken}, process.env.appSecret)
}

exports.signup = function (req, res) {
    res.redirect(302,
        'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + process.env.clientId + '&redirect_uri=' + process.env.liRedirectURL + '&state=' + process.env.liStateString)
}

exports.signupSuccess = function (req, res) {
    const authorizationCode = urlParse('code', req.url)
    const postBody = 'grant_type=authorization_code&code=' + authorizationCode + '&state=' + process.env.liStateString + '&redirect_uri=' + process.env.liRedirectURL + '&client_id=' + process.env.clientId + '&client_secret=' + process.env.clientSecret

    var accessTokenPostOptions = {
        hostname: 'www.linkedin.com',
        path: '/oauth/v2/accessToken',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        agent: false
    }

    var postReq = https.request(accessTokenPostOptions, (postRes) => {
        var body = ''
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
                        const  isUserInDb = User.findOne({linkedinId: userDataRes.id})
                        isUserInDb.then(function(user){

                            if(user){
                                //TODO find a way to save and update with out using save https://github.com/Automattic/mongoose/issues/3173
                                res.cookie('appCookie', tokenForUser(user, accessToken))
                                return res.redirect(302,   '/search')
                            } else {
                                var newUser = new User({
                                            linkedinId: userDataRes.id,
                                            emailAddress: userDataRes.emailAddress,
                                            firstName: userDataRes.firstName,
                                            lastName: userDataRes.lastName,
                                            numConnections: userDataRes.numConnections,
                                            positions: userDataRes.positions,
                                            pictureURL: userDataRes.pictureUrl,
                                            accountCreated: new Date().getTime(),
                                            logins: [ new Date().getTime() ],
                                            shortList:[]
                                        })
                                        newUser.save().then(function(savedUser){
                                            res.cookie('appCookie', tokenForUser(savedUser, accessToken))
                                            return res.redirect(302,  '/search')
                                        }).catch(function(error){
                                            return res.send(500, "error saving to db")
                                        })
                            }
                        }).catch(function(error){
                            res.send(500, "Error looking up user in db")
                        })
                    }
                    //TODO send error to front end
                })
            })

            getUserData.end()
        })
    })
    postReq.write(postBody)
    postReq.end()
}

exports.isAuthenticated = function (isAuthReq, isAuthRes, next) {
    const token = isAuthReq.cookies.appCookie
    if (!token) {
        return isAuthRes.redirect(302, '/')
    }
    var decodedToken = jwt.decode(token, process.env.appSecret)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if (err || !existingUser) {
            return isAuthRes.redirect(302, '/')
        } else{
            isAuthReq.user = existingUser
            isAuthReq.user.linkedinAccessToken = decodedToken.linkedinAccessToken
        }

    })
    next()
}

exports.logout = function(req, res, next){
    res.clearCookie('appCookie')
    return res.redirect(302, '/')
}

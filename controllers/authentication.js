const https = require('https')
const User = require('./../models/user')
const urlParse = require('./../utils/query_string_parser')
const env = require('env2')('.env')
const jwt = require('jwt-simple')
var Promise = require('es6-promise').Promise


const tokenForUser = function (user, linkedinAccessToken) {

    //if user has a cookie but not in db this user = null, causing an error see https://github.com/RachBLondon/github_api_auth_refactor/issues/9
    return jwt.encode({sub: user.linkedinId, linkedinAccessToken}, process.env.appSecret)
}

exports.signup = function (req, res) {
    res.redirect(302,
        'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + process.env.clientId + '&redirect_uri=' + process.env.liRedirectURL + '&state=' + process.env.liStateString)
}

exports.signupSuccess = function (req, res) {
    console.log('res1', res.req.originalUrl)
    console.log("in signup sucess")
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
        console.log('res2', res.req.originalUrl)

        console.log("in postres")
        var body = '';
        postRes.on('data', function (chunk) {
            console.log('res3', res.req.originalUrl)

            console.log("in data on")
            body += chunk
        })
        postRes.on('end', function () {
            console.log('res4', res.req.originalUrl)

            console.log("in data END")

            var accessToken = JSON.parse(body).access_token

            var userDetails = {
                hostname: 'www.linkedin.com',
                path: '/v1/people/~:(id,first-name,last-name,location,email-address,picture-url,num-connections,positions)?&format=json',
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + accessToken},
                agent: false
            }

            var getUserData = https.request(userDetails, (dataRes)=> {
                console.log('res5', res.req.originalUrl)

                var getResponseBody = ''
                dataRes.on('data', function (chunk) {
                    getResponseBody += chunk
                })
                dataRes.on('end', function () {
                    console.log('res6', res.req.originalUrl)

                    var userDataRes = JSON.parse(getResponseBody)

                    if (!userDataRes.errorCode) {
                        console.log('res7', res.req.originalUrl)
                        const  isUserInDb = User.findOne({linkedinId: userDataRes.id})
                        isUserInDb.then(function(user){
                            console.log('res8', res.req.originalUrl)

                            console.log("doc ", user)
                            if(user){
                                console.log('res9', res.req.originalUrl)

                                //TODO find a way to save and update with out using save https://github.com/Automattic/mongoose/issues/3173
                                // const updatingUser = User.findByIdAndUpdate(
                                //             existingUser._id,
                                //             {$push: {"logins": new Date().getTime()}},
                                //             {safe: true, upsert: true},
                                //             function(err, model) {
                                //                if(err){ console.log(err)}
                                //             }, )
                                //             updatingUser.then(function(doc){
                                //                 console.log('doc', doc)
                                //                 console.log('res9b', res.req.originalUrl)

                                                res.cookie('appCookie', tokenForUser(user, accessToken))
                                                return res.redirect(302,   '/search')
                                            // })
                            } else {
                                console.log('res10', res.req.originalUrl)

                                const newUser = new User({
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
                                        const promise = newUser.save()

                                        promise.then(function(savedUser){
                                            console.log('res11', res.req.originalUrl)
                                            console.log("doc :", doc, "user :", user)
                                            res.cookie('appCookie', tokenForUser(savedUser, accessToken))
                                            return res.redirect(302,  '/search')
                                        })

                            }
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

exports.isAuthenticated = function (req, res, next) {
    console.log('in isAuthentcaded')
    const token = req.cookies.appCookie
    if (!token) return res.redirect(302, '/')
    var decodedToken = jwt.decode(token, process.env.appSecret)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if (err || !existingUser) return res.redirect(302, '/')
        req.user = existingUser
        req.user.linkedinAccessToken = decodedToken.linkedinAccessToken
    })
    next()
}

exports.logout = function(req, res, next){
    res.clearCookie('appCookie')
    return res.redirect(302, '/')
}

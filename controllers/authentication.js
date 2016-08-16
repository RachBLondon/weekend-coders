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
    console.log("16>>> in redirected to get LINKed auth")
    res.redirect(302,
        'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + process.env.clientId + '&redirect_uri=' + process.env.liRedirectURL + '&state=' + process.env.liStateString)
}

exports.signupSuccess = function (req, res) {
    console.log('21:>>>> res1 in sign_up_succes url')
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
        console.log("37:>>>> in post Token to Linkedin")
        var body = ''
        postRes.on('data', function (chunk) {
            console.log("42:>>>> in data on reciving data")
            body += chunk
        })
        postRes.on('end', function () {
            console.log("48:>>>> in data END")

            var accessToken = JSON.parse(body).access_token

            var userDetails = {
                hostname: 'www.linkedin.com',
                path: '/v1/people/~:(id,first-name,last-name,location,email-address,picture-url,num-connections,positions)?&format=json',
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + accessToken},
                agent: false
            }

            var getUserData = https.request(userDetails, (dataRes)=> {
                console.log('61:>>>> res5 request for userData from Linked')

                var getResponseBody = ''
                dataRes.on('data', function (chunk) {
                    getResponseBody += chunk
                })
                dataRes.on('end', function () {
                    console.log('68:>>>> res6 in end of reciving user data ')

                    var userDataRes = JSON.parse(getResponseBody)

                    if (!userDataRes.errorCode) {
                        console.log('73:>>>>  There has been no error')
                        const  isUserInDb = User.findOne({linkedinId: userDataRes.id})
                        isUserInDb.then(function(user){
                            console.log('76:>>>> looked for user in db', user)

                            if(user){
                                console.log('80:>>>> user is in db')
                                //TODO find a way to save and update with out using save https://github.com/Automattic/mongoose/issues/3173
                                res.cookie('appCookie', tokenForUser(user, accessToken))
                                return res.redirect(302,   '/search')

                            } else {
                                console.log('98:>>>> user not in db, save new user :userdataObj', userDataRes)

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
                                            console.log('108  new user saved in db', savedUser)
                                            console.log('115:>>>> just saved user res', res.req.originalUrl)
                                            res.cookie('appCookie', tokenForUser(savedUser, accessToken))
                                            return res.redirect(302,  '/search')
                                        }).catch(function(error){
                                            console.log("errror in save ", error)
                                            return res.send(500, "error saving to db")
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

exports.isAuthenticated = function (isAuthReq, isAuthRes, next) {
    console.log('137:>>>> in isAuthentcaded')
    const token = isAuthReq.cookies.appCookie
    if (!token) {
        console.log("139:>>>> no token");
        return isAuthRes.redirect(302, '/')
    }
    var decodedToken = jwt.decode(token, process.env.appSecret)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if (err || !existingUser) {
            console.log("in no existing user")
            
            return isAuthRes.redirect(302, '/')
        } else{
            console.log('146:>>>> in exisiting user ^^^')
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

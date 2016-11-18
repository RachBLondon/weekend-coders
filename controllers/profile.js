const env = require('env2')('.env')
const User = require('./../models/user')
const jwt = require('jwt-simple')


exports.getProfile = function (req, res, next) {
    const token = req.cookies.appCookie
    if (!token) return res.redirect(302, '/')
    var decodedToken = jwt.decode(token, process.env.appSecret)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if (err || !existingUser) return res.redirect(302, '/')
        req.user = existingUser
        req.user.linkedinAccessToken = decodedToken.linkedinAccessToken
        res.json(existingUser)
    })

}

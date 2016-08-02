var path = require('path')

exports.homePage = function(req, res){
    res.sendFile(path.join(__dirname, '../client/index.html'))
}
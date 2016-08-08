const path = require('path')
const axios = require('axios')
const async = require('async')
const request = require('request')
const configs = require('./../config')
const User = require('./../models/user')
const jwt = require('jwt-simple')

let testRes
let detailUserArray


const pagingationURLs = function(response){
    const pages ={}
    const rawPages = response.headers.link.split("<");
    rawPages.map(function(rawData, i){
        if(rawData.indexOf('next')>0){
            pages.next = rawData.split('>')[0]
        }
        if(rawData.indexOf('last')>0){
            pages.last = rawData.split('>')[0]
        }

        if(rawData.indexOf('prev')>0 ){
            pages.prev = rawData.split('>')[0]
        }

        if(rawData.indexOf('first')>0){
            pages.first = rawData.split('>')[0]
        }

    })
    const pagination = {links: pages}
    detailUserArray.push(pagination)
}

const apiDeets = function(userObj, callback){
    const getUrl = 'https://api.github.com/users/'+ userObj.login +'?access_token='+ configs.githubAccessToken
    axios.get(getUrl)
        .then(response =>{
            callback(null,response.data);
        });
}

const done = function(error, results) {
    // console.log("lll", results)
    testRes.send(detailUserArray.concat(results))
}

exports.gitHubApp = function (req, response) {
    response.sendFile(path.join(__dirname, '../client/index.html'))
}

exports.searchGithub = function (req, res) {
    const language = req.headers.language;
    const location = req.headers.location;
    detailUserArray = [];
    testRes = res
    axios.get('https://api.github.com/search/users?q=+language:' + language + '+location:' + location)
        .then(response => {
            pagingationURLs(response)
            async.map(response.data.items, apiDeets, done);
        });

}

exports.pagination = function(req, res){
    const url = req.headers.url;
    detailUserArray = [];
    testRes = res
    axios.get(url)
        .then(response =>{
            pagingationURLs(response)
            async.map(response.data.items, apiDeets, done )
        })
}

exports.addToShortList = function (req, res) {
    const token = req.cookies.appCookie
    if (!token) return res.redirect(302, '/')
    var decodedToken = jwt.decode(token, configs.appSecret)
    console.log('decoded', decodedToken.sub)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if (err || !existingUser) return res.redirect(302, '/')
        // console.log("existinguser", req.body)
        // User.update(
        //     {linkedId : existingUser.linkedinId},
        //     {$set: {"shortList": req.body}},
        //     {safe: true, upsert: true},
        //     function(err, model) {
        //         if(err){ console.log(err)}
        //     }
        // )
            .select('shortList')
            .exec(function(err, ))

    })

    //check if req.body.githubId exists in User.shorlisedUser
}
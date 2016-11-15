'use strict'
const path = require('path')
const axios = require('axios')
const async = require('async')
const request = require('request')
const env = require('env2')('.env')
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
    const getUrl = 'https://api.github.com/users/'+ userObj.login +'?access_token='+ process.env.githubAccessToken
    axios.get(getUrl)
        .then(response =>{
            callback(null,response.data);
        });
}

const done = function(error, results) {
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
    var decodedToken = jwt.decode(token, process.env.appSecret)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if (err || !existingUser) return res.redirect(302, '/')
        User.findOneAndUpdate({linkedinId:existingUser.linkedinId},
            {$addToSet: {shortList: req.body}},

            function(err,data) {
                if(err) {console.log(err)
                    res.status(500).send("db error, data not saved")
                } else {
                    res.status(200).send('successfully saved')
                }
            }
        )

    })
    //check if req.body.githubId exists in User.shorlisedUser
}

exports.getShortList = function (req, res){
    const token = req.cookies.appCookie
    if (!token) return res.redirect(302, '/')
    var decodedToken = jwt.decode(token, process.env.appSecret)
    User.findOne({linkedinId: decodedToken.sub}, function (err, existingUser) {
        if(err){res.status(500).send('unable to find user in db')}
        res.json(existingUser.shortList)
        })
}

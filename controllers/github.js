var path = require('path')
var axios = require('axios')
var async = require('async')
var request = require('request')
var configs = require('./../config')
var testRes
var detailUserArray


var pagingationURLs = function(response){
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
    var pagination = {links: pages}
    detailUserArray.push(pagination)
}

var apiDeets = function(userObj, callback){
    const getUrl = 'https://api.github.com/users/'+ userObj.login +'?access_token='+ configs.githubAccessToken
    axios.get(getUrl)
        .then(response =>{
            callback(null,response.data);
        });
}

var done = function(error, results) {
    // console.log("lll", results)
    testRes.send(detailUserArray.concat(results))
}

exports.gitHubApp = function (req, response) {
    response.sendFile(path.join(__dirname, '../client/index.html'))
}

exports.searchGithub = function (req, res) {
    var language = req.headers.language;
    var location = req.headers.location;
    detailUserArray = [];
    testRes = res
    axios.get('https://api.github.com/search/users?q=+language:' + language + '+location:' + location)
        .then(response => {
            pagingationURLs(response)
            async.map(response.data.items, apiDeets, done);
        });

}

exports.pagination = function(req, res){
    var url = req.headers.url;
    detailUserArray = [];
    testRes = res
    axios.get(url)
        .then(response =>{
            pagingationURLs(response)
            async.map(response.data.items, apiDeets, done )
        })
}

exports.addToShortList = function (req, res) {

}
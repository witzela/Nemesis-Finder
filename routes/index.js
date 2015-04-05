/* This is the routing for basic webpages (landing, sign up, about, etc.) */

var express = require('express');
var url = require('url');
var router = express.Router();

var APIManager = require('../request_manager/APIManager.js');

/* GET player data */
router.get('/data*', function(req, res, next) {
	var queryData = url.parse(req.url, true).query;
    if(queryData.name) {
		// console.log("Requested: " + queryData.name);

		var callback = function (data) {
			res.end(data);
		}

		APIManager.getSummonerData(queryData.name, callback);
    }
}); 

/* GET home page. */
router.get('/*', function (req, res, next) {
	// var queryData = url.parse(req.url, true).query;

    res.render('index', { title: 'Ward Tracker'});
});

module.exports = router;

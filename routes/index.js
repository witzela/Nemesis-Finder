/* This is the routing for basic webpages (landing, sign up, about, etc.) */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Ward Tracker'});
});

module.exports = router;

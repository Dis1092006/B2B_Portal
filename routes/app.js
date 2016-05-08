var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/Portal_TEST', function (req, res) {
	res.render('index');
});

module.exports = router;

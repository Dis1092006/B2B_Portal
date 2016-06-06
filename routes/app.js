var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) {
	res.render('shop/index', { title: 'Портал' });
});

module.exports = router;

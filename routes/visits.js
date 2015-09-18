var express = require('express'),
	router 	= express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
	var collect = {}

	Visit.find({}).populate('_location')
});

module.exports = router;

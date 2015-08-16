var express  = require('express')
var router 	 = express.Router()
var Location = require(__base + 'models/location')

// Index
router.get('/', function(req, res, next) {
	Location.find(function(err, locations){
		if(err) console.log(err)
			else res.status(200).json(locations)
		})
})

// Create
router.post('/', function(req, res){
	console.log(req.body)
	var location = new Location(req.body)
	location.save(function (err) {
		res.status(200).json(location);
	})
})

// Show
router.get('/:id', function(req, res, next) {
	var id = req.params.id
	Location.findById(id, function(err, location) {
		res.status(200).json(location)
	})
})

// Update
router.put('/:id', function(req, res) {
	var id = req.params.id
	console.log('Updating: ' + id)

	Location.findById(id, function(err, location) {
		location.name = req.body.name
		location.address = req.body.address
		location.radius = req.body.radius
		location.latitude = req.body.latitude
		location.longitude = req.body.longitude

		location.save(function( err, location ) {
			res.status(200).json(location)
		});
	})
})

// Delete
router.delete('/:id', function(req, res) {
	var id = req.params.id
	Location.findById(id, function(err, location){
		location.remove(function(err, location) {
			res.status(200).json({msg: 'OK'})
		})
	})
})

module.exports = router;
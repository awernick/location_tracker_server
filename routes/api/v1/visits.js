var express  = require('express')
var router 	 = express.Router()
var Visit 	 = require(__base + 'models/visit')

// Index
router.get('/', function(req, res, next) {
	Visit.find(function(err, visits){
		if(err) console.log(err)
			else res.status(200).json(visits)
		})
})

// Create
router.post('/', function(req, res){
	console.log(req.body)
	var visit = new Visit(req.body)
	visit.id = visit._id; // Necessary since we have double id
	visit.save(function (err) {
		res.status(200).json(visit);
	})
})

// Show
router.get('/:id', function(req, res, next) {
	var id = req.params.id
	Visit.findById(id, function(err, visit) {
		res.status(200).json(visit)
	})
})

// Update
router.put('/:id', function(req, res) {
	console.log(req.body)
	var id = req.params.id
	console.log('Updating: ' + id)

	Visit.findById(id, function(err, visit) {
		console.log('Performing check')
		console.log(err)
		if(err) { console.log(err) }
		else {
			visit.start_time = req.body.start_time
			visit.end_time = req.body.end_time
			visit.open = req.body.open
			visit.location_id = req.body.location_id

			visit.save(function( err, visit ) {
				res.status(200).json(visit)
			});
		}
	})
})

// Delete
router.delete('/:id', function(req, res) {
	var id = req.params.id
	Visit.findById(id, function(err, visit){
		visit.remove(function(err, visit) {
			res.status(200).json({msg: 'OK'})
		})
	})
})

module.exports = router;
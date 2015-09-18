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
	visit.save(function (err) {
		res.status(200).json(visit);
	})
})

// Show
router.get('/:uuid', function(req, res, next) {
	var uuid = req.params.uuid
	Visit.findOne({"uuid": uuid}, function(err, visit) {
    if(visit == null) {
      res.sendStatus(404)
      res.end()
      return
    }
		res.status(200).json(visit)
	})
})

// Update
router.put('/:uuid', function(req, res) {
	console.log(req.body)
	var uuid = req.params.uuid
	console.log('Updating: ' + uuid)

	Visit.findOne({"uuid": uuid}, function(err, visit) {
		console.log('Performing check')
		console.log(err)
		if(err) { console.log(err) }
    if (visit == null) {
      res.sendStatus(404)
      res.end()
      return
    }
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
router.delete('/:uuid', function(req, res) {
	var uuid = req.params.uuid
	Visit.findOne({"uuid": uuid}, function(err, visit){
    if (visit == null) {
      res.sendStatus(404)
      res.end()
      return
    }
		visit.remove(function(err, visit) {
			res.status(200).json({msg: 'OK'})
		})
	})
})

module.exports = router;

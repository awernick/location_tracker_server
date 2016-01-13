var express  = require('express')
var router   = express.Router()
var Location = require(__base + 'models/location')

// Index
router.get('/', function(req, res, next) {
  console.log('checking')
  Location.find(function(err, locations){
    console.log('bruh')
    if(err) {
      console.log(err)
      res.sendStatus(404)
      res.end()  
    }
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
router.get('/:uuid', function(req, res, next) {
  var uuid = req.params.uuid
  Location.findOne({"uuid": uuid}, function(err, location) {
    if(location == null) {
      res.sendStatus(404)
      res.end()
      return
    }
    res.status(200).json(location)
  })
})

// Update
router.put('/:uuid', function(req, res) {
  var uuid = req.params.uuid
  console.log('Updating: ' + uuid)

  Location.findOne({"uuid": uuid}, function(err, location) {
    if (location == null) {
      res.sendStatus(404)
      res.end()
      return // not sure about this...
    }
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
router.delete('/:uuid', function(req, res) {
  var uuid = req.params.uuid
  Location.findOne({"uuid": uuid}, function(err, location){
    if(location == null) {
      res.sendStatus(404)
      res.end()
      return
    }
    location.remove(function(err, location) {
      res.status(200).json({msg: 'OK'})
    })
  })
})

module.exports = router;

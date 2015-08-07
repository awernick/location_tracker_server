var mongoose = require('mongoose')

var schema = new mongoose.Schema({
		id       	: String,
		start_time	: Date,
		end_time	: Date,
		open 		: Boolean,
		location_id	: String
})

	
module.exports = Visit = mongoose.model('Visit', schema)
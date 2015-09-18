var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    uuid        : String,
		start_time	: Date,
		end_time		: Date,
		open 				: Boolean,
		_location		: { type: String, ref: 'Location' }
})

	
module.exports = Visit = mongoose.model('Visit', schema)

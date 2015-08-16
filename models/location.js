var mongoose = require('mongoose')

var schema = new mongoose.Schema({
		name				: String,
		address			: String,
		radius			: Number,
		latitude		: Number,
		longitude		: Number
})

	
module.exports = Location = mongoose.model('Location', schema)
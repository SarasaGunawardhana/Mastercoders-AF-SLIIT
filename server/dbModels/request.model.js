var mongoose = require('mongoose');

var request = new mongoose.Schema({
			drugname     : String,
			department : String,
			requestedquantity   : Number,
			date : String,
			status    : String,

});


module.exports = mongoose.model('Request', request);

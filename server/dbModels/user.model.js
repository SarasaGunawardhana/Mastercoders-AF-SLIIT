var mongoose = require('mongoose');

var user = new mongoose.Schema({
	    fname     : String,
			mname			: String,
      lname     : String,
			NIC	      : String,
			dob				: Date,
			address		: String,
      email     : String,
	    type	    : String,
	    username  : String,
      password  : String

});
//console.log(user);

module.exports = mongoose.model('User', user);

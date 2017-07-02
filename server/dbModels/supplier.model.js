'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplier = new Schema({
	    fname     : String,
			mname			: String,
      lname     : String,
      email     : String,
			address		: String,
	    contactno : Number,
			mails :[{
        type: Schema.Types.ObjectId,
        ref: 'Mail'
      }]

});
module.exports = mongoose.model('Supplier', supplier);

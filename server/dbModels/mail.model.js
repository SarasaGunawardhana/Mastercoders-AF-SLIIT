'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mail = new Schema({
	    from     : String,
			to			: String,
      subject     : String,
      text     : String,
			date : Date,
			drug :{
        type: Schema.Types.ObjectId,
        ref: 'Drug'
      },
			supplier :{
				type: Schema.Types.ObjectId,
        ref: 'Supplier'
			}
 
});
module.exports = mongoose.model('Mail', mail);

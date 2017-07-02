'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drug = new Schema({

    dcat     : String,
    dname   	: String,
    dtype     : String,
    dprice     : Number,
    dreorder : Number,
    ddanger : Number,
    dremark:String,
    batches: [{
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    }],
    mails : [{
        type: Schema.Types.ObjectId,
        ref: 'Mail'
      }],
			requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
      }],

});

module.exports = mongoose.model('Drug', drug);

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var batch = new Schema({
    dcat     : String,
    dname			: String,
    dtype     : String,
    batchno     : String,
    content		: String,
    contentType : String,
    nofcartoons:Number,
    nofcards     : Number,
    noftablets		: Number,
    quantity:Number,
    mdate : Date,
    edate:Date,
    drugs: [{
        type: Schema.Types.ObjectId,
        ref: 'Drug'
    }],

    mails : [{
        type: Schema.Types.ObjectId,
        ref: 'Mail'
      }],
			requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
      }]

});
module.exports = mongoose.model('Batch', batch);

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var stock = new mongoose.Schema({


    dcat     : String,
    dname	 : String,
    dtype    : String,
    quantity : Number,
    total : Number, //this total is not included in stock table
    drug: {
        type: Schema.Types.ObjectId,
        ref: 'Drug'
    },
    batches: [{
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    }]


});


module.exports = mongoose.model('Stock', stock);

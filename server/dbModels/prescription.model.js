var mongoose = require('mongoose');

var prescription = new mongoose.Schema({

			patientid     : String,
			category     : String,
			discription			: String,
			drugtype : String,
      dosage     : Number,
      frequency     : Number,
			period		: Number,
			prescriptionquantity  : Number,
			prescriptiondate   : String,
			stockquantity  : Number,
			availablequantity  : Number,
			status  : String



});


module.exports = mongoose.model('Prescription', prescription);

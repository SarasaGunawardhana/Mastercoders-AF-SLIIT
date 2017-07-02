'use strict';
var Prescription = require('../dbModels/prescription.model');
var Stock = require('../dbModels/stock.model');

var mongoose = require('mongoose');

var PrescriptionModel = mongoose.model('Prescription');
var StockModel = mongoose.model('Stock');

exports.viewPrescriptions = function(callback)
{
  PrescriptionModel.find().populate('prescriptions').exec().then(prescriptions => {
    callback(prescriptions);
  }).catch(err => {

    callback(err);
  });
}

exports.addPrescriptions = function(values, callback)
{

  var prescription = new PrescriptionModel(values);
    prescription.save().then(prescription => {

    callback(prescription);
  }).catch(err => {
    callback(err);
  });
}


exports.editPrescriptions = function(value, callback)
{
  console.log(" edit prescription handling calling");
  PrescriptionModel.findById(value).populate('prescriptions').exec().then(prescription => {
      callback(prescription);
   }).catch(err => {
      console.error("Error inside prescription handling"+err);
      callback(err);
   });

}

exports.updatePrescriptions = function(id,prescription, callback)
{
  console.log(" update handling calling");
  PrescriptionModel.findByIdAndUpdate(id, {$set: prescription}).then(prescriptionUD => {
      callback(prescription);
   }).catch(err => {
      console.error("Error inside update handling"+err);
      callback(err);
   });

}

exports.deletePrescriptions = function(id, callback)
{
  console.log(" Delete handling calling");
   PrescriptionModel.remove({_id:id}).then(prescription => {
      callback(prescription);
   }).catch(err => {
      console.error("Error inside Delete handling"+err);
      callback(err);
   });

}


exports.dispenses = function(id,prescription, callback)
{
  PrescriptionModel.findByIdAndUpdate(id, {$set: prescription}).then(prescriptionUD => {
      callback(prescription);
   }).catch(err => {
      callback(err);
   });

}


exports.viewStock = function(callback)
{
    StockModel.aggregate([
        {
            $group: {
                _id: { dcat:'$dcat' , dname:'$dname', dtype:'$dtype'},
                total: {
                    $sum: "$quantity"
                }
            }
        }
    ]).then(prescriptions => {
        callback(prescriptions);
    }).catch(err => {

        callback(err);
    });

}


exports.viewStockD = function(dname,dcat,dtype,callback)
{

    console.log("inside drug handling");
    console.log(dname);
    console.log(dcat);
    console.log(dtype);
    DrugModel.find({dname: dname ,dcat: dcat, dtype: dtype }).populate('prescriptions').exec().then(prescription =>{

        console.log("kooooo"+prescription);

        callback(prescription);

    }).catch(err => {

        callback(err);
    });

}

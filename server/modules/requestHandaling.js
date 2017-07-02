'use strict';
var Request = require('../dbModels/request.model');
var mongoose = require('mongoose');
var RequestModel = mongoose.model('Request');


exports.viewRequests = function(callback)
{
  RequestModel.find().populate('requests').exec().then(requests => {
    callback(requests);
  }).catch(err => {

    callback(err);
  });
}

exports.addRequests = function(values, callback)
{

  var request = new RequestModel(values);
    request.save().then(request => {

    callback(request);
  }).catch(err => {
    callback(err);
  });
}


exports.editRequests = function(value, callback)
{
  console.log(" edit Request handling calling");
  RequestModel.findById(value).populate('requests').exec().then(request => {
      callback(request);
   }).catch(err => {
      console.error("Error inside Request handling"+err);
      callback(err);
   });

}

exports.updateRequests = function(id,request, callback)
{
  console.log(" update handling calling");
  RequestModel.findByIdAndUpdate(id, {$set: request}).then(requestUD => {
      callback(request);
   }).catch(err => {
      console.error("Error inside update handling"+err);
      callback(err);
   });

}

exports.deleteRequests = function(id, callback)
{
  console.log(" Delete handling calling");
   RequestModel.remove({_id:id}).then(request => {
      callback(request);
   }).catch(err => {
      console.error("Error inside Delete handling"+err);
      callback(err);
   });

}

/*
exports.getDrugByReqId = function(value, callback)
{
  RequestModel.findById(value).populate('drugs').exec().then(drug => {
    console.log("getDrugByReqId");
    console.log(drug);
      callback(drug);
   }).catch(err => {
      callback(err);
   });
}
*/

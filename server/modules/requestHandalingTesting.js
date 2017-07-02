'use strict';
var Request = require('../dbModels/request.model');
var mongoose = require('mongoose');
var RequestModel = mongoose.model('Request');

exports.viewRequests = function(callback)
{
  RequestModel.find().populate('drug').exec().then(requests => {
    callback(requests);
  }).catch(err => {
    callback(err);
  });
}

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

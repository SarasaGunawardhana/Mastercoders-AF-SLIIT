'use strict';
var Supplier = require('../dbModels/supplier.model');
var mongoose = require('mongoose');
var SupplierModel = mongoose.model('Supplier');


exports.viewSuppliers = function(callback)
{
  SupplierModel.find().populate('suppliers').exec().then(suppliers => {
    callback(suppliers);
  }).catch(err => {
    callback(err);
  });
}
exports.addSuppliers = function(values, callback)
{
  var supplier = new SupplierModel(values);
    supplier.save().then(supplier => {
    callback(supplier);
  }).catch(err => {
    callback(err);
  });
}

exports.editSuppliers = function(value, callback)
{
  SupplierModel.findById(value).populate('suppliers').exec().then(supplier => {
      callback(supplier);
   }).catch(err => {
      callback(err);
   });
}

exports.updateSuppliers = function(id,supplier, callback)
{
  SupplierModel.findByIdAndUpdate(id, {$set: supplier}).then(supplierUD => {
      callback(supplier);
   }).catch(err => {
      callback(err);
   });
}

exports.deleteSuppliers = function(id, callback)
{
  SupplierModel.remove({_id:id}).then(supplier => {
      callback(supplier);
   }).catch(err => {
      callback(err);
   });
}

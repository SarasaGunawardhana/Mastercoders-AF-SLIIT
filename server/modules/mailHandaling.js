'use strict';
var Mail = require('../dbModels/mail.model');
var Drug = require('../dbModels/drug.model');
var Supplier = require('../dbModels/supplier.model');

var mongoose = require('mongoose');

var SupplierModel = mongoose.model('Supplier');
var MailModel = mongoose.model('Mail');
var DrugModel = mongoose.model('Drug');


exports.addMail = function(drugid,supplierid,values, callback)
{
  var mailSubject="";
  var mailId="";
  var supplierEmail="";
  DrugModel.findById(drugid).populate('drugs').exec().then(drugs => {
    mailSubject = drugs.dname;
  }).catch(err => {
    console.log(" error in getting drug Records");
  });
  SupplierModel.findById(supplierid).populate('suppliers').exec().then(suppliers => {
    supplierEmail = suppliers.email;
    console.log("Email : "+supplierEmail);
  }).catch(err => {
    console.log(" error in getting supplier Records");
  });

  var mail = new MailModel(values);
  mail.save().then(maill => {
    mailId = maill._id;
    console.log(mailSubject);
    return MailModel.findByIdAndUpdate(mailId, { $set: { "subject": mailSubject } });
  }).then(()=>{
    return MailModel.findByIdAndUpdate(mailId, { $set: { "to": supplierEmail }});
  }).then(()=>{
    return MailModel.findByIdAndUpdate(mailId, { $set: { "drug": drugid }});
  }).then(()=>{
    return MailModel.findByIdAndUpdate(mailId, { $set: { "supplier": supplierid }});
  }).then(()=>{
    return SupplierModel.findByIdAndUpdate(supplierid, {$push : {"mails" : mailId}});
  }).then(()=>{
    return DrugModel.findByIdAndUpdate(drugid, {$push : {"mails" : mailId}});
  }).then(()=>{
    return MailModel.findById(mailId).populate('mails').exec();
  }).then((mailing)=>{
    callback(mailing);
  }).catch(err => {
    callback(err);
  });
}

exports.viewMail = function(callback)
{
  MailModel.find().populate('drug').populate('supplier').exec().then(mails => {
    callback(mails);
  }).catch(err => {
    callback(err);
  });
}

exports.editMail = function(value, callback)
{
  MailModel.findById(value).populate('mails').exec().then(mail => {
      callback(mail);
   }).catch(err => {
      callback(err);
   });

}

exports.updateMail = function(id,mail, callback)
{
  MailModel.findByIdAndUpdate(id, {$set: mail}).then(mailUD => {
      callback(mailUD);
   }).catch(err => {
      callback(err);
   });

}

exports.deleteMail = function(id, callback)
{
  MailModel.remove({_id:id}).then(mail => {
      callback(mail);
   }).catch(err => {
      callback(err);
   });

}

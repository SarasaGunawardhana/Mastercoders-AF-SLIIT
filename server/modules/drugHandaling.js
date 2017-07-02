'use strict';
var mongoose = require('mongoose');
var Drug = require('../dbModels/drug.model');
var Batch = require('../dbModels/batch.model');
var Stock = require('../dbModels/stock.model');

var DrugModel = mongoose.model('Drug');
var BatchModel = mongoose.model('Batch');
var StockModel = mongoose.model('Stock');



exports.viewDrugs = function(callback)
{
  DrugModel.find().populate('drugs').exec().then(drugs => {
    callback(drugs);
  }).catch(err => {

    callback(err);
  });
}

exports.addDrugs = function(values, callback)
{

  var drug = new DrugModel(values);
    drug.save().then(drug => {

    callback(drug);
  }).catch(err => {
    callback(err);
  });
}


exports.editDrugs = function(value, callback)
{
  console.log(" edit drug handling calling");
  DrugModel.findById(value).populate('batches').exec().then(drug => {
      callback(drug);
   }).catch(err => {
      console.error("Error inside drug handling"+err);
      callback(err);
   });

}

exports.updateDrugs = function(id,drug, callback)
{
  console.log(" update handling calling");
  DrugModel.findByIdAndUpdate(id, {$set: drug}).then(drugUD => {
      callback(drug);
   }).catch(err => {
      console.error("Error inside update handling"+err);
      callback(err);
   });

}

exports.deleteDrugs = function(id, callback) {
    console.log(" Delete handling calling");
    DrugModel.remove({_id: id}).then(drug => {

/*
        const batchIds = drug.batches.map((batchId => batchId));
        return BatchModel.remove({_id: {$in: batchIds}});
*/
        callback(drug);
    }).catch(err => {
        console.error("Error inside Delete handling" + err);
        callback(err);
    });

}


//////////////////////////batch db part///////////

exports.viewBatch = function(callback)
{
    console.log("done");

    BatchModel.find().populate('batches').exec().then(batches => {
        callback(batches);
    }).catch(err => {

        callback(err);
    });
}





    exports.addBatch = function(id,values, callback)
    {

        var batch = new BatchModel(values);
        batch.drugs = id;
        var stock = new StockModel(values);
        stock.drug=id;
        stock.save();

        batch.save().then(batchDb => {

            return DrugModel.findByIdAndUpdate(id, {$push: {"batches": batchDb._id}})

        }).then(() => {
            return DrugModel.findById(id).populate('batches').exec();
        }).then(drugDb => {
            callback(drugDb);

        }).catch(err => {
            callback(err);
        });

    }


exports.deleteBatch = function(id, callback) {
    console.log(" Delete handling calling");
    BatchModel.remove({_id: id}).then(batch => {
        callback(batch);
    }).catch(err => {
        console.error("Error inside Delete handling" + err);
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
    ]).then(drugs => {

        callback(drugs);
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
    DrugModel.find({dname: dname ,dcat: dcat, dtype: dtype }).populate('drugs').exec().then(drug =>{

        callback(drug);

    }).catch(err => {

        callback(err);
    });

}

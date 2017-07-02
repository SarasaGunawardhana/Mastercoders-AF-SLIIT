'use strict';
var SH       = require('../modules/supplierHandaling');
var mongoose = require('mongoose');
module.exports = function(app) {

 app.get('/suppliers', function(req, res){
   SH.viewSuppliers(function(output,error){
     if (!output){
       res.sendStatus(400);
     }	else {
       res.json(output);
     }
   });
  });

  app.get('/suppliers/:id', function(req, res){
    SH.editSuppliers(req.params.id,function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        res.json(output || {});
      }
    });
   });

  app.post('/suppliers', function(req, res){
    SH.addSuppliers(req.body,function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        res.sendStatus(200);
      }
    });
  });

  app.put('/suppliers/:id', (req, res) => {
    const supplier = req.body;
    delete supplier._id;
    const supplierId = req.params.id;
    SH.updateSuppliers(supplierId,supplier,function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        res.json(output);
      }
    });
  });

  app.delete('/suppliers/:id',function(req,res){
    SH.deleteSuppliers(req.params.id,function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        res.sendStatus(200);
      }
    });
  });





};

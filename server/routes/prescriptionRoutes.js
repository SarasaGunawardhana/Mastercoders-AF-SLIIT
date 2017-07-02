'use strict';
var PH      = require('../modules/prescriptionHandaling');
var mongoose = require('mongoose');
module.exports = function(app) {



 app.get('/prescription', function(req, res){
   PH.viewPrescriptions(function(output,error){
     if (!output){
       res.sendStatus(400);
     }	else {

       res.json(output);
     }
   });
  });

  app.post('/prescription', function(req, res){
    PH.addPrescriptions(req.body,function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        res.sendStatus(200);
      }
    });
  });

  app.get('/prescription/:id', function(req, res){
  PH.editPrescriptions(req.params.id,function(output,error){

    if (!output){
      res.sendStatus(500);
    }	else {

      res.json(output || {});
    }
  });
 });
 app.put('/prescription/:id', (req, res) => {
   console.log("inside put");
   const prescription = req.body;
   delete prescription._id;
   const patientid = req.params.id;
   PH.updatePrescriptions(patientid,prescription,function(output,error){
     if (!output){
       console.log(" not work :" +error);
       res.sendStatus(400);
     }	else {
       console.log("work :"+output);
       res.json(output);
     }
   });
 });
app.delete('/prescription/:id',function(req,res){
  console.log("ID : ");
  PH.deletePrescriptions(req.params.id,function(output,error){
    if (!output){
      console.log(" not work :" +error);
      res.sendStatus(400);
    }	else {
     console.log("work :"+output);
      res.sendStatus(200);
    }
  });
});

app.put('/prescription/:id', (req, res) => {
  console.log("inside put");
  const prescription = req.body;
  delete prescription._id;
  const patientid = req.params.id;
  PH.dispenses(patientid,prescription,function(output,error){
    if (!output){
      console.log(" not work :" +error);
      res.sendStatus(400);
    }	else {
      console.log("work :"+output);
      res.json(output);
    }
  });
});


};

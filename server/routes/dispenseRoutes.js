'use strict';
var DH      = require('../modules/prescriptionHandaling');
var mongoose = require('mongoose');
module.exports = function(app) {



 app.get('/dispense', function(req, res){
   DH.viewDispenses(function(output,error){
     console.log(output +"asdfasf");
     if (!output){
       res.sendStatus(400);
     }	else {
       console.log("dispense true :"+output);
       res.json(output);
     }
   });
  });

  };

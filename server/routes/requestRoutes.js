'use strict';
var RD      = require('../modules/requestHandaling');
var mongoose = require('mongoose');
module.exports = function(app) {



  app.get('/request', function(req, res){
    RD.viewRequests(function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        console.log("request true :"+output);
        res.json(output);
      }
    });
  });

  app.post('/request', function(req, res){
    var request = req.body;
    request.status="pending";
    RD.addRequests(req.body,function(output,error){
      if (!output){
        console.log(" not work :" +error);
        res.sendStatus(400);
      }	else {
        console.log("work :"+output);
        res.sendStatus(200);
      }
    });
  });

  app.get('/request/:id', function(req, res){
    RD.editRequests(req.params.id,function(output,error){

      if (!output){
        res.sendStatus(500);
      }	else {

        res.json(output || {});
      }
    });
  });
/*
  app.get('/requests/:id/drugs', function(req, res){
    RD.getDrugByReqId(req.params.id,function(output,error){
      if (!output){
        res.sendStatus(500);
      }	else {
        res.json(output || {});
      }
    });
  });
*/

  app.put('/request/:id', (req, res) => {
    console.log("inside put");
    const request = req.body;
    delete request._id;
    const drugname = req.params.id;
    RD.updateRequests(drugname,request,function(output,error){
      if (!output){
        console.log(" not work :" +error);
        res.sendStatus(400);
      }	else {
        console.log("work :"+output);
        res.json(output);
      }
    });
  });
  app.delete('/request/:id',function(req,res){
    console.log("ID : ");
    RD.deleteRequests(req.params.id,function(output,error){
      if (!output){
        console.log(" not work :" +error);
        res.sendStatus(400);
      }	else {
        console.log("work :"+output);
        res.sendStatus(200);
      }
    });
  });


};

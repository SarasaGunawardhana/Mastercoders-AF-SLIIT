'use strict';

var express = require('express');
var mongoose = require('mongoose');

var DH= require('../modules/drugHandaling');


module.exports = function(app) {


 app.get('/drug', function(req, res){
   DH.viewDrugs(function(output,error){
     console.log(output +"asdfasf");
     if (!output){
       res.sendStatus(400);
     }	else {
       console.log("Drug true :"+output);
       res.json(output);
     }
   });
  });

  app.post('/drug', function(req, res){
    DH.addDrugs(req.body,function(output,error){
      if (!output){
        console.log(" not work :" +error);
        res.sendStatus(400);
      }	else {
        console.log("work :"+output);
        res.sendStatus(200);
      }
    });
  });

  app.get('/drug/:id', function(req, res){
  DH.editDrugs(req.params.id,function(output,error){

    if (!output){
      res.sendStatus(500);
    }	else {

      res.json(output || {});
    }
  });
 });
 app.put('/drug/:id', (req, res) => {
   console.log("inside put");
   const drug = req.body;
   delete drug._id;
   const drugId = req.params.id;
   DH.updateDrugs(drugId,drug,function(output,error){
     if (!output){
       console.log(" not work :" +error);
       res.sendStatus(400);
     }	else {
       console.log("work :"+output);
       res.json(output);
     }
   });
 });

app.delete('/drug/:id',function(req,res){
  console.log("ID : ");
  DH.deleteDrugs(req.params.id,function(output,error){
    if (!output){
      console.log(" not work :" +error);
      res.sendStatus(400);
    }	else {
     console.log("work :"+output);
      res.sendStatus(200);
    }
  });
});



///////////////////////////////////////batch routes//////////////////////



    app.post('/drug/:id/batches', (req, res) => {
        const batch = req.body;
        const drugId = req.params.id;
         console.log(batch);
        console.log(drugId);
        console.log("we are here ");
        DH.addBatch(drugId,batch,function(output,error){
            if (!output){
                console.log(" not work :" +error);
                res.sendStatus(400);
            }	else {
                console.log("work :"+output);
                res.json(output);
            }
        });

    });


    app.delete('/batch/:id',function(req,res){

        console.log("hari");
        console.log(req.params.id);

        DH.deleteBatch(req.params.id,function(output,error){
            if (!output){
                console.log(" not work :" +error);
                res.sendStatus(400);
            }	else {
                console.log("work :"+output);
                res.sendStatus(200);
            }
        });
    });
/////////////////////////////view batch details/////////////////////////////////////



    app.get('/batch', function(req, res){
        DH.viewBatch(function(output,error){
            if (!output){
                res.sendStatus(400);

            }	else {
                console.log("Drug true :"+output);
                res.json(output);
            }
        });
    });




 /////////////////////////stock routes//////////////////


    app.get('/stock', function(req, res){
        DH.viewStock(function(output,error){

            if (!output){
                res.sendStatus(400);
            }	else {
                console.log("Drug true :"+output);
                res.json(output);
            }
        });
    });

    app.get('/stock/:dname/stocks/:dcat/stocked/:dtype',function(req, res){

     console.log("we are in here now");


        var dname=req.params.dname;

        var dcat=req.params.dcat;

        var dtype=req.params.dtype;

/*
        console.log(dname);
        console.log(dcat);
        console.log(dtype);

*/
       DH.viewStockD(dname,dcat,dtype,function(output,error){

           /* console.log(dname);
            console.log(dcat);
            console.log(dtype);*/
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

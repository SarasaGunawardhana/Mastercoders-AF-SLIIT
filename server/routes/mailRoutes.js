'use strict';
var MH       = require('../modules/mailHandaling');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false, // use SSL
  port: 25, // port for secure SMTP
  auth: {
    user: 'gunawardhanasarasa@gmail.com',
    pass: '92481426'
  },
  tls: {
        rejectUnauthorized: false
  }
});

module.exports = function(app) {

  app.post('/mails', function(req, res){
    var date = new Date;
    const mailBody = req.body;
    const drugId = mailBody.subject;
    const supplierId = mailBody.to;
    mailBody.date = date;

    delete mailBody.subject;
    delete mailBody.to;

    console.log(mailBody);

    MH.addMail(drugId,supplierId,mailBody,function(output,error){
      if (!output){
        res.sendStatus(500);
      }	else {
        var mailOptions = {
          from: 'gunawardhanasarasa@gmail.com',
          to: output.to,
          subject: output.subject,
          text: output.text
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.sendStatus(200);
      }
    });
  });


 app.get('/mails', function(req, res){
   MH.viewMail(function(output,error){
     if (!output){
       res.sendStatus(400);
     }	else {
       res.json(output);
     }
   });
  });

  app.get('/mails/:id', function(req, res){
    MH.editMail(req.params.id,function(output,error){
      if (!output){
        res.sendStatus(500);
      }	else {
        res.json(output || {});
      }
    });
   });

  app.put('/mails/:id', (req, res) => {
    const mail = req.body;
    delete mail._id;
    const mailId = req.params.id;
    MH.updateMail(mailId,mail,function(output,error){
      if (!output){
        res.sendStatus(500);
      }	else {
        res.json(output);
      }
    });
  });

  app.delete('/mails/:id',function(req,res){
    MH.deleteMail(req.params.id,function(output,error){
      if (!output){
        res.sendStatus(500);
      }	else {
        res.sendStatus(200);
      }
    });
  });





};

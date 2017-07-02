'use strict';
var UH       = require('../modules/userHandaling');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function(app) {

	app.post('/login', function(req, res){
		UH.manualSignIn(req.body['username'], req.body['password'], function(error, output){
			if (!output){
				res.sendStatus(400);
			}	else {
				req.session.user = output;
				if (req.body['remember-me'] == 'on'){
					res.cookie('username', output.username, { maxAge: 900000 });
				}
				res.json(output);
			}
		});
	});

	app.post('/users', function(req, res){
		console.log(req.body);
		UH.addNewAccount(req.body,function(output,error){
			if (!output){
				res.sendStatus(400);
			}	else {
				console.log("OK");
				res.sendStatus(200);
			}
		});
	});

	app.get('/users', function(req, res){

    UH.viewUsers(function(output,error){
      if (!output){
        res.sendStatus(400);
      }	else {
        res.json(output || {});
      }
    });

   });

	 app.get('/users/:id', function(req, res){

     UH.viewUser(req.params.id,function(output,error){
       if (!output){
         res.sendStatus(400);
       }	else {
         res.json(output || {});
       }
     });

    });

		app.delete('/users/:id',function(req,res){
      UH.deleteUser(req.params.id,function(output,error){
        if (!output){
          res.sendStatus(400);
        }	else {
          res.json(output);
        }
      });
    })

	app.get('/logout', function(req, res){
		res.clearCookie('username');
		console.log(req.session.user);
		req.session.destroy();
		res.sendStatus(200);

	});
};

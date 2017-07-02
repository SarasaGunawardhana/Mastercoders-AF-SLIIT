'use strict';

var crypto = require('crypto');
var moment 		= require('moment');
var User = require('../dbModels/user.model');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

exports.autoSignIn = function(username, password, callback)
{
	User.findOne({username:username}, function(e, o) {
		if (o){
			o.password == password ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.manualSignIn = function(username, password, callback)
{ //passport.authenticate('local'),

	User.findOne({username : username}).exec().then(users => {
		if (users == null) {
			callback('invalid-user');
		}else {
			validatePassword(password, users.password, function(err, res) {
				if (res==true){
					callback(null,users);
				}	else{
					callback('invalid-password');
				}
			});
		}
	}).catch(err => {
		console.log("three");
		callback(err);
	});
}

exports.addNewAccount = function(newData, callback)
{
	User.findOne({username:newData.username}, function(e, o) {
		if (o){
			console.log("Username taken");
			callback('username-taken');
		}	else{
			console.log("OK username");
					saltAndHash(newData.password, function(hash){
						newData.password = hash;
					// append date stamp when record was created //
						//newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						var user = new UserModel(newData);
					    user.save().then(user => {
					    callback(user);
					  }).catch(err => {
					    callback(err);
					  });
					});
		}
	});
}

exports.viewUser = function(value, callback)
{
  User.findById(value).populate('users').exec().then(user => {
      callback(user);
   }).catch(err => {
      console.error("Error inside handling"+err);
      callback(err);
   });

}

exports.viewUsers = function(callback)
{
  User.find().populate('users').exec().then(user => {
      callback(user);
   }).catch(err => {
      console.error("Error inside handling"+err);
      callback(err);
   });

}


exports.updateUsers = function(id,user, callback)
{
  User.findByIdAndUpdate(id, {$set: user}).then(userUD => {
      callback(userUD);
   }).catch(err => {
      callback(err);
   });

}

exports.deleteUser = function(id, callback)
{
  UserModel.remove({_id:id}).then(user => {
      callback(user);
   }).catch(err => {
      callback(err);
   });
}

	/* private encryption & validation methods */

	var generateSalt = function()
	{
		var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
		var salt = '';
		for (var i = 0; i < 10; i++) {
			var p = Math.floor(Math.random() * set.length);
			salt += set[p];
		}
		return salt;
	}

	var md5 = function(str) {
		return crypto.createHash('md5').update(str).digest('hex');
	}

	var saltAndHash = function(pass, callback)
	{
		var salt = generateSalt();
		callback(salt + md5(pass + salt));
	}

	var validatePassword = function(plainPass, hashedPass, callback)
	{
		//console.log("inside ValidatePassword  hashed function" + hashedPass);
		//console.log("hashedPass : "+hashedPass);
		var salt = hashedPass.substr(0, 10);
		//console.log("salt : "+salt);
		var validHash = salt + md5(plainPass + salt);
		callback(null, hashedPass === validHash);
	}

	var getObjectId = function(id)
	{
		return new require('mongodb').ObjectID(id);
	}

	var findById = function(id, callback)
	{
		User.findOne({_id: getObjectId(id)},
		function(e, res) {
			if (e) callback(e)
			else callback(null, res)
		});
	}

	var findByMultipleFields = function(a, callback)
	{
		// this takes an array of name/val pairs to search against {fieldName : 'value'} //
		User.find( { $or : a } ).toArray(
			function(e, results) {
				if (e) callback(e)
				else callback(null, results)
			});
		}

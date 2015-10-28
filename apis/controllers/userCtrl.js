var mongoose = require('mongoose');
var User = require('../models/userSchema');

module.exports = {
	createAdmin: function(req, res) {
		User.create(req.body, function(err, response){
			if(err){
				res.status(500).json(err);
			}else{
				res.send(response);
			}
		});
	},// end createAdmin
	
	addUser : function(user, next) {
		if(!user) {
			
		}
		console.log(user, " user from within addUser");
	var newUser = new User({
		email : user.email.toLowerCase(),
		password : user.password
	});

	newUser.save(function(err) {
		if (err) {
			return next(err);
		}
		next(null);
	});
},   // end addUser
	
	findUser : function(email, next) {
		User.findOne({email : email.toLowerCase()}, function(err, user){
			next(err, user);
		});
	},//end find user
	
	checkLoggedIn: function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	},
	
	loginAdmin : function(req, res) {
		res.send(req.user);
	}
	
};// end module.exports
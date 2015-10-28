var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userCtrl = require('../controllers/userCtrl');

var User = require('../models/userSchema');


module.exports = function(passport) {
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		}); 
	});
	
//			SETUP UP LOCAL SIGNUP
	
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
		function(req, email, password, done) {
		console.log('callback in passport.js in local-signup hit');
		process.nextTick(function() {
			User.findOne({'email' : email}, function(err, user) {
				if (err) {
					console.log(err);
					return done(err);
				}
				if(user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken'));
				} else {
					console.log('above newUser in passport.js');
					var newUser = new User();
					
					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					
					console.log(newUser);
					newUser.save(function(err) {
						if(err)
							{throw err;}
						return done(null, newUser);
					});
				}
			});
		});
	}));// end local-signup;
	
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, 
    function(req, email, password, done){
			User.findOne({email : email}, function(err, user){
				if (err) {
					return done(err);
				}
				if(!user) {
					return done(null, false, req.flash('loginMessage', 'No user found.'));
				}
				if (!user.validPassword(password)){
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
				}
				return done(null, user);
			});
	}));
			
		

	
	//		PASSPORT SETUP - SERIALIZE USER ONTO AND OFF OF SESSION


	

	
};//end module.exports
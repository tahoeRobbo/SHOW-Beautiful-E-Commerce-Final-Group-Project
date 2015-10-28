var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userCtrl = require('../controllers/userCtrl.js');

var Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
	
		email : {type: String, unique: true, lowercase: true, required : true},
		password : {type: String, required : true }
	
});//end userSchema



//	COMMENTED OUT WHILE FIGURING LOGIN
userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.genSalt(10, function(err, salt) {
		if(err) {return next(err);}
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) {return next(err);}
			else {
				user.password = hash;
				next();
			}
		});// end bcrypt.hash
	});//end bcrypt.genSalt
});//end userSchema.pre

//userSchema.path('email').validate(function(value, next) {
//	userCtrl.findUser(value, function(err, user) {
//		if(err) {
//			console.log(err, ' err from userShema.path');
//			return next(false);
//		}
//		next(!user);
//	});
//}, 'that email is already in use');

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};// end password check //userSchema.methods.validPassword

module.exports = mongoose.model('User', userSchema);

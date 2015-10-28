var cartCtrl = require('./apis/controllers/cartCtrl');
var orderCtrl = require('./apis/controllers/orderCtrl');
var productsCtrl = require('./apis/controllers/productsCtrl');
var userCtrl = require('./apis/controllers/userCtrl');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var User = require('./apis/models/userSchema');
var paypal = require('paypal-rest-sdk');
var AWS = require('aws-sdk');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var config = require('./apis/config/keys');
var mongoose = require('mongoose');



var auth = function(req, res, next) {
	if (!req.isAuthenticated()){
		res.send(401);}
	else {
		next();
	}
};// end auth middleware to limit route access



var app = express.Router();



exports.init = function(c){
	config = c;
	paypal.configure(c.api);
};

exports.app = function(app, passport){


function cart(req, res, next){
	if(!req.session.cart){
		req.session.cart = [];
		next();
	}
next();
}



app.use(session({
	secret: process.env.SESSION_SECRET || "WeAllRule!",
	resave: false,
	saveUninitialized: true, 
//	store : new MongoStore({
//		mongooseConnection : mongoose.connection
//	})	
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if(err) {return done(err); }
			if(!user) {
				return done(null, false, {message: 'Incorrect username.'});
			}
			if(!user.validPassword(password)) {
				return done(null, false, {message: 'Incorrect username.'});
			}
		return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
   done(null, user);
});
passport.deserializeUser(function(obj, done) {
   done(null, obj);
});

	//RH LOGIN ROUTES
	
//		ROUTES FOR REGISTRATION -- COMMENTED OUT BC THEY DON'T ALWAYS NEED TO BE PRESENT
//		CAN OPEN THEN FOR HER TO REGISTER THEN CLOSE THEM AGAIN
//	app.get('/api/register', function(req, res) {
//		res.render('register.ejs', {message : 				req.flash('signupMessage')});
//	});// end get registration page
//	
//		app.post('/api/register', userCtrl.createAdmin);
	
		app.get('/api/login', function(req, res) {
			res.render('login.ejs', {message : req.flash('loginMessage')});
	});
	
		app.post('/api/login', passport.authenticate('local-login', {
			successRedirect : '/#/admin/home',
			failureRedirect : '/api/login',
			failureFlash : true
		}));

		app.get('/api/logout', function(req, res){
		req.logout();
		res.redirect('/#/');
	});
	
	

	app.get('/api/admin/loggedin', userCtrl.checkLoggedIn);
	
	app.post('/api/upload', multipartMiddleware, productsCtrl.uploadPhoto);
	app.get('/api/upload', productsCtrl.addPicturesGet);
  app.post('/api/colorSize', productsCtrl.updateColorSize);
	// app.post('/api/upload', productsCtrl.uploadPhoto)

  // app.get('/api/products/image', productsCtrl.uploadImage)
	app.get('/api/products', productsCtrl.handleGetAll);
	app.get('/api/products/:productId', productsCtrl.handleGetOneProduct);
	app.post('/api/products', productsCtrl.handlePost);
	app.put('/api/products/:productId', productsCtrl.handlePut);
	app.put('/api/products', productsCtrl.decSize);
	app.delete('/api/products/:productId', productsCtrl.handleDelete);
  app.post('/api/products/colorSizeIndex', productsCtrl.findColorSizeIndex);
	app.put('/api/products/colorSizeIndex/:toDelete', productsCtrl.removeEmailsFromWaitlist);
 
  // app.get('/api/paypal/', orderCtrl.pmtExecute);
	app.post('/api/paypal', orderCtrl.pmtCreate);
	app.get('/api/paypal/success/:id', orderCtrl.successGet);
	app.delete('/api/user/cart', cart, cartCtrl.emptyCart);
	app.post('/api/user/cart', cart, cartCtrl.addProductToCart);
	app.get('/api/user/cart', cart, cartCtrl.getCart);
	app.put('/api/user/cart/:id', cart, cartCtrl.removeProductFromCart);

	app.post('/api/user/order', orderCtrl.createOrder);
	app.get('/api/admin/order/:id', orderCtrl.getOrder);
	app.put('/api/admin/order/:id', orderCtrl.updateOrder);
	app.put('/api/user/order/:id', orderCtrl.updateOrderByPaymentId);

	app.get('/api/admin/orders', orderCtrl.getAllOrders);
	
	//		PROTECTED ROUTES -- ANYTHING TO MODIFY PRODUCTS / VIEW ADMIN ORDERS 
//		**ORIGINAL, UNPROTECTED ROUTES LEFT IN FOR DEV PURPOSES
//		**UN COMMENT THESE ROUTES AND REMOVE THEIR UNPROTECTED PAIRS BEFORE RELEASE
//	app.post('/api/colorSize', auth, productsCtrl.updateColorSize)
	
//	app.post('/api/products', auth, productsCtrl.handlePost);
//	app.put('/api/products/:productId', auth, productsCtrl.handlePut);
//	app.put('/api/products', auth, productsCtrl.decSize);
//	app.delete('/api/products/:productId', auth, productsCtrl.handleDelete);
	
//	app.get('/api/admin/order/:id', auth, orderCtrl.getOrder);
	
//	app.get('/api/admin/orders', auth, orderCtrl.getAllOrders);
//	app.put('/api/admin/order/:id', auth, orderCtrl.updateOrder);

 

};// end routes.js


//					LEFT IN FOR REFERENCE RH
//	app.post('/api/register', passport.authenticate('local-signup', {
//		successRedirect : '/api/login',
//		failureRedirect : '/#/admin/home',
//		failureFlash : true
//	}));

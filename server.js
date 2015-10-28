'use strict';

var express = require('express');
var app = express();
var routes = require('./routes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var configDB = require('./apis/config/database.js');
var session = require('express-session');
var fs = require('fs');
var productsCtrl = require('./apis/controllers/productsCtrl');
var passport = require('passport');
var connectMongo = require('connect-mongo');
var flash = require('connect-flash');
var morgan = require('morgan');
var connectMongo = require('connect-mongo');
var flash = require('connect-flash');

var port = 1337;

mongoose.connect('mongodb://localhost:27017/groupProjectECommerce');
var MongoStore = connectMongo(session);

require('./apis/config/passport')(passport);



try {
  var configJSON = fs.readFileSync(__dirname + "/apis/config/config.json");
  var paypalConfig = JSON.parse(configJSON.toString());

} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
routes.init(paypalConfig);

app.set('view engine', 'ejs'); // for making the login and register pages

//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.use(flash());

//RH MOVING PASSPORT THINGS HERE

app.use(session({
	secret: "WeAllRule!",
	resave: false,
	saveUninitialized: true, 
	store : new MongoStore({
		mongooseConnection : mongoose.connection
	})	
}));
app.use(passport.initialize());
app.use(passport.session());


routes.app(app, passport);



app.listen(port, function(){
	console.log('now listening on port ' + port);
});
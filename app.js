'use strict';

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname));

var dbHost = process.env.DB_HOST || 'localhost';
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'mastercoders';

var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;

mongoose.connect(dbURL, function(res, err){
  if (err) {
    console.log("There is a problem connecting to the MongoDB");
  } else {
    console.log("Successfully Connected to the MongoDB");  }
});

app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: dbURL })
	})
);

app.get('/', function(req, res) {
  res.sendFile('./views/index.html');
});

require('./server/routes/loginRoutes')(app);
require('./server/routes/supplierRoutes')(app);
require('./server/routes/mailRoutes')(app);
require('./server/routes/drugRoutes')(app);
require('./server/routes/dispenseRoutes')(app);
require('./server/routes/requestRoutes')(app);
require('./server/routes/prescriptionRoutes')(app);

//server start
app.listen(app.get('port'), function(){
  console.log("Express Started on http://localhost:"+app.get('port')+ " press ctrl-c to terminate ");
});

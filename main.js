// Declaring the global variables
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var path = require('path');
var app = express();

// Setting the view with pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Adding a bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mongodb Connection points
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/INTERN_DB';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

// Index page routing
app.get('/', function(request, response) {
	response.render('index');
});

// Login page routing
app.get('/login', function(request, response) {
	response.render('login');
});

app.get('/signup', function(request, response) {
	response.render('signup');
});

// Listening to the port
app.listen(process.env.PORT || 3000);
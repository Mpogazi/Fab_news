// Declaring the global variables
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();


// For Sending requests
var request = require('request');

// Setting the view with pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Adding a bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serving resources from other different files
app.use('/controllers', express.static(__dirname + '/controllers'));


app.use(validator());

// Mongodb Connection points
var MONGOOSE_URI = "mongodb://localhost/INTERN_DB";
mongoose.connect(MONGOOSE_URI, function(error) {
	if(error)
		throw error;
	console.log("Successfully Connected");
});

// Index page routing
app.get('/', (request, response) => {
	response.render('index');
});

// Home after signup or login
app.get('/index.news', (req, response) => {
	
	// Requesting news from a site
	var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=87adc17a1e774a8eaa898dd1d49e5f30';

    request({
    	uri: url,
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 15
    }, function(err, res, body) {
    	if(err)
			response.send("Some issues Happened");
		response.send(body);
    });	
});

// Listening to the port
app.listen(process.env.PORT || 3000);

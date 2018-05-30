// Declaring the global variables
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var path = require('path');
var app = express();

// For Password Encryption
var bcrypt = require('bcrypt');
const saltRounds = 10;

// For Sending requests
var request = require('request');



// Models
const User = require('./models/user.js');
const Article = require('./models/news.js');

// Setting the view with pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Adding a bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
	response.render('login');
});

// Login page routing
app.get('/login', (request, response) => {
	response.render('login');
});

// Signup page routing
app.get('/signup', (request, response) => {
	response.render('signup');
});

app.get('/index', (req, res) => {
	res.render('index');
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


// Building post routes

// Post route for login
app.post('/login', (request, response) => {
	request.assert("email", "Please fill in a reasonable email").notEmpty();
	request.assert("password", "Please fill in a password").notEmpty().isLength(6);


	var errors = request.validationErrors();
	if(errors)
		return response.status(400).send(errors[0].msg);

	var email_in = request.body.email;
	var pass_in = request.body.password;


	// Finding the user in the database
	User.find({
		email: email_in,
	}, function(error, docs) {
		if(error)
			return response.send("Service Not Available\n");
		if(docs.length < 1)
			return response.send("Person is not Member\n");
		bcrypt.compare(pass_in, docs[0].password, function(err, resp) {
			if(resp)
				return response.send(docs[0]);
			response.send("Wrong Password or Username\n");
			//response.send("Wrong Password or Username\n");
		});
	});
});

// Post route for signup
app.post('/signup', (request, response) => {
	request.assert('username', 'Please add a username').notEmpty();
	request.assert('email', 'Please provide a serious email').isEmail();
	request.assert('password', 'Put a longer and reasonable password').notEmpty().isLength(6);

	// Checking for errors
	var errors = request.validationErrors();
	if(errors)
		return response.status(400).send(errors[0].msg);

	// Encrypting the password
	var salt = bcrypt.genSaltSync(saltRounds);
	var hashed_pass = bcrypt.hashSync(request.body.password, salt);

	new User({
		username: request.body.username,
		email: request.body.email,
		password: hashed_pass
	}).save(function(error){
		if(error)
			return response.status(500).send("The service is temporary not available\n");
		response.send("Successfully inside\n");
	});

});

// Listening to the port
app.listen(process.env.PORT || 3000);

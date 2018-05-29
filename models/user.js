const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username:{type:String, required:true},
	email:{type:String, required:true},
	password:{type:String}
});

var user = mongoose.model('user', userSchema);
module.exports = user;
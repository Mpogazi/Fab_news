const mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
	name:{type: String, required: true, unique: true},
	author:{type: String, required: true},
	description:{type: String, required: true, unique: true},
	url: {type: String, required: true},
	urlToImage: {type: String, required: true},
	publishedAt:{type: Date, required: true}
});





var article = mongoose.model('article', newsSchema);
module.exports = article;
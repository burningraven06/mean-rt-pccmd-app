const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
	drink: {
		type: String, 
		required: true
	},
	points: {
		type: Number,
		required: true
	},
	votingTime : {
		type : Date
	}
});

module.exports = mongoose.model('Drink', drinkSchema);
const express = require('express');
const drinkRouter = express.Router();
const pusher = require('pusher');
const mongoose = require('mongoose');

drinkRouter.get('/', (req, res, next) => {
	res.render('index.pug');
});

drinkRouter.post('/', (req, res, next) => {
	const favDrink = {
		drink: req.body.drink,
		points: 1
	};
	console.log(favDrink);

	res.status(200).json({ data : favDrink, success: true });
})

module.exports = drinkRouter;
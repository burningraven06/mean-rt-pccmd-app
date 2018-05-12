const express = require('express');
const pusher = require('pusher');
const mongoose = require('mongoose');
const DrinkObj = require('../models/drinkModel');
const drinkRouter = express.Router();

drinkRouter.get('/', (req, res, next) => {
	res.render('index.pug');
});

drinkRouter.post('/', (req, res, next) => {
	const favDrink = new DrinkObj({
		drink: req.body.drink,
		points: 1
	});

	favDrink.save()
	.then( result => {
		console.log('Drink Created in DB ', favDrink);
		res.status(200).json({ data : favDrink, success: true });
	})
	.catch( error => {
		console.log("DB Error: ", error);
		res.status(400).json({ error: error});
	})

	
})

module.exports = drinkRouter;
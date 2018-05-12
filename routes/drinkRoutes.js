const express = require('express');
const mongoose = require('mongoose');
const Drink = require('../models/drinkModel');
const drinkRouter = express.Router();
const environment_vars = require('dotenv').config();

const Pusher = require('pusher');

var pusher = new Pusher({
  appId: `${process.env.PUSHER_APPID}`,
  key: `${process.env.PUSHER_KEY}`,
  secret: `${process.env.PUSHER_SECRET}`,
  cluster: `${process.env.PUSHER_CLUSTER}`,
  encrypted: true
});

drinkRouter.get('/', (req, res, next) => {
	res.render('index.pug');
});

drinkRouter.get('/get-all', (req, res, next) => {
	Drink.find()
	.then( docs => {
		console.log("Fetching from MLAB: ...")
		res.status(200).json({ all_data: docs, success: true});
	})
	.catch( err => {
		console.log("DB Error: ", err);
		res.status(500).json({ error: err});
	})
})

drinkRouter.post('/', (req, res, next) => {
	const favDrink = new Drink({
		drink: req.body.drink,
		points: 1
	});

	favDrink.save()
	.then( result => {
		console.log('Drink Created in DB ', result);
		
		pusher.trigger('drink-voting-channel', 'drink-voting-event', {
			drink: result.drink,
			points: parseInt(result.points)
		});
		console.log("Triggered Pusher Event");

		res.status(200).json({ success: true, msg: "Thanks for voting" });
	})
	.catch( error => {
		console.log("DB Error: ", error);
		res.status(400).json({ error: error});
	})

	
})

module.exports = drinkRouter;
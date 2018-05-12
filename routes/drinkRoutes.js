const express = require('express');
const drinkRouter = express.Router();
const pusher = require('pusher');
const mongoose = require('mongoose');

drinkRouter.get('/', (req, res, next) => {
	res.render('index.pug');
});


module.exports = drinkRouter;
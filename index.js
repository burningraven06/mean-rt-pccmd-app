const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const drinkRouter = require('./routes/drinkRoutes');

//Initialize App
const app = express();

//enable cors
app.use(cors());

//Log using morgan
app.use(morgan('dev'));

//Use Bodyparser to grab Form Data
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Serve all Static Files
app.use('/assets', express.static('public'));

//setup view engine and set path for templates
app.set('view engine', 'pug');
app.set('views', path.join(__dirname + '/views'));

//render frontend file
app.use('/vote', drinkRouter);

//test setup
app.get('/test', (req, res, next) => {
	res.send("Hey");
})

//Make server listen to port
app.listen(port, () => console.log(`Backend Server running on: ${port}`));

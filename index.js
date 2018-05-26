const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const drinkRouter = require('./routes/drinkRoutes');
const environment_vars = require('dotenv').config();

const dbConnStr = `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds121960.mlab.com:21960/realtime-drink-voting-pusher-app`;

//Connect to MLAB DB
mongoose.connect(dbConnStr).then( () => {
	console.log("MLAB Connection OK");
})


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

//redirect all to vote route
app.get('*', (req, res, next) => {
	res.redirect("/vote");
});


//Make server listen to port
app.listen(port, () => console.log(`Backend Server running on: ${port}`));

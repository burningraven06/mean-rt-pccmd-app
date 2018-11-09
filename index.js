const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const drinkRouter = require('./routes/drinkRoutes');
const chatRouter = require('./routes/chatRoutes');
const aboutRouter = require('./routes/staticPageRoutes');
const KEYS = require("./config/keys");
const dbConnStr = KEYS.MLAB_DBURI;

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

//redirect home to vote url
app.get("/", (req, res, next) => {
	res.redirect("/vote");
});

//setup routers based on prefix
app.use('/vote', drinkRouter);
app.use('/chat', chatRouter);
app.use('/about', aboutRouter);

//redirect all to cust404 page
app.use('*', (req, res, next) => {
	var context = {
		requestURL : req.originalUrl.toString().substr(1)
	}
	res.render("pages/cust-404.pug", context);
});

//Make server listen to port
app.listen(port, () => console.log(`Server running on: ${port}`));

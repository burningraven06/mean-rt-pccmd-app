const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


//Initialize App
const app = express();

//enable cors
app.use(cors());

//Log using morgan
app.use(morgan('dev'));

//Use Bodyparser to grab Form Data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/test', (req, res, next) => {
	res.send("Hey");
})

//Make server listen to port
app.listen(port, () => console.log(`Backend Server running on: ${port}`));

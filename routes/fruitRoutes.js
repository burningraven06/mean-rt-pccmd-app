const express = require('express');
const fruitRouter = express.Router();

fruitRouter.get('/', (req, res, next) => {
	res.render('index.pug');
})

module.exports = fruitRouter;
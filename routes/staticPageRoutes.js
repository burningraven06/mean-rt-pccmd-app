const express = require('express');
const pageRouter = express.Router();

pageRouter.get("/", (req, res, next) => {
  res.render("pages/about.pug")
})

module.exports = pageRouter
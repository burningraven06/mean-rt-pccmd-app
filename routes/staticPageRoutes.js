const express = require('express');
const pageRouter = express.Router();

pageRouter.get("/", (req, res, next) => {
  res.send("About Here");
})

module.exports = pageRouter
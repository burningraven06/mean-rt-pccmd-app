const express = require('express');
const chatRouter = express.Router();
// const Pusher = require('pusher');
// const pusherInit = require("../config/pusherInit");

chatRouter.get("/", (req, res, next) => {
  res.send("Chat Here")
})

module.exports = chatRouter
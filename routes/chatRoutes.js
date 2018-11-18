const express = require('express');
const chatRouter = express.Router();
const Pusher = require('pusher');
const pusherInit = require("../config/pusherInit");

var pusher = new Pusher(pusherInit);

chatRouter.get("/", (req, res, next) => {

  res.render("chat/index.pug");
});

chatRouter.post("/", (req, res, next) => {
  let typedMsg = req.body.message;
  let username = req.body.username;

  pusher.trigger('chatting-channel', 'message-sending-event', {
    msg : typedMsg,
    uname : username
  });

  return res.status(200).json({ msg : typedMsg, uname : username});
})

module.exports = chatRouter
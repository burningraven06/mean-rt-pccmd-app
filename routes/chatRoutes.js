const express = require('express');
const chatRouter = express.Router();
const Pusher = require('pusher');
const pusherInit = require("../config/pusherInit");

var pusher = new Pusher(pusherInit);
var onlineUsers = [];


chatRouter.get("/", (req, res, next) => {

  pusher.trigger('chatting-channel', 'online-users-count-event', {
    users : onlineUsers
  });

  res.render("chat/index.pug");
});


chatRouter.post("/", (req, res, next) => {
  var typedMsg = req.body.message;
  var username = req.body.username;

  pusher.trigger('chatting-channel', 'message-sending-event', {
    uname : username,
    msg : typedMsg
  })

  return res.status(200).json({ msg : typedMsg});
})


chatRouter.post("/submitname", (req, res) => {
  var username = req.body.username;
  var userSocketId = Number(req.body.socketId);

  var newUser = {
    uname : username,
    socketId : userSocketId
  }

  //despite the check below, same socket users get pushed into array
  if (onlineUsers.length == 0){
    onlineUsers.push(newUser)
  } else {
    for (item in onlineUsers){
      if (onlineUsers[item].socketId !== newUser.socketId){
        onlineUsers.push(newUser)
      }
    }  
  }


  pusher.trigger('chatting-channel', 'username-sending-event', {
    uname : username,
    users : onlineUsers
  });

  return res.status(200).json({ users : onlineUsers});

});



module.exports = chatRouter
// create vars for dom elements
var chatForm = document.getElementById("chatForm");
var chatSubmitBtn = document.getElementById("chatSubmitBtn");
var userNameInput = document.getElementById("userNameInput");
var chatDiv = document.getElementById("chatOutputDiv");
var userNameSubmit = document.getElementById("userNameSubmit");
var onlineUsersSpan = document.getElementById("onlineUsersCount");





//create vars for ajax endpoints
var localHost_ChatURL = 'http://localhost:3000/chat';
var localHost_UserNameURL = 'http://localhost:3000/chat/submitname';

var hostname_backend_ChatURL = 'https://' + window.location.hostname + '/chat';
var hostname_backend_UserNameURL = 'https://' + window.location.hostname + '/chat/submitname';


var username = ""


//initalize pusher from header
var chatPusherInstance = new Pusher(pusherClientKey, pusherInitOptions);
var chattingChannel = chatPusherInstance.subscribe('chatting-channel');



// add / remove disabled class from send button
chatSubmitBtn.classList.add("disabled")




//listen for submit event
userNameSubmit.addEventListener("click", function(event){
  event.preventDefault()
  username = userNameInput.value;
  if (username.length > 0){
    chatSubmitBtn.classList.remove("disabled")
    sendUserName(username)
  } else {
    chatSubmitBtn.classList.add("disabled")
  }
})



//listen for submit event 
chatForm.addEventListener("submit", function(event){
  event.preventDefault();
  var userMessage = chatForm.message.value
  sendChatData(userMessage);
  return false;
})





// chatSubmitBtn.addEventListener("click", function(event){
//   event.preventDefault()
//   var userMessage = chatForm.message.value
//   var username = userNameInput.value
//   sendChatData(username, userMessage)
//   // console.log(userMessage, username)
// })





//send message via ajax
function sendChatData(umsg){
  var data = {
    username : username,
    message : umsg
  }
  var fetchOptions = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers( { 'Content-Type': 'application/json' })
	}

	fetch(localHost_ChatURL, fetchOptions)
  // fetch(hostname_backend_ChatURL, fetchOptions);
}




//send username 
function sendUserName(uname){
  var data = {
    username : uname,
    socketId : chatPusherInstance.connection.socket_id
  }
  var fetchOptions = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers( { 'Content-Type': 'application/json' })
	}

  fetch(localHost_UserNameURL, fetchOptions)
    // fetch(localHost_UserNameURL, fetchOptions);
}




//bind channel to events
function subscribeToChatEvent(){
  Pusher.logToConsole = false;
	chattingChannel.bind('message-sending-event', function(data){
    renderChatData(data);
    console.info("ALL TEST ", chatPusherInstance);
    
  });

  chattingChannel.bind('username-sending-event', function(data){
    renderUsersOnlineData(data)
  });

  chattingChannel.bind('online-users-count-event', function(data){
    renderUsersOnlineData(data)
  })
}





//render data in dom
function renderChatData(data){
  var thread = document.createElement("div");
  var h6Elem = document.createElement("h6");
  var unameSpan = document.createElement("span");
  var umsgPara = document.createElement("p");

  unameSpan.innerText = data.uname;
  unameSpan.classList.add("usernameSpan")
  h6Elem.appendChild(unameSpan)
  umsgPara.innerText = data.msg

  var currentDateTime = new Date()
  var timeSpanHTML = `[${currentDateTime.getHours()} : ${currentDateTime.getMinutes() } : ${currentDateTime.getSeconds()}] - `
  var timeTextNode = document.createTextNode(timeSpanHTML)
  umsgPara.prepend(timeTextNode)

  thread.classList.add('mt24')
  thread.appendChild(h6Elem);
  thread.appendChild(umsgPara);

  chatDiv.append(thread);
}





//show online users count
function renderUsersOnlineData(data){
  onlineUsersSpan.innerHTML = `${data.users.length} Users Online`
}

subscribeToChatEvent()

var chatForm = document.getElementById("chatForm");
var chatSubmitBtn = document.getElementById("chatSubmitBtn");
var userNameInput = document.getElementById("userNameInput");
var chatDiv = document.getElementById("chatOutputDiv");

var localHost_ChatURL = 'http://localhost:3000/chat';
var hostname_backend_ChatURL = 'https://' + window.location.hostname + '/chat';





chatSubmitBtn.classList.add("disabled")





userNameInput.addEventListener("keyup", function(event){
  var username = String(event.target.value);
  if (username.length > 0){
    chatSubmitBtn.classList.remove("disabled")
  } else {
    chatSubmitBtn.classList.add("disabled")
  }
})




chatForm.addEventListener("submit", function(event){
  event.preventDefault();
  var userMessage = chatForm.message.value
  var username = userNameInput.value
  sendChatData(username, userMessage);
  return false;
})





// chatSubmitBtn.addEventListener("click", function(event){
//   event.preventDefault()
//   var userMessage = chatForm.message.value
//   var username = userNameInput.value
//   sendChatData(username, userMessage)
//   // console.log(userMessage, username)
// })





function sendChatData(uname, umsg){
  var data = {
    message : umsg,
    username : uname
  }
  var fetchOptions = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers( { 'Content-Type': 'application/json' })
	}

	fetch(localHost_ChatURL, fetchOptions)
  // fetch(hostname_backend_ChatURL, fetchOptions);

}





function subscribeToChatEvent(){
  Pusher.logToConsole = false;
	var pusherInitOptions = {
		cluster: 'ap2',
		encrypted: true
	}

	var chatPusherInstance = new Pusher(pusherClientKey, pusherInitOptions);
	var chattingChannel = chatPusherInstance.subscribe('chatting-channel');
	chattingChannel.bind('message-sending-event', function(data){
    renderData(data)
  }); 
}





function renderData(data){
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


subscribeToChatEvent()

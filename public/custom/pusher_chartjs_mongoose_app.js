var drinkForm = document.getElementById('drinkForm');
var statusDiv = document.getElementById('statusDiv');


drinkForm.addEventListener('submit', function(event){
	event.preventDefault();
	console.log('Form Submission Prevented');

	let drinkChoice = document.querySelector("input[name='drink']:checked").value;
	if (drinkChoice){
		var str = `Woohoo ${drinkChoice}!`.split("");
		statusDiv.innerHTML = "";
		function animate() {
			str.length > 0 ? statusDiv.innerHTML += str.shift() : clearTimeout(running); 
  		var running = setTimeout(animate, 60);
		}
		animate();
		console.log("From Form Value ", drinkChoice);

		var backendURL = 'http://localhost:3000/vote';
		var host_backendURL = 'http://' + window.location.host + '/vote';
		var hostname_backendURL = 'http://' +window.location.hostname + '/vote';

		fetch(host_backendURL, {
			method: 'POST',
			body: JSON.stringify({ drink: drinkChoice }),
			headers: new Headers( { 'Content-Type': 'application/json' })
		})
		.then( res => res.json() )
		.then( data => {



			
			console.log("From Backend Server ", data);
		})
		.catch(err => {
			console.log("From Backend Server ",err);
		})

	} else {
		var str = "Please Select a drink!".split("");
		statusDiv.innerHTML = "";
		function animate() {
			str.length > 0 ? statusDiv.innerHTML += str.shift() : clearTimeout(running); 
  		var running = setTimeout(animate, 60);
		}
		animate();

	}
});
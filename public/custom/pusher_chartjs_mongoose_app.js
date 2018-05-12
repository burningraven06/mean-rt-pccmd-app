var drinkForm = document.getElementById('drinkForm');
var statusDiv = document.getElementById('statusDiv');


drinkForm.addEventListener('submit', function(event){
	event.preventDefault();
	console.log('prevented');

	let drink = document.querySelector("input[name='drink']:checked");
	if (drink){
		var str = `Woohoo ${drink.value}!`.split("");
		statusDiv.innerHTML = "";
		function animate() {
			str.length > 0 ? statusDiv.innerHTML += str.shift() : clearTimeout(running); 
  		var running = setTimeout(animate, 60);
		}
		animate();
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
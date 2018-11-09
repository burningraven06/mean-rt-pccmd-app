var drinkForm = document.getElementById('drinkForm');
var statusDiv = document.getElementById('statusDiv');
var chartDiv = document.getElementById('chartDiv');

//Retrieve Data from DB
function getData(){

	var localHostURL = 'http://localhost:3000/vote/get-all';
	var host_backendURL = 'https://' + window.location.host + '/vote/get-all';
	var hostname_backendURL = 'https://' + window.location.hostname + '/vote/get-all';

	fetch(localHostURL)
	// fetch(host_backendURL)
	.then( res => res.json() )
	.then (data => {

		var db_data = data.all_data;
		// var voteCountsObj = db_data.reduce(
		// 	(total, item) => (
		// 		(total[item.drink] = (total[item.drink] || 0) + parseInt(item.points)), total	)
		// 	, {});

		var voteCountsObj_v2 = db_data.reduce(
			function(obj, item){
				if (!obj[item.drink]) {
					obj[item.drink] = 0;
				}
				obj[item.drink] ++;
				return obj;
			}
		, {});

		// console.log(voteCountsObj_v2);

		let dataPointsArr = [
			{
				label: "Coffee",
				y: voteCountsObj_v2.Coffee
			},
			{
				label: "SparklingWater",
				y: voteCountsObj_v2.SparklingWater
			},
			{
				label: "IceTea",
				y: voteCountsObj_v2.IceTea
			},
			{
				label: "AppleJuice",
				y: voteCountsObj_v2.AppleJuice
			},
			{
				label: "Mojito",
				y: voteCountsObj_v2.Mojito
			},
			{
				label: "KiwiSmoothie",
				y: voteCountsObj_v2.KiwiSmoothie
			}
		];

		var chartJSOptions = {
			animationsEnabled: true,
			theme: 3,
			title: {
				title: `Drink Votes: ${data.all_data.length}`
			},
			data: [
				{
					type: 'column',
					dataPoints: dataPointsArr
				}
			]
		};

		var chart = new CanvasJS.Chart(chartDiv, chartJSOptions);

		chart.render();

		Pusher.logToConsole = false;
		var pusher = new Pusher('aa1a0eb59a4aaba1854c', {
			cluster: 'ap2',
			encrypted: true
		})

		var channel = pusher.subscribe('drink-voting-channel');
		channel.bind('drink-voting-event', function(data){
			dataPointsArr = dataPointsArr.map( item => {
				if (item.label == data.drink){
					item.y += data.points;
					return item;
				} else {
					return item;
				}
			});
			chart.render();
			// console.log("From Pusher ", data.drink);
		});

		// console.log("From MLAB ", data.all_data);
	})
	.catch( err => {
		console.log(err);
	})
}

getData();



//Form Submission, Save to DB,
drinkForm.addEventListener('submit', function(event){
	event.preventDefault();
	// console.log('Form Submission Prevented');

	let drinkChoice = document.querySelector("input[name='drink']:checked");
	if (drinkChoice){
		var str = `Woohoo ${drinkChoice.value}!`.split("");
		statusDiv.innerHTML = "";
		function animate() {
			str.length > 0 ? statusDiv.innerHTML += str.shift() : clearTimeout(running);
			var running = setTimeout(animate, 60);
		}
		animate();
		// console.log("From Form Value: ", drinkChoice.value);

		var backendURL = 'http://localhost:3000/vote';
		var host_backendURL = 'https://' + window.location.host + '/vote';
		var hostname_backendURL = 'https://' +window.location.hostname + '/vote';

		fetch(host_backendURL, {
			method: 'POST',
			body: JSON.stringify({ drink: drinkChoice.value }),
			headers: new Headers( { 'Content-Type': 'application/json' })
		})
		.then( res => res.json() )
		.then( data => {
			// console.log("From Backend Server ", data);
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

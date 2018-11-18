var drinkForm = document.getElementById('drinkForm');
var statusDiv = document.getElementById('statusDiv');
var chartDiv = document.getElementById('chartDiv');

var localHost_GetAllURL = 'http://localhost:3000/vote/get-all';
var hostname_backend_GetAllURL = 'https://' + window.location.hostname + '/vote/get-all';

var localhost_SubmitURL = "http://localhost:3000/vote";
var hostname_backend_SubmitURL = 'https://' + window.location.hostname + '/vote';



//Retrieve Data from DB
function getData(){

	fetch(localHost_GetAllURL)
	// fetch(host_backend_GetAllURL)
	.then( res => res.json() )
	.then( data => {

		var mongoDrinks = data.drinksData;
		var voteCountsObj = reduceAndCreateObj(mongoDrinks);
		var drinksDataPointsArr = createDataPoints(voteCountsObj);
		renderDrinksChart(drinksDataPointsArr);		
		setupPusherAndReRenderChart(drinksDataPointsArr);
		
	})
	.catch( err => {
		console.log(err);
	})
}

getData();





function reduceAndCreateObj(arrData){
	var beginWith = {}
	var finalResult = arrData.reduce( function(newObject, item){
			if (!newObject[item.drink]) {
				newObject[item.drink] = 0;
			} 
			newObject[item.drink] ++;
			return newObject;
		}, beginWith);

	return finalResult;
}




function createDataPoints(newDrinkObj){
	let dataPointsArr = [
		{
			label: "Coffee",
			y: newDrinkObj.Coffee
		},
		{
			label: "SparklingWater",
			y: newDrinkObj.SparklingWater
		},
		{
			label: "IceTea",
			y: newDrinkObj.IceTea
		},
		{
			label: "AppleJuice",
			y: newDrinkObj.AppleJuice
		},
		{
			label: "Mojito",
			y: newDrinkObj.Mojito
		},
		{
			label: "KiwiSmoothie",
			y: newDrinkObj.KiwiSmoothie
		}
	];
	return dataPointsArr;
}






function renderDrinksChart(dataDrinkPoints){
	var chartJSOptions = {
		animationsEnabled: true,
		theme: 3,
		data: [
			{
				type: 'column',
				dataPoints: dataDrinkPoints
			}
		]
	};

	var drinksChart = new CanvasJS.Chart(chartDiv, chartJSOptions);
	drinksChart.render();
}





function setupPusherAndReRenderChart(drinksArr){
	Pusher.logToConsole = false;
	var pusherInitOptions = {
		cluster: 'ap2',
		encrypted: true
	}

	var drinkPusherInstance = new Pusher(pusherClientKey, pusherInitOptions);
	var drinkChannel = drinkPusherInstance.subscribe('drink-voting-channel');
	drinkChannel.bind('drink-voting-event', function(data){
		drinksArr = drinksArr.map( item => {
			if (item.label == data.drink){
				item.y += data.points;
				return item;
			} else {
				return item;
			}
		});
		renderDrinksChart(drinksArr);
	});

}





//Form Submission, Save to DB,
drinkForm.addEventListener('submit', function(event){
	event.preventDefault();
	let drinkChoice = document.querySelector("input[name='drink']:checked");
	if (drinkChoice){
		animateAndSubmit(drinkChoice.value)
	} else {
		animateWarning()
	}
});





function animateAndSubmit(drinkChoice){
	animateSuccess(drinkChoice);
	var fetchOptions = {
		method: 'POST',
		body: JSON.stringify( { drink: drinkChoice }),
		headers: new Headers( { 'Content-Type': 'application/json' })
	}

	fetch(localhost_SubmitURL, fetchOptions)
	// fetch(host_backend_SubmitURL, fetchOptions);
}




function animateWarning(){
	var str = "Please Select a drink!".split("");
	statusDiv.innerHTML = "";
	function animate() {
		str.length > 0 ? statusDiv.innerHTML += str.shift() : clearTimeout(running);
		var running = setTimeout(animate, 60);
	}
	animate();
}





function animateSuccess(drinkChoice){
	var str = `Woohoo ${drinkChoice}!`.split("");
	statusDiv.innerHTML = "";
	function animate() {
		str.length > 0 ? statusDiv.innerHTML += str.shift() : clearTimeout(running);
		var running = setTimeout(animate, 60);
	}
	animate();
}

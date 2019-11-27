var dieOne = 0;
var dieTwo = 0;
var point = [false, 0,0,0];
const pointNumbers = [4,5,6,8,9,10];
const testRoll = [0,0,0,0,0,0,0,0,0,0,0,0,0];

var button = document.getElementById("sim");
var input = document.getElementById("rolls");
var ul = document.getElementById("results");

function rollDice() {
	let doWeShow = document.getElementById("showRolls").checked;
	for (let x = 0; x<testRoll[0]; x++) {
		let roll = 0;
		dieOne = Math.floor(Math.random() * 6) + 1;
		dieTwo = Math.floor(Math.random() * 6) + 1;
		roll = dieOne + dieTwo;
		testRoll[roll]++;
		if (doWeShow) {
			var weShow = document.createElement("li");
			weShow.appendChild(document.createTextNode(roll));
			ul.appendChild(weShow);
		}
		console.log(roll);
		if (point[0]) {
			if (roll === point[1]){
				point[2]++;
				point[0] = false;
				console.log("The point of " + point[1] + " was made!");
			} else if (roll === 7) {
				point[3]++;
				point[0] = false;
				console.log("Seven out.  The point of " + point[1] + " was lost.");
			}
		} else if (pointNumbers.includes(roll)) {
			point[0] = true;
			point[1] = roll;
			console.log("The point is " + point[1] + ".");
		}
	}
}

function createListElement(num, amt, perc) {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(num + " rolled " + amt + " times for " + perc.toFixed(2) + "% of rolls."));

	ul.appendChild(li);
}

function displayResults() {
	var pointInfo = document.createElement("li");

	for (let y = 2; y<13; y++) {
		createListElement(y, testRoll[y], ((testRoll[y]/testRoll[0]) * 100));
		//console.log(y, Number(((testRoll[y]/testRoll[0]) * 100).toFixed(2)) + "%");
	}
	
	pointInfo.appendChild(document.createTextNode("There were " + point[2] + " point(s) made and " + point[3] + " missed."));

	ul.appendChild(pointInfo);
}

function clearSim() {
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.childNodes[0]);
	}
	for (let z = 0; z < testRoll.length; z++) {
		testRoll[z] = 0;
		//if (ul.hasChildNodes()) {
		//	ul.removeChild(ul.childNodes[0]);
		//}
	}
	point = [false, 0,0,0];
}

function runSim() {
	clearSim();
	if (input.value.length > 0) {
		testRoll[0] = input.value;
		//console.log(testRoll[0]);

		rollDice();
		displayResults();
		
	}
}

button.addEventListener("click", runSim);
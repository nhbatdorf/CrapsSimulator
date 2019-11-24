var dieOne = 0;
var dieTwo = 0;
const testRoll = [0,0,0,0,0,0,0,0,0,0,0,0,0];

var button = document.getElementById("sim");
var input = document.getElementById("rolls");
var ul = document.getElementById("results");

function rollDice() {
	for (let x = 0; x<testRoll[0]; x++) {
		dieOne = Math.floor(Math.random() * 6) + 1;
		dieTwo = Math.floor(Math.random() * 6) + 1;
		testRoll[dieOne+dieTwo]++;
	}
}

function createListElement(num, amt, perc) {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(num + " rolled " + amt + " times for " + perc.toFixed(2) + "% of rolls."));

	ul.appendChild(li);
}

function displayResults() {
	for (let y = 2; y<13; y++) {
		createListElement(y, testRoll[y], ((testRoll[y]/testRoll[0]) * 100));
		//console.log(y, Number(((testRoll[y]/testRoll[0]) * 100).toFixed(2)) + "%");
	}
}

function clearSim() {
	for (let z = 0; z < testRoll.length; z++) {
		testRoll[z] = 0;
		if (ul.hasChildNodes()) {
			ul.removeChild(ul.childNodes[0]);
		}
	}
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
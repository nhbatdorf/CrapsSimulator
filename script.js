var dieOne = 0;
var dieTwo = 0;
var point = [false, 0,0,0];
const pointNumbers = [4,5,6,8,9,10];
const testRoll = [0,0,0,0,0,0,0,0,0,0,0,0,0];

const dieValue = [];
const rollList = [];

var button = document.getElementById("sim");
var input = document.getElementById("rolls");
var ul = document.getElementById("simRolls");

function setDice(one, two) {
	if (one > two) {
		return [two, one];
	} else {
		return [one, two];
	}
}

function rollDice() {
	for (let x = 0; x<testRoll[0]; x++) {
		let roll = 0;
		let pushToRollList = [];
		dieOne = Math.floor(Math.random() * 6) + 1;
		dieTwo = Math.floor(Math.random() * 6) + 1;
		roll = dieOne + dieTwo;
		pushToRollList = [dieOne, dieTwo];
		rollList.push(setDice(dieOne, dieTwo));
		testRoll[roll]++;
		
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
	//li.appendChild(document.createTextNode(num + " rolled " + amt + " times for " + perc.toFixed(2) + "% of rolls."));
	li.appendChild(document.createTextNode(num + " and " + amt + " = " + perc));


	ul.appendChild(li);
}

function displayResults() {
	var pointInfo = document.createElement("li");

	for (let y = 2; y<13; y++) {
		//createListElement(y, testRoll[y], ((testRoll[y]/testRoll[0]) * 100));
		console.log(y, Number(((testRoll[y]/testRoll[0]) * 100).toFixed(2)) + "%");
	}
	//pointInfo.appendChild(document.createTextNode("There were " + point[2] + " point(s) made and " + point[3] + " missed."));

	for (let x = 0; x<rollList.length; x++) {
		createListElement(rollList[x][0], rollList[x][1], (rollList[x][0] + rollList[x][1]));
		//pointInfo.appendChild(document.createTextNode(rollList[x]));
		ul.appendChild(pointInfo);
	}

	ul.appendChild(pointInfo);
}

function clearSim() {
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.childNodes[0]);
	}
	for (let z = 0; z < testRoll.length; z++) {
		testRoll[z] = 0;
		if (ul.hasChildNodes()) {
			ul.removeChild(ul.childNodes[0]);
		}
	}
	point = [false, 0,0,0];
}

function runSim() {
	if (input.value.length > 0) {
		testRoll[0] = input.value;

		rollDice();
		displayResults();
	}
}

button.addEventListener("click", runSim);

//////////////////////////////////////////////////////////////////////////////////////////

function clearDieSelector() {
	let firstDie = document.getElementById("selectOne");
	let secondDie = document.getElementById("selectTwo");

	firstDie.removeChild(firstDie.childNodes[0]);
	secondDie.removeChild(secondDie.childNodes[0]);
}

function imgSelector(die) {
	switch(die) {
		case "dieOne":
			return "One.gif";
		case "dieTwo":
			return "Two.gif";
		case "dieThree":
			return "Three.gif";
		case "dieFour":
			return "Four.gif";
		case "dieFive":
			return "Five.gif";
		case "dieSix":
			return "Six.gif";
	}
}

function valueSelector(value) {
	switch(value) {
		case "dieOne":
			return 1;
		case "dieTwo":
			return 2;
		case "dieThree":
			return 3;
		case "dieFour":
			return 4;
		case "dieFive":
			return 5;
		case "dieSix":
			return 6;
	}
}

function  dieSelect(die) {
	let firstDie = document.getElementById("selectOne");
	let secondDie = document.getElementById("selectTwo");
	let newDie = document.createElement("img");

	let rollLog = document.getElementById("rollLog");
	let list = document.createElement("li");
	let listFirst = document.createElement("img");
	let listSecond = document.createElement("img");

	let setDie = [];

	if (firstDie.hasChildNodes() && secondDie.hasChildNodes()) {
		clearDieSelector();
	}

	if (!(firstDie.hasChildNodes())) {
		newDie.setAttribute("src", imgSelector(die));
		firstDie.appendChild(newDie);
		dieValue.push(valueSelector(die));
	} else if (!(secondDie.hasChildNodes())) {
		newDie.setAttribute("src", imgSelector(die));
		secondDie.appendChild(newDie);
		listFirst.setAttribute("src", firstDie.childNodes[0].src);
		listFirst.setAttribute("width", "30");
		listFirst.setAttribute("length", "30");
		listSecond.setAttribute("src", secondDie.childNodes[0].src);
		listSecond.setAttribute("width", "30");
		listSecond.setAttribute("length", "30");
		list.appendChild(listFirst);
		list.appendChild(listSecond);
		rollLog.appendChild(list);
		dieValue.push(valueSelector(die));
		rollList.push(setDice(dieValue[0], dieValue[1]));
		console.log("roll", rollList);
		dieValue.length = 0;
	} 

}

function rollRemove() {
	let rollLog = document.getElementById("rollLog");
	rollLog.removeChild(rollLog.lastChild);
	rollList.pop();
	clearDieSelector();
}
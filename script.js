var dieOne = 0;
var dieTwo = 0;
var point = [false, 0,0,0];
const pointNumbers = [4,5,6,8,9,10];
const rollProb = [{
	value: [1,1], probability: (1/36), rolled: 0,},{
	value: [1,2], probability: (1/18), rolled: 0,},{
	value: [1,3], probability: (1/18), rolled: 0,},{
	value: [1,4], probability: (1/18), rolled: 0,},{
	value: [1,5], probability: (1/18), rolled: 0,},{
	value: [1,6], probability: (1/18), rolled: 0,},{
	value: [2,2], probability: (1/36), rolled: 0,},{
	value: [2,3], probability: (1/18), rolled: 0,},{
	value: [2,4], probability: (1/18), rolled: 0,},{
	value: [2,5], probability: (1/18), rolled: 0,},{
	value: [2,6], probability: (1/18), rolled: 0,},{
	value: [3,3], probability: (1/36), rolled: 0,},{
	value: [3,4], probability: (1/18), rolled: 0,},{
	value: [3,5], probability: (1/18), rolled: 0,},{
	value: [3,6], probability: (1/18), rolled: 0,},{
	value: [4,4], probability: (1/36), rolled: 0,},{
	value: [4,5], probability: (1/18), rolled: 0,},{
	value: [4,6], probability: (1/18), rolled: 0,},{
	value: [5,5], probability: (1/36), rolled: 0,},{
	value: [5,6], probability: (1/18), rolled: 0,},{
	value: [6,6], probability: (1/36), rolled: 0,}];

const dieValue = [];
const rollList = [];
const bets = [[]];

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

function rollDice(times) {
	let wonBet = document.createElement("li");

	for (let x = 0; x<times; x++) {
		let roll = 0;
		let pushToRollList = [];
		dieOne = Math.floor(Math.random() * 6) + 1;
		dieTwo = Math.floor(Math.random() * 6) + 1;
		roll = dieOne + dieTwo;
		pushToRollList = [dieOne, dieTwo];
		rollList.push(setDice(dieOne, dieTwo));
		postDieRoll(imgSelector(dieOne), imgSelector(dieTwo));

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

		for (let y = 0; y<bets.length; y++) {
			if ((bets[y][0] === rollList[rollList.length-1][0]) && (bets[y][1] === rollList[rollList.length-1][1])) {
					wonBet.appendChild(document.createTextNode("You won bet! " + bets[y][0] + bets[y][1]));
					ul.appendChild(wonBet);
			}
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

	//pointInfo.appendChild(document.createTextNode("There were " + point[2] + " point(s) made and " + point[3] + " missed."));

	for (let x = 0; x<rollList.length; x++) {
		//createListElement(rollList[x][0], rollList[x][1], (rollList[x][0] + rollList[x][1]));
	}

	pointInfo.appendChild(document.createTextNode("Simulated Rolls Added to List."));
	ul.appendChild(pointInfo);
}

function clearSim() {
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.childNodes[0]);
	}
	point = [false, 0,0,0];
}

function clearRolled() {
	for (let x = 0; x<rollProb.length; x++) {
		rollProb[x].rolled = 0;
	}
}

function compareProb() {
	var betInfo = document.createElement("li");

	bets.length = 0;
	for (let x = 0; x<rollList.length; x++) {
		for (let y = 0; y<rollProb.length; y++) {
			if ((rollList[x][0] === rollProb[y].value[0]) && (rollList[x][1] === rollProb[y].value[1])) {
				rollProb[y].rolled++;
			}
		}
	}

	for (let z = 0; z<rollProb.length; z++) {
		if (rollProb[z].probability > ((rollProb[z].rolled/rollList.length) + .02)) {
			betInfo.appendChild(document.createTextNode("Bet " + rollProb[z].value[0] + rollProb[z].value[1]));
			ul.appendChild(betInfo);
			bets.push(setDice(rollProb[z].value[0], rollProb[z].value[1]));
		}
	}
}

function runSim() {
	if (ul.hasChildNodes()){
		clearSim();
	}
	if (input.value.length > 0) {

		rollDice(input.value);
		displayResults();
		clearRolled();
		compareProb();
	}
}

button.addEventListener("click", runSim);

//////////////////////////////////////////////////////////////////////////////////////////

function clearDieSelector(first, second) {
	if (first.hasChildNodes() && second.hasChildNodes()) {
		first.removeChild(first.childNodes[0]);
		second.removeChild(second.childNodes[0]);
	}
}

function imgSelector(die) {
	switch(die) {
		case 1:
			return "One.gif";
		case 2:
			return "Two.gif";
		case 3:
			return "Three.gif";
		case 4:
			return "Four.gif";
		case 5:
			return "Five.gif";
		case 6:
			return "Six.gif";
	}
}

function postDieRoll(first, second) {
	let rollLog = document.getElementById("rollLog");
	let list = document.createElement("li");
	let listFirst = document.createElement("img");
	let listSecond = document.createElement("img");

	listFirst.setAttribute("src", first);
	listFirst.setAttribute("width", "30");
	listFirst.setAttribute("length", "30");
	listSecond.setAttribute("src", second);
	listSecond.setAttribute("width", "30");
	listSecond.setAttribute("length", "30");
	list.appendChild(listFirst);
	list.appendChild(listSecond);
	rollLog.appendChild(list);
}

function  dieSelect(die) {
	let firstDie = document.getElementById("selectOne");
	let secondDie = document.getElementById("selectTwo");
	let newDie = document.createElement("img");

	clearDieSelector(firstDie, secondDie);

	if (!(firstDie.hasChildNodes())) {
		newDie.setAttribute("src", imgSelector(die));
		firstDie.appendChild(newDie);
		dieValue.push(die);
	} else if (!(secondDie.hasChildNodes())) {
		newDie.setAttribute("src", imgSelector(die));
		secondDie.appendChild(newDie);
		postDieRoll(firstDie.childNodes[0].src, secondDie.childNodes[0].src);
		dieValue.push(die);
		rollList.push(setDice(dieValue[0], dieValue[1]));
		console.log("roll", rollList);
		dieValue.length = 0;
	} 

}

function rollRemove() {
	let rollLog = document.getElementById("rollLog");
	let firstDie = document.getElementById("selectOne");
	let secondDie = document.getElementById("selectTwo");

	if (firstDie.hasChildNodes() && !secondDie.hasChildNodes()) {
		firstDie.removeChild(firstDie.childNodes[0]);
		dieValue.pop();
	} else {
		rollLog.removeChild(rollLog.lastChild);
		rollList.pop();
		clearDieSelector(firstDie, secondDie);
	}
}
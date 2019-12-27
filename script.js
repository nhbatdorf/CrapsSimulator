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

var bank = 100;
var tally = false;

var simBut = document.getElementById("sim");
var betBut = document.getElementById("bet");
var logBut = document.getElementById("log");

var simulate = document.getElementById("simulate");
var makeBet = document.getElementById("betEnter");
var input = document.getElementById("rolls");
var ul = document.getElementById("simRolls");

function setDice(one, two) {
	if (one > two) {
		return [two, one];
	} else {
		return [one, two];
	}
}

function clearRollLog() {
	let rollLog = document.getElementById("rollLog");

	for (x=0; x<rollList.length; x++) {
		if (rollLog.hasChildNodes()) {
			rollLog.removeChild(rollLog.lastChild);
		}
	}
}

function postRollList() {
	let z=0

	if (rollList.length>36) {
		z = rollList.length - 36;
	} else {
		z = 0;
	}
	for (; z < rollList.length; z++) {
		postDieRoll(imgSelector(rollList[z][0]), imgSelector(rollList[z][1]), "rollLog");
	}
}

function rollDice(times) {
	let rollLog = document.getElementById("rollLog");
	let wonBet = document.createElement("li");

	for (let x = 0; x<times; x++) {
		let roll = 0;
		let pushToRollList = [];
		dieOne = Math.floor(Math.random() * 6) + 1;
		dieTwo = Math.floor(Math.random() * 6) + 1;
		roll = dieOne + dieTwo;
		pushToRollList = [dieOne, dieTwo];
		rollList.push(setDice(dieOne, dieTwo));

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

		if (tally) {
			bank = bank - bets.length;
			for (let y = 0; y<bets.length; y++) {
				if ((bets[y][0] === rollList[rollList.length-1][0]) && (bets[y][1] === rollList[rollList.length-1][1])) {
					for (let z = 0; z<rollProb.length; z++) {
						if ((rollProb[z].value[0] === bets[y][0]) && (rollProb[z].value[1] === bets[y][1])) {
							if (rollProb[z].probability === 1/36) {
								bank = bank + 30;
								wonBet.appendChild(document.createTextNode("You won $30 on " + bets[y][0] + bets[y][1] + "!"));
							} else {
								bank = bank + 15;
								wonBet.appendChild(document.createTextNode("You won $15 on " + bets[y][0] + bets[y][1] + "!"));
							}
							ul.appendChild(wonBet);
						}
					}
				}
			}
		}
	}
	console.log(bank);

	clearRollLog();
	postRollList();
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
	let z = 0;

	var betInfo = document.createElement("li");

	bets.length = 0;
	for (let x = 0; x<rollList.length; x++) {
		for (let y = 0; y<rollProb.length; y++) {
			if ((rollList[x][0] === rollProb[y].value[0]) && (rollList[x][1] === rollProb[y].value[1])) {
				rollProb[y].rolled++;
			}
		}
	}

	if (rollList.length >= 30) {
		z = 0;
	} else {
		z = rollProb.length;
	}
	for (; z<rollProb.length; z++) {
		if (rollProb[z].probability > ((rollProb[z].rolled/rollList.length) + .02)) {
			//betInfo.appendChild(document.createTextNode("Bet " + rollProb[z].value[0] + rollProb[z].value[1]));
			//ul.appendChild(betInfo);
			bets.push(setDice(rollProb[z].value[0], rollProb[z].value[1]));
			postDieRoll(imgSelector(rollProb[z].value[0]), imgSelector(rollProb[z].value[1]), "betLog");
		}
	}
}

function lockBets() {
	tally = true;
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

///////////////////////////////////////////////////////////////////////////////////

function activateDiv(div) {
	let sim = document.getElementById("simDiv");
	let bet = document.getElementById("betDiv");
	let log = document.getElementById("logDiv");

	if (div === 0) {
		sim.hidden = false;
		bet.hidden = true;
		log.hidden = true;
	} else if (div === 1) {
		sim.hidden = true;
		bet.hidden = false;
		log.hidden = true;
	} else if (div === 2) {
		sim.hidden = true;
		bet.hidden = true;
		log.hidden = false;
	}

}

simulate.addEventListener("click", runSim);
makeBet.addEventListener("click", lockBets);

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
			return "One.png";
		case 2:
			return "Two.png";
		case 3:
			return "Three.png";
		case 4:
			return "Four.png";
		case 5:
			return "Five.png";
		case 6:
			return "Six.png";
	}
}

function postDieRoll(first, second, log) {
	let display = document.getElementById(log);
	let list = document.createElement("li");
	let listFirst = document.createElement("img");
	let listSecond = document.createElement("img");

	listFirst.setAttribute("src", first);
	listFirst.setAttribute("height", "35vh");
	listSecond.setAttribute("src", second);
	listSecond.setAttribute("height", "35vh");
	list.appendChild(listFirst);
	list.appendChild(listSecond);
	display.appendChild(list);
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
		dieValue.push(die);
		rollList.push(setDice(dieValue[0], dieValue[1]));
		clearRollLog();
		postRollList();
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
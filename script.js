var dieOne = 0;
var dieTwo = 0;
const testRoll = [1000000,0,0,0,0,0,0,0,0,0,0,0,0];

//console.log(dieOne, dieTwo);
for (let x = 0; x<testRoll[0]; x++) {
	dieOne = Math.floor(Math.random() * 6) + 1;
	dieTwo = Math.floor(Math.random() * 6) + 1;
	testRoll[dieOne+dieTwo]++;
}

for (let y = 2; y<13; y++) {
	console.log(y, testRoll[y]/testRoll[0]);
}
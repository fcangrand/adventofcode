/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/

var fileName = process.argv[2];
var input = [];

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream(fileName),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  input.push(line);
});

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse(){
	let result = 0;
	for (let i=0; i < input.length; i++) {
		result += countNecessaryFuel(+input[i]);
	}
	console.log(result);
}


function countNecessaryFuel(mass) {
	let j = mass / 3;
	j = Math.floor(j);
	j = j - 2;
	if (j <= 0) {
		return 0;
	} else {
		return j + countNecessaryFuel(j);
	}
	
}
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
	//implement your code here using input array
	let result = 0;
	for (let i=0; i < input.length; i++) {
		let j = (+input[i]) / 3;
		console.log(j);
		j = Math.floor(j);
		console.log(j);
		j = j - 2;
		console.log(j);
		result += j ;
		
		
	}
	console.log(result);


}
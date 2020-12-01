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
	let length = input.length;
	for (let i=0; i < length - 1; i++) {
	    for (let j=i+1; j < length; j++) {
	       x = (+input[i]);
	       y = (+input[j]);
	       if (x + y === 2020) {
	        result = x * y;
	        break;
	       }
	    }
	}
	console.log(result);


}
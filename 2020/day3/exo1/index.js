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
  input.push(line.split(""));
});

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse() {
	//implement your code here using input array
	let result = 0;
	let posX = 0;
	const length = input.length;
	for (let posY=0; posY < length; posY++) {
	    const length_default = input[posY].length;

	    if (is_tree(posX % length_default, posY)) {
	        result++;
	    }
	    posX += 3;
	}
	console.log(result);
}

function is_tree(posX, posY) {
    return input[posY][posX] === '#'
}
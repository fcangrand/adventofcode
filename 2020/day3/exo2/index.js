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
    slope1 = get_trees_by_slope(1,1);
    slope2 = get_trees_by_slope(3,1);
    slope3 = get_trees_by_slope(5,1);
    slope4 = get_trees_by_slope(7,1);
    slope5 = get_trees_by_slope(1,2);

    console.log(slope1 * slope2 * slope3 * slope4 * slope5);
}


function get_trees_by_slope(slopeX, slopeY) {
    //implement your code here using input array
	let result = 0;
	let posX = 0;
	const length = input.length;
	for (let posY=0; posY < length; posY+=slopeY) {
	    const length_default = input[posY].length;
	    if (is_tree(posX % length_default, posY)) {
	        result++;
	    }
	    posX += slopeX;
	}
	return result;
}

function is_tree(posX, posY) {
    return input[posY][posX] === '#'
}
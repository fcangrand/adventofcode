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
  input.push(+line);
});

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse() {
    const res = calculate_adapters(input);
	console.log(res);
}

let nbOneJolt = 0;
let nbThreeJolt = 0;
function calculate_adapters(input) {
    input.push(0);
    input.sort((a,b) => a - b);
    input.push(input[input.length - 1] + 3);
    const length = input.length;

    for (i = 0; i < length - 1 ; i++) {
        const val = input[i + 1] - input[i];
        add_joltage(val);
    }

    return nbThreeJolt * nbOneJolt;
}

function add_joltage(val) {
    if (val === 1) {
        nbOneJolt++;
    } else if (val === 3){
        nbThreeJolt++;
    } else {
        console.log("error, " + i);
    }
}
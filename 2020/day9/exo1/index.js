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
    const res = find_intruder(input, 25);
	console.log(res);
}


function find_intruder(input, preamble) {
    const length = input.length;
    let res = 0;
    for (i = preamble; i < length; i++) {
        if (is_intruder(input[i], input.slice(i-preamble, i+preamble))) {
            res = input[i];
            break;
        }
    }
    return res;
}

function is_intruder(suspect, array) {
    const length = array.length;
    const already_match = [];
    for (let i = 0; i < length - 1; i++) {
        for (let j = i+1; j < length; j++ ) {
            if (suspect === array[j] + array[i]) {
                return false;
            }
        }
    }

    return true;
}
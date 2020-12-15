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
  input = line.split(',').map(b => +b);
});

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse() {

    const length = input.length;
    const max_length = 30000000;
    const all_values = {};
    for (let i =0; i<length - 1; i++) {
        all_values[input[i]] = i+1;
    }

    let nextVal = input[length - 1];
    for (let i = length; i<max_length; i++) {
        if (all_values[nextVal]) {
            val = i - all_values[nextVal];
            all_values[nextVal] = i;
            nextVal = val;
        } else {
            all_values[nextVal] = i;
            nextVal = 0;
        }

        if (i === max_length-1) {
            console.log(nextVal);
        }
    }
}

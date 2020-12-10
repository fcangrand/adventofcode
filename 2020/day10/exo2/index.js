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


function calculate_adapters(input) {
    input.push(0);
    input.sort((a,b) => a - b);
    const length = input.length;
    let can_be_removed = 1;
    let i = 0;
    while (i < length) {
        let j = i;

        while (j != length -1 && input[j+1] - input[j] === 1) {
            j++;
        }

        if (i !== j) {
            const nb_min = Math.max(0, (j - i - 3));
            can_be_removed *= (Math.pow(2, j - i - 1) - nb_min);
        }

        i = j+1;
    }

    return can_be_removed;
}

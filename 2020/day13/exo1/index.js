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

function ContestResponse() {
    const arrived_time = +(input[0]);
    const all_bus = input[1].split(',');
    const removed_x = all_bus.filter(b => b != 'x').map(b => +b);
    let match_minutes = 0;
    let waiting = 0;
    while (!match_minutes) {
        match_minutes = removed_x.filter(bus => (arrived_time + waiting) % bus === 0)[0];

        if (!match_minutes) {
            waiting++;
        }
    }
	console.log(match_minutes * waiting);
}


 (new_index + i + 1) % b === 0)


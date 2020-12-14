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
    const all_bus = input[1].split(',');
    let max_bus = 0;
    const check_bus = {};

    for (let i=0; i<all_bus.length; i++) {
        const bus = all_bus[i];
        if (bus !== 'x') {
            check_bus[bus] = i;
            max_bus = Math.max(max_bus, bus);
        }
    }

    let index = 0;
    let new_index;
    let match = false;
    while (!match) {
        match = true;
        index++;
        new_index = (max_bus * index) - check_bus[max_bus];
        for (let bus in check_bus) {
            if((new_index + check_bus[bus]) % bus != 0) {
                match = false;
                break;
            }
        }
    }


    console.log(new_index);
}





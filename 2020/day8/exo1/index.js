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
    const res = calculate_acc(input);
	console.log(res);
}


function calculate_acc(input) {
    let acc = 0;
    const visited = [];
    let i = 0;

    while (!visited.includes(i)) {
        visited.push(i);
        const line = input[i].split(" ");
        const instr = line[0];
        switch(instr) {
            case "nop":
                i+= 1;
                break;
            case "acc":
                acc = calculate(acc, line[1]);
                i++;
                break;
            case "jmp":
                i = calculate(i, line[1]);
                break;
            }
         }
         return acc;
    }


function calculate(previous, operation) {
    const operator = operation[0];
    const val = parseInt(operation.substring(1));
    if (operator === '-') {
        previous -= val;
    } else {
        previous += val;
    }
    return previous;
}
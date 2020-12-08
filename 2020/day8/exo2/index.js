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

let modified_index = 0;
function ContestResponse() {
    let res = program_exit_ok(input);
    while (!res) {
        res = program_exit_ok(modify_input(input));
    }

	console.log(res);
}


function modify_input(input) {
    const copy_input = [...input];
    for (i = modified_index; i < input.length; i++) {
        const line = input[i].split(" ");
        const instr = line[0];
        if (instr == "nop") {
          // Voir regles pour ne pas remplacer (genre +0 ca ne sert à rien de tester)
          copy_input[i] = copy_input[i].replace("nop", "jmp");
          modified_index = i+1;
          break;
        } else if (instr === "jmp") {
          // Voir regles pour ne pas remplacer
          copy_input[i] = copy_input[i].replace("jmp", "nop");
          modified_index = i+1;
          break;
        }
    }

    // Si on est stuck sur le dernier
    if (i === modified_index) {
        modified_index+=1;
    }
    return copy_input;
}


function program_exit_ok(input) {
    let acc = 0;
    const visited = [];
    let i = 0;

    while (!visited.includes(i) && i != input.length) {
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

     if (visited.includes(i)) {
        return 0;
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
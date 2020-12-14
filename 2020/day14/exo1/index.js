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

    const length = input.length;
    const json_memory = {};
    let mask;
    for (let i = 0; i<length; i++) {
        const splitted = input[i].split(" = ");
        if (splitted[0] === "mask") {
            mask = splitted[1];
        } else {
            let memory = splitted[0].match(/mem\[([0-9]*)\]/)[1];
            const val = +(splitted[1]);
            json_memory[memory] = val_after_mask(val, mask);
        }
    }

    console.log(Object.keys(json_memory).reduce(
        (acc, k) => acc + json_memory[k] , 0)
    );


}

function val_after_mask(val, mask) {
    let val_binary = '' + pad(dec2bin(val), 36);
    let new_val = [];
    for (let i =0; i<36; i++) {
        if (mask[i] !== 'X') {
            new_val[i] = mask[i];
        } else {
            new_val[i] = val_binary[i];
        }
    }
    return parseInt(new_val.join(""), 2);
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

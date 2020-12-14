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
    let nb_of_x = 0;
    let all_replacements = [];
    for (let i = 0; i<length; i++) {
        const splitted = input[i].split(" = ");
        if (splitted[0] === "mask") {
            mask = splitted[1];
            all_replacements = get_all_replacements(mask);
        } else {
            const val = +(splitted[1]);
            const index_memory = splitted[0].match(/mem\[([0-9]*)\]/)[1];

            const string_with_X = val_after_mask(index_memory, mask);
            for (let j=0; j<all_replacements.length; j++) {
                let copy = [...string_with_X];
                let memory = replace_x(copy, all_replacements[j]);
                json_memory[memory] = val;
            }
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
        if (mask[i] !== '0') {
            new_val[i] = mask[i];
        } else {
            new_val[i] = val_binary[i];
        }
    }
    return new_val;
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

function get_all_replacements(mask) {
    const replacements = [];
    const nb_of_x = (mask.match(/X/g) || []).length;
    const nb_of_replacements = Math.pow(2, nb_of_x);

    for (let i=0; i<nb_of_replacements;i++) {
        replacements.push(pad(dec2bin(i), nb_of_x));
    }

    return replacements;
}

function replace_x(val, replacements) {
    let i = 0;
    for (let j=0; j<val.length; j++) {
        if (val[j] === 'X') {
            val[j] = replacements[i];
            i++;
        }
    }
    return parseInt(val.join(""), 2);
}
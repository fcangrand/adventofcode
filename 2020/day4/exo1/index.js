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
	let result = 0;
	const length = input.length;
	let i = 0;
	while (i < length) {
	    // Read new password informations
	    let j = i;
	    while(input[j] && j<length) {
	        j++;
	    }
        passport = input.slice(i,j).join(" ");
        if (is_passport_valid(passport)) {
            result++;
        }

	    i = ++j;
	}
	console.log(result);
}

function is_passport_valid(str_passport) {
    let is_valid = true;
    const all_valid_prefix = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "cid", "hgt"];
    const arr_passport = str_passport.split(" ");

    arr_passport.map(word => {
        const splited_word = word.split(":");
        const key = splited_word[0];
        const index = all_valid_prefix.indexOf(key);
        if (index < 0) {
            is_valid = false;
        } else {
            all_valid_prefix.splice(index, 1);
        }
    });

    if (all_valid_prefix.length > 1 || (all_valid_prefix.length === 1 && all_valid_prefix[0] !== "cid" )) {
        is_valid = false;
    }

    return is_valid;
}



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
    const valid_prefix = [
        ["ecl", validate_ecl],
        ["pid", validate_pid],
        ["eyr", validate_eyr],
        ["hcl", validate_hcl],
        ["byr", validate_byr],
        ["iyr", validate_iyr],
        ["cid", validate_cid],
        ["hgt", validate_hgt]];

	let result = 0;
	const length = input.length;
	let i = 0;
	while (i < length) {
	    // Read new password informations
	    let j = i;
	    while(input[j] && j<length) {
	        j++;
	    }
        password = input.slice(i,j).join(" ");
        if (is_password_valid(valid_prefix, password)) {
            result++;
        }

	    i = ++j;
	}
	console.log(result);
}

function is_password_valid(valid_prefix, str_password) {
    const arr_password = str_password.split(" ");
    const verified_prefix = [];

    arr_password.map(word => {
        const splited_word = word.split(":");
        const key = splited_word[0];
        prefix_to_valid = valid_prefix.find(v => v[0] === key);
        // If bad prefix in passport, (not sure possible)
        if (!prefix_to_valid) {
            return false;
        }
        // Call prefix validator
        if (!prefix_to_valid[1](splited_word[1])) {
            return false;
        }
        verified_prefix.push(key);
    });

    // Keep cid optional
    if ((verified_prefix.length != valid_prefix.length) ||
        (verified_prefix.length === valid_prefix.length && valid_prefix[0][0] !== "cid" )) {
        is_valid = false;
    }

    return (verified_prefix.length === valid_prefix.length) ||
           (verified_prefix.length === valid_prefix.length - 1 && !verified_prefix.includes("cid"));
}


// Validators
function validate_byr(string) {
    return validate_number_between(string, 1920, 2002);
}

function validate_iyr(string) {
    return validate_number_between(string, 2010, 2020);
}

function validate_eyr(string) {
    return validate_number_between(string, 2020, 2030);
}

function validate_hgt(string) {
    return validate_hgt_suffix(string, "cm", 150, 193) || validate_hgt_suffix(string, "in", 59, 76);
}

function validate_hgt_suffix(string, suffix, min, max) {
    if (!string.endsWith(suffix)) {
        return false;
    }
    string = string.substring(0, string.length - 2);
    return validate_number_between(string, min, max);
}

function validate_hcl(string) {
    if (string[0] !== "#") {
        return false;
    }
    string = string.substring(1);
    const regex = /[0-9a-f]/g;
    return string.match(regex)
}

function validate_ecl(string) {
    const valid_ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return valid_ecl.includes(string);
}

function validate_pid(string) {
    number = parseInt(string);
    return string.length === 9 && parseInt(string);
}

function validate_cid(string) {
    return true;
}

function validate_number_between(string, min, max) {
    number = parseInt(string);
    return number && number >= min && number <= max;
}

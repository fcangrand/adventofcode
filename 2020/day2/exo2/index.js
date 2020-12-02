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
	//implement your code here using input array
	let result = 0;
	let length = input.length;
	for (let i=0; i < length; i++) {
        splitted_line = input[i].split(" ");

        const char_to_check = splitted_line[1].split(':')[0];
        const password = splitted_line[2];
        const pos = splitted_line[0];
        const min_pos= (+pos.split('-')[0]) - 1;
        const max_pos= (+pos.split('-')[1]) - 1;

        first_pos = (password[min_pos] === char_to_check);
        second_pos = (password[max_pos] === char_to_check);

        if ((first_pos || second_pos) && !(first_pos && second_pos) ) {
            result++;
        }
	}
	console.log(result);

}

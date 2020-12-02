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
	for (let i=0; i < length - 1; i++) {
        splitted_line = input[i].split(" ");

        const char_to_check = splitted_line[1].split(':')[0];
        const password = splitted_line[2];
        const nb_chars = splitted_line[0];
        const min_nb_chars= (+nb_chars.split('-')[0]);
        const max_nb_chars= (+nb_chars.split('-')[1]);

        const occurs = get_all_chars_in_word(password);
        const char_occurs = occurs[char_to_check];

        if (min_nb_chars <= char_occurs && char_occurs <= max_nb_chars) {
            result++;
        }
	}
	console.log(result);

}

function get_all_chars_in_word(word) {
    const occurs = {};
    for (var i = 0; i < word.length; i++) {
      const char = word[i];
      occurs[char] = occurs[char] ? occurs[char] + 1 : 1;
    }
    return occurs;
}
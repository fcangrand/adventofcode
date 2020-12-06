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
  input.push(line.split(""));
});

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse() {
	const all_answers_by_group = [];
	const length = input.length;

	let group_answers = {};
	let nb = 0;
	for (let i=0; i<length + 1; i++) {
		if (i === length || !input[i].length) {
			const every_group_answers = [];
			for (const key in group_answers) {
				if (group_answers[key] === nb) {
					every_group_answers.push(key);
				}
			}
			all_answers_by_group.push(every_group_answers);
			group_answers = {};
			nb = 0;
			continue;
		}
		
		input[i].map(q => {
			if (!group_answers[q]) {
				group_answers[q] = 1;
			} else {
				group_answers[q]++;
			}
		});	
		nb++;
	}
	
		
	const reducer = (accumulator, currentValue) => accumulator + currentValue.length;
	console.log(all_answers_by_group.reduce(reducer, 0));
}




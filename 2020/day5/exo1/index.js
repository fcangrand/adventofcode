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
	const all_boarding_pass = [];
	const length = input.length;

	for (let i=0; i<length; i++) {
		let rowMin = 0;
		let rowMax = 127;
		const pass = input[i];
		
		for (let j=0; j<7; j++) {
			let newRow = (rowMax - rowMin + 1)/ 2 ;
			const letter = pass[j];
			if (pass[j] === 'F') {
				rowMax -= newRow
			} else {
				rowMin += newRow
			}
		}


		let columnMin = 0;
		let columnMax = 7;
		for (let k=7; k<10; k++) {
			let newColumn = (columnMax - columnMin + 1)/ 2 ;
			const letter = pass[k];
			if (pass[k] === 'L') {
				columnMax -= newColumn
			} else {
				columnMin += newColumn
			}
		}
	
		all_boarding_pass.push(rowMin*8 + columnMin);
	}
	
	all_boarding_pass.sort(function(a, b) {
	  return a - b;
	});
	
	console.log(all_boarding_pass[length - 1]);
}




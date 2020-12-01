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

function ContestResponse(){
	//implement your code here using input array
	let result = 0;
	const tab = input[0].split(',').map(x => +x);
	// Replace existing values
	tab[1] = 12;
	tab[2] = 2;
	
	let i=0;
	while (i < tab.length) {
		if (tab[i] === 99) {
			break;
		}
		else if (tab[i] === 1) {
			const pos = tab[i+3];
			const val = tab[tab[i+1]] + tab[tab[i+2]];
			tab[pos] = +val;
			i += 4;
		} 
		else if (tab[i] === 2) {
			const pos = tab[i+3];
			const val = tab[tab[i+1]] * tab[tab[i+2]];
			tab[pos] = +val;
			i += 4;
		}
		else {
			console.error("Something went wrong :( at position: ", i);
			console.error("With value ", tab[i]);
			break;
		}	
	}
	console.log(tab[0]);
}
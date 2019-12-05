const fileName = process.argv[2];
const input = [];

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
  const tab = input[0].split(',').map(x => +x);
  const result = calculateIntCode(tab, 1);
  	

  console.log(result);
}

function calculateIntCode(tab, p_input) {
	// Replace existing values
	let input = p_input;
	const output = [];
	let i=0;
	while (i < tab.length) {
		if (tab[i] === 99) {
			break;
		}
		if (tab[i] === 3) {
			const pos = tab[i+1];
			tab[pos] =input;
			i += 2;
		} else if (tab[i] === 4) {
			const pos = tab[i+1];
			console.log(tab[pos]);
			output.push(tab[pos]);
			i += 2;
		} else {
			const sNumber = tab[i].toString();
			
			if (tab[i] === 1) {
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
	}
	return tab[0];
}

const fileName = process.argv[2];
const inputNumber = +process.argv[3];
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
  
  const result = calculateIntCode(tab, inputNumber);
  	
  console.log('sortie', result);
}

function calculateIntCode(tab, p_input) {
	// Replace existing values
	let input = p_input;
	const output = [];
	let i=0;
	let lastInstructionWasOutput = false;
	while (i < tab.length) {
		let sNumber = tab[i].toString();
		if (sNumber.length === 1) {
			sNumber = '0' + sNumber;
		}
		const l = sNumber.length;
		const opcode = sNumber.substring(l-2, l);
		const arr = sNumber.split("").reverse().splice(2);
		
		if (tab[i] === 99) {
			console.log('break ', lastInstructionWasOutput);
			break;
		}
		if (opcode === '03') {
			const pos = tab[i+1];
			tab[pos] = input;
			i += 2;
			lastInstructionWasOutput = false;
		} else if (opcode === '04') {
			const pos = tab[i+1];
			const a = arr[0] === '1' ? pos : tab[pos];
			output.push(+a);
			i += 2;
			lastInstructionWasOutput = true;
		} else if (opcode === '01') {
			const pos = tab[i+3];
			const a = arr[0] === '1' ? tab[i+1] : tab[tab[i+1]];
			const b = arr[1] === '1' ? tab[i+2] : tab[tab[i+2]];
			const val = a + b;
			tab[pos] = +val;
			i += 4;
			lastInstructionWasOutput = false;
		} 
		else if (opcode === '02') {
			const pos = tab[i+3];
			const a = arr[0] === '1' ? tab[i+1] : tab[tab[i+1]];
			const b = arr[1] === '1' ? tab[i+2] : tab[tab[i+2]];				
			const val = a * b;
			tab[pos] = +val;
			i += 4;
			lastInstructionWasOutput = false;
		}
		else if (opcode === '05') {
			const a = arr[0] === '1' ? tab[i+1] : tab[tab[i+1]];
			const b = arr[1] === '1' ? tab[i+2] : tab[tab[i+2]];				
			if (a !== 0) {
			  i = b;	
			} else {
			  i += 3;	
			}
			lastInstructionWasOutput = false;
		}
		else if (opcode === '06') {
			const a = arr[0] === '1' ? tab[i+1] : tab[tab[i+1]];
			const b = arr[1] === '1' ? tab[i+2] : tab[tab[i+2]];				
			if (a === 0) {
			  i = b;	
			} else {
			  i += 3;	
			}
			lastInstructionWasOutput = false;
		}
		else if (opcode === '07') {
			const pos = tab[i+3];
			const a = arr[0] === '1' ? tab[i+1] : tab[tab[i+1]];
			const b = arr[1] === '1' ? tab[i+2] : tab[tab[i+2]];
			tab[pos] = a < b ? 1 : 0;
			i += 4;
			lastInstructionWasOutput = false;
		}
		else if (opcode === '08') {
			const pos = tab[i+3];
			const a = arr[0] === '1' ? tab[i+1] : tab[tab[i+1]];
			const b = arr[1] === '1' ? tab[i+2] : tab[tab[i+2]];				
			tab[pos] = a === b ? 1 : 0;
			i += 4;
			lastInstructionWasOutput = false;
		}
		else {
			console.error("Something went wrong :( at position: ", i);
			console.error("With value ", tab[i]);
			break;
		}	
	}
	
	return output;
	
	
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

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
	const segment = input[0].split('-').map(x=> +x);
	const result = [];
	let toTest = segment[0];
	const max = segment[1];
	
	
	// méthode brute
	for (let i = toTest; i <= max; i++) {
		const sNumber = i.toString();
		const numbArray = [];
		let atLeastTwoDigitsFollow = false;
		for (let j = 0, len = sNumber.length; j < len; j ++) {
			numbArray.push(+sNumber.charAt(j));
			if (!atLeastTwoDigitsFollow && j != 0 && sNumber.charAt(j) === sNumber.charAt(j-1)) {
				atLeastTwoDigitsFollow = true;
			}
		}	
		if (isNumberAlwaysIncrease(numbArray) && atLeastTwoDigitsFollow) {
			result.push(i);
		}	
	}

	console.log(result.length);

}


function isNumberAlwaysIncrease(array) {
	return array.every((val, i, arr) => i === 0 || (val >= arr[i - 1]));
}





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
    const tab = input[0].split('').map(x => +x);
	let length = tab.length;
	const tailleImage = 150;
	let nbMinZero = tailleImage + 1;
	let result = 0;
	while (length > 0) {
		const subTab = tab.splice(0, tailleImage);
		const allCounts = getAllOccurrence(subTab, [0,1,2]);
		if (allCounts[0] < nbMinZero) {
			nbMinZero = allCounts[0];
			result = allCounts[1] * allCounts[2];
		}
		length = length - tailleImage;
	}
	
	
	
	
    console.log('sortie ', result);
}

function getAllOccurrence(array, values) {
    const count = {};
	values.forEach((v) => count[v] = 0);
    array.forEach((v) => {
		if (values.includes(v)) {
			count[v] += 1;
		}
	
	});
    return count;
}



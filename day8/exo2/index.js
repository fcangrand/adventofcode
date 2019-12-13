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
	const wide = process.argv[3];
	const tall = process.argv[4];
	const tailleImage = wide*tall;
	const allLayers = [];
	let result = [];
	
	while (length > 0) {
		const subTab = tab.splice(0, tailleImage);
		allLayers.push(subTab);
		length = length - tailleImage;
	}
	
	for (let i = 0; i < tailleImage; i++) {
		let pixel = 2;
		let j = 0;
		while (pixel === 2 && j < allLayers.length) {
			pixel = allLayers[j][i];
			j+=1;
		}
		result.push(pixel);		
	}
	
	let string = '';
	let k = 0;
	// Affichage Message
	for (let i =0; i <tall; i++) {
		for (let j =0; j < wide; j++) {
			if (result[k] === 0) {
				string = string + ' ';
			} else {
				string = string + '#';
			}
			k++;
		}
		string = string + '\n';
	}
	
    console.log(string);
}



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

let sumDepth = 0;
function ContestResponse() {
  const allNodes = {};	
  // Regroup father with children
  input.forEach((line) => {
	 const arr = line.split(')');
	 const father = arr[0];
	 const child = arr[1];	 
	 if (!allNodes[father]) {
		 allNodes[father] = [];
	 }
	 if (!allNodes[child]) {
		 allNodes[child] = [];
	 }
	 allNodes[father].push(child);
  });
 
  ajoutProfondeur(allNodes['COM'], 1, allNodes);
  console.log(sumDepth);
}

function ajoutProfondeur(children, depth, allNodes) {
	children.forEach((child) => {
		sumDepth += depth;
		ajoutProfondeur(allNodes[child], depth + 1, allNodes);
	});
}


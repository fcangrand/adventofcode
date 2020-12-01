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
	 allNodes[child].push(father);
  });
 
  // ajoutProfondeur(allNodes['COM'], 1, allNodes);
  const cheminYou = cheminParent('YOU', allNodes);
  const cheminSan = cheminParent('SAN', allNodes);

  let i = 0;
  while(cheminYou[i] === cheminSan[i]) {
	  i++;
  }
  
  const nbYouRestant = cheminYou.length - i;
  const nbSanRestant = cheminSan.length - i;
  
  console.log(nbYouRestant + nbSanRestant);
}

function ajoutProfondeur(children, depth, allNodes) {
	children.forEach((child) => {
		sumDepth += depth;
		ajoutProfondeur(allNodes[child], depth + 1, allNodes);
	});
}

function cheminParent(feuille, allNodes) {
	const result = [];
	let node = feuille;
	while (node) {
		node = allNodes[node][0];	
		if (node) {
			result.push(node);
		}
	}
	return result.reverse();
}

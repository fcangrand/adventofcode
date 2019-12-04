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

function ContestResponse(){
	const path1 = input[0].split(',');
	const path2 = input[1].split(',');
	
	const allNodesFirst = constructionChemin(path1);
	const allNodesSecond = constructionChemin(path2);
	let intersection = allNodesFirst.filter(node1 => {
		return allNodesSecond.some(node2 => (node1.x === node2.x && node1.y == node2.y));
	});
	const allDistancesIfNegative = intersection.map(node => Math.abs(node.x) + Math.abs(node.y));
	allDistancesIfNegative.sort((a,b) => a - b);
	console.log(allDistancesIfNegative);	
}


function constructionChemin(path) {
	const length = path.length;
	const allNodes = [{x: 0, y: 0, step: 0}];
	let previous = {x: 0, y: 0};
	for (let i=0;i<length;i++) {
		const move = path[i];
		const direction = move.substring(0,1);
		const nbNodes = +(move.substring(1, move.length));
		
		if(direction === 'R') {
			for(let j=0; j<nbNodes; j++) {
				previous.x += 1;
				previous.step += 1;
				allNodes.push(Object.assign({}, previous));				
			}
		}
		else if(direction === 'U') {
			for(let j=0; j<nbNodes; j++) {
				previous.y++;
				previous.step += 1;
				allNodes.push(Object.assign({}, previous));				
			}
		}
		else if(direction === 'L') {
			for(let j=0; j<nbNodes; j++) {
				previous.x--;
				previous.step += 1;
				allNodes.push(Object.assign({}, previous));	
			}
		}
		else if(direction === 'D') {
			for(let j=0; j<nbNodes; j++) {
				previous.y--;
				previous.step += 1;
				allNodes.push(Object.assign({}, previous));	
			}
		}
	}
	return allNodes;
}
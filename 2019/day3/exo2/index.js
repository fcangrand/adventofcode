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
	
	const allNodesFirst = buildPath(path1);
	const allNodesSecond = buildPath(path2);
	const intersection = [];
	allNodesFirst.forEach(node1 => {
		const intersectionFromSecond = allNodesSecond.filter(node2 => (node1.x === node2.x && node1.y == node2.y));
		if (intersectionFromSecond.length) {
			intersectionFromSecond.forEach(node2 => intersection.push(node1.step + node2.step));
		}
	});
	intersection.sort((a,b) => a - b);
	console.log(intersection[0]);	
}


function buildPath(path) {
	const length = path.length;
	const allNodes = [];
	let previous = {x: 0, y: 0, step: 0};
	for (let i=0;i<length;i++) {
		const move = path[i];
		const direction = move.substring(0,1);
		const nbNodes = +(move.substring(1, move.length));
		
		for(let j=0; j<nbNodes; j++) {
			moveWire(direction, previous);
			previous.step++;
			allNodes.push(Object.assign({}, previous));	
		}
	}
	return allNodes;
}

function moveWire(direction, node) {
	if(direction === 'R') {
		node.x++;
	}
	else if(direction === 'U') {
		node.y++;
	}
	else if(direction === 'L') {
		node.x--;	
	}
	else if(direction === 'D') {
		node.y--;
	}
}
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

function ContestResponse() {
    const all_directions = {
		'E': 0,
		'N': 0,
		'W': 0,
		'S': 0
	};
	let current_dir = 'E';
	
    for (let i = 0; i<input.length; i++) {
        const dir = input[i].substring(0, 1);
		const val = +(input[i].substring(1));
		
		switch(dir){
			case 'L':
				current_dir = turn_left(current_dir, val);
				break;
			case 'R':
				if (val === 180) {
					current_dir = turn_left(current_dir, val);
				} else {
					current_dir = turn_left(current_dir, (val + 180) % 360);
				}
				break;
			case 'F':
				all_directions[current_dir] += val;
				break;
			default:
				all_directions[dir] += val;
				break;
		}
		//console.log(all_directions)
    }
	
    const val_east_west = Math.abs(all_directions['E'] - all_directions['W']);
	const val_south_north = Math.abs(all_directions['N'] - all_directions['S']);

	console.log(val_east_west + val_south_north);
}


function turn_left(current_dir, degres) {
    if (!degres) {
		return current_dir;
	}
	
	switch(current_dir){
		case 'E':
			current_dir = 'N';
			break;
		case 'N':
			current_dir = 'W';
			break;
		case 'W':
			current_dir = 'S';
			break;
		case 'S':
			current_dir = 'E';
			break;			
	}
	
    return turn_left(current_dir, degres - 90);
}



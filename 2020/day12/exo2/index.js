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
	
	let waypoint_pos = {
		'E': 10,
		'N': 1,
		'W': 0,
		'S': 0
	};
	
    for (let i = 0; i<input.length; i++) {
        const dir = input[i].substring(0, 1);
		const val = +(input[i].substring(1));
		
		switch(dir){
			case 'L':
				waypoint_pos = turn_left(waypoint_pos, val);
				break;
			case 'R':
				if (val === 180) {
					waypoint_pos = turn_left(waypoint_pos, val);
				} else {
					waypoint_pos = turn_left(waypoint_pos, (val + 180) % 360);
				}
				break;
			case 'F':
				for (key in waypoint_pos) {
					all_directions[key] += val * waypoint_pos[key];					
				}
				break;
			default:
				waypoint_pos[dir] += val;
				break;
		}
    }
	
    const val_east_west = Math.abs(all_directions['E'] - all_directions['W']);
	const val_south_north = Math.abs(all_directions['N'] - all_directions['S']);

	console.log(val_east_west + val_south_north);
}


function turn_left(waypoint_pos, degres) {
    if (!degres) {
		return waypoint_pos;
	}
	
	const new_waypoint_pos = Object.assign({}, waypoint_pos);
	for (key in waypoint_pos) {
		new_waypoint_pos['W'] = waypoint_pos['N'];
		new_waypoint_pos['S'] = waypoint_pos['W'];
		new_waypoint_pos['E'] = waypoint_pos['S'];
		new_waypoint_pos['N'] = waypoint_pos['E'];
	}
	    return turn_left(new_waypoint_pos, degres - 90);
}



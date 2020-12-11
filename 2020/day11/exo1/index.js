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
  const line_ferry = ['.'].concat(line.split("")).concat(['.']);
  input.push(line_ferry);
});

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse() {
    const line_empty = [];
    for (let i = 0; i<input[0].length; i++) {
        line_empty.push('.');
    }
    input = [line_empty].concat(input).concat([line_empty]);
    const res = calculate_nb_seats(input, 0);
	console.log(res);
}


function calculate_nb_seats(input, previous_count) {
    const {new_output, nb_passengers} = fill_passengers(input);
    if (nb_passengers !== previous_count) {
        return calculate_nb_seats(new_output, nb_passengers);
    }

    return nb_passengers;
}


function fill_passengers(input) {
    let nb_passengers = 0;
    // Shallow copy
    let new_output = JSON.parse(JSON.stringify(input));
    const nb_lines = input.length - 2;
    const nb_columns = input[0].length - 2;

    for (let i = 1; i < nb_columns+1; i++) {
        for (let j=1; j< nb_lines+1; j++) {
            const seat = input[j][i];
            switch(seat) {
                case '.':
                    break;
                case 'L':
                    if (can_seat(input, i, j)) {
                        new_output[j][i] = '#';
                        nb_passengers++;
                    }
                    break;
                case '#':
                    if (must_leave(input, i, j)) {
                        new_output[j][i] = 'L';
                    } else {
                        nb_passengers++;
                    }
                    break;
            }
        }
    }
    return {new_output, nb_passengers};
}

function can_seat(input, col, line) {
    let can_seat = true;
    for (let i=col-1;i<col+2;i++) {
        for (let j=line-1;j<line+2; j++) {
            if (input[j][i] === '#') {
                return false;
            }
        }
    }
    return can_seat;
}


function must_leave(input, col, line) {
    let nb_neighbours = 0;
    for (let i=col-1;i<col+2;i++) {
        for (let j=line-1;j<line+2; j++) {
            if (input[j][i] === '#' && (col !==i || line !== j)) {
                nb_neighbours++;
            }
        }
    }
    return nb_neighbours >= 4;

}
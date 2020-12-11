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
    return !see_left_up(input, col, line) &&
           !see_up(input, col, line) &&
           !see_right_up(input, col, line) &&
           !see_right(input, col, line) &&
           !see_right_down(input, col, line) &&
           !see_down(input, col, line) &&
           !see_left_down(input, col, line) &&
           !see_left(input, col, line);
}


function must_leave(input, col, line) {
    const all_directions = [see_left_up(input, col, line),
                          see_up(input, col, line),
                          see_right_up(input, col, line),
                          see_right(input, col, line),
                          see_right_down(input, col, line),
                          see_down(input, col, line),
                          see_left_down(input, col, line),
                          see_left(input, col, line)];

    return all_directions.filter(e => e).length >= 5;
}



function see_left_up(input, col, line) {
    let i=col - 1;
    let j=line -1;
    while (i>0 && j>0) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        i--;
        j--;
    }
    return false;
}

function see_up(input, col, line) {
    let i=col;
    let j=line -1;
    while (i>0 && j>0) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        j--;
    }
    return false;
}

function see_right_up(input, col, line) {
    let i=col+1;
    let j=line -1;
    const length = input[0].length;
    while (i<length && j>0) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        i++;
        j--;
    }
    return false;
}

function see_right(input, col, line) {
    let i=col+1;
    let j=line;
    const length = input[0].length;
    while (i<length && j>0) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        i++;
    }
    return false;
}

function see_right_down(input, col, line) {
    let i=col+1;
    let j=line+1;
    const length = input[0].length;
    while (i<length && j<input.length) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        i++;
        j++;
    }
    return false;
}

function see_down(input, col, line) {
    let i=col;
    let j=line+1;
    const length = input[0].length;
    while (i<length && j<input.length) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        j++;
    }
    return false;
}

function see_left_down(input, col, line) {
    let i=col-1;
    let j=line+1;
    const length = input[0].length;
    while (i>0 && j<input.length) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        i--;
        j++;
    }
    return false;
}

function see_left(input, col, line) {
    let i=col-1;
    let j=line;
    while (i>0 && j<input.length) {
        if (input[j][i] === '#') {
            return true;
        }
        else if (input[j][i] === 'L') {
            return false;
        }
        i--;
    }
    return false;
}
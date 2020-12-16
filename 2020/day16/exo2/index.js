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

const map_field_values = {};
const map_field_index = {};
const all_values = [];
let your_ticket;
let isIntro = true;
let nearbyTickets = false;
let yourTicket = false;
let values;

rl.on('line', (line) => {
   isIntro = isIntro && line;
   if (isIntro) {
       isIntro = line;
       const field = line.split(": ")[0];
       values = [];
       addValues(line.split(": ")[1].split(" ")[0]);
       addValues(line.split(": ")[1].split(" ")[2]);
       map_field_values[field] = values;
       map_field_index[field] = [];
   } else if (nearbyTickets) {
       input.push(line.split(',').map(b => +b));
   } else if (line === 'nearby tickets:') {
       nearbyTickets = true;
   } else if (line === 'your ticket:') {
       yourTicket = true;
   } else if (yourTicket) {
       your_ticket = line.split(',').map(b => +b);
       const all_indexes = []
       for (let i=0; i<your_ticket.length; i++) {
            all_indexes.push(i);
       }

       for (key in map_field_index) {
         map_field_index[key] = all_indexes;
       }

       yourTicket = false;
   }
});

function addValues(seg) {
    const firstSeg = seg.split("-").map(b => +b);
    for (let i=firstSeg[0]; i<firstSeg[1]+1; i++ ) {
        if (all_values.indexOf(i) === -1) {
            all_values.push(i);
        }
        values.push(i);
    }
}

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse);

function ContestResponse() {
   let res = 0;

   for (let i =0; i<input.length; i++) {
        const ticket = input[i];
        if (isValid(ticket)) {
            for (let j=0; j<ticket.length; j++) {
                const val = ticket[j];
                for (key in map_field_index) {
                    const idx = map_field_index[key].indexOf(j);
                    if (idx > -1 && map_field_values[key].indexOf(val) === -1) {
                        const tmp = [...map_field_index[key]];
                        tmp.splice(idx, 1);
                        map_field_index[key]= tmp;
                    }
                }
            }
        }
   }

   clean_field();
   print_result()
}


function isValid(ticket) {
    for (let j=0; j<ticket.length; j++) {
        const val = ticket[j];
        if (all_values.indexOf(val) === -1) {
            return false;
        }
    }
    return true;
}

function clean_field() {
    const already_removed_values = [];
    const keys = Object.keys(map_field_index);
    let nb_indexes = length_indexes();
    while (nb_indexes !== keys.length) {
        for (let key in map_field_index) {
            const values = map_field_index[key];
            const val = values[0];
            if (values.length === 1 && already_removed_values.indexOf(val) === -1) {
                for (let key2 in map_field_index) {
                    const idx =  map_field_index[key2].indexOf(val);
                    if (key2 !== key && idx !== -1) {
                       map_field_index[key2].splice(idx, 1);
                    }
                }
                already_removed_values.push(val);
            }
        }
        nb_new_indexes = length_indexes();
        if (nb_new_indexes === nb_indexes) {
            break;
        }
        nb_indexes = nb_new_indexes;
    }
}

function length_indexes() {
    let nb_indexes = 0;
    for (var key in map_field_index) {
        if (map_field_index.hasOwnProperty(key)) {
            nb_indexes += map_field_index[key].length;
        }
    }
    return nb_indexes;
}

function print_result() {
  let res = 1;
  for (var key in map_field_index) {
        if (key.startsWith('departure')) {
            res *= your_ticket[map_field_index[key][0]];
        }
    }
  console.log(res)
}
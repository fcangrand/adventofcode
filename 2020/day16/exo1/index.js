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

const all_values = [];
let isIntro = true;
let nearbyTickets = false;

rl.on('line', (line) => {
   isIntro = isIntro && line;
   if (isIntro) {
        isIntro = line;
        addValues(line.split(" ")[1]);
        addValues(line.split(" ")[3]);
   } else if (nearbyTickets) {
        input.push(line.split(',').map(b => +b));
   } else if (line === 'nearby tickets:') {
        nearbyTickets = true;
   }
});

function addValues(seg) {
    const firstSeg = seg.split("-").map(b => +b);
    for (let i=firstSeg[0]; i<firstSeg[1]+1; i++ ) {
        if (all_values.indexOf(i) === -1) {
            all_values.push(i);
        }
    }
}

//Call ContestResponse when all inputs are read
rl.on("close", ContestResponse); 

function ContestResponse() {
   let res = 0;
   for (let i =0; i<input.length; i++) {
        const ticket = input[i];
        for (let j=0; j<ticket.length; j++) {
            const val = ticket[j];
            if (all_values.indexOf(val) === -1) {
                res += val;
            }
        }
   }

   console.log(res)
}

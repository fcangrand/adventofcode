/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/
// var crt = require('nodejs-chinese-remainder');

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
    const all_bus = input[1].split(',');
    let max_bus = 0;
    const check_bus = {};
    let num = [];
    let rem = [];
    for (let i=0; i<all_bus.length; i++) {
        const bus = all_bus[i];
        if (bus !== 'x') {
            num.push(+bus);
            //rem.push(i === 0 ? 0 : -i);
            rem.push(i === 0 ? 0 : (+bus + (0-i % bus)));
            check_bus[bus] = i;
            max_bus = Math.max(max_bus, bus);
        }
    }

    let index = 0;
    let new_index;
    let match = false;

    console.log(chinese_remainder(num, rem));
}


function chinese_remainder(n, a){
    let sum=0;
    let prod = n.reduce((a, b) => a*b);
    for (let i=0; i< n.length; i++) {
        let n_i = n[i];
        let a_i  = a[i];
        let p = Math.trunc(prod/n_i);
        sum = sum + (a_i * mul_inv(p, n_i) * p);
        console.log(p)
        console.log(a_i * mul_inv(p, n_i))
        console.log(a_i * mul_inv(p, n_i) * p);
    }
    return sum % prod;

}

function mul_inv(a, b) {
    let b0= b;
    let x0 = 0;
    let x1= 1;
    if (b === 1) {
        return 1;
    }
    while (a > 1) {
        let q = Math.trunc(a/b);
        let d = a;
        a = b;
        b = d%b;

        let tmp = x0;
        x0 = x1 -(q *x0);
        x1 = tmp;
    }
    if (x1<0) {
      x1+= b0;
    }

    return x1;
}

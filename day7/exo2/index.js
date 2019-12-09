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

let maxResult = 0;
let arrayResult = [];
const nbAmplifiers = 5;
const nbLoopMax = 2;

function ContestResponse() {
    const tab = input[0].split(',').map(x => +x);
	calculatePath(tab, 0, [], 0, 0);
    console.log('sortie ', arrayResult + ' max: ' + maxResult);
}

function calculatePath(p_tab, p_input2, p_alreadyChecked, depth, loop) {
	for (let i = loop*nbAmplifiers; i < (1+loop)*nbAmplifiers; i++) {
		if (p_alreadyChecked.indexOf(i) === -1) {
			const alreadyChecked = [...p_alreadyChecked];
			alreadyChecked.push(i);
			const result = calculateIntCode(p_tab, i, p_input2);
			if (loop === 1) {
				console.log(loop + "," + depth + ", " + result + "/" + alreadyChecked);
			}
			if (depth === (nbAmplifiers - 1) && (loop + 1 === nbLoopMax) && (maxResult < result)) {
				console.log("allo");
				maxResult = result;
				arrayResult=[...alreadyChecked];
			}
			else if (depth === (nbAmplifiers - 1) && (loop === 0)) {
				calculatePath(p_tab, result, [], 0, loop+1);
			} 
			else {
				calculatePath(p_tab, result, alreadyChecked, depth+1, loop);
			}
		}
	}
}

function calculateIntCode(p_tab, p_input1, p_input2) {
    // Replace existing values
	const tab = [...p_tab];
    let input = p_input2;
	let isFirstInput = true;
    const output = [];
    let i = 0;
    let lastInstructionWasOutput = false;
    while (i < tab.length) {
        let sNumber = tab[i].toString();
        if (sNumber.length === 1) {
            sNumber = '0' + sNumber;
        }
        const l = sNumber.length;
        const opcode = sNumber.substring(l - 2, l);
        const arr = sNumber.split("").reverse().splice(2);

        if (tab[i] === 99) {
            // console.log('break ', output);
            break;
        }
        if (opcode === '03') {
            const pos = tab[i + 1];
			if (isFirstInput) {
				tab[pos] = p_input1;
				isFirstInput = false;
			} else {
				tab[pos] = input;
			}
            i += 2;
            lastInstructionWasOutput = false;
        } else if (opcode === '04') {
            const pos = tab[i + 1];
            const a = arr[0] === '1' ? pos : tab[pos];
            output.push(+a);
            i += 2;
            lastInstructionWasOutput = true;
        } else if (opcode === '01') {
            const pos = tab[i + 3];
            const a = arr[0] === '1' ? tab[i + 1] : tab[tab[i + 1]];
            const b = arr[1] === '1' ? tab[i + 2] : tab[tab[i + 2]];
            const val = a + b;
            tab[pos] = +val;
            i += 4;
            lastInstructionWasOutput = false;
        } else if (opcode === '02') {
            const pos = tab[i + 3];
            const a = arr[0] === '1' ? tab[i + 1] : tab[tab[i + 1]];
            const b = arr[1] === '1' ? tab[i + 2] : tab[tab[i + 2]];
            const val = a * b;
            tab[pos] = +val;
            i += 4;
            lastInstructionWasOutput = false;
        } else if (opcode === '05') {
            const a = arr[0] === '1' ? tab[i + 1] : tab[tab[i + 1]];
            const b = arr[1] === '1' ? tab[i + 2] : tab[tab[i + 2]];
            if (a !== 0) {
                i = b;
            } else {
                i += 3;
            }
            lastInstructionWasOutput = false;
        } else if (opcode === '06') {
            const a = arr[0] === '1' ? tab[i + 1] : tab[tab[i + 1]];
            const b = arr[1] === '1' ? tab[i + 2] : tab[tab[i + 2]];
            if (a === 0) {
                i = b;
            } else {
                i += 3;
            }
            lastInstructionWasOutput = false;
        } else if (opcode === '07') {
            const pos = tab[i + 3];
            const a = arr[0] === '1' ? tab[i + 1] : tab[tab[i + 1]];
            const b = arr[1] === '1' ? tab[i + 2] : tab[tab[i + 2]];
            tab[pos] = a < b ? 1 : 0;
            i += 4;
            lastInstructionWasOutput = false;
        } else if (opcode === '08') {
            const pos = tab[i + 3];
            const a = arr[0] === '1' ? tab[i + 1] : tab[tab[i + 1]];
            const b = arr[1] === '1' ? tab[i + 2] : tab[tab[i + 2]];
            tab[pos] = a === b ? 1 : 0;
            i += 4;
            lastInstructionWasOutput = false;
        } else {
            console.error("Something went wrong :( at position: ", i);
            console.error("With value ", tab[i]);
            break;
        }
    }

    return output[0];


}

function reverseString(str) {
    return str.split("").reverse().join("");
}
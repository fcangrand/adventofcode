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
    graph = build_graph(input);
    weight = weight_all_children(graph, "shiny gold");
	console.log(weight);
}

/**
* format sortie:
* {
*    "shiny gold": [
        {
          name: "cool bronze",
          number: 5
        }, ...
     ]
*
*/
function build_graph(input) {
    const graph = {};
    const length = input.length;

    for (let i = 0; i < length; i++) {
        // Remove final dot
        const line = input[i].substring(0, input[i].length -1);

        const splitted_line = line.split(" bags contain ");
        const new_type = splitted_line[0];

        if (!graph[new_type]) {
            graph[new_type] = []
        }

        const list_parents = splitted_line[1].split(", ");
        for (let j=0; j < list_parents.length; j++) {
            const new_parent = list_parents[j].split(" bag")[0].split(" ");
            const weight_children = parseInt(new_parent[0], 10);
            if (weight_children) {
                const name_child = new_parent.slice(1, new_parent.length).join(" ");
                const json_child = {
                    "name": name_child,
                    "weight": weight_children
                };
                if (!graph[name_child]) {
                    graph[name_child] = [];
                }
                graph[new_type].push(json_child);
            }
        }
    }
    return graph;
}


function weight_all_children(graph, color) {
    let weight = 0;
    const list_children = graph[color];
    for (let i=0; i<list_children.length; i++) {
        const name = list_children[i].name;
        const weight_child = list_children[i].weight;
        weight += weight_child + weight_child*(weight_all_children(graph, name));
    }
    return weight;
}
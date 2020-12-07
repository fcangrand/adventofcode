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
    list_parents = find_all_parents(graph, "shiny gold");

    parents_without_duplicates = [...new Set(list_parents)]
	console.log(parents_without_duplicates.length);
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
            const nb_new_parent = parseInt(new_parent[0], 10);
            if (nb_new_parent) {
                const name_child = new_parent.slice(1, new_parent.length).join(" ");
                const json_parent = {
                    "name": new_type,
                    "number": nb_new_parent
                };
                if (!graph[name_child]) {
                    graph[name_child] = [];
                }
                graph[name_child].push(json_parent);
            }
        }
    }
    return graph;
}


function find_all_parents(graph, color) {
    let all_parents = [];
    const list_parents = graph[color];
    for (let i=0; i<list_parents.length; i++) {
        const name = list_parents[i].name;
        all_parents.push(name);
        all_parents = all_parents.concat(find_all_parents(graph, name));
    }
    return all_parents;
}
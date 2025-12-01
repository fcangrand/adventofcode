rules = {}

def add_rule(line):
    parts = list(map(int, line.split('|')))
    # Add in an array parts[1] in rules[parts[0]] array or init the array if nos exists
    if parts[0] not in rules:
        rules[parts[0]] = []
    rules[parts[0]].append(parts[1])


def is_well_ordered(values: list[int]) -> bool:
    # Check if each value does not have a value "before" on in the array that is also in the rules right part
    for i in range(len(values)):
        if values[i] not in rules:
            continue
        for j in range(i):
            if values[j] in rules[values[i]]:
                return False
    return True




def main():
    score = 0
    i = 0
    while i < len(lignes) and lignes[i].strip() != "":
        # Ajout rule here
        add_rule(lignes[i].strip())
        i += 1

    # Skip the empty line
    i += 1
    while i < len(lignes):
        values = list(map(int, lignes[i].split(',')))
        # Verify if line is well ordered
        if is_well_ordered(values):
            # add middle score here
            middle_value = int(values[len(values) // 2])
            score += middle_value
        i += 1
    print(score)



with open("input/exo1.txt") as f:
    lignes = f.readlines()
main()
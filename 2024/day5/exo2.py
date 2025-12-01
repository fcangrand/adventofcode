
def add_rule(line, rules):
    parts = list(map(int, line.split('|')))
    # Add in an array parts[1] in rules[parts[0]] array or init the array if nos exists
    if parts[0] not in rules:
        rules[parts[0]] = []
    rules[parts[0]].append(parts[1])


def is_well_ordered(values: list[int], rules) -> bool:
    # Check if each value does not have a value "before" on in the array that is also in the rules right part
    for i in range(len(values)):
        if values[i] not in rules:
            continue
        for j in range(i):
            if values[j] in rules[values[i]]:
                return False
    return True

def order_values_by_rules(values: list[int], rules) -> list[int]:
    ordered_values = values[:]
    n = len(ordered_values)
    # Simple bubble sort with rules
    for i in range(n):
        for j in range(0, n-i-1):
            if ordered_values[j] in rules and ordered_values[j+1] in rules[ordered_values[j]]:
                # Swap
                ordered_values[j], ordered_values[j+1] = ordered_values[j+1], ordered_values[j]
    return ordered_values


def main():
    score = 0
    i = 0
    rules = {}
    while i < len(lignes) and lignes[i].strip() != "":
        add_rule(lignes[i].strip(), rules)
        i += 1

    # Skip the empty line
    i += 1
    while i < len(lignes):
        values = list(map(int, lignes[i].split(',')))
        # Verify if line is well-ordered
        if not is_well_ordered(values, rules):
            # add middle score here
            ordered_values = order_values_by_rules(values, rules)
            middle_value = int(ordered_values[len(ordered_values) // 2])
            score += middle_value
        i += 1
    print(score)



with open("input/sample.txt") as f:
    lignes = f.readlines()
main()
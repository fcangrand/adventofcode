first_col = []
second_map = {}

score = 0

with open("input/exo1.txt") as f:
    for line in f:

        first_val, second_val = line.split(' ')
        second_val = int(second_val)
        first_col.append(int(first_val))
        if not second_map.get(second_val):
            second_map[second_val] = 1
        else:
            second_map[second_val] += 1


for value in first_col:
    if second_map.get(value):
        score += value * second_map[value]

print(score)

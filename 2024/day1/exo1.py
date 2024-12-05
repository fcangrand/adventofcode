first_col = []
second_col = []

score = 0

with open("input/exo1.txt") as f:
    for line in f:

        first_val, second_val = line.split(' ')
        first_col.append(int(first_val))
        second_col.append(int(second_val))

first_col = sorted(first_col)
second_col = sorted(second_col)

for (index, value) in enumerate(first_col):
    score += abs(value - second_col[index])

print(score)
